<template>
  <div class="edit-profile-overlay">
    <div class="edit-profile-popup">
      <div class="popup-header">
        <h2>Chỉnh sửa thông tin khách hàng</h2>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>

      <form @submit.prevent="saveChanges">
        <div class="form-group">
          <label for="name">Họ tên:</label>
          <input
            id="name"
            v-model="editableProfile.name"
            type="text"
            placeholder="Nhập họ tên"
            required
            :class="{ error: formErrors.name }"
          />
          <span class="error-message" v-if="formErrors.name">{{
            formErrors.name
          }}</span>
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input
            id="email"
            v-model="editableProfile.email"
            type="email"
            placeholder="Nhập email"
            required
            :class="{ error: formErrors.email }"
          />
          <span class="error-message" v-if="formErrors.email">{{
            formErrors.email
          }}</span>
        </div>

        <div class="form-group">
          <label for="phone">Số điện thoại:</label>
          <input
            id="phone"
            v-model="editableProfile.phone"
            type="tel"
            placeholder="Nhập số điện thoại"
            required
            :class="{ error: formErrors.phone }"
          />
          <span class="error-message" v-if="formErrors.phone">{{
            formErrors.phone
          }}</span>
        </div>

        <div v-if="errorMessage" class="error-message general-error">
          {{ errorMessage }}
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-cancel" @click="$emit('close')">
            Hủy
          </button>
          <button
            type="submit"
            class="btn btn-confirm"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? "Đang lưu..." : "Xác nhận" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["profile"],
  data() {
    return {
      editableProfile: null,
      formErrors: {
        name: "",
        email: "",
        phone: "",
      },
      errorMessage: "",
      isSubmitting: false,
    };
  },

  watch: {
    profile: {
      handler(newVal) {
        if (newVal && newVal._id) {
          this.editableProfile = { ...newVal }; // Sao chép toàn bộ profile, bao gồm cả _id
          this.resetErrors();
        }
      },
      immediate: true,
    },
  },

  methods: {
    resetErrors() {
      this.formErrors = {
        name: "",
        email: "",
        phone: "",
      };
      this.errorMessage = "";
    },
    validateForm() {
      let isValid = true;
      this.resetErrors();

      // Kiểm tra tên (chỉ chữ cái và khoảng trắng, 3-50 ký tự)
      if (!this.editableProfile.name) {
        this.formErrors.name = "Vui lòng nhập họ tên";
        isValid = false;
      } else if (!/^[A-Za-z\s]+$/.test(this.editableProfile.name)) {
        this.formErrors.name = "Tên chỉ được chứa chữ";
        isValid = false;
      } else if (
        this.editableProfile.name.length < 3 ||
        this.editableProfile.name.length > 50
      ) {
        this.formErrors.name = "Tên phải có 3-50 ký tự";
        isValid = false;
      }

      // Kiểm tra email
      if (!this.editableProfile.email) {
        this.formErrors.email = "Vui lòng nhập email";
        isValid = false;
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.editableProfile.email)
      ) {
        this.formErrors.email = "Email không hợp lệ";
        isValid = false;
      }

      // Kiểm tra số điện thoại (chỉ số, 10-11 số)
      if (!this.editableProfile.phone) {
        this.formErrors.phone = "Vui lòng nhập số điện thoại";
        isValid = false;
      } else if (!/^[0-9]+$/.test(this.editableProfile.phone)) {
        this.formErrors.phone = "Số điện thoại chỉ được chứa số";
        isValid = false;
      } else if (
        this.editableProfile.phone.length < 10 ||
        this.editableProfile.phone.length > 11
      ) {
        this.formErrors.phone = "Số điện thoại phải có 10-11 số";
        isValid = false;
      }

      return isValid;
    },

    async saveChanges() {
      if (!this.validateForm()) {
        this.errorMessage = "Vui lòng kiểm tra lại các trường bên dưới";
        return;
      }

      if (!this.editableProfile._id) {
        this.errorMessage = "Không thể cập nhật vì thiếu ID hồ sơ";
        return;
      }

      this.isSubmitting = true;
      try {
        const response = await fetch(
          `https://internshipproject-tienb2b.onrender.com/api/customers/${this.editableProfile._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.editableProfile), // Bao gồm cả _id
          }
        );

        const result = await response.json();

        if (!response.ok) {
          if (Array.isArray(result.errors)) {
            result.errors.forEach((error) => {
              this.formErrors[error.param] = error.msg;
            });
            this.errorMessage = "Vui lòng kiểm tra lại các trường bên dưới";
          } else {
            this.errorMessage =
              result.message || "Không thể cập nhật thông tin";
          }
          return;
        }

        // Emit the updated profile data to parent
        this.$emit("profile-updated", this.editableProfile);
        this.$emit("close");
      } catch (error) {
        this.errorMessage = "Đã xảy ra lỗi khi lưu. Vui lòng thử lại.";
        console.error("Error saving profile:", error);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
/* Giữ nguyên các styles hiện có và thêm: */

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
