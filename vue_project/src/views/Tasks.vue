<template>
  <div class="tasks-page">
    <h1>Tasks</h1>
    <div class="task-list">
      <div v-if="loading">Loading tasks...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div v-for="task in tasks" :key="task._id" class="task-item">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleComplete(task)"
          />
          <span :class="{ completed: task.completed }">{{ task.title }}</span>
          <small>Due: {{ formatDate(task.dueDate) }}</small>
          <small>Priority: {{ task.priority }}</small>
          <button @click="editTask(task)">Edit</button>
          <button @click="deleteTask(task._id)">Delete</button>
        </div>
      </div>
    </div>

    <h2>Add New Task</h2>
    <form @submit.prevent="addTask">
      <input
        type="text"
        v-model="newTask.title"
        placeholder="Task Title"
        required
      />
      <input type="date" v-model="newTask.dueDate" />
      <select v-model="newTask.priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>

    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <h2>Edit Task</h2>
        <form @submit.prevent="updateTask">
          <input
            type="text"
            v-model="editingTask.title"
            placeholder="Task Title"
            required
          />
          <input type="date" v-model="editingTask.dueDate" />
          <select v-model="editingTask.priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="submit">Update Task</button>
          <button type="button" @click="closeEditModal">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const tasks = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const newTask = ref({
      title: "",
      dueDate: null,
      priority: "medium",
      customerId: "6640b95959440a5c9b78694a",
    });
    const showEditModal = ref(false);
    const editingTask = ref({});

    const fetchTasks = async () => {
      loading.value = true;
      error.value = null;
      try {
        const res = await fetch(
          "https://internshipproject-tienb2b.onrender.com/api/tasks"
        );
        tasks.value = await res.json();
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    const addTask = async () => {
      try {
        const res = await fetch(
          "https://internshipproject-tienb2b.onrender.com/api/tasks",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask.value),
          }
        );
        if (res.ok) {
          fetchTasks(); // Refresh task list
          newTask.value = {
            title: "",
            dueDate: null,
            priority: "medium",
            customerId: "6640b95959440a5c9b78694a",
          }; // Reset form
        } else {
          error.value = "Failed to add task";
        }
      } catch (err) {
        error.value = err.message;
      }
    };

    const updateTask = async () => {
      try {
        const res = await fetch(
          `https://internshipproject-tienb2b.onrender.com/api/tasks/${editingTask.value._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editingTask.value),
          }
        );
        if (res.ok) {
          fetchTasks(); // Refresh task list
          closeEditModal();
        } else {
          error.value = "Failed to update task";
        }
      } catch (err) {
        error.value = err.message;
      }
    };

    const deleteTask = async (id) => {
      try {
        const res = await fetch(
          `https://internshipproject-tienb2b.onrender.com/api/tasks/${id}`,
          {
            method: "DELETE",
          }
        );
        if (res.ok) {
          fetchTasks(); // Refresh task list
        } else {
          error.value = "Failed to delete task";
        }
      } catch (err) {
        error.value = err.message;
      }
    };

    const toggleComplete = async (task) => {
      try {
        const res = await fetch(
          `https://internshipproject-tienb2b.onrender.com/api/tasks/${task._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...task, completed: !task.completed }),
          }
        );
        if (res.ok) {
          fetchTasks(); // Refresh task list
        } else {
          error.value = "Failed to toggle complete";
        }
      } catch (err) {
        error.value = err.message;
      }
    };

    const editTask = (task) => {
      editingTask.value = { ...task };
      showEditModal.value = true;
    };

    const closeEditModal = () => {
      showEditModal.value = false;
      editingTask.value = {};
    };

    const formatDate = (dateString) => {
      if (!dateString) return "-";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    onMounted(fetchTasks);

    return {
      tasks,
      loading,
      error,
      newTask,
      addTask,
      deleteTask,
      toggleComplete,
      formatDate,
      editTask,
      editingTask,
      showEditModal,
      closeEditModal,
      updateTask,
    };
  },
};
</script>

<style scoped>
.tasks-page {
  font-family: sans-serif;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  text-align: center;
}

.task-list {
  margin-top: 20px;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.task-item input[type="checkbox"] {
  margin-right: 10px;
}

.task-item span {
  flex-grow: 1;
}

.task-item span.completed {
  text-decoration: line-through;
  color: #888;
}

.task-item small {
  margin-left: 10px;
  color: #777;
}

.task-item button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 5px;
}

.task-item button:hover {
  background-color: #d32f2f;
}

form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

form input,
form select {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

form button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

form button:hover {
  background-color: #45a049;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
}

.modal-content h2 {
  text-align: center;
}
</style>
