module.exports = app => {

    if (process.env.NODE_ENV == 'test '){
        var env = process.env.NODE_ENV.trim()
    } else {
        var env = process.env.NODE_ENV
    }

    if (env) { return require(`./config.${env}.js`) }

    return require("./config.development.js")

}
