export const maskTelephone = (event) => {
  const input = event.target;
  let valor = input.value;

  valor = valor.replace(/\D/g, "");

  if (valor.length > 2 && valor.length <= 6) {
    valor = "(" + valor.slice(0, 2) + ") " + valor.slice(2, 6);
  } else if (valor.length > 6) {
    valor =
      "(" +
      valor.slice(0, 2) +
      ") " +
      valor.slice(2, 7) +
      "-" +
      valor.slice(7, 11);
  }

  input.value = valor;
};

export const maskCEP = (event) => {
  const input = event.target;
  let valor = input.value;

  valor = valor.replace(/\D/g, "");

  if (valor.length > 5) {
    valor = valor.slice(0, 5) + "-" + valor.slice(5, 8); // Insere o "-" após o quinto dígito e limita a três dígitos após o "-"
  }

  input.value = valor;
};

export const maskCPF = (event) => {
  const input = event.target;
  let valor = input.value;

  valor = valor.replace(/\D/g, "");

  if (valor.length > 3 && valor.length <= 6) {
    valor = valor.slice(0, 3) + "." + valor.slice(3, 6);
  } else if (valor.length > 6 && valor.length <= 9) {
    valor =
      valor.slice(0, 3) + "." + valor.slice(3, 6) + "." + valor.slice(6, 9);
  } else if (valor.length > 9) {
    valor =
      valor.slice(0, 3) +
      "." +
      valor.slice(3, 6) +
      "." +
      valor.slice(6, 9) +
      "-" +
      valor.slice(9, 11);
  }

  input.value = valor;
};

export const maskCNPJ = (event) => {
  const input = event.target;
  let valor = input.value;

  valor = valor.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

  if (valor.length > 2 && valor.length <= 5) {
    valor = valor.slice(0, 2) + "." + valor.slice(2, 5);
  } else if (valor.length > 5 && valor.length <= 8) {
    valor =
      valor.slice(0, 2) + "." + valor.slice(2, 5) + "." + valor.slice(5, 8);
  } else if (valor.length > 8 && valor.length <= 12) {
    valor =
      valor.slice(0, 2) +
      "." +
      valor.slice(2, 5) +
      "." +
      valor.slice(5, 8) +
      "/" +
      valor.slice(8, 12);
  } else if (valor.length > 12) {
    valor =
      valor.slice(0, 2) +
      "." +
      valor.slice(2, 5) +
      "." +
      valor.slice(5, 8) +
      "/" +
      valor.slice(8, 12) +
      "-" +
      valor.slice(12, 14);
  }

  input.value = valor;
};
