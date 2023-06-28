import toast from "../../public/bootstrap/js/dist/toast";
// Acabar de criar a aparencia da notificação
export const toastNotification = (
  typeStyle,
  titleNotification,
  bodyNotification
) => {
  styleToast.forEach((item) => {
    if (item.type == typeStyle) {

      const toastElement = document.getElementById("myToast");

      document.querySelector("#toast-header").style = item.style_toast_header;
      const toastBody = document.querySelector("#toast-body");
      toastBody.style = item.style_toast_body;
      document.querySelector("#icon-notification").innerHTML =
        item.style_toast_body_icon;
      document.querySelector("#toast-title").textContent = titleNotification;
      document.querySelector("#toast-body-notification").innerHTML =
        bodyNotification;

      const myToast = new toast(toastElement);
      myToast.show();
    }
  });
};

const styleToast = [
  {
    type: "success",
    style_toast_header: "background: #008000;color:#fff",
    style_toast_body: "background: #fff;color:#008000",
    style_toast_body_icon:
      '<i style="font-size:18px" class="fas fa-check"></i>',
  },
  {
    type: "warning",
    style_toast_header: "background: #ffa500;color:#fff",
    style_toast_body: "background: #fff;color:#ffa500",
    style_toast_body_icon:
      '<i style="font-size:18px" class="fas fa-exclamation-circle"></i>',
  },
  {
    type: "error",
    style_toast_header: "background: #ff0000;color:#fff",
    style_toast_body: "background: #fff;color:#ff0000",
    style_toast_body_icon:
      '<i style="font-size:18px" class="fas fa-times-circle"></i>',
  },
];
