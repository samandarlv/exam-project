<template>
  <div class="mx-2">
    <create_product ref="createProduct" />
    <delete_product ref="deleteProduct" />
    <h1>Products</h1>
    <button class="btn btn-success" @click="openCreateModal">
      Add new Product
    </button>
    <div class="col-12 my-5">
      <div class="row">
        <div class="col-4" v-for="(item, index) in products" :key="index">
          <div class="card">
            <div class="card-header">
              <h3>{{ item.name }}</h3>
            </div>
            <div class="card-body">
              <h6 class="d-flex justify-content-between">
                Brand: <span>{{ item.brand }}</span>
              </h6>
              <h6 class="d-flex justify-content-between">
                Type: <span>{{ item.group }}</span>
              </h6>
              <h6 class="d-flex justify-content-between">
                Price: <span>{{ item.price }} $</span>
              </h6>
              <h6 class="d-flex justify-content-between">
                Arrival price: <span>{{ item.arrival_price }} $</span>
              </h6>
              <h6 class="d-flex justify-content-between">
                Selling price: <span>{{ item.selling_price }} $</span>
              </h6>
              <h6 class="d-flex justify-content-between">
                Description: <span>{{ item.description }}</span>
              </h6>
              <div class="card-footer d-flex justify-content-between">
                <button class="btn btn-warning" @click="edit(item)">
                  Edit
                </button>
                <button
                  class="btn btn-danger mx-2"
                  @click="delete_one_product(item)"
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
  import create_product from "../../components/pages/create_product.vue";
  import delete_product from "../../components/pages/delete_product.vue";

  const createProduct = ref();
  const deleteProduct = ref();

  let products = ref(null);
  const getAllProducts = () => {
    $http
      .get("/products")
      .then((res) => {
        products.value = res.data.products;
        console.log(products.value);
      })
      .catch((err) => console.log(err));
  };
  getAllProducts();

  const openCreateModal = () => {
    createProduct.value.openModal({}, "create");
  };

  const edit = (product) => {
    createProduct.value.openModal(product, "edit");
  };

  const delete_one_product = (product) => {
    deleteProduct.value.openModal(product._id);
  };
</script>

<style lang="scss" scoped></style>
