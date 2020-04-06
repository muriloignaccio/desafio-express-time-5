const fs = require("fs");
const path = require("path");


const adminController = {
  admin: (req, res) => {
    if (req.session.usuario) {
      const fileNewsletter = path.join('db', 'newsletter.json');

      const inscritos = JSON.parse(fs.readFileSync(fileNewsletter, {
        encoding: "utf-8"
      }));

      return res.render("admin", {
        listaInscritos: inscritos.inscritos,
        title: "Admin"
      });
    }
    return res.redirect("/login");
  }
};

module.exports = adminController;