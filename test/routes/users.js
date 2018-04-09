import jwt from "jwt-simple";
describe("Routes: Users", () => {
    const Users = app.db.models.Users;
    const jwtSecret = app.libs.config.jwtSecret;
    let token;
    beforeEach(done => {
        // Código de teste
        Users
        .destroy({ where: {}})
        .then(() => Users.create({
            name: "theCastor",
            email: "junior.castor@gmail.com",
            password: "123456"
        }))
        .then(user => {
            token = jwt.encode({ id: user.id }, jwtSecret);
            done();
        });
    });
    describe("GET /user", () => {
        describe("status 200", () => {
            it("returns an authenticated user", done => {
                // Código de teste
                request.get("/user")
                .set("Authorization", `JWT ${token}`)
                .expect(200)
                .end((err, res) => {
                    expect(res.body.name).to.eql("theCastor");
                    expect(res.body.email).to.eql("junior.castor@gmail.com");
                    done(err);
                });
            });
        });
    });
    describe("DELETE /user", () => {
        describe("status 200", () => {
            it("deletes an authenticated user", done => {
                // Código de teste
                request.delete("/user")
                .set("Authorization", `JWT ${token}`)
                .expect(204)
                .end((err, res) => done(err));
            });
        });
    });
    describe("POST /users", () => {
        describe("status 200", () => {
            it("creates a new user", done => {
                // Código de teste
                request.post("/users")
                .send({
                    name: "Lua",
                    email: "lua@lua.net",
                    password: "12345"
                })
                .expect(200)
                .end((err, res) => {
                    expect(res.body.name).to.eql("Lua");
                    expect(res.body.email).to.eql("lua@lua.net");
                    done(err);
                });
            });
        });
    });
});
