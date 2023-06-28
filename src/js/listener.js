import { maskCEP, maskCNPJ, maskCPF, maskTelephone } from "./masks";
import { apiPost } from "./apis";

export const listenerInputs = document.addEventListener("input", (event) => {
  const elemento = event.target;
  if (elemento.tagName === "INPUT") {
    if (elemento.getAttribute("id") == "telephone") {
      maskTelephone(event);
    } else if (elemento.getAttribute("id") == "cep") {
      maskCEP(event);
    } else if (elemento.getAttribute("id") == "cpf") {
      maskCPF(event);
    } else if (elemento.getAttribute("id") == "cnpj") {
      maskCNPJ(event);
    }
  }
});

export const listenerClicks = document.addEventListener("click", (event) => {
  // verifica requesições post
  if (
    event.target.getAttribute("type-method") === "post" &&
    typeof event.target.getAttribute("type-method") === "string"
  ) {
    const form = document.querySelector("#form");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    apiPost(event.target.getAttribute("endpoint"), data);
  }

  // redireciona
  if (
    event.target.getAttribute("redirect") === "redirect" &&
    typeof event.target.getAttribute("redirect") === "string"
  ) {
    redirectPage(event.target.getAttribute("route"));
  }

  // Alterna cpf para cnpj
  if (event.target.matches("small")) {
    if (event.target.getAttribute("value") == "cnpj") {
      alterLabelCnpjCpf("cnpj", "cpf");
    } else if (event.target.getAttribute("value") == "cpf") {
      alterLabelCnpjCpf("cpf", "cnpj");
    }
  }
});

export const listenerKeydown = document.addEventListener("keydown", (event) => {
  // Verifica se a tecla pressionada é a tecla Enter
  if (event.keyCode === 13 && document.getElementById("btn-login")) {
    event.preventDefault();
    document.getElementById("btn-login").click();
  }
});


const redirectPage = (endpoint) => {
  const protocolo = window.location.protocol;
  const host = window.location.host;
  window.location.href = `${protocolo}//${host}/${endpoint}`;
};

const alterLabelCnpjCpf = (labelPrincipal, labelSmall) => {
  document.querySelector("#label-principal").textContent =
    labelPrincipal.toUpperCase();
  document.querySelector("#label-small").textContent = labelSmall.toUpperCase();
  document.querySelector(`#${labelSmall}`).value = "";
  document.querySelector(`#${labelSmall}`).id = labelPrincipal;
  document
    .querySelector(`#${labelPrincipal}`)
    .setAttribute("placeholder", labelPrincipal.toUpperCase());
  event.target.setAttribute("value", labelSmall);
};
