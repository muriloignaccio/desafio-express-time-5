const auth = (req, res, next) => {
    if (req.session.usuario) {
        return next();
    }
    return res.redirect("/login");
};

module.exports = auth;