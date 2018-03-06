module.exports = (app, pool, mysql, sha256) => {
    app.get('/admin', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.send("Welcome to '/admin'")
    })
}
