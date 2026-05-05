<template>
  <aside :class="['sidebar', { 'sidebar--collapsed': collapsed }]">
    <!-- Brand -->
    <div class="sidebar__brand">
      <div class="sidebar__logo">SAE</div>
      <div class="sidebar__brand-info">
        <div class="sidebar__brand-name">SAE Finance</div>
        <div class="sidebar__brand-sub">Sejahtera Abadi Ekatama</div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="sidebar__nav">
      <div class="sidebar__section-label">Menu Utama</div>
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="sidebar__nav-item"
        :class="{ 'sidebar__nav-item--active': isActive(item) }"
      >
        <component :is="item.icon" class="sidebar__nav-icon" :size="20" />
        <span class="sidebar__nav-label">{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- Footer -->
    <div class="sidebar__footer">
      <div class="sidebar__avatar">AD</div>
      <div class="sidebar__user-info">
        <div class="sidebar__user-name">Admin SAE</div>
        <div class="sidebar__user-role">Administrator</div>
      </div>
      <button
        class="sidebar__toggle"
        @click="$emit('toggle')"
        :title="collapsed ? 'Perluas' : 'Perkecil'"
      >
        <component :is="collapsed ? ChevronsRight : ChevronsLeft" :size="18" />
      </button>
    </div>
  </aside>
</template>

<script>
import {
  LayoutDashboard,
  ArrowLeftRight,
  FileText,
  ShoppingCart,
  BarChart3,
  Settings,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-vue-next";

export default {
  name: "Sidebar",
  props: {
    collapsed: Boolean,
  },
  data() {
    return {
      navItems: [
        { path: "/", label: "Dashboard", icon: LayoutDashboard },
        { path: "/transaksi", label: "Transaksi", icon: ArrowLeftRight },
        { path: "/invoice", label: "Invoice", icon: FileText },
        { path: "/pengeluaran", label: "Pengeluaran", icon: ShoppingCart },
        { path: "/laporan", label: "Laporan", icon: BarChart3 },
        { path: "/pengaturan", label: "Pengaturan", icon: Settings },
      ],
      ChevronsLeft,
      ChevronsRight,
    };
  },
  methods: {
    isActive(item) {
      const currentPath = this.$route.path;
      if (item.path === "/") {
        return currentPath === "/";
      }
      return currentPath.startsWith(item.path);
    },
  },
};
</script>
