const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Enrollment = require('./models/enrollment');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./models/db')
const app = express();
const PORT = process.env.PORT || 3001;


const CompletePayment = async (userDetails, paymentDetails) => {
  return userDetails.age > 18;
};

app.use(cors());
app.use(express.json());


app.post('/api/enroll', async (req, res) => {
  const { name, email, phone, age, batchId } = req.body;

  try {
    if (!name || !email || !phone || !age || !batchId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

   
    if (age < 18 || age > 65) {
      return res.status(400).json({ message: 'Invalid age range (18-65)' });
    }

   
    const user = new User({
      name,
      email,
      phone,
      age,
      batchId,
    });

    
    await user.save();

    
    const enrollment = new Enrollment({
      userId: user._id,
      batchId,
      month: new Date().getMonth() + 1, 
      year: new Date().getFullYear(), 
    });

    
    await enrollment.save();

    const paymentResult = await CompletePayment(req.body);

    if (paymentResult) {
      res.status(201).json({ message: 'Successfully enrolled! Yoga awaits!', user, enrollment });
    } else {
      res.status(400).json({ message: 'Payment failed. User must be at least 18 years old.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/api/completePayment', async (req, res) => {
  const { userDetails, paymentDetails } = req.body;

  try {

    const paymentResult = await CompletePayment(userDetails, paymentDetails);

   
    if (paymentResult) {
      res.status(200).json({ success: true, message: 'Payment successful!' });
    } else {
      res.status(400).json({ success: false, message: 'Payment failed. User must be at least 18 years old.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
