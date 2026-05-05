<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-card__brand">
        <div class="login-card__logo">SAE</div>
        <h1 class="login-card__title">Selamat Datang</h1>
        <p class="login-card__subtitle">Masuk ke Dashboard Keuangan SAE</p>
      </div>

      <form class="login-form" @submit.prevent="handleSubmit">
        <div class="login-form__group">
          <label class="login-form__label">Alamat Email</label>
          <div class="login-form__input-wrap">
            <Mail class="login-form__input-icon" />
            <input
              type="email"
              class="login-form__input"
              placeholder="admin@sae.co.id"
              v-model="email"
              required
            />
          </div>
        </div>

        <div class="login-form__group">
          <label class="login-form__label">Kata Sandi</label>
          <div class="login-form__input-wrap">
            <Lock class="login-form__input-icon" />
            <input
              :type="showPassword ? 'text' : 'password'"
              class="login-form__input"
              placeholder="Masukkan kata sandi"
              v-model="password"
              required
            />
            <button
              type="button"
              class="password-toggle"
              @click="showPassword = !showPassword"
            >
              <Eye v-if="!showPassword" :size="18" />
              <EyeOff v-else :size="18" />
            </button>
          </div>
        </div>

        <div class="login-form__options">
          <label class="login-form__remember"
            ><input type="checkbox" /> Ingat Saya</label
          >
          <a href="#" class="login-form__forgot">Lupa Kata Sandi?</a>
        </div>

        <button type="submit" class="login-form__submit">Masuk</button>
      </form>

      <div class="login-card__footer">© 2026 CV. Sejahtera Abadi Ekatama</div>
    </div>
  </div>
</template>

<script>
import { Mail, Lock, Eye, EyeOff } from "lucide-vue-next";

export default {
  name: "Login",
  components: { Mail, Lock, Eye, EyeOff },
  data() {
    return { showPassword: false, email: "", password: "" };
  },
  methods: {
    handleSubmit() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0fdfa 0%, #e6f7f5 100%);
  padding: 20px;
}
.login-card {
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 35px -8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 440px;
  padding: 40px 32px;
}
.login-card__brand {
  text-align: center;
  margin-bottom: 32px;
}
.login-card__logo {
  width: 56px;
  height: 56px;
  background: var(--color-primary);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  color: white;
  margin: 0 auto 20px;
}
.login-card__title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 6px;
  color: #1e293b;
}
.login-card__subtitle {
  color: var(--color-text-secondary);
  font-size: 14px;
}
.login-form__group {
  margin-bottom: 20px;
}
.login-form__label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--color-text-secondary);
}
.login-form__input-wrap {
  position: relative;
}
.login-form__input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  width: 18px;
}
.login-form__input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.2s;
}
.login-form__input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-50);
}
.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
}
.login-form__options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  font-size: 13px;
}
.login-form__remember {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-text-secondary);
}
.login-form__forgot {
  color: var(--color-primary);
  text-decoration: none;
}
.login-form__submit {
  width: 100%;
  padding: 12px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}
.login-form__submit:hover {
  background: #0d5c54;
}
.login-card__footer {
  text-align: center;
  margin-top: 32px;
  font-size: 12px;
  color: var(--color-text-muted);
}
</style>
