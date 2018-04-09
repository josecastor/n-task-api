module.exports = {
    database: "ntask",
    user: "",
    password: "",
    params: {
        dialect: "sqlite",
        storage: "ntask.sqlite",
        logging: false,
        define: {
            underscored: true
        }
    },
    jwtSecret: "Nta$K-AP1",
    jwtSession: { session: false }
}
