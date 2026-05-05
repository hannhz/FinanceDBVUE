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
          <label class="login-form__remember">
            <input type="checkbox" /> Ingat Saya
          </label>
          <a href="#" class="login-form__forgot">Lupa Kata Sandi?</a>
        </div>

        <button type="submit" class="login-form__submit">Masuk</button>
      </form>

      <div class="login-card__footer">Â© 2026 CV. Sejahtera Abadi Ekatama</div>
    </div>
  </div>
</template>

<script>
import { Mail, Lock, Eye, EyeOff } from "vue-feather-icons";

export default {
  name: "Login",
  components: { Mail, Lock, Eye, EyeOff },
  data() {
    return {
      showPassword: false,
      email: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      // Mock auth â€” nanti diganti dengan API Laravel
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* Sertakan ulang CSS login jika diperlukan, atau import dari styles/login.css */
.password-toggle {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  padding: 0;
  display: flex;
}
</style>

