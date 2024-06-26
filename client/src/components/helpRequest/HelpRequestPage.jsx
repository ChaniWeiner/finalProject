import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from 'react-router-dom';
import { io } from "socket.io-client";

const HelpRequestPage = () => {
    const location = useLocation();
    const userId = location.state.userId;
    const url = `http://localhost:8082/requests`;

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const [requestType, setRequestType] = useState('');

    const amountMeals = watch("amountMeals")

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
            reset();
            const socket = io('http://localhost:8082');

                    let body = {
                        requests: {
                            userId: userId,
                            requestStatus: "המתנה",
                            requestType: data.requestType
                        }
                    };
            
                    switch (data.requestType) {
                        case "ארוחה":
                            body.meals = {
                                amountMeals: data.amountMeals,
                                mealType: data.mealType
                            };
                            break;
                        case "ביביסיטר":
                            body.babysitter = {
                                childrenAge: data.childrenAge
                            };
                            break;
                        case "נקיון":
                            body.cleaning = {
                                houseSize: data.houseSize
                            };
                            break;
                        case "קניות":
                            body.shopping = {
                                shoppingList: data.shoppingList
                            };
                            break;
                        case "אוזן קשבת":
                            body.support = {
                                supportCall: data.supportCall
                            };
                            break;
                        default:
                            throw new Error('Unsupported request type');
                    }
            
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    });
            
                    if (!response.ok) {
                        throw new Error('Failed to add request');
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
            
    const handleRequestTypeChange = (event) => {
        setRequestType(event.target.value);
    };

    return (
        <>
            <h1>פניית עזרה</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    סוג הבקשה:
                    <select {...register("requestType", { required: true })} onChange={handleRequestTypeChange}>
                        <option value="">בחר סוג בקשה</option>
                        <option value="ארוחה">ארוחה</option>
                        <option value="ביביסיטר">ביביסיטר</option>
                        <option value="נקיון">נקיון</option>
                        <option value="קניות">קניות</option>
                        <option value="אוזן קשבת">אוזן קשבת</option>
                    </select>
                    {errors.requestType && <span>שדה חובה</span>}
                </label>
                <br />

                {requestType === "ארוחה" && (
                    <>
                        <label>
                            כמות ארוחות:
                            <input
                                type="number"
                                {...register("amountMeals", {
                                    required: true,
                                    min: {
                                        value: 1,
                                        message: "הכמות המינימלית היא 1"
                                    },
                                    max: {
                                        value: 20,
                                        message: "הכמות המקסימלית היא 20"
                                    }
                                })}
                            />
                            {errors.amountMeals && <span>{errors.amountMeals.message}</span>}
                            {(amountMeals <= 0 || amountMeals > 20) && (
                                <span>אנא כתוב מספר בין 1 ל-20 כולל</span>
                            )}
                        </label>
                        <br />
                        <label>
                            סוג הארוחה:
                            <select {...register("mealType", { required: true })}>
                                <option value="">בחר סוג הארוחה</option>
                                <option value="פרווה">פרווה</option>
                                <option value="חלבי">חלבי</option>
                                <option value="בשרי">בשרי</option>
                            </select>
                            {errors.mealType && <span>שדה חובה</span>}
                        </label>
                        <br />
                    </>
                )}

                {requestType === "ביביסיטר" && (
                    <>
                        <label>
                            גיל הילדים:
                            <input type="number" {...register("childrenAge", { required: true })} />
                            {errors.childrenAge && <span>שדה חובה</span>}
                        </label>
                        <br />
                    </>
                )}

                {requestType === "נקיון" && (
                    <>
                        <label>
                            גודל הבית:
                            <input type="number" {...register("houseSize", { required: true })} />
                            {errors.houseSize && <span>שדה חובה</span>}
                        </label>
                        <br />
                    </>
                )}

                {requestType === "קניות" && (
                    <>
                        <label>
                            רשימת מוצרים:
                            <textarea {...register("shoppingList", { required: true })} />
                            {errors.shoppingList && <span>שדה חובה</span>}
                        </label>
                        <br />
                    </>
                )}

                {requestType === "אוזן קשבת" && (
                    <>
                        <label>
                            שיחת תמיכה:
                            <textarea {...register("supportCall", { required: true })} />
                            {errors.supportCall && <span>שדה חובה</span>}
                        </label>
                        <br />
                    </>
                )}

                <button type="submit">שליחה</button>
            </form>
        </>
    );
};

export default HelpRequestPage;
