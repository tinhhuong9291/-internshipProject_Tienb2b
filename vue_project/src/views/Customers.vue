<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
          </svg>
        </div>
        <div class="logo-text">Dashboard <span class="beta-badge">Beta</span></div>
      </div>
      
      <nav class="nav-menu">
        <router-link to="/dashboard" custom v-slot="{ navigate, isActive }">
          <div @click="navigate" :class="['nav-item', { active: isActive }]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
            <span>Dashboard</span>
          </div>
        </router-link>
        
        <router-link to="/customers" custom v-slot="{ navigate, isActive }">
          <div @click="navigate" :class="['nav-item', { active: isActive }]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>Customers</span>
          </div>
        </router-link>
        
        <router-link to="/interactions" custom v-slot="{ navigate, isActive }">
          <div @click="navigate" :class="['nav-item', { active: isActive }]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            <span>Interactions</span>
          </div>
        </router-link>
        
        <router-link to="/tasks" custom v-slot="{ navigate, isActive }">
          <div @click="navigate" :class="['nav-item', { active: isActive }]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
              <path d="M8 14h.01"/>
              <path d="M12 14h.01"/>
              <path d="M16 14h.01"/>
              <path d="M8 18h.01"/>
              <path d="M12 18h.01"/>
              <path d="M16 18h.01"/>
            </svg>
            <span>Tasks</span>
          </div>
        </router-link>
        
        <div class="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span>Help</span>
        </div>
      </nav>

      <div class="user-profile">
        <div class="user-avatar">
          <img src="https://i.pravatar.cc/40" alt="Profile Picture" />
        </div>
        <div class="user-info">
          <p class="user-name">Evano</p>
          <p class="user-role">Project Manager</p>
        </div>
        <div class="user-menu-toggle">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Customer Management</h1>
        <div class="header-actions">
          <div class="search-bar">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Search profiles..." v-model="searchQuery" />
          </div>
          <button class="btn btn-primary" @click="showAddForm = true">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add New Customer
          </button>
        </div>
      </div>

      <!-- Add/Edit Customer Form -->
      <div v-if="showAddForm" class="table-section form-section">
        <div class="table-header">
          <h3 class="table-title">{{ editingId ? 'Edit Customer' : 'Add New Customer' }}</h3>
          <button class="btn btn-outline" @click="cancelForm">
            Cancel
          </button>
        </div>
        
        <form @submit.prevent="saveCustomer" class="customer-form">
          <div class="form-row">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input id="name" v-model="form.name" placeholder="Enter customer name" required />
            </div>
            
            <div class="form-group">
              <label for="email">Email Address</label>
              <input id="email" type="email" v-model="form.email" placeholder="Enter email address" />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input id="phone" v-model="form.phone" placeholder="Enter phone number" />
            </div>
            
            <div class="form-group">
              <label for="type">Customer Type</label>
              <select id="type" v-model="form.type">
                <option value="freelance">Freelance</option>
                <option value="partner">Partner</option>
                <option value="friend">Friend</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">
              {{ editingId ? 'Update Customer' : 'Create Customer' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Customer List -->
      <div v-else class="table-section">
        <div class="table-header">
          <div>
            <h3 class="table-title">All Customers</h3>
            <div class="table-subtitle">{{ customers.length }} Total Customers</div>
          </div>
          <div class="table-actions">
            <div class="table-search">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input 
                type="text" 
                placeholder="Search customers..." 
                v-model="searchQuery"
              />
            </div>
            <button class="btn btn-primary" @click="showAddForm = true">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add New Customer
            </button>
          </div>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in filteredCustomers" :key="customer._id">
              <td>
                <span class="customer-name">{{ customer.name }}</span>
              </td>
              <td>{{ customer.email || 'N/A' }}</td>
              <td>{{ customer.phone || 'N/A' }}</td>
              <td>
                <span :class="['type-chip', customer.type || 'other']">
                  {{ customer.type ? customer.type.charAt(0).toUpperCase() + customer.type.slice(1) : 'Other' }}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="action-btn edit" @click="edit(customer)" title="Edit Customer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button class="action-btn interactions" @click="viewInteractions(customer._id)" title="View Interactions">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </button>
                  <button class="action-btn delete" @click="confirmDelete(customer._id)" title="Delete Customer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredCustomers.length === 0">
              <td colspan="5" class="no-data">No customers found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const API_URL = "https://internshipproject-tienb2b.onrender.com/api";

const customers = ref([]);
const searchQuery = ref("");
const showAddForm = ref(false);
const form = ref({ name: "", email: "", phone: "", type: "other" });
const editingId = ref(null);

const filteredCustomers = computed(() => {
  if (!searchQuery.value) return customers.value;
  
  const query = searchQuery.value.toLowerCase();
  return customers.value.filter(c => 
    c.name.toLowerCase().includes(query) || 
    (c.email && c.email.toLowerCase().includes(query)) ||
    (c.phone && c.phone.includes(query))
  );
});

const fetchCustomers = async () => {
  try {
    const response = await fetch(`${API_URL}/customers`);
    if (!response.ok) throw new Error("Failed to fetch customers");
    customers.value = await response.json();
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};

const saveCustomer = async () => {
  try {
    const url = editingId.value 
      ? `${API_URL}/customers/${editingId.value}`
      : `${API_URL}/customers`;
      
    const method = editingId.value ? "PUT" : "POST";
    
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form.value)
    });
    
    if (!response.ok) throw new Error("Failed to save customer");
    
    await fetchCustomers();
    resetForm();
  } catch (error) {
    console.error("Error saving customer:", error);
  }
};

const edit = (customer) => {
  form.value = {
    name: customer.name,
    email: customer.email || "",
    phone: customer.phone || "",
    type: customer.type || "other"
  };
  editingId.value = customer._id;
  showAddForm.value = true;
};

const confirmDelete = async (id) => {
  if (confirm("Are you sure you want to delete this customer?")) {
    await remove(id);
  }
};

const remove = async (id) => {
  try {
    const response = await fetch(`${API_URL}/customers/${id}`, {
      method: "DELETE"
    });
    
    if (!response.ok) throw new Error("Failed to delete customer");
    
    await fetchCustomers();
  } catch (error) {
    console.error("Error deleting customer:", error);
  }
};

const viewInteractions = (customerId) => {
  router.push(`/interactions/${customerId}`);
};

const cancelForm = () => {
  resetForm();
};

const resetForm = () => {
  form.value = { name: "", email: "", phone: "", type: "other" };
  editingId.value = null;
  showAddForm.value = false;
};

onMounted(fetchCustomers);
</script>

<style scoped>
.customer-form {
  padding: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.form-group input,
.form-group select {
  padding: 0.625rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
}

.action-btn.delete {
  color: var(--danger-color);
  background-color: rgba(239, 68, 68, 0.1);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
