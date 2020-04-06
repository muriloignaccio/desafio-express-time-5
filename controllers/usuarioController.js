const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const usuarioController = {
    cadastro:(req, res) =>{
        const{nome, email, senha} = req.body;
        let hash = bcrypt.hashSync(senha, 12);
        const pathUsuario = path.join('db', 'usuarios.json');

        let infoUsuario = {nome, email, hash}
        let usuarios = [];

        if(fs.existsSync(pathUsuario)){
            usuarios = JSON.parse(fs.readFileSync(pathUsuario, {enconding: 'utf-8'}));
            usuarios.push(infoUsuario);

        }else{
            usuarios = [
               infoUsuario  
            ]
        }

        usuarios = JSON.stringify(usuarios);
        fs.writeFileSync(pathUsuario, usuarios);
        res.send("Usuário cadastrado com sucesso!")
    },
    
    cadastroRender:(req, res) => {
        res.render('cadastroUsuario', {title: "Cadastro"} )
    },

    loginRender:(req, res) =>{
        res.render('login', {title: "Login"})
    },

    login:(req, res) =>{
        let {email, senha} = req.body;
        const pathUsuario = path.join('db', 'usuarios.json');
        let usuarios = JSON.parse(fs.readFileSync(pathUsuario, {enconding: 'utf-8'}));
        usuarios= usuarios.find(usuario => email == usuario.email);
        if( usuarios == undefined||usuarios.email != email){
            return res.send("Email incorreto")
        }
        if (bcrypt.compareSync(senha, usuarios.hash)){
            req.session.usuario = usuarios;
            return res.redirect("/admin")
        }
        return res.send("senha incorreta");
        
    }

}



module.exports = usuarioController;