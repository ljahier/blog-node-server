module.exports = (app, pool, mysql, sha256, date, bodyParser, crypto) => {
    let generateUserToken = crypto.randomBytes(64).toString('hex')

    app.param('token', function(req, res, next, token) {
        req.token = token
        next()
    })
    // function verifToken(req) {
    //     pool.query('SELECT token FROM users', function (error, results) {
    //         if (error) throw error;
    //         console.log(results)
    //         let tokenHeader = req.header('Authorization')
    //         if (results == tokenHeader) {
    //             res.send("GROS PROUT")
    //         }
    //     })
    // }

    // Show all users registered in database
    app.get('/users', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        pool.query('SELECT * FROM users', function (error, results) {
            if (error) throw error;
            if (results <= 2) {
                res.end('There is no user registered in database')
            } else {
                res.send(results)
            }
        })
    })

    // Show user using user token
    app.get('/users/:token', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        let users_token = req.token

        pool.query('SELECT * FROM users WHERE token = ?', users_token, function (error, results) {
            if (error) throw error;
            if (results <= 2) {
                res.end('This users do not exist !')
            } else {
                res.send(results)
            }
        })
    })

    // Post users into database
    app.post('/users', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization")

        let password = sha256(req.body.password)

        // The default level is user, you can manage all your posts. You can't manage the users and others posts. For do this, you need to be admin
        let post = {username: req.body.username, password: password, email: req.body.email, token: generateUserToken, level: "user", created_at: date}

        try {
            pool.query('INSERT INTO users SET ?', post, function (error, results) {
                if (error) throw error;
                res.redirect('/users')
            })
        } catch (e) {
            console.log('Error: ' + e)
        }
    })

    // Update users by id in URI request
    app.put('/users/:id', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        // Authorisation et securisation des requetes faites à l'API
        // console.log(req.header("Authorization"))

        let put = {updated_at: date}
        let users_id =  req.id

        if (req.body.username != undefined)
            put.username = req.body.username
        if (req.body.password != undefined)
            put.password = req.body.password
        if (req.body.email != undefined) {
            put.email = req.body.email
        }

        try {
            pool.query('UPDATE users SET ? WHERE id = ?', [put, users_id], function (error, results) {
                if (error) throw error;
                res.redirect('/')
            })
        } catch (e) {
            console.log('Error: ' + e)
        }
    })

    // Delete users by id in URI request
    app.delete('/users/:token', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        let users_id =  req.id

        try {
            pool.query('DELETE FROM users WHERE id = ?', users_id, function (error, results) {
                if (error) throw error;
                res.redirect('/')
            })
        } catch (e) {
            console.log('Error: ' + e)
        }
    })
}
