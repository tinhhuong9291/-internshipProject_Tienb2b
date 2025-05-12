<template>
  <div class="all-interactions-page">
    <div class="page-header">
      <h2>All Interactions</h2>
      <div class="header-actions">
        <div class="filter-section">
          <select v-model="filterType" @change="handleFilterChange">
            <option value="">All Types</option>
            <option value="call">Call</option>
            <option value="email">Email</option>
            <option value="meeting">Meeting</option>
            <option value="message">Message</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading">Loading interactions...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <div v-else>
      <table class="interactions-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Type</th>
            <th>Content</th>
            <th>Date</th>
            <th>Follow-up Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="interaction in filteredInteractions"
            :key="interaction._id"
          >
            <!-- fix loi khong load duoc customer name -->
            <td>
              <!-- {{
                interaction.customerName || interaction.customer?.name || "N/A"
              }} -->

              {{ interaction.customerId || "N/A" }}
            </td>
            <td>
              <span :class="['type-badge', interaction.type]">
                {{ interaction.type }}
              </span>
            </td>
            <td>{{ interaction.content }}</td>
            <td>{{ formatDate(interaction.date) }}</td>
            <td>
              {{
                interaction.followUpDate
                  ? formatDate(interaction.followUpDate)
                  : "-"
              }}
            </td>
            <td>
              <div class="action-buttons">
                <button
                  class="action-btn view"
                  @click="viewInteraction(interaction)"
                  title="View Details"
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
                      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                    ></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="filteredInteractions.length === 0" class="no-data">
        No interactions found
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const interactions = ref([]);
const loading = ref(true);
const error = ref("");
const searchQuery = ref("");
const filterType = ref("");

// Format date helper function
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Computed property for filtered interactions
const filteredInteractions = computed(() => {
  let filtered = interactions.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (i) =>
        (i.customerName || "").toLowerCase().includes(query) ||
        (i.content || "").toLowerCase().includes(query)
    );
  }

  if (filterType.value) {
    filtered = filtered.filter((i) => i.type === filterType.value);
  }

  return filtered;
});

// Fetch interactions from API
const fetchInteractions = async () => {
  loading.value = true;
  error.value = "";
  try {
    const response = await fetch(
      "https://internshipproject-tienb2b.onrender.com/api/interactions"
    );
    if (!response.ok) throw new Error("Failed to fetch interactions");
    const data = await response.json();
    interactions.value = data.map((i) => ({
      ...i,
      customerName: i.customer?.name || "N/A",
    }));
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
};

// Event handlers
const handleSearch = () => {};

const handleFilterChange = () => {
  // Additional filter logic if needed
};

const viewInteraction = (interaction) => {
  // Navigate to interaction details of the customer
  const customerId = interaction.customerId || "N/A";
  router.push(`/interactions/${customerId}`);
};

// Initialize component
onMounted(fetchInteractions);
</script>

<style scoped>
.all-interactions-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

h2 {
  color: #5932ea;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #f9fbff;
  border-radius: 8px;
  padding: 8px 16px;
  gap: 8px;
}

.search-bar input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  width: 200px;
}

.filter-section select {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  font-size: 14px;
  outline: none;
}

.interactions-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.06);
}

.interactions-table th,
.interactions-table td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #f1f5f9;
}

.interactions-table th {
  background: #f8fafc;
  color: #64748b;
  font-weight: 600;
  font-size: 14px;
}

.type-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.type-badge.call {
  background-color: rgba(99, 102, 241, 0.1);
  color: #6366f1;
}

.type-badge.email {
  background-color: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.type-badge.meeting {
  background-color: rgba(234, 179, 8, 0.1);
  color: #eab308;
}

.type-badge.message {
  background-color: rgba(236, 72, 153, 0.1);
  color: #ec4899;
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
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #f1f5f9;
}

.action-btn:hover {
  background-color: #e2e8f0;
  transform: translateY(-1px);
}

.loading,
.error-message,
.no-data {
  text-align: center;
  padding: 24px;
  color: #64748b;
  background: white;
  border-radius: 12px;
  margin-top: 16px;
}

.error-message {
  color: #ef4444;
}
</style>
