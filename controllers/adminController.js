const fs = require("fs");
const path = require("path");


const adminController = {
  admin: (req, res) => {
      const fileNewsletter = path.join('db', 'newsletter.json');

      const inscritos = JSON.parse(fs.readFileSync(fileNewsletter, {
        encoding: "utf-8"
      }));

      return res.render("admin", {
        listaInscritos: inscritos.inscritos,
        title: "Admin"
      });
  }
};

module.exports = adminController;