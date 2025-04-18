<template>
    <div class="dashboard">
      <!-- Sidebar - danh sách khách hàng -->
      <div class="sidebar">
        <ul>
          <li
            v-for="customer in customers"
            :key="customer._id"
            :class="{ active: selectedCustomer && selectedCustomer._id === customer._id }"
            @click="selectCustomer(customer)"
          >
            <span class="avatar">{{ customer.name.charAt(0) }}</span>
            {{ customer.name }}
          </li>
        </ul>
      </div>
  
      <!-- Thông tin chi tiết khách hàng -->
      <div class="details" v-if="selectedCustomer">
        <h2>{{ selectedCustomer.name }}</h2>
        <p><strong>UserID:</strong> {{ selectedCustomer._id }}</p>
        <p><strong>Email:</strong> {{ selectedCustomer.email }}</p>
        <p><strong>Phone:</strong> {{ selectedCustomer.phone }}</p>
        <p><strong>Created:</strong> {{ formatDate(selectedCustomer.createdAt) }}</p>
  
        <div class="actions">
          <button @click="editCustomer">Edit</button>
          <button class="danger" @click="deleteCustomer">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        customers: [],
        selectedCustomer: null,
      };
    },
    mounted() {
      this.fetchCustomers();
    },
    methods: {
      async fetchCustomers() {
        try {
          const res = await fetch('http://localhost:8080/api/customers');
          this.customers = await res.json();
        } catch (err) {
          console.error(err);
        }
      },
      selectCustomer(customer) {
        this.selectedCustomer = customer;
      },
      formatDate(dateStr) {
        return new Date(dateStr).toLocaleString();
      },
      editCustomer() {
        alert("Edit function coming soon...");
      },
      async deleteCustomer() {
        if (!confirm("Are you sure to delete this customer?")) return;
        try {
          await fetch(`http://localhost:8080/api/customers/${this.selectedCustomer._id}`, {
            method: 'DELETE',
          });
          this.customers = this.customers.filter(c => c._id !== this.selectedCustomer._id);
          this.selectedCustomer = null;
        } catch (err) {
          console.error("Failed to delete", err);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    display: flex;
    height: 100vh;
    font-family: 'Segoe UI', sans-serif;
  }
  .sidebar {
    width: 220px;
    background-color: #f4f7fb;
    padding: 1rem;
    border-right: 1px solid #ddd;
  }
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  .sidebar li {
    padding: 0.75rem;
    cursor: pointer;
    border-radius: 6px;
    display: flex;
    align-items: center;
  }
  .sidebar li.active {
    background-color: #dcefff;
    font-weight: bold;
  }
  .avatar {
    background-color: #1f8ef1;
    color: white;
    border-radius: 50%;
    padding: 0.4rem;
    margin-right: 0.5rem;
    width: 30px;
    text-align: center;
  }
  .details {
    flex-grow: 1;
    padding: 2rem;
  }
  .actions button {
    margin-right: 1rem;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
  }
  .actions .danger {
    background-color: #ff4d4f;
    color: white;
  }
  .actions button:hover {
    opacity: 0.9;
  }
  </style>
  