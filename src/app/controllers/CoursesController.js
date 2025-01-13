const Course = require('../models/Course')
const { validationResult } = require('express-validator');
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

  // [GET] /courses/create
  create(req, res, next) {
    res.render('courses/create')
  }

  // [POST] /courses/store
  store(req, res, next) {
    // Kiểm tra lỗi
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('courses/create', {
        errors: errors.mapped(),
        oldData: req.body,
      });
    }

    const formData = req.body
    formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
    const course = new Course(formData)
    course.save()
      .then(() => res.redirect(`/`))
      .catch(error => {

      })
  }

}

module.exports = new CoursesController()
