const {Router} = require("express")
const adminmiddleware = require("../middlewares/admin")
const{Admin,User, Course} = require("../db/index");
const { JWT_secret } = require("../context");
const jwt = require("jsonwebtoken")
const router = Router();



router.post('/signup', async (req, res)=>{
  const username = req.body.username
  const password = req.body.password

  await Admin.create({
    username:username,
    password:password
  })

  res.json({
    msg:"Admin created successfully",
  })

})

router.post("/signin", async (req,res)=>{
  const username = req.body.username;
  const password = req.body.password;

  const user = await Admin.find({
    username,
    password
  })
  if(user){
    const token = jwt.sign({username},JWT_secret);
    res.json({token});
  }else{
    res.status(400).json({
      msg:"incorrect mail and pass"
    });
  }
  });

router.post("/courses", adminmiddleware, async (req,res)=>{
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;

  const newcourseCreate = await Course.create({
    title:title,
    description:description,
    imageLink:imageLink,
    price:price
  });
  console.log(newcourseCreate)
  res.json({
    msg:"new course created",
    courseID:newcourseCreate._id
    });
});


router.get("/courses", adminmiddleware, async(req,res)=>{
  const response = await Course.find({})
  res.json({
    course: response
  })

})

module.exports = router;