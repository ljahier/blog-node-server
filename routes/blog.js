module.exports = (app, pool, mysql, sha256, date, bodyParser) => {
    app.param('id', function(req, res, next, id) {
        req.id = id
        next()
    })

    // function verifUserToken(req) {
    //     pool.query('SELECT token FROM users', function (error, results) {
    //         if (error) throw error;
    //         console.log(results)
    //         let tokenHeader = req.header('Authorization')
    //         if (results == tokenHeader) {
    //             res.send("GROS PROUT")
    //         }
    //     })
    // }

    // Just redirecting to homepage
    app.get('/blog', (req, res) => {
        pool.query('SELECT * FROM posts', function (error, results) {
            if (error) throw error;
            if (results <= 2) {
                res.end('There is no post in database')
            } else {
                res.send(results)
            }
        })
    })

    // Show content of post id
    app.get('/blog/:id', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        // let auth = req.header('Authorization')
        // if ()

        let post_id = req.id

        pool.query('SELECT * FROM posts WHERE id = ?', post_id, function (error, results) {
            if (error) throw error;
            if (results <= 2) {
                res.end('This blog post do not exist !')
            } else {
                res.send(results)
            }
        })
    })

    // Post article into database
    app.post('/blog', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization")

        let post = {title: req.body.title, content: req.body.content, author: req.body.author, created_at: date, updated_at: date}

        try {
            pool.query('INSERT INTO posts SET ?', post, function (error, results) {
                if (error) throw error;
                res.redirect('/')
            })
        } catch (e) {
            console.log('Error: ' + e)
        }
    })

    // Update article by id in URI request
    app.put('/blog/:id', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        // Authorisation et securisation des requetes faites à l'API
        // console.log(req.header("Authorization"))

        let put = {updated_at: date}
        let put_id =  req.id

        if (req.body.title != undefined)
            put.title = req.body.title
        if (req.body.content != undefined)
            put.content = req.body.content
        if (req.body.author != undefined)
            put.author = req.body.author

        try {
            pool.query('UPDATE posts SET ? WHERE id = ?', [put, put_id], function (error, results) {
                if (error) throw error;
                res.redirect('/')
            })
        } catch (e) {
            console.log('Error: ' + e)
        }
    })

    // Delete article by id in URI request
    app.delete('/blog/:id', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        let put_id =  req.id

        try {
            pool.query('DELETE FROM posts WHERE id = ?', put_id, function (error, results) {
                if (error) throw error;
                res.redirect('/')
            })
        } catch (e) {
            console.log('Error: ' + e)
        }
    })
}
