<template>
  <AppModal v-model="dialog">
    <Form @submit="editing ? save : add">
      <Field
        rules="required"
        :modelValue="forms.name"
        v-slot="{ errors }"
        name="Name"
      >
        <input
          type="text"
          v-model="forms.name"
          class="form-control my-2"
          placeholder="Name"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p></Field
      >
      <Field
        rules="required"
        :modelValue="forms.surname"
        v-slot="{ errors }"
        name="Surname"
      >
        <input
          type="text"
          v-model="forms.surname"
          class="form-control my-2"
          placeholder="Surname"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p></Field
      >
      <Field
        rules="required"
        :modelValue="forms.surname"
        v-slot="{ errors }"
        name="Age"
      >
        <input
          type="number"
          v-model="forms.age"
          class="form-control my-2"
          placeholder="Age"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p></Field
      >
      <Field
        rules="required"
        :modelValue="forms.is_diploma"
        v-slot="{ errors }"
        name="IsDiploma"
      >
        <select v-model="forms.is_diploma" class="form-control my-2">
          <option value="false">false</option>
          <option value="true">true</option>
        </select>
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p></Field
      >
      <Field
        rules="required"
        :modelValue="forms.address"
        v-slot="{ errors }"
        name="Address"
      >
        <input
          type="text"
          v-model="forms.address"
          class="form-control my-2"
          placeholder="Address"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p></Field
      >

      <button class="btn btn-warning my-2" type="submit" v-if="editing">
        Save
      </button>
      <button class="btn btn-warning my-2" type="submit" v-else>Create</button>
    </Form>
  </AppModal>
</template>

<script setup>
  import AppModal from "../ui/app-modal.vue";
  import { ref } from "vue";
  import { Form, Field, defineRule } from "vee-validate";
  import { required } from "@vee-validate/rules";

  defineRule("require", required);

  const forms = ref({
    name: "",
    surname: "",
    age: null,
    is_diploma: null,
    address: "",
  });

  const dialog = ref(false);
  const editing = ref(false);

  const openModal = (user, type) => {
    forms.value = { ...user };
    if (type == "create") {
      editing.value = false;
    } else if (type == "edit") {
      editing.value = true;
    }
    dialog.value = true;
  };

  const save = (e) => {
    e.preventDefault();
    $http
      .patch(`/users/update/${forms.value._id}`, forms.value)
      .then((res) => {
        console.log(res.data);
        Notification("User edited successfully", "slide", "success");
        setTimeout(() => {
          location.reload();
        }, 3000);
      })
      .catch((err) => console.log(err));
    dialog.value = false;
  };

  const add = (e) => {
    e.preventDefault();
    $http
      .post("/users/add", forms.value)
      .then((res) => {
        Notification("Product created successfully", "slide", "success");
        setTimeout(() => {
          location.reload();
        }, 3000);
        dialog.value = false;
      })
      .catch((err) => console.log(err));
  };

  defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
