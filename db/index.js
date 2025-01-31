const mongoose = require("mongoose")


mongoose.connect('mongodb+srv://abhinav:Qwerty857@cluster0.ldvtp.mongodb.net/mongo-with-jwtttt')


const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
})

const UserSchema = new mongoose.Schema({
  usernam: String,
  password: String,
  purchasedCourses:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Course',
  }]
})


const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageLink: String,
  price: String
})

const Admin = mongoose.model('Admin', AdminSchema)
const User = mongoose.model('User', UserSchema)
const Course = mongoose.model('Course', CourseSchema)

module.exports = {
  Admin,
  User,
  Course,
}