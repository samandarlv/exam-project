<template>
  <div class="mx-2">
    <create_userVue ref="createUser" />
    <Delete_user ref="deleteUser" />
    <h1>Users</h1>
    <button class="btn btn-success" @click="openCreateModal">
      Add a new User
    </button>
    <button class="btn btn-danger mx-5" @click="logout">Logout</button>
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
                <button class="btn btn-warning" @click="edit(item)">
                  Edit
                </button>
                <button
                  class="btn btn-danger mx-2"
                  @click="delete_one_user(item._id)"
                >
                  Delete
                </button>
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
  import create_userVue from "../../components/pages/create_user.vue";
  import Delete_user from "../../components/pages/delete_user.vue";
  import logout from "../../components/plugins/logout";
  const createUser = ref();
  const deleteUser = ref();

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

  const openCreateModal = () => {
    createUser.value.openModal({}, "create");
  };

  const edit = (user) => {
    createUser.value.openModal(user, "edit");
  };

  const delete_one_user = (id) => {
    deleteUser.value.openModal(id);
  };
</script>

<style lang="scss" scoped></style>
