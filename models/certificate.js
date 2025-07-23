const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificate_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  event_name: { type: String, required: true },
  issue_date: { type: Date, required: true },
  verified: { type: Boolean, default: false }
});

module.exports = mongoose.model('Certificate', certificateSchema);
