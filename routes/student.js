const { Router } = require("express"); 
const { restrict } = require("./middleware"); 

const router = Router();

router.get("/", restrict, async (req, res) => {
    //Quiz.find({}).then(function (quizList) {
    res.render('student/index', { title: 'Student'});
    //});    
  });

router.get("/register", async (req, res) => {
  try {
    const student = await Student.create(req.body);
  } catch (error) {
  }
});  
  

module.exports = router