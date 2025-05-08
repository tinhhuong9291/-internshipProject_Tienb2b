<template>
  <div id="app" class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <!-- <div class="logo-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polygon
              points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
            />
          </svg>
        </div> -->
        <!-- <div class="logo-text">Dashboard <span class="beta-badge">Beta</span></div> -->
      </div>

      <nav class="nav-menu">
        <router-link
          to="/dashboard"
          class="dashboard-link"
          custom
          v-slot="{ navigate, isActive }"
        >
          <div @click="navigate" :class="['nav-item', { active: isActive }]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
            <span>Dashboard</span>
          </div>
        </router-link>

        <router-link to="/customers" custom v-slot="{ navigate, isActive }">
          <div @click="navigate" :class="['nav-item', { active: isActive }]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>Customers</span>
          </div>
        </router-link>

        <router-link
          to="/interactions-all"
          class="all-interactions-page"
          custom
          v-slot="{ navigate, isActive }"
        >
          <div @click="navigate" :class="['nav-item', { active: isActive }]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              />
            </svg>
            <span>Interactions</span>
          </div>
        </router-link>

        <router-link to="/tasks" custom v-slot="{ navigate, isActive }">
          <div @click="navigate" :class="['nav-item', { active: isActive }]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <path d="M8 14h.01" />
              <path d="M12 14h.01" />
              <path d="M16 14h.01" />
              <path d="M8 18h.01" />
              <path d="M12 18h.01" />
              <path d="M16 18h.01" />
            </svg>
            <span>Tasks</span>
          </div>
        </router-link>

        <div class="nav-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>Help</span>
        </div>
      </nav>

      <div class="user-profile">
        <div class="user-avatar">
          <img src="https://i.pravatar.cc/40" alt="Profile Picture" />
        </div>
        <div class="user-info">
          <p class="user-name">{{ username }}</p>
          <p class="user-role">Project Manager</p>
        </div>
        <div class="user-menu-toggle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="main-header">
        <!-- <router-link to="/dashboard" class="header-logo">
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <polygon
              points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
            />
          </svg>
          <span>Dashboard</span>
        </router-link> -->
        <!-- search bar and add customer button -->
        <div class="header-actions">
          <div class="search-bar">
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search customers..."
              v-model="searchQuery"
              @input="handleSearch"
            />
          </div>
        </div>
      </header>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading dashboard data...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <p class="error-message">{{ error }}</p>
        <button class="btn btn-primary" @click="fetchData">Try Again</button>
      </div>

      <div v-else>
        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon customers-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div class="stat-content">
              <p class="stat-label">Total Customers</p>
              <h2 class="stat-value">{{ customers.length }}</h2>
              <div class="stat-info">
                <span v-if="customerTypes.partner" class="stat-badge neutral"
                  >Partner: {{ customerTypes.partner }}</span
                >
                <span
                  >{{
                    Math.round(
                      (customerTypes.partner / (customers.length || 1)) * 100
                    )
                  }}% of total</span
                >
              </div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon interactions-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                />
              </svg>
            </div>
            <div class="stat-content">
              <p class="stat-label">Recent Interactions</p>
              <h2 class="stat-value">{{ recentInteractions.length }}</h2>
              <div class="stat-info">
                <span class="stat-badge positive">Past 7 days</span>
              </div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon tasks-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div class="stat-content">
              <p class="stat-label">Upcoming Tasks</p>
              <h2 class="stat-value">{{ upcomingTasks.length }}</h2>
              <div class="stat-info" v-if="upcomingTasks.length > 0">
                <span class="stat-badge positive"
                  >{{
                    upcomingTasks.filter((t) => t.priority === "high").length
                  }}
                  High priority</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Customer Table -->
        <div class="table-section">
          <div class="table-header">
            <div>
              <h3 class="table-title">All Customers</h3>
              <div class="table-subtitle">
                {{ activeCustomers }} Active Members
              </div>
            </div>
            <div class="table-actions">
              <div class="table-search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search customers..."
                  v-model="searchQuery"
                  @input="handleSearch"
                />
              </div>
              <div class="table-sort">
                <span>Sort by:</span>
                <select v-model="sortBy" @change="handleSortChange">
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                </select>
              </div>
            </div>
          </div>

          <table class="data-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Type</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Country</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="customer in displayedCustomers" :key="customer._id">
                <td>
                  <span
                    class="customer-name"
                    @click="navigateToCustomer(customer._id)"
                  >
                    {{ customer.name }}
                  </span>
                </td>
                <td>
                  <span :class="['type-chip', customer.type || 'other']">
                    {{
                      customer.type
                        ? customer.type.charAt(0).toUpperCase() +
                          customer.type.slice(1)
                        : "Other"
                    }}
                  </span>
                </td>
                <td>{{ customer.phone || "N/A" }}</td>
                <td>{{ customer.email || "N/A" }}</td>
                <td>{{ customer.country || "N/A" }}</td>
                <td>
                  <span
                    :class="[
                      'status-badge',
                      customer.isActive ? 'active' : 'inactive',
                    ]"
                  >
                    {{ customer.isActive ? "Active" : "Inactive" }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button
                      class="action-btn edit"
                      @click="navigateToCustomer(customer._id)"
                      title="Edit Customer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                        ></path>
                        <path
                          d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                        ></path>
                      </svg>
                    </button>
                    <button
                      class="action-btn interactions"
                      @click="navigateToCustomerInteractions(customer._id)"
                      title="View Interactions"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="displayedCustomers.length === 0">
                <td colspan="7" class="no-data">No customers found</td>
              </tr>
            </tbody>
          </table>

          <div class="pagination">
            <div class="pagination-info">
              Showing data {{ (currentPage - 1) * itemsPerPage + 1 }} to
              {{ Math.min(currentPage * itemsPerPage, totalCustomers) }} of
              {{ totalCustomers }} entries
            </div>
            <div class="pagination-controls">
              <button
                class="page-btn"
                @click="prevPage"
                :disabled="currentPage === 1"
                title="Previous Page"
              >
                &lt;
              </button>
              <button
                v-for="page in Math.min(totalPages, 5)"
                :key="page"
                :class="['page-btn', currentPage === page ? 'active' : '']"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>
              <span v-if="totalPages > 5">...</span>
              <button
                v-if="totalPages > 5"
                class="page-btn"
                @click="goToPage(totalPages)"
              >
                {{ totalPages }}
              </button>
              <button
                class="page-btn"
                @click="nextPage"
                :disabled="currentPage === totalPages"
                title="Next Page"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Base API URL
const API_URL = "https://internshipproject-tienb2b.onrender.com/api";

// Dashboard data
const username = ref("Evano");
const customers = ref([]);
const interactions = ref([]);
const tasks = ref([]);
const loading = ref(true);
const error = ref("");

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(8);
const totalCustomers = ref(0);

// Filter and search
const searchQuery = ref("");
const sortBy = ref("newest");
const customerTypes = ref({
  freelance: 0,
  partner: 0,
  friend: 0,
  other: 0,
});

// Statistics
const activeCustomers = computed(() => {
  return customers.value.filter((c) => c.isActive).length;
});

// const recentInteractions = computed(() => {
//   const oneWeekAgo = new Date();
//   oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

//   return interactions.value.filter((i) => {
//     const interactionDate = new Date(i.date);
//     return interactionDate >= oneWeekAgo;
//   });
// });
// get alll interactions
const recentInteractions = computed(() => {
  return interactions.value.filter(
    (i) =>
      i.type === "call" ||
      i.type === "email" ||
      i.type === "meeting" ||
      i.type === "message"
  );
});

const upcomingTasks = computed(() => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  return tasks.value.filter((t) => {
    if (!t.dueDate) return false;
    const dueDate = new Date(t.dueDate);
    return dueDate >= today && dueDate <= nextWeek && !t.completed;
  });
});

