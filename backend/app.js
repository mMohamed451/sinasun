var myNumbers = [];

const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const app = express();
const router = express.Router();
var myToken = '';

/* Trying JWT */

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));


//Format of token
//authorization:Bearer <access_token>

//verify token
function verifyToken(req, res, next) {
    //get authHeader
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        // res.sendStatus(403);
        res.render('login');
    }
}
/* End */
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
    }
});
const db = mysql.createConnection({
    localhost: 'MySQL57',
    user: 'root',
    password: 'mpkfa',
    database: 'sinasun'
});



const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');

function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

/* upload pic + title to  the database */


app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('index', {
                msg: 'No File selected '
            });
        } else {
            let sql = `INSERT INTO products (name,url,category)
            VALUES ('${req.body.title}','${req.file.filename}','${req.body.category}')`;
            let query = db.query(sql, (err, results) => {
            });
            res.render('index', {
                msg: 'Uploaded Successfully '
            });
           
        }
    });
});

/*end of upload picture and title to the database */
app.set('view engine', 'ejs');


app.use(express.static('./public'))
//handle xhr requests


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var myObjects = "";
//get all products 
app.use(express.static("public"));

app.get('/getproducts', (req, res) => {

    jwt.verify(myToken, 'secretkey', (err, authData) => {
        if (err) {
            res.render('login');
        } else {
            let sql = `select * from products`;
            let query = db.query(sql, (err, results) => {
                myObjects = results;
                if (err) throw err;
                res.render('products', {
                    myObjects: myObjects
                });
            })
        }


    });



})

//get product with specific id
app.get('/getproducts/:id', (req, res) => {
    jwt.verify(myToken, 'secretkey', (err, authData) => {
        if (err) {
            res.render('login');
        } else {
            res.render('products');
            let sql = `select * from products where id = ${req.params.id}`;
            let query = db.query(sql, (err, result) => {
                if (err) throw err;
                result.forEach(result => {
                    if (result.id === 2) {
                        result.name = 'nothing';
                    }
                });
                res.send(result);
            })
        }

    });

})


//update product 
app.get('/updateproduct/:id', (req, res) => {
    let name = 'new Name';
    let sql = `update products set name ='${name}' where id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('updated successful....');
    })
})


//delete product 
app.get('/deleteproduct/:id', (req, res) => {
    var picId = 1;
    let sql = `delete from products where id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(`product deleted successful....`);
    })
})
app.post('/aaa', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    var adminUsername;
    var adminPassword;
    let sql = `Select * from admin WHERE (username = '${username}' and password= '${password}')`;
    let query = db.query(sql, (err, results) => {
        if (results instanceof Array) {
            results.forEach(admin => {
                adminUsername = admin.username;
                adminPassword = admin.password;
            });

            if (username === adminUsername && password === adminPassword) {
                const myAdmin = {
                    username: adminUsername,
                    password: adminPassword
                }
                /*Adding token */
                jwt.sign({
                    myAdmin
                }, 'secretkey', {
                    expiresIn: '30s'
                }, (err, token) => {
                    myToken = token;
                    window.localStorage.getItem(token);
                    res.json({
                        token
                    })
                })
                /*end of it */
                res.render('index');

            } else {
                res.send('Username or Password is wrong!')
            }
        } else {
        }

    });
});

app.get('/aaa', (req, res) => {

    jwt.verify(myToken, 'secretkey', (err, authData) => {
        if (err) {
            res.render('login');
        } else {
            res.render('index');
        }

    });
});

//render templates for backend

app.get('/', (req, res) => {
    res.render('login');
});

//get products without token


app.get('/getproductswithouttoken', (req, res) => {

    let sql = `select * from products`;
    let query = db.query(sql, (err, results) => {
        myObjects = results;
    });
    res.send(myObjects);
    // res.render('products',{myObjects:myObjects});
});

//after login succeed 



db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log(`server is connected succesfull`);
})

app.listen('3000', () => {
    console.log('server is running on port 3000');
});