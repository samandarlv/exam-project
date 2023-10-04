export default {
  path: "/superadmin",
  name: "superadmin",
  component: () => import("@/views/superadmin/Superadmin"),
  children: [
    {
      path: "/users",
      name: "users",
      component: () => import("@/views/superadmin/Users"),
    },
  ],
};
