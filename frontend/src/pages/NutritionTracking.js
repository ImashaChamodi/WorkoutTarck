
import React, { useState } from 'react';
import '../styles/NutritionTracking.css';

const CALORIC_LEVELS = {
    LOW: 1000,
    MODERATE: 2000,
    HIGH: 3000,
    VERY_HIGH: 4000
};

function NutritionTracking() {
    const [foodItem, setFoodItem] = useState('');
    const [calories, setCalories] = useState('');
    const [nutritionData, setNutritionData] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    
    const handleAddNutrition = (e) => {
        e.preventDefault();
        if (!foodItem || !calories) return;

        const newEntry = {
            foodItem,
            calories,
            date
        };

        setNutritionData([...nutritionData, newEntry]);
        setFoodItem('');
        setCalories('');
    };

    const getTotalCaloriesForDate = (targetDate) => {
        return nutritionData
            .filter(item => item.date === targetDate)
            .reduce((total, item) => total + parseInt(item.calories), 0);
    };

    const getCaloricLevel = (totalCalories) => {
        if (totalCalories <= CALORIC_LEVELS.LOW) return 'Low';
        if (totalCalories <= CALORIC_LEVELS.MODERATE) return 'Moderate';
        if (totalCalories <= CALORIC_LEVELS.HIGH) return 'High';
        return 'Very High';
    };

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
    const twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0];

    const todayCalories = getTotalCaloriesForDate(today);
    const yesterdayCalories = getTotalCaloriesForDate(yesterday);
    const twoDaysAgoCalories = getTotalCaloriesForDate(twoDaysAgo);

    return (
        <div className="nutrition-container">
            <h2>Nutrition Tracking</h2>
            <form className="nutrition-form" onSubmit={handleAddNutrition}>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="foodItem">Food Item:</label>
                    <input
                        type="text"
                        id="foodItem"
                        value={foodItem}
                        onChange={(e) => setFoodItem(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="calories">Calories:</label>
                    <input
                        type="number"
                        id="calories"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Nutrition</button>
            </form>
            <div className="nutrition-cards">
                <div className="card">
                    <h3>Today's Intake</h3>
                    <p>Total Calories: {todayCalories}</p>
                    <p>Level: {getCaloricLevel(todayCalories)}</p>
                </div>
                <div className="card">
                    <h3>Yesterday's Intake</h3>
                    <p>Total Calories: {yesterdayCalories}</p>
                    <p>Level: {getCaloricLevel(yesterdayCalories)}</p>
                </div>
                <div className="card">
                    <h3>Two Days Ago Intake</h3>
                    <p>Total Calories: {twoDaysAgoCalories}</p>
                    <p>Level: {getCaloricLevel(twoDaysAgoCalories)}</p>
                </div>
            </div>
        </div>
    );
}

export default NutritionTracking;