// Filtered customers for display
const displayedCustomers = computed(() => {
  let filtered = [...customers.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        (c.email && c.email.toLowerCase().includes(query)) ||
        (c.phone && c.phone.includes(query))
    );
  }

  // Apply sorting
  switch (sortBy.value) {
    case "newest":
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case "oldest":
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case "a-z":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "z-a":
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  // Update total for pagination
  totalCustomers.value = filtered.length;

  // Apply pagination
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filtered.slice(start, end);
});

// Calculate total pages for pagination
const totalPages = computed(() => {
  return Math.ceil(totalCustomers.value / itemsPerPage.value);
});

// Methods
const fetchData = async () => {
  loading.value = true;
  error.value = "";

  try {
    const [customersRes, interactionsRes, tasksRes] = await Promise.all([
      fetch(`${API_URL}/customers`),
      fetch(`${API_URL}/interactions`),
      fetch(`${API_URL}/tasks`),
    ]);

    if (!customersRes.ok || !interactionsRes.ok || !tasksRes.ok) {
      throw new Error("One or more API requests failed");
    }

    customers.value = await customersRes.json();
    interactions.value = await interactionsRes.json();
    tasks.value = await tasksRes.json();

    // Count customer types
    customerTypes.value = {
      freelance: 0,
      partner: 0,
      friend: 0,
      other: 0,
    };

    customers.value.forEach((c) => {
      if (c.type) {
        customerTypes.value[c.type] = (customerTypes.value[c.type] || 0) + 1;
      } else {
        customerTypes.value.other = (customerTypes.value.other || 0) + 1;
      }
    });

    // Add derived fields for UI
    customers.value = customers.value.map((c) => ({
      ...c,
      // Use existing fields or generate placeholders if needed
      isActive: Math.random() > 0.3, // This would come from backend in a real app
      company:
        c.company ||
        [
          "Microsoft",
          "Google",
          "Apple",
          "Amazon",
          "Facebook",
          "Tesla",
          "Adobe",
        ][Math.floor(Math.random() * 7)],
      country: c.address
        ? extractCountry(c.address)
        : [
            "United States",
            "Israel",
            "Iran",
            "Brazil",
            "Kiribati",
            "Réunion",
            "Åland Islands",
          ][Math.floor(Math.random() * 7)],
    }));
  } catch (e) {
    console.error(e);
    error.value = "Failed to fetch dashboard data. Please try again.";
  } finally {
    loading.value = false;
  }
};

