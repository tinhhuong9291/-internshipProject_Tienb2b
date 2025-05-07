<template>
  <div class="all-interactions-page">
    <h2>All Interactions</h2>
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
            <th>Follow-up</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in interactions" :key="i._id">
            <td>{{ i.customerName || i.customer?.name || 'N/A' }}</td>
            <td>{{ i.type }}</td>
            <td>{{ i.content }}</td>
            <td>{{ formatDate(i.date) }}</td>
            <td>{{ i.followUpDate ? formatDate(i.followUpDate) : '-' }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="interactions.length === 0" class="no-data">No interactions found.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const interactions = ref([]);
const loading = ref(true);
const error = ref('');

function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

async function fetchAllInteractions() {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch('https://internshipproject-tienb2b.onrender.com/api/interactions');
    if (!res.ok) throw new Error('Failed to fetch interactions');
    const data = await res.json();
    // Try to get customer name if available
    interactions.value = data.map(i => ({
      ...i,
      customerName: i.customer?.name || i.customerName || 'N/A',
    }));
  } catch (e) {
    error.value = e.message || 'Error fetching interactions';
  } finally {
    loading.value = false;
  }
}

onMounted(fetchAllInteractions);
</script>

<style scoped>
.all-interactions-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
}
h2 {
  margin-bottom: 24px;
  color: #5932ea;
  font-size: 2rem;
  font-weight: 700;
}
.interactions-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(99,102,241,0.06);
  overflow: hidden;
}
.interactions-table th, .interactions-table td {
  padding: 14px 12px;
  border-bottom: 1px solid #eee;
  text-align: left;
}
.interactions-table th {
  background: #f9fbff;
  color: #6366f1;
  font-weight: 600;
}
.interactions-table tr:last-child td {
  border-bottom: none;
}
.loading, .error-message, .no-data {
  padding: 24px;
  text-align: center;
  color: #7e7e7e;
}
.error-message {
  color: #dc3545;
}
.no-data {
  color: #b5b5c3;
}
</style> 