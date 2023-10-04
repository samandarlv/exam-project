export default {
  path: "/admin",
  name: "admin",
  component: () => import("@/views/admin/Admin"),
  children: [
    {
      path: "/products",
      name: "products",
      component: () => import("@/views/admin/Products"),
    },
  ],
};
