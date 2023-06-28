const Client = require("../models/client");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { validateCNPJ, validateCPF, validateEmail } = require("./validations");

exports.form_add_client_view = asyncHandler(async (req, res, next) => {
  res.render("costumers/form_add_client", {
    title: "Adicionar cliente",
    session: req.session.loggedin,
    user_name: req.session.name_user,
  });
});

exports.client_create_post = [
  body([
    "name",
    "email",
    "telephone",
    "cpf_cnpj",
    "cpf_cnpj",
    "address",
    "cep",
    "neighborhood",
    "city",
    "state",
  ])
    .trim()
    .notEmpty()
    .withMessage("Todos os campos são obrigatórios!")
    .customSanitizer((value) => {
      return value.replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        ""
      );
    }),

  asyncHandler(async (req, res, next) => {
    const data = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        notification: true,
        type_style: "warning",
        title_notification: "Atenção",
        body_notification: "Todos os campos são obrigatórios!",
      });
    }

    if (!validateEmail(data.email)) {
      return res.status(200).json({
        notification: true,
        type_style: "warning",
        title_notification: "Atenção",
        body_notification: "O email não é valido!",
      });
    }

    const cpfCnpj = data.cpf_cnpj.replace(/\D/g, "");

    if (data.cpf_cnpj.includes("/") && !validateCNPJ(cpfCnpj)) {
      return res.status(200).json({
        notification: true,
        type_style: "warning",
        title_notification: "Atenção",
        body_notification: "O CNPJ não é valido!",
      });
    } else if (!validateCPF(cpfCnpj)) {
      return res.status(200).json({
        notification: true,
        type_style: "warning",
        title_notification: "Atenção",
        body_notification: "O CPF não é valido!",
      });
    }

    // if (!validateCNPJ(cpfCnpj) && !validateCPF(cpfCnpj)) {
    //   res.status(200).json({
    //     notification: true,
    //     type_style: "warning",
    //     title_notification: "Atenção",
    //     body_notification: "O cpf ou cnpj não é valido!",
    //   });
    // }

    if (await checkClientExists(data.cpf_cnpj)) {
      return res.status(200).json({
        notification: true,
        type_style: "warning",
        title_notification: "Atenção",
        body_notification:
          '<span style="font-size: 13px" >Já existe cliente com esse cpf ou cnpj!</span>',
      });
    }

    await Client.bulkCreate([
      {
        ...data,
        // Fazer a parte da sessão para pegar o id do usuario logado, e a tela de login, pegar o codigo da sessão ja criado la no outro codigo, e colocar o codigo em APP.JS
        createdBy: req.session.id_user,
      },
    ]);

    return res.status(200).json({
      notification: true,
      type_style: "success",
      title_notification: "Sucesso",
      body_notification: "Cliente adicionado com sucesso",
    });
  }),
];

exports.list_costumers = asyncHandler(async (req, res, next) => {
  const allCustomers = await Client.findAll({
    order: [["createdAt", "DESC"]],
  });

  res.render("costumers/list_costumers", {
    list_customers: allCustomers,
    title: "Clientes",
    session: req.session.loggedin,
    user_name: req.session.name_user,
  });
});

const checkClientExists = async (cpfCnpj) => {
  try {
    const client = await Client.findOne({
      where: {
        cpf_cnpj: cpfCnpj,
      },
    });

    if (client && client.dataValues.id) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};
