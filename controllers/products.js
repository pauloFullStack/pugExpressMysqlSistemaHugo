const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.form_add_product = asyncHandler(async (req, res, next) => {
  res.render("products/form_add_product", {
    title: "Adicionar produto",
    session: req.session.loggedin,
    user_name: req.session.name_user,
  });
});

exports.list_products = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.findAll({
    order: [["createdAt", "DESC"]],
  });

  res.render("products/list_products", {
    list_products: allProducts,
    title: "Produtos",
    session: req.session.loggedin,
    user_name: req.session.name_user,
  });
});


exports.products_create_post = [
  body([
    "name",
    "description",
    "value_product",
    "quantity",
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


   
    await Product.bulkCreate([
      {
        ...data,
        createdBy: req.session.id_user,
      },
    ]);

    return res.status(200).json({
      notification: true,
      type_style: "success",
      title_notification: "Sucesso",
      body_notification: "Produto adicionado com sucesso!",
    });
  }),
];
