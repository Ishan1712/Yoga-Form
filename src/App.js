import React, { useState } from "react";
import axios from "axios";
import "./YogaForm.css";

const CompletePayment = async (user, paymentDetails) => {
  try {
    console.log("Payment successful!");
    return { success: true };
  } catch (error) {
    console.error("Payment failed:", error);
    return { success: false };
  }
};

const INITIAL_STATE = {
  name: "",
  email: "",
  phone: "",
  age: "",
  batchId: "",
};

const YogaForm = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
    
      const response = await axios.post(
        "http://localhost:3001/api/enroll",
        formData
      );

     
      setMessage(response.data.message);

      const { user, enrollment } = response.data;
      console.log("User:", user);
      console.log("Enrollment:", enrollment);

     
      const paymentResponse = await CompletePayment(user, formData);
      if (paymentResponse.success) {
        setMessage(`${response.data.message} Payment successful!`);
      } else {
        setMessage(`${response.data.message} Payment failed. Please try again.`);
      }
    } catch (error) {
      console.error("API Error:", error);
      console.log("Error details:", error.response.data);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }

    setFormData(INITIAL_STATE);
  };

  return (
    <div className="yoga-form-container">
      <h1>Yoga Class Admission Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          id="age"
          value={formData.age}
          onChange={handleChange}
          min={18}
          max={65}
          required
        />

        <label htmlFor="batch">Choose Batch:</label>
        <select
          name="batchId"
          id="batch"
          value={formData.batchId}
          onChange={handleChange}
        >
          <option value="1">6-7 AM</option>
          <option value="2">7-8 AM</option>
          <option value="3">8-9 AM</option>
          <option value="4">5-6 PM</option>
        </select>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Enrolling..." : "Enroll Now!"}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default YogaForm;
