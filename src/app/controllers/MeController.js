const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../utils/mongoose')

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([
      Course.find({}).lean().sortable(req), 
      Course.countDocumentsWithDeleted({ deleted: true })
    ])
      .then(([courses, deletedCount]) => {
        // res.render('me/stored-courses', { deletedCount, courses: multipleMongooseToObject(courses) })
        res.render('me/stored-courses', { 
            deletedCount, 
            courses 
        }) 
      })
      .catch(next)
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
    .lean()
    .then((courses) => {
      // res.render('me/stored-courses', { courses: multipleMongooseToObject(courses) })
      res.render('me/trash-courses', { courses }) 
    })
    .catch(next)
  }
}

module.exports = new MeController()
