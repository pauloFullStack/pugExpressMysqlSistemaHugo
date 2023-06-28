const validateEmail = (email) => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
};

const validateCPF = (cpf) => {
  // Remove caracteres não numéricos do CPF
  cpf = cpf.replace(/\D/g, "");

  // Verifica se o CPF possui 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let primeiroDigito = 11 - (soma % 11);
  if (primeiroDigito > 9) {
    primeiroDigito = 0;
  }

  // Verifica se o primeiro dígito verificador é válido
  if (parseInt(cpf.charAt(9)) !== primeiroDigito) {
    return false;
  }

  // Calcula o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let segundoDigito = 11 - (soma % 11);
  if (segundoDigito > 9) {
    segundoDigito = 0;
  }

  // Verifica se o segundo dígito verificador é válido
  if (parseInt(cpf.charAt(10)) !== segundoDigito) {
    return false;
  }

  return true;
};

const validateCNPJ = (cnpj) => {
  // Remove caracteres não numéricos do CNPJ
  cnpj = cnpj.replace(/\D/g, "");

  // Verifica se o CNPJ possui 14 dígitos
  if (cnpj.length !== 14) {
    return false;
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(cnpj)) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;
  let peso = 2;
  for (let i = 11; i >= 0; i--) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }
  let primeiroDigito = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  // Verifica se o primeiro dígito verificador é válido
  if (parseInt(cnpj.charAt(12)) !== primeiroDigito) {
    return false;
  }

  // Calcula o segundo dígito verificador
  soma = 0;
  peso = 2;
  for (let i = 12; i >= 0; i--) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }
  let segundoDigito = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  // Verifica se o segundo dígito verificador é válido
  if (parseInt(cnpj.charAt(13)) !== segundoDigito) {
    return false;
  }

  return true;
};

module.exports = {
  validateEmail,
  validateCPF,
  validateCNPJ,
};
