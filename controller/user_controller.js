const User = require('../models/user_model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const appError = require('../utility/appError')

const JWT_TOKEN = "234567890HGfdscvbnloi*&^%$edfvbnkloiUYTRFDE345678IKJHGFDCVBNUy^t%re#dcfvghjkmnbfre$%^&*&^trfvbnjkiuY765WDFGHUIOLKJHGTREWDFGHJKJHGT"


// Create User
const userPost = async(req, res) => {
    //console.log(req.body)
    const { fname, lname, bdate, email, password, } = req.body
    let hashed_password;

    // checking for empty inputs
    if (fname === "" || lname === "" || email === "" || password === "" ||
        !fname || !lname || !email || !password) {
        next(new appError(400, 'empty field found, please fill all required fields'))
    }

    // check for password length
    if (password.length < 8) {
        next(new appError(400, 'password length must be greater than seven'))
    }

    // checks if the email already exists in the database (partially working)
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
        next(new appError(400, 'This email already exists in the database !!!'))
    }

    // hashing the password
    hashed_password = await bcrypt.hash(password, 10)

    // expermenting
    console.log('password: ', password);
    console.log('hashed pass: ', hashed_password)
    console.log(req.body)
        //const address = { country: 'Ethiopia', city: 'Addis ababa', }
    try {
        // saving to database
        const createResponse = await User.create({
            fname: fname,
            lname: lname,
            bdate: bdate,
            email: email,
            hashed_password: hashed_password
        })
        console.log("user created successfully", createResponse);

    } catch (err) {
        // catching any error when saving data
        console.log(JSON.stringify(err));
        next(new appError(400, 'could not save to the database'))
    }


    return res.json({
        status: "successfully registered",
        registered: {
            fname,
            lname,
            bdate,
            email
        }
    })
}

//login user
const userLogin = async(req, res, next) => {
    const { email, password } = req.body;
    if (!email || email == "") {
        next(new appError(400, "email is undefined"))
    }
    if (!password || password == "") {
        next(new appError(400, "password is undefined"))
    }

    const user = await User.findOne({ email }).lean()
        .catch((err) => {
            next(new appError(401, "user haven't registered"))
        })
    if (user && (await bcrypt.compare(password, user.hashed_password))) {
        const token = jwt.sign({ id: user._id, email },
            JWT_TOKEN, {
                expiresIn: "2h"
            }
        );
        return res.status(200).json({ status: "OK", token: token });
    }
    return res.status(401).json({ status: "Fail", message: "please insert correct username or password" })
    next(new appError(401, "please insert correct username or password"))
}


// gets all the users
const userAll = async(req, res) => {
    const users = {
        'numeber_of_data': await User.find().count(),
        'Regesterd_users': await User.find()
    };
    res.json(users);
    return res.status(200)
}

// get a specific user
const userID = async(req, res) => {
    const user = await User.findById(req.params.id)
    return res.status(200).json(user)
}


// update a user
const userUpdate = async(req, res) => {
    const user = await User.findById(req.params.id)
    console.log(user);
    if (user) {
        let hashed_password;
        const { fname, lname, bdate, email, password, } = req.body
        console.log(fname, lname, bdate, email, password)
        if (password !== "" && password) {

            if (password.length < 8) {
                next(new appError(401, 'password length must be greater than seven'))
            }
            hashed_password = await bcrypt.hash(password, 10)
        }
        const user = await User.findById(req.params.id) //?? await User.findOne({ email: req.body.id })
        if (user) {
            if (fname !== "" && fname) {
                user.fname = fname
            }
            if (lname !== "" && lname) {
                user.lname = lname
            }
            if (email !== "" && email) {
                user.email = email
            }
            if (password !== "" && password) {
                user.hashed_password = hashed_password
            }
            user.save()
            return res.status(200).json(user)
        }
    }
    next(new appError(401, "user not found"))
}

// delete a user
const userDelete = async(req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        user.delete()
        user.save()
        return res.status(200).json({ status: "user successfully deleted" })
    }
    next(new appError(401, "user not found"))
}

module.exports = {
    userPost,
    userAll,
    userID,
    userUpdate,
    userDelete,
    userLogin
}