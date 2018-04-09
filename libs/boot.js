module.exports = app => {
    if (process.env.NODE_ENV == "test ") {
        if (process.env.NODE_ENV.trim() !== "test") {
            app.db.sequelize.sync().done(() => {
                app.listen(app.get("port"), () => {
                    console.log(`NTask API - porta ${app.get("port")}`);
                });
            });
        }
    } else {
        app.db.sequelize.sync().done(() => {
            app.listen(app.get("port"), () => {
                console.log(`NTask API - porta ${app.get("port")}`);
            });
        });
    }
}
