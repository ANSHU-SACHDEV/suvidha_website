// data.js
const mongoose = require('mongoose');
const Certificate = require('../models/certificate');

const certificates = [
  {
    certificate_id: 'SUVIDHA2025CE001',
    name: 'Aarav Mehta',
    event_name: 'AI Workshop 2025',
    issue_date: new Date('2025-03-01'),
    verified: true
  },
  {
    certificate_id: 'SUVIDHA2025CE002',
    name: 'Meera Kapoor',
    event_name: 'Web Dev Bootcamp',
    issue_date: new Date('2025-04-15'),
    verified: true
  },
  {
    certificate_id: 'SUVIDHA2025CE003',
    name: 'Rohan Singh',
    event_name: 'Python ML Week',
    issue_date: new Date('2025-02-20'),
    verified: false
  },
  {
    certificate_id: 'SUVIDHA2025CE004',
    name: 'Sana Ansari',
    event_name: 'UI/UX Hackathon',
    issue_date: new Date('2025-06-10'),
    verified: true
  },
  {
    certificate_id: 'SUVIDHA2025CE005',
    name: 'Kunal Joshi',
    event_name: 'Data Science Bootcamp',
    issue_date: new Date('2025-01-25'),
    verified: true
  },
  {
    certificate_id: 'SUVIDHA2025CE006',
    name: 'Isha Sharma',
    event_name: 'JavaScript Essentials',
    issue_date: new Date('2025-03-14'),
    verified: true
  },
  {
    certificate_id: 'SUVIDHA2025CE007',
    name: 'Neeraj Kulkarni',
    event_name: 'Cybersecurity 101',
    issue_date: new Date('2025-05-05'),
    verified: true
  },
  {
    certificate_id: 'SUVIDHA2025CE008',
    name: 'Pooja Bansal',
    event_name: 'Cloud Computing Webinar',
    issue_date: new Date('2025-04-07'),
    verified: false
  },
  {
    certificate_id: 'SUVIDHA2025CE009',
    name: 'Vivek Rana',
    event_name: 'Ethical Hacking Training',
    issue_date: new Date('2025-06-01'),
    verified: true
  },
  {
    certificate_id: 'SUVIDHA2025CE010',
    name: 'Ananya Verma',
    event_name: 'Android Development Camp',
    issue_date: new Date('2025-02-28'),
    verified: true
  }
];

module.exports = certificates;
