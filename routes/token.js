import jwt from 'jwt-simple'

module.exports = app => {
    const cfg = app.libs.config
    const Users = app.db.models.Users

    app.post('/token', (req, res) => {
        if (req.body.email && req.body.password) {
            const email = req.body.email
            const password = req.body.password
            Users.findOne({where: {email: email}})
            .then(user => {
                // console.log(password)
                // console.log(user.password)
                if (Users.isPassword(user.password, password)) {
                    const payload = {id: user.id}
                    // console.log(user.id)
                    res.json({
                        token: jwt.encode(payload, cfg.jwtSecret)
                    })
                } else {
                    res.sendStatus(401)
                }
            })
            .catch(err => {
                // console.log('Users.isPassword(user.password, password)')
                res.json(err)
            })
        } else {
            res.sendStatus(401)
        }
    })
}
