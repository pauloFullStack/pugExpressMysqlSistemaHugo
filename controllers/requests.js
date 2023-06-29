const Request = require("../models/request");
const Client = require("../models/client");
const Product = require("../models/product");
const RequestItem = require("../models/requestItem");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.form_add_request = asyncHandler(async (req, res, next) => {
  res.render("requests/form_add_request", {
    title: "Adicionar pedido",
    list_customers_select: await Client.findAll({
      order: [["createdAt", "DESC"]],
    }),
    list_products_select: await Product.findAll({
      order: [["createdAt", "DESC"]],
    }),
    session: req.session.loggedin,
    user_name: req.session.name_user,
  });
});

exports.requests_create_post = asyncHandler(async (req, res, next) => {
  const data = req.body;
  const {
    id_client,
    form_of_payment,
    delivery_date,
    comments,
    total_products,
    value_request,
  } = data;

  // Salvar valor em request, e pegar o id gerado para salvar em request_item
  const requests = {
    id_client,
    form_of_payment,
    delivery_date,
    comments,
    value_request,
  };

  const resultRequest = await Request.bulkCreate([
    {
      ...requests,
      createdBy: req.session.id_user,
    },
  ]);

  // salvar produtos em request_item, relacionando o id criado em request
  const products = data;

  const arrayProducts = [];
  for (let i = 1; i <= total_products; i++) {
    arrayProducts.push({
      id_product: products[`id_product${i}`],
      value_product: products[`value_product${i}`],
    });
  }

  // passar o id para o request_item
  // resultRequest[0]['id']

  delete data.id_client;
  delete data.form_of_payment;
  delete data.delivery_date;
  delete data.comments;
  delete data.total_products;
  delete data.value_request;

  let resultRequestItem;
  arrayProducts.forEach(async (item) => {
    resultRequestItem = await RequestItem.bulkCreate([
      {
        id_requests: resultRequest[0]["id"],
        id_products: item.id_product,
        value_request_item: item.value_product,
        createdBy: req.session.id_user,
      },
    ]);
  });

  return res.status(200).json({
    res: resultRequestItem,
  });
});

// exports.requests_create_post = [
//   body(["name", "description", "value_product", "quantity"])
//     .trim()
//     .notEmpty()
//     .withMessage("Todos os campos são obrigatórios!")
//     .customSanitizer((value) => {
//       return value.replace(
//         /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
//         ""
//       );
//     }),

//   asyncHandler(async (req, res, next) => {
//     const data = req.body;

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(200).json({
//         notification: true,
//         type_style: "warning",
//         title_notification: "Atenção",
//         body_notification: "Todos os campos são obrigatórios!",
//       });
//     }

//     await Product.bulkCreate([
//       {
//         ...data,
//         createdBy: req.session.id_user,
//       },
//     ]);

//     return res.status(200).json({
//       notification: true,
//       type_style: "success",
//       title_notification: "Sucesso",
//       body_notification: "Produto adicionado com sucesso!",
//     });
//   }),
// ];

exports.list_requests = asyncHandler(async (req, res, next) => {
  const allRequest = await Request.findAll({
    order: [["createdAt", "DESC"]],
  });

  res.render("requests/list_requests", {
    list_requests: allRequest,
    title: "Pedidos",
    session: req.session.loggedin,
    user_name: req.session.name_user,
  });
});
