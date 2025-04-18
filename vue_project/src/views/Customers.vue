<template>
  <div>
    <h2>Customers</h2>
    <form @submit.prevent="saveCustomer">
      <input v-model="form.name" placeholder="Name" />
      <input v-model="form.email" placeholder="Email" />
      <input v-model="form.phone" placeholder="Phone" />
      <button type="submit">{{ editingId ? "Update" : "Create" }}</button>
    </form>
    <ul>
      <li v-for="c in customers" :key="c._id">
        {{ c.name }} - {{ c.email }} - {{ c.phone }}
        <button @click="edit(c)">✏️</button>
        <button @click="remove(c._id)">🗑️</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "../services/api";

const customers = ref([]);
const form = ref({ name: "", email: "", phone: "" });
const editingId = ref(null);

const fetchCustomers = async () => {
  customers.value = (await api.customers.getAll()).data;
};

const saveCustomer = async () => {
  if (editingId.value) {
    await api.customers.update(editingId.value, form.value);
  } else {
    await api.customers.create(form.value);
  }
  form.value = { name: "", email: "", phone: "" };
  editingId.value = null;
  fetchCustomers();
};

const edit = (customer) => {
  form.value = {
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
  };
  editingId.value = customer._id;
};

const remove = async (id) => {
  await api.customers.delete(id);
  fetchCustomers();
};

onMounted(fetchCustomers);
</script>
