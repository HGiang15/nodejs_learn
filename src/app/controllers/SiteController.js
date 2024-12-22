const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../utils/mongoose')

class SiteController {
  // [GET] /
  //   Async await
//   async index(req, res, next) {
//     try {
//       const courses = await Course.find({})
//       res.render('home', {
//         courses: multipleMongooseToObject(courses),
//       })
//     } catch (err) {
//       //   res.status(400).json({ error: 'Error' })
//       next(err)
//     }
//   }

  // Promise
  index(req, res, next) {
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
