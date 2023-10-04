<template>
  <AppModal v-model="dialog">
    <h1>Are you sure?</h1>
    <button class="btn btn-success my-2" @click="yes">Yes</button>
    <button class="btn btn-danger mx-5" @click="no">No</button>
  </AppModal>
</template>
<script setup>
  import { ref } from "vue";
  import AppModal from "../ui/app-modal.vue";
  import $http from "@/components/plugins/axios";
  import Notification from "../plugins/Notification";

  const dialog = ref(false);

  let new_id = ref("");

  const openModal = (id) => {
    new_id.value = id;
    dialog.value = true;
  };

  const yes = () => {
    $http
      .delete(`/users/${new_id.value}`)
      .then((res) => {
        Notification("Product deleted successfully", "slide", "success");
        setTimeout(() => {
          location.reload();
        }, 3000);
        dialog.value = false;
      })
      .catch((err) => console.log(err));
  };

  const no = () => {
    dialog.value = false;
  };

  defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
