<template>
  <div class="edit-customer-page">
    <div class="page-header">
      <h2>
        <i class="fas fa-user-edit"></i>
        Chỉnh sửa thông tin khách hàng
      </h2>
      <button class="back-btn" @click="$router.push('/customers')">
        <i class="fas fa-arrow-left"></i> Quay lại
      </button>
    </div>

    <div v-if="isLoading" class="loading">
      Đang tải thông tin khách hàng...
    </div>

    <div v-else-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <div v-else class="edit-form-container">
      <form @submit.prevent="saveChanges" class="edit-form">
        <div class="form-group">
          <label for="name">Họ tên:</label>
          <input
            id="name"
            v-model="customerData.name"
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
            v-model="customerData.email"
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
            v-model="customerData.phone"
            type="tel"
            placeholder="Nhập số điện thoại"
            required
            :class="{ error: formErrors.phone }"
          />
          <span class="error-message" v-if="formErrors.phone">{{
            formErrors.phone
          }}</span>
        </div>

        <div v-if="submitError" class="error-message general-error">
          {{ submitError }}
        </div>

        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-cancel" @click="$router.push('/customers')">
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
  props: {
    customerId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      customerData: {
        name: "",
        email: "",
        phone: ""
      },
      isLoading: false,
      isSubmitting: false,
      errorMessage: "",
      submitError: "",
      successMessage: "",
      formErrors: {
        name: "",
        email: "",
        phone: ""
      }
    };
  },
  mounted() {
    this.fetchCustomerData();
  },
  methods: {
    async fetchCustomerData() {
      this.isLoading = true;
      this.errorMessage = "";

      try {
        const response = await fetch(
          `https://internshipproject-tienb2b.onrender.com/api/customers/${this.customerId}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        this.customerData = {
          _id: data._id,
          name: data.name,
          email: data.email,
          phone: data.phone
        };
      } catch (error) {
        this.errorMessage = "Không thể tải thông tin khách hàng. Vui lòng thử lại sau.";
        console.error("Error fetching customer:", error);
      } finally {
        this.isLoading = false;
      }
    },

    resetErrors() {
      this.formErrors = {
        name: "",
        email: "",
        phone: ""
      };
      this.submitError = "";
    },

    validateForm() {
      let isValid = true;
      this.resetErrors();

      // Kiểm tra tên (chỉ chữ cái và khoảng trắng, 3-50 ký tự)
      if (!this.customerData.name) {
        this.formErrors.name = "Vui lòng nhập họ tên";
        isValid = false;
      } else if (this.customerData.name.length < 3 || this.customerData.name.length > 50) {
        this.formErrors.name = "Tên phải có 3-50 ký tự";
        isValid = false;
      }

      // Kiểm tra email
      if (!this.customerData.email) {
        this.formErrors.email = "Vui lòng nhập email";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.customerData.email)) {
        this.formErrors.email = "Email không hợp lệ";
        isValid = false;
      }

      // Kiểm tra số điện thoại (chỉ số, 10-11 số)
      if (!this.customerData.phone) {
        this.formErrors.phone = "Vui lòng nhập số điện thoại";
        isValid = false;
      } else if (!/^[0-9]+$/.test(this.customerData.phone)) {
        this.formErrors.phone = "Số điện thoại chỉ được chứa số";
        isValid = false;
      } else if (this.customerData.phone.length < 10 || this.customerData.phone.length > 11) {
        this.formErrors.phone = "Số điện thoại phải có 10-11 số";
        isValid = false;
      }

      return isValid;
    },

    async saveChanges() {
      if (!this.validateForm()) {
        this.submitError = "Vui lòng kiểm tra lại các trường bên dưới";
        return;
      }

      this.isSubmitting = true;
      this.submitError = "";
      this.successMessage = "";
      
      try {
        const response = await fetch(
          `https://internshipproject-tienb2b.onrender.com/api/customers/${this.customerId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.customerData)
          }
        );

        const result = await response.json();

        if (!response.ok) {
          if (Array.isArray(result.errors)) {
            result.errors.forEach(error => {
              this.formErrors[error.param] = error.msg;
            });
            this.submitError = "Vui lòng kiểm tra lại các trường bên dưới";
          } else {
            this.submitError = result.message || "Không thể cập nhật thông tin";
          }
          return;
        }

        this.successMessage = "Cập nhật thông tin khách hàng thành công!";
        
        // Lưu thông tin đã cập nhật vào localStorage
        localStorage.setItem('updatedProfile', JSON.stringify(this.customerData));
        
        // Tự động chuyển hướng sau 2 giây
        setTimeout(() => {
          this.$router.push('/customers');
        }, 2000);
      } catch (error) {
        this.submitError = "Đã xảy ra lỗi khi lưu. Vui lòng thử lại.";
        console.error("Error updating customer:", error);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>

<style scoped>
.edit-customer-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: "Inter", Arial, sans-serif;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e2e8f0;
}

.page-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #4f46e5;
  display: flex;
  align-items: center;
  gap: 10px;
}

.back-btn {
  background: #64748b;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.back-btn:hover {
  background: #475569;
  transform: translateY(-2px);
}

.loading, 
.error-message {
  text-align: center;
  padding: 40px 0;
  font-size: 1.1rem;
}

.loading {
  color: #64748b;
}

.error-message {
  color: #dc2626;
}

.edit-form-container {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 30px;
  border: 1px solid #e2e8f0;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 500;
  color: #334155;
}

.form-group input {
  padding: 12px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
}

.form-group input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  outline: none;
}

.form-group input.error {
  border-color: #dc2626;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 4px;
}

.general-error {
  background-color: #fee2e2;
  border: 1px solid #dc2626;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
}

.success-message {
  background-color: #dcfce7;
  border: 1px solid #10b981;
  color: #065f46;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 10px;
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-cancel {
  background: #e2e8f0;
  color: #334155;
}

.btn-cancel:hover {
  background: #cbd5e1;
}

.btn-confirm {
  background: #4f46e5;
  color: #fff;
}

.btn-confirm:hover {
  background: #4338ca;
  transform: translateY(-2px);
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 640px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .back-btn {
    align-self: flex-start;
  }
  
  .edit-form-container {
    padding: 20px;
  }
}
</style> 