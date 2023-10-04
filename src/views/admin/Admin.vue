<template>
  <section class="sidebar">
    <div class="sidebar_left">
      <Sidebar :sidebar_value="sidebar_value" />
    </div>
    <div class="sidebar_right">
      <router-view></router-view>
    </div>
  </section>
</template>

<script setup>
  import Sidebar from "../../components/layouts/Sidebar.vue";
  import { ref } from "vue";

  const sidebar_value = ref([{ title: "Products", path: "products" }]);
</script>

<style lang="scss" scoped>
  .sidebar {
    display: flex;
    // height: 100vh;
  }
  .sidebar_left {
    width: 300px;
    text-align: center;
    background-color: rgb(11, 7, 85);
  }
  .sidebar_right {
    width: calc(100% - 300px);
    height: 100vh;
    overflow: auto;
  }
</style>
