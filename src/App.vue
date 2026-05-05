<template>
  <div class="app">
    <Sidebar
      :collapsed="sidebarCollapsed"
      @toggle="sidebarCollapsed = !sidebarCollapsed"
    />
    <div class="main-content">
      <Header :collapsed="sidebarCollapsed" />
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";

export default {
  components: { Sidebar, Header },
  data() {
    return {
      sidebarCollapsed: false,
    };
  },
};
</script>
