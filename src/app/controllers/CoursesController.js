const Course = require('../models/Course')
const { mongooseToObject } = require('../../utils/mongoose')

class CoursesController {
  // [GET] /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .lean()
      .then((course) => {
        // res.render('courses/show', { course: mongooseToObject(course) }) // ko dung lean thi dung cai nay
        res.render('courses/show', { course })
      })
      .catch(next)
  }
}

module.exports = new CoursesController()
