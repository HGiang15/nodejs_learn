const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema

const CourseSchema = new Schema({
  name: { type: String, required: true, maxLength: 255 },
  description: { type: String, maxLength: 600 },
  image: { type: String, maxLength: 255 },
  videoId: { type: String, required: true, maxLength: 255 },
  level: { type: String, maxLength: 255 },
  slug: { type: String, slug: 'name' , unique: true },
}, {
  timestamps: true
})

// Custom query helpers
CourseSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    const isValidtype = ['asc', 'desc'].includes(req.query.type)
    return this.sort({
      [req.query.column]: isValidtype ? req.query.type : 'desc',
    })
  }

  return this
}

// add plugin
mongoose.plugin(slug);
CourseSchema.plugin(mongooseDelete, { 
  deletedAt: true,    
  overrideMethods: 'all' 
});

module.exports = mongoose.model('Course', CourseSchema);
