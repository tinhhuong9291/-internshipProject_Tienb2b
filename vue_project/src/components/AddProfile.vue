<template>
  <div class="add-profile">
    <div class="form-card">
      <h2>Thêm khách hàng mới</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Họ tên</label>
          <input
            type="text"
            id="name"
            v-model="profile.name"
            placeholder="Nhập họ tên"
            required
            :class="{ 'error': formErrors.name }"
          />
          <span class="error-message" v-if="formErrors.name">{{ formErrors.name }}</span>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="profile.email"
            placeholder="Nhập email"
            required
            :class="{ 'error': formErrors.email }"
          />
          <span class="error-message" v-if="formErrors.email">{{ formErrors.email }}</span>
        </div>

        <div class="form-group">
          <label for="phone">Số điện thoại</label>
          <input
            type="tel"
            id="phone"
            v-model="profile.phone"
            placeholder="Nhập số điện thoại"
            required
            :class="{ 'error': formErrors.phone }"
          />
          <span class="error-message" v-if="formErrors.phone">{{ formErrors.phone }}</span>
        </div>

        <div v-if="errorMessage" class="error-message general-error">
          {{ errorMessage }}
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="cancelForm">
            Hủy
          </button>
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <i class="fas fa-save"></i>
            {{ isSubmitting ? 'Đang lưu...' : 'Lưu' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profile: {
        name: "",
        email: "",
        phone: "",
      },
      formErrors: {
        name: '',
        email: '',
        phone: ''
      },
      errorMessage: '',
      isSubmitting: false
    };
  },
  watch: {
    'profile.name'() {
      this.formErrors.name = '';
      this.errorMessage = '';
    },
    'profile.email'() {
      this.formErrors.email = '';
      this.errorMessage = '';
    },
    'profile.phone'() {
      this.formErrors.phone = '';
      this.errorMessage = '';
    }
  },
  methods: {
    validateForm() {
      let isValid = true;
      this.resetErrors();

      // Kiểm tra tên (chỉ chữ cái và khoảng trắng, 3-50 ký tự)
      if (!this.profile.name) {
        this.formErrors.name = "Vui lòng nhập họ tên";
        isValid = false;
      } else if (!/^[A-Za-z\s]+$/.test(this.profile.name)) {
        this.formErrors.name = "Tên chỉ được chứa chữ";
        isValid = false;
      } else if (this.profile.name.length < 3 || this.profile.name.length > 50) {
        this.formErrors.name = "Tên phải có 3-50 ký tự";
        isValid = false;
      }

      // Kiểm tra email
      if (!this.profile.email) {
        this.formErrors.email = "Vui lòng nhập email";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.profile.email)) {
        this.formErrors.email = "Email không hợp lệ";
        isValid = false;
      }

      // Kiểm tra số điện thoại (chỉ số, 10-11 số)
      if (!this.profile.phone) {
        this.formErrors.phone = "Vui lòng nhập số điện thoại";
        isValid = false;
      } else if (!/^[0-9]+$/.test(this.profile.phone)) {
        this.formErrors.phone = "Số điện thoại chỉ được chứa số";
        isValid = false;
      } else if (this.profile.phone.length < 10 || this.profile.phone.length > 11) {
        this.formErrors.phone = "Số điện thoại phải có 10-11 số";
        isValid = false;
      }

      return isValid;
    },
    resetErrors() {
      this.formErrors = {
        name: '',
        email: '',
        phone: ''
      };
      this.errorMessage = '';
    },
    async submitForm() {
      if (!this.validateForm()) {
        this.errorMessage = "Vui lòng kiểm tra lại các trường bên dưới";
        return;
      }

      this.isSubmitting = true;
      try {
        this.$emit("add-profile", { ...this.profile });
        this.resetForm();
      } catch (error) {
        this.errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại.";
        console.error("Error submitting form:", error);
      } finally {
        this.isSubmitting = false;
      }
    },
    cancelForm() {
      this.resetForm();
      this.$emit("cancel");
    },
    resetForm() {
      this.profile = {
        name: "",
        email: "",
        phone: "",
      };
      this.resetErrors();
    },
  },
};
</script>

<style scoped>
/* Giữ các styles hiện có và thêm: */

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.general-error {
  background-color: #fee2e2;
  border: 1px solid #dc2626;
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}

input.error {
  border-color: #dc2626;
}

input.error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>