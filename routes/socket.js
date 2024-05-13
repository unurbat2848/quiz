const Student = require("../model/student");
const jwt = require('jsonwebtoken');

 const studentController =  async(ws, socket, message)=>{
    const body = JSON.parse(message);
    const findStudent = await Student.findOne({'email': body.data.email});
    if(findStudent) return socket.send(JSON.stringify({code: 200, status: 'success', message: findStudent.token}));

    const token = jwt.sign(
        {username: body.data.username, email: body.data.email},
        process.env.SECRET
    )

    let student = new Student({
        email: body.data.email,
        username: body.data.username,
        token: token
    })
    await student.save();
    return socket.send(JSON.stringify({code: 200, status: 'success', message: token}));
}

module.exports = {
    studentController
}