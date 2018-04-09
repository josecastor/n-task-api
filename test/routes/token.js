describe("Routes: Token", () => {
    const Users = app.db.models.Users;
    describe("POST /token", () => {
        beforeEach(done => {
            // Código de pré-teste
            // limpando tabela
            Users.destroy({ where: {} })
            // criando usuario
            .then(() => Users.create({
                name: "Castor",
                email: "junior.castor@gmail.com",
                password: "123456"
            }))
            .then(() => done())
        });
        describe("status 200", () => {
            it("returns authenticated user token", done => {
                // Código do teste...
                request.post("/token")
                .send({
                    email: "junior.castor@gmail.com",
                    password: "123456"
                })
                .expect(200)
                .end((err, res) => {
                    console.log(res.body)
                    expect(res.body).to.include.keys("token");
                    done(err);
                });
            });
        });
        describe("status 401", () => {
            it("throws error when password is incorrect", done => {
                // Código do teste...
                request.post("/token")
                .send({
                    email: "junior.castor@gmail.com",
                    password: "SENHA_ERRADA"
                })
                .expect(401)
                .end((err, res) => {
                    done(err);
                });
            });
            it("throws error when email not exist", done => {
                // Código do teste...
                request.post("/token")
                .send({
                    email: "",
                    password: "SENHA_ERRADA"
                })
                .expect(401)
                .end((err, res) => {
                    done(err);
                });
            });
            it("throws error when email and password are blank", done => {
                // Código do teste...
                request.post("/token")
                .expect(401)
                .end((err, res) => {
                    done(err);
                });
            });
        });
    });
});
