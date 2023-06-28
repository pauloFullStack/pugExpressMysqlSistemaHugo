import { toastNotification } from "./toastNotification";

export const apiPost = async (route, data) => {
  const obj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${getUrlCurrent().href}${route}`, obj);
    const dataResponse = await response.json();
    console.log(dataResponse)
    if (dataResponse.notification) {
      toastNotification(
        dataResponse.type_style,
        dataResponse.title_notification,
        dataResponse.body_notification
      );
      if (dataResponse.type_style === "success") {
        clearInputs();
      }
    }

    if (dataResponse.redirect) {
      window.location.href = `${getUrlCurrent().href}${dataResponse.redirect}`;
    }
  } catch (error) {
    console.error("Error Post", error);
  }
};

export const apiGet = async (route) => {
  try {
    const response = await fetch(`${getUrlCurrent().href}${route}`);
    const dataResponse = await response.json();
    
    if (dataResponse.redirect) {
      window.location.href = `${getUrlCurrent().href}${dataResponse.redirect}`;
    }
  } catch (error) {
    console.error("Error Post", error);
  }
};

// Limpa formularios
function clearInputs() {
  const inputs = document.querySelectorAll(
    'input[type="text"], input[type="email"], input[type="password"], textarea, select'
  );

  inputs.forEach((input) => {
    input.value = "";
  });
}

// Cria url atual
const getUrlCurrent = () =>
  new URL(
    `${window.location.protocol}//${window.location.hostname}${
      window.location.port ? ":" + window.location.port : ""
    }`
  );
