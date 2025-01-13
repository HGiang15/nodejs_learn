const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../utils/mongoose')

class SiteController {
  // Promise
  index(req, res, next) {
    // Model.find(): Tìm tất cả bản ghi trong db
    Course.find({})
      .lean()
      .then((courses) => {
        // res.render('home', { courses: multipleMongooseToObject(courses) }) // ko dung lean thi dung cai nay
        res.render('home', { courses: courses })
      })
      .catch((error) => next(error))
  }

  // [GET] /search
  search(req, res) {
    res.render('search')
  }
}

module.exports = new SiteController()
