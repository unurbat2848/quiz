require("dotenv").config();
const jwt = require("jsonwebtoken");

// MIDDLEWARE FOR AUTHORIZATION (MAKING SURE THEY ARE LOGGED IN)

const restrict = async(req, res, next) => {
    try {
        if (req.session.user) {
            next();
        } else {
            req.session.error = 'Access denied!';
            res.redirect('/login');
        }
    } catch (error) {
        req.session.error = error;
        res.redirect('/login');
    }
}



const isLoggedIn = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            //split the header and get the token
            const token = req.headers.authorization.split(" ")[1];
            if (token) {
                const payload = await jwt.verify(token, process.env.SECRET);
                if (payload) {
                    // store user data in request object
                    req.user = payload;
                    next();
                } else {
                    res.status(400).json({ error: "token verification failed" });
                }
            } else {
                res.status(400).json({ error: "malformed auth header" });
            }
        } else {
            res.status(400).json({ error: "No authorization header" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};


module.exports = {
    isLoggedIn, restrict,
};
