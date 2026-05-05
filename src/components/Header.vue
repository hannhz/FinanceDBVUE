<template>
  <header :class="['header', { 'header--collapsed': collapsed }]">
    <!-- Search -->
    <div class="header__search">
      <Search class="header__search-icon" :size="20" />
      <input
        type="text"
        class="header__search-input"
        placeholder="Cari transaksi, invoice, laporan..."
      />
    </div>

    <!-- Actions -->
    <div class="header__actions">
      <button class="header__action-btn" title="Notifikasi">
        <Bell :size="20" />
        <span class="header__badge">3</span>
      </button>

      <div class="header__profile">
        <div class="header__profile-avatar">AD</div>
        <span class="header__profile-name">Admin SAE</span>
        <ChevronDown :size="16" style="color: var(--color-text-muted)" />
      </div>
    </div>
  </header>
</template>

<script>
import { Search, Bell, ChevronDown } from "lucide-vue-next";

export default {
  name: "Header",
  props: {
    collapsed: Boolean,
  },
  components: {
    Search,
    Bell,
    ChevronDown,
  },
};
</script>
