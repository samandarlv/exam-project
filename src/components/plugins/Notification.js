import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const notification = (text, transition, type) => {
  createToast(text, {
    hideProgressBar: "true",
    showIcon: "true",
    position: "top-right",
    transition,
    type,
  });
};

export default notification;
