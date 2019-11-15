const router = require("express").Router()
const db = require("./helpers.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

function auth(req, res, next) {
    jwt.verify(req.body.token, "check", (err, data) => {
        if (!err) {
            req.token = data
            next()
        }
        else {
            res.status(400).send("missing token")
        }
    })
}

function signJWT(data) {

    const payload = {
        ...data
    }

    const secret = "ahgfibngnbigfnbinignbijfgnigfnbinfg"

    const options = {
        maxAge: "1d"
    }

    return jwt.sign(payload, secret, options)
}

router.post("/register", (req, res) => {
    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 14)
    } else {
        res.status(401).send("missing password")
    }


    db.add(req.body).then(r => {
        res.status(200).send(rs)
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.post("/login", (req, res) => {
    const { username, password } = req.body
    db.get(username).then(r => {

        if (bcrypt.compareSync(password, r[0].password)) {
            const token = signJWT({ username })
            res.status(200).json({
                token
            })
        } else {
            res.status(401).send("wrong password")
        }

    }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })

})
router.get("/users", auth, (req, res) => {
    db.get().then(r => {
        console.log(r)
        res.status(200).send(r)
    }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })

})

module.exports = router