<template>
  <div class="auth-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="form.password" required />
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <button type="submit" class="btn btn-primary">Login</button>

      <p class="auth-redirect">
        Don't have an account?
        <router-link to="/register">Register here</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  setup() {
    const store = useStore();
    const router = useRouter();

    const form = ref({
      email: "",
      password: "",
    });

    const error = ref("");

    const handleLogin = async () => {
      try {
        error.value = "";
        await store.dispatch("login", form.value);
        router.push("/contacts");
      } catch (err) {
        error.value =
          err.response?.data?.msg || "Login failed. Please try again.";
      }
    };

    return {
      form,
      error,
      handleLogin,
    };
  },
};
</script>
