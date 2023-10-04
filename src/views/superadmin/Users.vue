<template>
  <div class="mx-2">
    <h1>Users</h1>
    <div class="col-12 my-5">
      <div class="row">
        <div class="col-4" v-for="(item, index) in users" :key="index">
          <div class="card">
            <div class="card-header">
              <h3>{{ item.name }}</h3>
            </div>
            <div class="card-body">
              <h6 class="d-flex justify-content-between">
                Name: <span>{{ item.name }}</span>
              </h6>
              <h6 class="d-flex justify-content-between">
                Surname: <span>{{ item.surname }}</span>
              </h6>
              <h6 class="d-flex justify-content-between">
                Age: <span>{{ item.age }}</span>
              </h6>
              <h6 class="d-flex justify-content-between">
                Address: <span>{{ item.address }}</span>
              </h6>
              <div class="card-footer d-flex justify-content-between">
                <button class="btn btn-warning">Edit</button>
                <button class="btn btn-danger mx-2">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import $http from "../../components/plugins/axios";

  let users = ref(null);

  const getAllUsers = () => {
    $http
      .get("/users")
      .then((res) => {
        users.value = res.data.users;
      })
      .catch((err) => console.log(err));
  };
  getAllUsers();
</script>

<style lang="scss" scoped></style>
