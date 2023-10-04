import http from "./axios";

const logout = () => {
  http
    .post("/admins/logout")
    .then((res) => {
      console.log(res.data);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      location.reload();
    })
    .catch((err) => console.log(err));
};

export default logout;
