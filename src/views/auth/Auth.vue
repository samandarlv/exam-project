<template>
  <choose_role ref="chooseRole" />
  <div class="container">
    <div class="row">
      <div class="col-6 offset-3">
        <div class="card">
          <div class="card-header text-center">
            <h1>Login</h1>
          </div>
          <div class="card-body">
            <Form @submit="check">
              <Field
                rules="required"
                :modelValue="user.username"
                v-slot="{ errors }"
                name="Username"
              >
                <input
                  type="text"
                  placeholder="Username"
                  class="form-control my-2"
                  v-model="user.username"
                />
                <p class="text-danger mx-1" v-if="errors && errors.length">
                  {{ errors[0] }}
                </p>
              </Field>
              <Field
                rules="required"
                :modelValue="user.password"
                v-slot="{ errors }"
                name="Password"
              >
                <input
                  type="password"
                  placeholder="Password"
                  class="form-control my-2"
                  v-model="user.password"
                />
                <p class="text-danger mx-1" v-if="errors && errors.length">
                  {{ errors[0] }}
                </p>
              </Field>

              <div class="card-footer">
                <button class="btn btn-success form-control my-2" type="submit">
                  Sigin
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import $http from "@/components/plugins/axios";
  import choose_role from "@/components/pages/choose_role";

  import { Field, Form, defineRule } from "vee-validate";
  import { required } from "@vee-validate/rules";
  defineRule("required", required);

  const chooseRole = ref();

  const router = useRouter();
  const user = ref({ username: "", password: "" });

  const check = () => {
    $http
      .post("/admins/login", {
        username: user.value.username,
        password: user.value.password,
      })
      .then((res) => {
        const data = res.data;
        if (data.token) {
          localStorage.setItem("token", data.token);
          chooseRole.value.openModal(data.roles);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
</script>

<style lang="scss" scoped>
  .container {
    margin-top: 100px;
  }
</style>
