<template>
  <div class="app-layout">
    <Sidebar :collapsed="collapsed" @toggle="toggleCollapsed" />
    <div
      :class="[
        'app-layout__main',
        { 'app-layout__main--collapsed': collapsed },
      ]"
    >
      <Header :collapsed="collapsed" />
      <main class="app-layout__content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";

export default {
  name: "AppLayout",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

