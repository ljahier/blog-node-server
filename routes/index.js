module.exports = (app, pool, mysql, sha256) => {
    app.get('/', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        pool.query('SELECT * FROM posts', function (error, results) {
            if (error) throw error;
            if (results <= 2) {
                res.end('There is no post in database')
            } else {
                res.send(results)
            }
        })
    })
}
