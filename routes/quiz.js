const { Router } = require("express"); 
const Quiz = require("../model/Quiz"); 
const { restrict } = require("./middleware"); 

const router = Router();

router.get("/", restrict, async (req, res) => {
    const { username } = req.session.user.username; 
    const quizList = Quiz.find({ username});
    res.render('quiz/index', { title: 'Quiz', quizList: quizList });
    /*
    res.json(
      await Quiz.find({ username }).catch((error) =>
        res.status(400).json({ error })
      )
    );
    */
    
  });
  
  router.get("/:id", restrict, async (req, res) => {
    const { username } = req.session.user.username;
    const _id = req.params.id; 
    res.json(
      await Quiz.findOne({ username, _id }).catch((error) =>
        res.status(400).json({ error })
      )
    );
  });
  
  router.post("/", restrict, async (req, res) => {
    const { username } = req.session.user.username; 
    req.body.username = username; 
    res.json(
      await Quiz.create(req.body).catch((error) =>
        res.status(400).json({ error })
      )
    );
  });
  
  router.put("/:id", restrict, async (req, res) => {
    const { username } = req.session.user.username; 
    req.body.username = username;
    const _id = req.params.id;
    res.json(
      await Quiz.updateOne({ username, _id }, req.body, { new: true }).catch(
        (error) => res.status(400).json({ error })
      )
    );
  });
  
  router.delete("/:id", restrict, async (req, res) => {
    const { username } = req.session.user.username; 
    const _id = req.params.id;
    res.json(
      await Quiz.remove({ username, _id }).catch((error) =>
        res.status(400).json({ error })
      )
    );
  });
  
  module.exports = router