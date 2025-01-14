const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../utils/mongoose')

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Course.find({})
      .lean()
      .then((courses) => {
        // res.render('me/stored-courses', { courses: multipleMongooseToObject(courses) })
        res.render('me/stored-courses', { courses })
      })
      .catch(next)
  }
}

module.exports = new MeController()
