<template>
  <AppModal v-model="dialog">
    <Form @submit="create">
      <Field
        rules="required"
        :modelValue="form.name"
        v-slot="{ errors }"
        name="Name"
      >
        <input
          type="text"
          class="form-control my-2"
          placeholder="Name"
          v-model="form.name"
        />
      </Field>
      <Field
        rules="required"
        :modelValue="form.brand"
        v-slot="{ errors }"
        name="Brand"
      >
        <input
          type="text"
          class="form-control my-2"
          placeholder="Brand"
          v-model="form.brand"
        />
      </Field>
      <Field
        rules="required"
        :modelValue="form.group"
        v-slot="{ errors }"
        name="Group"
      >
        <input
          type="text"
          class="form-control my-2"
          placeholder="Group"
          v-model="form.group"
        />
      </Field>
      <Field
        rules="required"
        :modelValue="form.price"
        v-slot="{ errors }"
        name="Price"
      >
        <input
          type="number"
          class="form-control my-2"
          placeholder="Price"
          v-model="form.price"
        />
      </Field>
      <Field
        rules="required"
        :modelValue="form.arrival_price"
        v-slot="{ errors }"
        name="ArrivialPrice"
      >
        <input
          type="number"
          class="form-control my-2"
          placeholder="Arrivial price"
          v-model="form.arrival_price"
        />
      </Field>
      <Field
        rules="required"
        :modelValue="form.selling_price"
        v-slot="{ errors }"
        name="SellingPrice"
      >
        <input
          type="number"
          class="form-control my-2"
          placeholder="Selling price"
          v-model="form.selling_price"
        />
      </Field>
      <Field
        rules="required"
        :modelValue="form.description"
        v-slot="{ errors }"
        name="Desciprion"
      >
        <input
          type="text"
          class="form-control my-2"
          placeholder="Desciprion"
          v-model="form.description"
        />
      </Field>
      <button
        class="btn btn-dark form-control"
        type="submit"
        v-if="editing"
        @click="save"
      >
        Save
      </button>
      <button class="btn btn-dark form-control" v-else @click="add">Add</button>
    </Form>
  </AppModal>
</template>

<script setup>
  import AppModal from "../ui/app-modal.vue";
  import { Field, Form, defineRule } from "vee-validate";
  import $http from "@/components/plugins/axios";
  import { ref } from "vue";
  import Notification from "../plugins/Notification";

  import { required } from "@vee-validate/rules";
  defineRule("required", required);

  const editing = ref(false);

  const form = ref({
    name: "",
    brand: "",
    group: "",
    price: null,
    arrival_price: null,
    selling_price: null,
    description: "",
  });
  const dialog = ref(false);

  const openModal = (product, type) => {
    form.value = { ...product };
    if (type == "edit") {
      editing.value = true;
    } else if (type == "create") {
      editing.value = false;
    }
    dialog.value = true;
  };

  const save = (e) => {
    $http
      .patch(`/products/update/${form.value._id}`, form.value)
      .then((res) => {
        console.log(res.data);
        Notification("Product edited successfully", "slide", "success");
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
      .post("/products/add", form.value)
      .then((res) => {
        Notification("Product created successfully", "slide", "success");
        setTimeout(() => {
          location.reload();
        }, 3000);
      })
      .catch((err) => console.log(err));
    dialog.value = false;
  };

  defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
