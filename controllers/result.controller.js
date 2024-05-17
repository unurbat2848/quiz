const Result = require("../model/Result");
const Student = require("../model/Quiz");
const Quiz = require("../model/Quiz");
const mongoose = require('mongoose');

async function resultController(io, socket, data) {
    let message = '';
    await Result.create(data).then(response => {
            if (!response) {
                message = 'An error while creating result';
            } else {
                
                io.emit('reset_result', { code: 200, status: 'success', new_result: true, finish_result: false });
            }
        }).catch(
            error => {
                message = error;
            });
        

    
    console.log(message);
}

module.exports = {
    resultController
}