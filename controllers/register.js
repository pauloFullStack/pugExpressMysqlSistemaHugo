const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { validateCNPJ, validateCPF, validateEmail } = require("./validations");

exports.user_create_post = [
  body(["name", "email", "password"])
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
    await User.create(data);

    return res.status(200).json({
      notification: true,
      type_style: "success",
      title_notification: "Sucesso",
      body_notification: "Cliente adicionado com sucesso",
    });
  }),
];
