<template>
  <div class="sidebar">
    <router-link
      class="router_link"
      active-class="router_link_active"
      :to="{ name: item.path }"
      v-for="(item, index) in props.sidebar_value"
      >{{ item.title }}</router-link
    >
  </div>
</template>

<script setup>
  const props = defineProps({
    sidebar_value: {
      type: Array,
    },
  });
</script>

<style lang="scss" scoped>
  .sidebar {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
  }
  .router_link {
    font-size: 20px;
    width: 90%;
    color: black;
    margin: 10px;
    padding: 15px;
    text-decoration: none;
    background-color: white;
    border-radius: 5px;
  }
</style>
