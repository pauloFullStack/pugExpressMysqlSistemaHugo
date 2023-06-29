const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

exports.form_login = asyncHandler(async (req, res, next) => {
  res.render("login", { title: "Login" });
});

exports.check_login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (req.body.email === "" || req.body.password === "") {
    return res.status(200).json({
      notification: true,
      type_style: "warning",
      title_notification: "Atenção",
      body_notification: "Todos os campos são obrigatórios!",
    });
  }

  if (user.password) {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.status(200).json({
          notification: true,
          type_style: "warning",
          title_notification: "Atenção",
          body_notification: "Erro credenciais!",
        });
      }

      if (result) {
        req.session.loggedin = true;
        req.session.id_user = user.id;
        req.session.name_user = user.name;
        return res.status(200).json({
          notification: false,
          redirect: "customers/list_customers",
        });
        
      } else {
        return res.status(200).json({
          notification: true,
          type_style: "warning",
          title_notification: "Atenção",
          body_notification: "Erro credenciais!",
        });
      }
    });
  }
});

exports.logout = asyncHandler(async (req, res, next) => {
  req.session.loggedin = false;
  res.redirect("/login")
  // res.status(200).json({
  //   success: true,
  //   redirect: "login",
  // });
});
