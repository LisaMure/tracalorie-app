class CalorieTracker {
    constructor() {
        this._calorieLimit = 2000;
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = []

        this._displayCalorieLimit()
        this._displayTotalCalories()

    }

    addMeal(meal) {
        this._meals.push(meal)
        this._totalCalories += meal.calories
        this._render()
    }

    addWorkout(workout) {
        this._workouts.push(workout)
        this._totalCalories -= workout.calories
        this._render()
    }

    _displayCalorieLimit() {
        const calorieLimitEl = document.getElementById("calorie-limit")

        calorieLimitEl.innerHTML = this._calorieLimit
    }

    _displayTotalCalories() {
        const totalCaloriesEl = document.getElementById("calorie-total")

        totalCaloriesEl.innerHTML = totalCaloriesEl.innerHTML = this._totalCalories; 
    }

    _displayCaloriesConsumed() {
        const caloriesConsumed = document.getElementById("calories-consumed")

        const totalCalories = this._meals.reduce((total, meal) => total + meal.calories, 0)

        caloriesConsumed.innerHTML = totalCalories
    }

    _displayCaloriesBurned() {
        const caloriesBurned = document.getElementById("calories-burned")

        const totalCalories = this._workouts.reduce((total, workout) => total + workout.calories, 0)

        caloriesBurned.innerHTML = totalCalories
    }

    _displayCaloriesRemaining() {
        const caloriesRemaining = document.getElementById("calories-remaining")

        const remainingCalories = this._calorieLimit - this._totalCalories;

        caloriesRemaining.innerHTML = remainingCalories;
    }

  _render() {
    this._displayCalorieLimit()
    this._displayTotalCalories()
    this._displayCaloriesConsumed()
    this._displayCaloriesBurned()
    this._displayCaloriesRemaining()
  }
}

class Meal {
   constructor(meal, calories) {
    this.id =  this.id = Math.random().toString(16).slice(2);
    this.meal = meal;
    this.calories = calories
   }
}

class Workout {
    constructor(workout, calories) {
    this.id =  this.id = Math.random().toString(16).slice(2);
    this.workout = workout;
    this.calories = calories
    }
}

const tracker = new CalorieTracker()
const breakfast = new Meal("Breakfast", 500)
tracker.addMeal(breakfast)
const jog = new Workout("Jog", 250)
tracker.addWorkout(jog)
