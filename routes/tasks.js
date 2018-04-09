module.exports = app => {
    const Tasks = app.db.models.Tasks;
    app.route("/tasks")
        // Middleware de pré-execução das rotas
        .all(app.auth.authenticate())
        .get((req, res) => {
            // "/tasks": Lista tarefas
            // console.log(req)
            Tasks.findAll({ where: { user_id: req.user.id }})
                .then(result => res.json(result))
                .catch(err => {
                    res.status(412).json({msg: err.message})
                })
        })
        .post((req,res) => {
            // "/tasks": Cadastra uma nova tarefa
            req.body.user_id = req.user.id
            Tasks.create(req.body)
                .then(result => res.json(result))
                .catch(err => {
                    res.status(412).json({msg: err.message})
                })
        })


    app.route("/tasks/:id")
        .all(app.auth.authenticate())
        .get((req, res) => {
            // "/tasks/1": Consulta uma tarefa
            Tasks.findOne({
                where: {
                    id: req.params.id,
                    user_id: req.user.id
                }})
                .then(result => {
                    if (result) {
                        res.json(result)
                    } else {
                        res.sendStatus(404)
                    }
                })
                .catch(err => {
                    res.status(412).json({msg: err.message})
                })
        })
        .put((req, res) => {
            // "/tasks/1": Atualiza uma tarefa
            Tasks.update(req.body, {
                where: {
                    id: req.params.id,
                    user_id: req.user.id
                }})
                .then(result => res.sendStatus(204))
                .catch(err => {
                    res.status(412).json({msg: err.message})
                })
        })
        .delete((req, res) => {
            // "/tasks/1": Exclui uma tarefa
            Tasks.destroy({
                where: {
                    id: req.params.id,
                    user_id: req.user.id
                }})
                .then(result => res.sendStatus(204))
                .catch(err => {
                    res.status(412).json({msg: err.message})
                })
        });

}
