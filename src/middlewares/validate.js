const { body } = require('express-validator');

module.exports = {
  courseValidation: [
    body('name')
      .notEmpty().withMessage('Trường này không được bỏ trống')
      .isLength({ max: 255 }).withMessage('Tên khóa học không được quá 255 ký tự'),

    body('description')
      .notEmpty().withMessage('Trường này không được bỏ trống')
      .isLength({ max: 600 }).withMessage('Mô tả không được quá 600 ký tự'),

    body('videoId')
      .notEmpty().withMessage('Trường này không được bỏ trống')
      .isLength({ max: 255 }).withMessage('VideoID không được quá 255 ký tự'),

    body('level')
      .notEmpty().withMessage('Trường này không được bỏ trống')
  ]
};
