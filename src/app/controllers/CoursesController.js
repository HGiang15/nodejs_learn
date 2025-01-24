const Course = require('../models/Course')
const { validationResult } = require('express-validator')
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
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.render('courses/create', {
        errors: errors.mapped(),
        oldData: req.body,
      })
    }

    req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
    const course = new Course(req.body)
    course
      .save()
      .then(() => res.redirect(`/me/stored/courses`))
      .catch((error) => {})
  }

  // [GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .lean()
      .then((course) => {
        // res.render('courses/edit', { course: mongooseToObject(course) })
        res.render('courses/edit', { course })
      })
      .catch(next)
  }

  // [PUT] /courses/:id
  update(req, res, next) {
    req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/sddefault.jpg`
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next)
  }

  // [DELETE] /courses/:id
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next)
  }

  // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
      Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next)
    }

  // [PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next)
  }

  // [POST] /courses/handle-form-actions
  handleFormActions(req, res, next) {
    switch(req.body.action) {
      case 'delete':
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next)
        break

      case "forceDelete":
        Course.deleteMany({ _id: { $in: req.body.courseIds } })
          .then(() => {
            res.redirect("/me/trash/courses");
          })
          .catch(next)
        break

      case "restore":
        Course.restore({ _id: { $in: req.body.courseIds } })
          .then(() => {
            res.redirect("/me/trash/courses")
          })
          .catch(next)
        break

      default:
        res.json({ message: 'Action is invalid' })
    }

  }
  
}

module.exports = new CoursesController()
