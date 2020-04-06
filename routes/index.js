let express = require('express');
let router = express.Router();

let homeController = require('../controllers/homeController');
const adminController = require("../controllers/adminController");
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/auth");

/* GET home page. */
router.get('/', homeController.index);

router.post('/contato', homeController.contato);

router.get('/newsletter', homeController.newsletter);

router.get("/admin", auth, adminController.admin);

router.get("/cadastro", usuarioController.cadastroRender);
router.post("/cadastro", usuarioController.cadastro);

router.get("/login", usuarioController.loginRender);
router.post("/login", usuarioController.login);





module.exports = router;