// Navigation functions
const navigateToCustomer = (customerId) => {
  router.push(`/edit-customer/${customerId}`);
};

const navigateToCustomerInteractions = (customerId) => {
  router.push(`/interactions/${customerId}`);
};

// Extract country from address (simple implementation)
const extractCountry = (address) => {
  const parts = address.split(",");
  return parts.length > 1 ? parts[parts.length - 1].trim() : address;
};

// Pagination methods
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Handle search input
const handleSearch = (e) => {
  searchQuery.value = e.target.value;
  currentPage.value = 1; // Reset to first page when searching
};

// Handle sort change
const handleSortChange = (e) => {
  sortBy.value = e.target.value;
};

// Update pagination when filters change
watch([searchQuery, sortBy], () => {
  currentPage.value = 1;
});

// Initialize data on component mount
onMounted(fetchData);
</script>

<style scoped>
/* Global Styles */
.dashboard-container {
  display: flex;
  min-height: 100vh;
  font-family: "Inter", "Segoe UI", Arial, sans-serif;
  color: #333;
  background-color: #f9fafb;
}

/* Sidebar Styles */
.sidebar {
  width: 220px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-right: 1px solid #eaeaea;
}

.sidebar-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding: 10px;
}

.logo-icon {
  background-color: #5932ea;
  color: white;
  padding: 8px;
  border-radius: 8px;
  margin-right: 8px;
}

.logo-text {
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: baseline;
}

.beta-badge {
  font-size: 10px;
  margin-left: 4px;
  color: #999;
  font-weight: 400;
}

.nav-menu {
  flex-grow: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
  color: #7e7e7e;
  transition: background-color 0.2s;
}

.nav-item svg {
  margin-right: 12px;
}

.nav-item:hover {
  background-color: #f5f5f5;
}

.nav-item.active {
  background-color: #5932ea;
  color: white;
}

.user-profile {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-top: auto;
  border-top: 1px solid #eaeaea;
}

.user-avatar {
  margin-right: 12px;
}

.user-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-info {
  flex-grow: 1;
}

.user-name {
  font-weight: 500;
  margin: 0;
}

.user-role {
  font-size: 12px;
  color: #7e7e7e;
  margin: 0;
}

.user-menu-toggle {
  cursor: pointer;
}

