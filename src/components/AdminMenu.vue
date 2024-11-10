<template>
  <div class="admin-menu">
    <button @click="showAddProductModal" class="add-product-button">Add Product</button>

    <!-- Add/Edit Product Modal -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <h3>{{ editMode ? 'Edit Product' : 'Add Product' }}</h3>
        <form @submit.prevent="editMode ? updateProduct() : addProduct()">
          <div class="form-group">
            <label>Product Name</label>
            <input v-model="newProduct.name" type="text" placeholder="Product Name" required />
          </div>

          <div class="form-group">
            <label>Category</label>
            <input v-model="newProduct.category" type="text" placeholder="Category" required />
          </div>

          <div class="form-group">
            <label>Price</label>
            <input v-model.number="newProduct.price" type="number" min="0" placeholder="Price" required />
          </div>

          <div class="form-group availability">
            <label>Availability</label>
            <button type="button" @click="toggleAvailability" :class="newProduct.isAvailable ? 'available' : 'unavailable'">
              {{ newProduct.isAvailable ? "Available" : "Unavailable" }}
            </button>
          </div>

          <div class="form-group">
            <label>Upload Image</label>
            <input type="file" @change="onImageUpload" />
            <img v-if="newProduct.image" :src="newProduct.image" alt="Product Image Preview" class="product-image-preview" />
          </div>

          <div class="modal-actions">
            <button type="submit" class="btn-action add">{{ editMode ? 'Update Product' : 'Add Product' }}</button>
            <button type="button" @click="closeModal" class="btn-action cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Products Table -->
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Product Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Availability</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td><img :src="product.image" alt="Product Image" v-if="product.image" class="product-image" /></td>
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.price }}</td>
          <td>
            <button :class="{ available: product.isAvailable, unavailable: !product.isAvailable }">
              {{ product.isAvailable ? "Available" : "Unavailable" }}
            </button>
          </td>
          <td>
            <button @click="editProduct(product)" class="btn-edit">Edit</button>
            <button @click="deleteProduct(product.id)" class="btn-delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { db } from "../config/firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export default {
  data() {
    return {
      isModalOpen: false,
      editMode: false,
      products: [],
      newProduct: {
        name: "",
        category: "",
        price: 0,
        isAvailable: true,
        image: null, // Initially null until image is uploaded
      },
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const querySnapshot = await getDocs(collection(db, "menu"));
        this.products = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Firestore-generated ID
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    showAddProductModal() {
      this.resetNewProduct();
      this.editMode = false;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    toggleAvailability() {
      this.newProduct.isAvailable = !this.newProduct.isAvailable;
    },
    async onImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "unsigned_preset"); // Replace with your actual Cloudinary preset

        try {
          const response = await fetch(`https://api.cloudinary.com/v1_1/dwaax1x64/image/upload`, {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          if (data.secure_url) {
            this.newProduct.image = data.secure_url; // Set image URL in newProduct
          } else {
            console.error("Image upload failed:", data);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    },
    async addProduct() {
      try {
        // Ensure the image URL is set before adding to Firestore
        if (!this.newProduct.image) {
          console.error("Image URL is missing");
          return;
        }

        // Add product to Firestore with auto-generated ID
        const docRef = await addDoc(collection(db, "menu"), {
          name: this.newProduct.name,
          category: this.newProduct.category,
          price: this.newProduct.price,
          isAvailable: this.newProduct.isAvailable,
          image: this.newProduct.image, // Use the uploaded image URL
        });

        // Retrieve Firestore-generated ID and add it to the local products array
        const productWithId = { id: docRef.id, ...this.newProduct };
        this.products.push(productWithId);

        this.closeModal();
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },
    editProduct(product) {
      this.newProduct = { ...product };
      this.editMode = true;
      this.isModalOpen = true;
    },
    async updateProduct() {
      try {
        const productRef = doc(db, "menu", this.newProduct.id);
        await updateDoc(productRef, {
          name: this.newProduct.name,
          category: this.newProduct.category,
          price: this.newProduct.price,
          isAvailable: this.newProduct.isAvailable,
          image: this.newProduct.image,
        });

        const index = this.products.findIndex((p) => p.id === this.newProduct.id);
        if (index !== -1) {
          this.products[index] = { ...this.newProduct };
        }

        this.closeModal();
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },
    async deleteProduct(productId) {
      try {
        const productRef = doc(db, "menu", productId);
        await deleteDoc(productRef);
        this.products = this.products.filter((product) => product.id !== productId);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
    resetNewProduct() {
      this.newProduct = {
        name: "",
        category: "",
        price: 0,
        isAvailable: true,
        image: null, // Reset image to null for new product
      };
    },
  },
  async mounted() {
    await this.fetchProducts();
  },
};
</script>

<style scoped>
.admin-menu {
  padding: 20px;
}

.add-product-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
}

/* Modal styling */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  width: 350px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

h3 {
  text-align: center;
  margin-bottom: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="file"] {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.availability button {
  width: 100%;
  margin-top: 5px;
}

.available, .unavailable {
  font-family: inherit;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.available {
  background-color: green;
  color: white;
}

.unavailable {
  background-color: red;
  color: white;
}

/* Modal action buttons */
.modal-actions {
  display: flex;
  gap: 15px;
}

.btn-action {
  font-family: inherit;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
  color: white;
}

.btn-action.add {
  background-color: green;
}

.btn-action.cancel {
  background-color: red;
}

/* Table styles */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

/* Adjusted Product Image Size */
.product-image {
  width: 100px;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
}

.product-image-preview {
  width: 100px;
  height: auto;
  object-fit: cover;
  margin-top: 10px;
  border-radius: 5px;
}

.btn-edit {
  background-color: blue;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-delete {
  background-color: red;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
