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
        const progressBar = document.getElementById("progress-bar")
        const calorieTotal = document.getElementById("calorie-total")


        const remainingCalories = this._calorieLimit - this._totalCalories;

        caloriesRemaining.innerHTML = remainingCalories;

        if (remainingCalories <= 0) {
            progressBar.classList.remove("progress-bar-bg")
            progressBar.classList.add("bg-danger-custom")
            calorieTotal.parentElement.parentElement.classList.remove("calorie-gain")
            calorieTotal.parentElement.parentElement.classList.add("bg-danger-custom")
        } else {
            progressBar.classList.remove("bg-danger-custom")
            progressBar.classList.add("progress-bar-bg")
            calorieTotal.parentElement.parentElement.classList.remove("bg-danger-custom")
            calorieTotal.parentElement.parentElement.classList.add("calorie-gain")
        }
    }

    _updateProgressBar() {
        const progressBar = document.getElementById("progress-bar")
        const percentage = (this._totalCalories / this._calorieLimit) * 100
        const width = Math.min(percentage, 100)

        progressBar.style.width = `${width}%`
    }

  _render() {
    this._displayCalorieLimit()
    this._displayTotalCalories()
    this._displayCaloriesConsumed()
    this._displayCaloriesBurned()
    this._displayCaloriesRemaining()
    this._updateProgressBar()
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

class App {
    constructor() {
        this._tracker = new CalorieTracker();

        // Event listeners
        document.getElementById("meal-form").addEventListener("submit", this._newItem.bind(this, "meal"));

        document.getElementById("workout-form").addEventListener("submit", this._newItem.bind(this, "workout"));
    }

    // Add New Meal
    _newItem(type, event) {
        event.preventDefault();
        const name = document.getElementById(`${type}-name`);
        const calories = document.getElementById(`${type}-calories`);

        // Validate Input 
        if (name.value === "" || calories.value === "") {
            alert("Please fill in all fields");
            return;
        }

        // Check If Meal or Workout
        if(type === "meal") {
            const meal = new Meal(name.value, +calories.value);
            this._tracker.addMeal(meal);
        } else if (type === "workout") {
            const workout = new Workout(name.value, +calories.value);
            this._tracker.addWorkout(workout);

        }

        // Clear Form
        name.value = ""
        calories.value = ""
        
        // Collapse Form
        const collapseEl = document.getElementById(`collapse-${type}`)
        collapseEl.classList.remove("show")
        collapseEl.setAttribute("aria-expanded", "false")
    }
}

const app = new App();
