const { Router } = require('express')
const { User, Course } = require('../db/index')
const usermiddleware  = require('../middlewares/user');
const router = Router();
const { JWT_secret } = require("../context")
const jwt = require("jsonwebtoken")

router.post('/signup', async (req,res)=>{
  const username = req.body.username
  const password = req.body.password

   await User.create({
    username,
    password
  })
  res.json({
    message:"user created successfully"
  })
})

router.post('/signin', (req, res)=>{
  const username = req.body.username
  const password = req.body.password

  const user = User.find({
    username,
    password
  })
  if(user){
    const token = jwt.sign({username}, JWT_secret)
    res.json({token})
  }else{
    res.json({
      msg:"email password are incorrect"
    })
  }
})

router.get('/courses',usermiddleware, async(req,res )=>{
  const response = await Course.find({})
  res.json({
    course:response
  })
})

router.post('/courses/:courseId', usermiddleware, async(req,res)=>{
  const courseId = req.params.courseId
  const username = req.headers.username

  await User.updateOne(
    {username:username},{$push:{purchasedCourses: courseId}
  })
  res.json({
    msg:"course purchase success"
  })
})

router.get('/purchasedCourses', usermiddleware,async(req,res)=>{
  const user = await User.findOne({
    username: req.headers.username
  })
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const courses = await Course.find({
    _id:{$in: user.purchasedCourses}
  })
  res.json({
    courses: courses,
    user:user
  })
})

module.exports = router
