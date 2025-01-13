const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const Schema = mongoose.Schema

const Course = new Schema({
  name: { type: String, required: true, maxLength: 255 },
  description: { type: String, maxLength: 600 },
  image: { type: String, maxLength: 255 },
  videoId: { type: String, required: true, maxLength: 255 },
  level: { type: String, maxLength: 255 },
  slug: { type: String, slug: 'name' , unique: true },
}, {
  timestamps: true
})

module.exports = mongoose.model('Course', Course);
