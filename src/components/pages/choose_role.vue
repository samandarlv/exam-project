<template>
  <AppModal v-model="dialog">
    <h1>Select role:</h1>
    <select class="form-control" v-model="role">
      <option v-for="(item, index) in roles" :key="index" :value="item">
        {{ item }}
      </option>
    </select>
    <button class="btn btn-success my-2" @click="next(role)">continue</button>
    <button class="btn btn-danger my-2 mx-2" @click="closeModal">cancel</button>
  </AppModal>
</template>

<script setup>
  import AppModal from "../ui/app-modal.vue";
  import $http from "@/components/plugins/axios";
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();

  const role = ref("");

  const dialog = ref(false);

  let roles = null;

  const openModal = (role) => {
    roles = role;
    dialog.value = true;
  };

  const next = (role) => {
    $http
      .post("/admins/set-role", {
        role: role,
      })
      .then((res) => {
        localStorage.setItem("role", role);
        router.push({ name: role });
      })
      .catch((err) => console.log(err));
  };

  const closeModal = () => {
    dialog.value = false;
  };

  defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
