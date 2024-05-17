const Student = require("../model/Student");
const jwt = require('jsonwebtoken');

async function studentController(io, socket, message){
    const body = message;
    const findStudent = await Student.findOne({'email': body.email, 'username': body.username});
    if(findStudent){
        socket.emit('join', {code: 200, status: 'success', data: findStudent});
        return io.emit('add_user', {code: 200, status: 'success', data: findStudent});
    }  

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

    io.emit('add_user', {code: 200, status: 'success', data: findStudent});
    return socket.emit('join', {code: 200, status: 'success', data: student});
    
}

module.exports = {
    studentController
}