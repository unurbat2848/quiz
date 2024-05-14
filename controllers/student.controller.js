const Student = require("../model/student");
const jwt = require('jsonwebtoken');

async function studentController(io, socket, message){
    const body = message;
    const findStudent = await Student.findOne({'email': body.email, 'username': body.username});
    if(findStudent) return io.emit('message', {code: 200, status: 'success', data: findStudent});

    const token = jwt.sign(
        {username: body.username, email: body.email},
        process.env.SECRET
    )

    let student = new Student({
        email: body.email,
        username: body.username,
        token: token
    })
    await student.save();

    return io.emit('message', {code: 200, status: 'success', data: student});
    
}

module.exports = {
    studentController
}