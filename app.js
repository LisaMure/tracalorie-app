class CalorieTracker {
    constructor() {
        this._calorieLimit = 2000;
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = []

        this._displayCalorieLimit()
        this._displayTotalCalories()
        this._displayCaloriesConsumed()
        this._displayCaloriesBurned()
        this._displayCaloriesRemaining()

    }

    // Public Methods

    // Add meal
    addMeal(meal) {
        this._meals.push(meal)
        this._totalCalories += meal.calories
        this._displayNewMeal(meal)
        this._render()
    }

    // Add Workout
    addWorkout(workout) {
        this._workouts.push(workout)
        this._totalCalories -= workout.calories
        this._displayNewWorkout(workout)
        this._render()
    }

    // Remove Meal
    removeMeal(id) {
       const index = this._meals.findIndex(meal => meal.id === id)
            if (index !== -1) {
               const removedMeal = this._meals.splice(index, 1)[0];
               this._totalCalories -= removedMeal.calories;
               this._render()
            }
    }

    
    // Remove Workout
    removeWorkout(id) {
       const index = this._workouts.findIndex(workout => workout.id === id)
            if (index !== -1) {
               const removedWorkout = this._workouts.splice(index, 1)[0];
               this._totalCalories -= removedWorkout.calories;
               this._render()
            }
    }

    setLimit(limit) {
        this._calorieLimit = limit
        this._render()
    }

    resetDay() {
        this._meals = []
        this._workouts = []
        this._totalCalories = 0
        this._render()
    }

    // Private Methods

    // Display Calorie Limit
    _displayCalorieLimit() {
        const calorieLimitEl = document.getElementById("calorie-limit")

        calorieLimitEl.innerHTML = this._calorieLimit
    }

    // Display Total Calories
    _displayTotalCalories() {
        const totalCaloriesEl = document.getElementById("calorie-total")

        totalCaloriesEl.innerHTML = totalCaloriesEl.innerHTML = this._totalCalories; 
    }

    // Display Calories Consumed
    _displayCaloriesConsumed() {
        const caloriesConsumed = document.getElementById("calories-consumed")

        const totalCalories = this._meals.reduce((total, meal) => total + meal.calories, 0)

        caloriesConsumed.innerHTML = totalCalories
    }

    // Display Calories Burned
    _displayCaloriesBurned() {
        const caloriesBurned = document.getElementById("calories-burned")
        
        const totalCalories = this._workouts.reduce((total, workout) => total + workout.calories, 0)

        caloriesBurned.innerHTML = totalCalories
    }

    // Display Calories Remaining
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

    // Update Progress Bar
    _updateProgressBar() {
        const progressBar = document.getElementById("progress-bar")
        const percentage = (this._totalCalories / this._calorieLimit) * 100
        const width = Math.min(percentage, 100)

        progressBar.style.width = `${width}%`
    }

    // Display New Meal
    _displayNewMeal(meal) {
        const newMeal = document.getElementById("new-meal-item")
        const mealEl = document.createElement("div")
        mealEl.classList.add("card", "w-100", "meals-item", "mt-3") 
        // Set attribute for id to be used when removing item
        mealEl.setAttribute('data-id', meal.id);

        mealEl.innerHTML = `
        <div class="card-body d-flex justify-content-between align-items-center">
            <p>${meal.name}</p>
            <button class="btn meal-calories-btn px-5 py-0">${meal.calories}</button>
            <p class="m-0"> 
                <i class="fa-solid fa-square-xmark fa-lg"></i>
            </p>
        </div>
    `;
    newMeal.appendChild(mealEl);
    }

    // Display New Workout
    _displayNewWorkout(workout) {
        const newWorkout = document.getElementById("new-workout-item")
        const workoutEl = document.createElement("div")
        workoutEl.classList.add("card", "w-100", "workouts-item", "mt-3") 
        // Set attribute for id to be used when removing item
        workoutEl.setAttribute('data-id', workout.id);

        workoutEl.innerHTML = `
        <div class="card-body d-flex justify-content-between align-items-center">
            <p>${workout.name}</p>
            <button class="btn workout-calories-btn px-5 py-0">${workout.calories}</button>
            <p class="m-0"> 
                <i class="fa-solid fa-square-xmark fa-lg"></i>
            </p>
        </div>
    `;
    newWorkout.appendChild(workoutEl);
    }

//   To re-render the methods
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
    this.id = Math.random().toString(16).slice(2);
    this.name = meal;
    this.calories = calories
   }
}

class Workout {
    constructor(workout, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = workout;
    this.calories = calories
    }
}

class App {
    constructor() {
        this._tracker = new CalorieTracker();

        // Event listeners

        // New Items events
        document.getElementById("meal-form").addEventListener("submit", this._newItem.bind(this, "meal"));

        document.getElementById("workout-form").addEventListener("submit", this._newItem.bind(this, "workout"));

        // Remove Items events
        document.getElementById("new-meal-item").addEventListener("click", this._removeItem.bind(this, "meal"))

        document.getElementById("new-workout-item").addEventListener("click", this._removeItem.bind(this, "workout"))

        // Filter events
        document.getElementById("meals-filter").addEventListener("keyup", this._filterItems.bind(this, "meals"))

        document.getElementById("workouts-filter").addEventListener("keyup", this._filterItems.bind(this, "workouts"))

        // Reset Btn event
        document.getElementById("reset-btn").addEventListener("click", this._reset.bind(this))

        // Daily Limit Form event 
        document.getElementById("limit-form").addEventListener("submit", this._setLimit.bind(this))
    }

    // Add New Item
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
    const collapseEl = document.getElementById(`collapse-${type}`);
    collapseEl.classList.remove("show");
    collapseEl.setAttribute("aria-expanded", "false");
}

// Remove Item
_removeItem(type, event) {
if (event.target.classList.contains("fa-square-xmark")) {
    const item = event.target.closest(".card")
    const id = item.getAttribute("data-id")

    if (confirm("Are you sure you want to delete this item")) {

        if (type === "meal") {
            this._tracker.removeMeal(id)
           } else if (type === "workout") {
            this._tracker.removeWorkout(id)
           }
    }
    item.remove()
}
}

_filterItems(type, event) {
    event.preventDefault()

    const inputText = document.getElementById(`${type}-filter`).value.toLowerCase()
    console.log(inputText)
    
    const items = document.querySelectorAll(`.${type}-item`);

    items.forEach(item => {
        const itemName = item.querySelector("p").textContent.toLowerCase();

         if(itemName.includes(inputText)) {
            item.style.display = "block";
        } else {
             item.style.display = "none";
        }
        
        });

        inputText = ""
    }

    _reset() {
        this._tracker.resetDay()
        document.getElementById("new-meal-item").innerHTML = ""
        document.getElementById("new-workout-item").innerHTML = ""
        document.getElementById("meals-filter").value = "";
        document.getElementById("workouts-filter").value = "";
    }

    _setLimit(event) {
        event.preventDefault()

        const input = document.getElementById("limit-input");
        const limit = input.value;

        if (limit === "") {
            alert("Please enter a limit");
        } else {
            this._tracker.setLimit(+limit);
        }

        // Collapse Modal
        const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
        modal.hide();
    }
}




const app = new App();
