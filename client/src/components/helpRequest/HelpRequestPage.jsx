import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from 'react-router-dom';
import { io } from "socket.io-client";

const HelpRequestPage = () => {
  const location = useLocation();
  const userId = location.state.userId;
  const url = `http://localhost:8082/requests`;

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const socket = io('http://localhost:8082');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onSubmit = async (data) => {
    try {
      const socket = io('http://localhost:8082');

      const body = {
        requests: {
          userId: userId,
          requestStatus: "המתנה",
          requestType: data.requestType
        },
        meals: {
          amountMeals: data.amountMeals,
          mealType: data.mealType
        }
      };

      const response = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error('Failed to update request');
      }

      const responseData = await response.json();
      alert("הבקשה נוספה בהצלחה אנא המתינה לפרטי התקשרות ");
      console.log('Request added successfully:', responseData);

      // שליחת הבקשה החדשה דרך Socket.io
      socket.emit('postRequest', body);

    } catch (error) {
      console.error('Error adding request:', error.message);
    }
  };

  return (
    <>
      <h1>פניית עזרה</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          סוג הבקשה:
          <input type="text" {...register("requestType", { required: true })} />
          {errors.requestType && <span>שדה חובה</span>}
        </label>
        <br />
        <label>
          כמות ארוחות:
          <input type="number" {...register("amountMeals", { required: true })} />
          {errors.amountMeals && <span>שדה חובה</span>}
        </label>
        <br />
        <label>
          סוג הארוחה:
          <input type="text" {...register("mealType", { required: true })} />
          {errors.mealType && <span>שדה חובה</span>}
        </label>
        <br />
        <button type="submit">שליחה</button>
      </form>
    </>
  );
}

export default HelpRequestPage;
