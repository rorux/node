exports.indexPage = (req, res, next) => {
    if (!req.session.username) {
        res.render('index')
    } else {
        res.redirect('/news/')
    }
}