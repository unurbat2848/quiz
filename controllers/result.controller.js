const Result = require("../model/result");

async function resultController(io, socket, data) {
    console.log(data);
    await Result.create(data).then(response => {
        if (!response) {
            message = 'An error while creating result';
        } else {
            message = 'Result successfully created.';
            
        }
    }).catch(
        error => {
            message = error;
        })
    console.log(message);
}

module.exports = {
    resultController
}