/* Main Content Styles */
.main-content {
  flex-grow: 1;
  padding: 20px 40px;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.06);
  padding: 18px 32px;
  margin-bottom: 32px;
  gap: 2rem;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #5932ea;
  text-decoration: none;
  transition: color 0.2s;
}

.header-logo:hover {
  color: #4f46e5;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #f9fbff;
  border-radius: 8px;
  padding: 8px 16px;
  box-shadow: 0 1px 3px rgba(99, 102, 241, 0.04);
}

.search-bar svg {
  margin-right: 8px;
  color: #b5b5c3;
}

.search-bar input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  width: 180px;
}

.btn.btn-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  text-decoration: none;
}

.btn.btn-primary:hover {
  background: #4f46e5;
  transform: translateY(-2px);
}

.btn-icon {
  margin-right: 8px;
}

/* Loading and Error States */
.loading-state,
.error-state {
  text-align: center;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
}

.spinner {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #5932ea;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  margin-top: 10px;
}

.error-message button {
  background-color: #5932ea;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}

/* Stats Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  padding: 16px;
  border-radius: 50%;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.customers-icon {
  background-color: rgba(65, 193, 134, 0.1);
  color: #41c186;
}

.interactions-icon {
  background-color: rgba(80, 115, 251, 0.1);
  color: #5073fb;
}

.tasks-icon {
  background-color: rgba(254, 91, 91, 0.1);
  color: #fe5b5b;
}

.stat-content {
  flex-grow: 1;
}

.stat-label {
  color: #aeaeae;
  font-size: 14px;
  margin: 0 0 8px 0;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.stat-info {
  display: flex;
  align-items: center;
  font-size: 12px;
}

.stat-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  margin-right: 4px;
}

.neutral {
  background-color: #ff9f43;
  color: white;
}

.positive {
  background-color: #41c186;
  color: white;
}

.negative {
  background-color: #fe5b5b;
  color: white;
}

/* Customer Table Styles */
.table-section {
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.table-title h3 {
  margin: 0 0 4px 0;
  font-size: 18px;
}

.table-subtitle {
  color: #16c098;
  font-size: 14px;
}

.table-actions {
  display: flex;
  align-items: center;
}

.table-search {
  display: flex;
  align-items: center;
  background-color: #f9fbff;
  padding: 8px 16px;
  border-radius: 10px;
  margin-right: 16px;
}

.table-search svg {
  margin-right: 8px;
  color: #b5b5c3;
}

.table-search input {
  border: none;
  outline: none;
  background: transparent;
  width: 180px;
  font-size: 14px;
}

.table-sort {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.table-sort select {
  margin-left: 8px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #f9fbff;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 14px 10px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.data-table th {
  color: #b5b5c3;
  font-weight: 500;
  font-size: 14px;
}

.data-table td {
  color: #292d32;
  font-weight: 500;
}

.no-data {
  text-align: center;
  color: #7e7e7e;
  padding: 20px;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}

.status-badge.active {
  background-color: rgba(22, 192, 152, 0.1);
  color: #16c098;
  border: 1px solid #16c098;
}

.status-badge.inactive {
  background-color: rgba(255, 126, 126, 0.1);
  color: #ff7e7e;
  border: 1px solid #ff7e7e;
}

/* Pagination Styles */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-size: 14px;
  color: #b5b5c3;
}

.pagination-info {
  margin: 0;
}

.pagination-controls {
  display: flex;
  align-items: center;
}

.page-btn {
  width: 25px;
  height: 25px;
  border-radius: 4px;
  border: 1px solid #eee;
  background-color: transparent;
  margin: 0 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn.active {
  background-color: #5932ea;
  color: white;
  border-color: #5932ea;
}

.page-btn.prev,
.page-btn.next {
  width: 25px;
}

/* Customer table styles */
.customer-row:hover {
  background-color: #f9fbff;
}

.clickable {
  cursor: pointer;
  color: #5932ea;
  font-weight: 600;
}

.clickable:hover {
  text-decoration: underline;
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-btn.edit {
  background-color: rgba(89, 50, 234, 0.1);
  color: #5932ea;
}

.action-btn.interactions {
  background-color: rgba(65, 193, 134, 0.1);
  color: #41c186;
}

.action-btn:hover {
  opacity: 0.9;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .main-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 12px 8px;
  }
  .header-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
  .search-bar input {
    width: 100%;
  }
}
</style>
