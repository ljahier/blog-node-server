module.exports = (app, pool, mysql, sha256) => {
    let errors = {}
    let outResults = {}
    app.get('/admin', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        

    })
}
