// Game code goes here

// Game class
class Game {
    constructor() {
      // Initialize game components
      this.gameContainer = document.getElementById('gameContainer');
      this.character = document.createElement('div');
      this.foodItemsContainer = document.createElement('div');
      this.insulinItemsContainer = document.createElement('div');
      this.bloodGlucoseLevel = document.createElement('div');
      this.progressBar = document.createElement('div');
      this.messages = document.createElement('div');
      this.bloodGlucoseBarContainer = document.createElement('div');
      this.bloodGlucoseBar = document.createElement('div');
      this.timerElement = document.createElement('div');

  
      this.character.id = 'character';
      this.foodItemsContainer.id = 'foodItemsContainer';
      this.insulinItemsContainer.id = 'insulinItemsContainer';
      this.bloodGlucoseLevel.id = 'bloodGlucoseLevel';
      this.progressBar.id = 'progressBar';
      this.messages.id = 'messages';
      this.bloodGlucoseBarContainer.id = 'bloodGlucoseBarContainer';
      this.bloodGlucoseBar.id = 'bloodGlucoseBar';
      this.timerElement.id = 'timer';

  
      this.gameContainer.appendChild(this.character);
      this.gameContainer.appendChild(this.foodItemsContainer);
      this.gameContainer.appendChild(this.insulinItemsContainer);
      this.gameContainer.appendChild(this.bloodGlucoseLevel);
      this.gameContainer.appendChild(this.progressBar);
      this.gameContainer.appendChild(this.messages);
      this.gameContainer.appendChild(this.bloodGlucoseBar);
      this.gameContainer.appendChild(this.timerElement);

      this.foodItems = foodItems;
      this.insulinItems = insulinItems;

    }
  
    startGame() {
        // Initialize game components
        this.initializeCharacter();
        this.initializeFoodItems();
        this.initializeInsulinItems();
        this.initializeBloodGlucoseBar();
        this.initializeTimer();

        // Other initialization steps
      
        // Start the game loop
        this.gameLoop();
      }
      
      initializeCharacter() {
        // Set initial character properties and position
        this.character.style.width = '50px';
        this.character.style.height = '50px';
        this.character.style.backgroundColor = 'blue';
        this.character.style.position = 'absolute';
        this.character.style.left = '0';
        this.character.style.top = '0';
        // Add event listener for character movement
        document.addEventListener('keydown', (event) => {
          this.characterMovement(event);
        });
      }
      
      initializeFoodItems() {
        // Generate and position food items for the level
        for (let i = 0; i < 5; i++) {
          const randomFoodItem = foodItems[Math.floor(Math.random() * foodItems.length)];
          const foodItem = document.createElement('img');
          foodItem.src = randomFoodItem.imageSrc;
          foodItem.style.width = '30px';
          foodItem.style.height = '30px';
          const positionX = Math.floor(Math.random() * 500); // Adjust as needed
          const positionY = Math.floor(Math.random() * 300); // Adjust as needed
          foodItem.style.position = 'absolute';
          foodItem.style.left = positionX + 'px';
          foodItem.style.top = positionY + 'px';
          this.foodItems.push(foodItem);
          this.foodItemsContainer.appendChild(foodItem);
        }
      }
      
      initializeInsulinItems() {
        // Generate and position insulin items for the level
        for (let i = 0; i < 2; i++) {
          const randomInsulinItem = insulinItems[Math.floor(Math.random() * insulinItems.length)];
          const insulinItem = document.createElement('img');
          insulinItem.src = randomInsulinItem.imageSrc;
          insulinItem.style.width = '50px';
          insulinItem.style.height = '50px';
          const positionX = Math.floor(Math.random() * 500); // Adjust as needed
          const positionY = Math.floor(Math.random() * 300); // Adjust as needed
          insulinItem.style.position = 'absolute';
          insulinItem.style.left = positionX + 'px';
          insulinItem.style.top = positionY + 'px';
          this.insulinItemsContainer.appendChild(insulinItem);
        }
      }

      initializeBloodGlucoseBar() {
        // Set the initial blood glucose level randomly within the desired range
        this.minBloodGlucoseLevel = 70; // Specify the minimum blood glucose level
        this.maxBloodGlucoseLevel = 180; // Specify the maximum blood glucose level
        this.bloodGlucoseLevelValue = Math.floor(Math.random() * (this.maxBloodGlucoseLevel - this.minBloodGlucoseLevel + 1)) + this.minBloodGlucoseLevel;

        // Update the blood glucose bar based on the initial level
        this.updateBloodGlucoseBar();
        
      }

      updateBloodGlucoseBar() {
        const fullWidth = this.gameContainer.offsetWidth;
        const levelPercentage = (this.bloodGlucoseLevelValue - this.minBloodGlucoseLevel) / (this.maxBloodGlucoseLevel - this.minBloodGlucoseLevel);
        const currentWidth = fullWidth * levelPercentage;

        this.bloodGlucoseBar.style.height = '20px';
        this.bloodGlucoseBar.style.width = `${currentWidth}px`;
        
        this.bloodGlucoseBar.style.position = 'absolute';
        this.bloodGlucoseBar.style.bottom = '-70px';


        if (this.bloodGlucoseLevelValue < 80) {
            this.bloodGlucoseBar.style.backgroundColor = 'blue';
          } else if (this.bloodGlucoseLevelValue >= 80 && this.bloodGlucoseLevelValue < 120) {
            this.bloodGlucoseBar.style.backgroundColor = 'green';
          } else if (this.bloodGlucoseLevelValue >= 120 && this.bloodGlucoseLevelValue < 160) {
            this.bloodGlucoseBar.style.backgroundColor = 'orange';
          } else if (this.bloodGlucoseLevelValue >= 160 && this.bloodGlucoseLevelValue <= 180) {
            this.bloodGlucoseBar.style.backgroundColor = 'red';
          } else {
            this.bloodGlucoseBar.style.backgroundColor = 'black'; // Default color if none of the conditions match
          }
      }

      initializeTimer() {
        // Set the time limit (in seconds)
        this.timerElement.style.fontSize = '24px';
        this.timerElement.style.fontWeight = 'bold';
        this.timerElement.style.color = '#ffffff';
        this.timerElement.style.backgroundColor = '#000000';
        this.timerElement.style.padding = '10px';
        this.timerElement.style.borderRadius = '5px';
        this.timerElement.style.position = 'absolute';
        this.timerElement.style.top = '10px';
        this.timerElement.style.right = '10px';
      
        // Generate a random time limit between 30 seconds and 1 minute (adjust as needed)
        const minTimeLimit = 30; // Minimum time limit in seconds
        const maxTimeLimit = 60; // Maximum time limit in seconds
        const randomTimeLimit = Math.floor(Math.random() * (maxTimeLimit - minTimeLimit + 1)) + minTimeLimit;
      
        // Start the timer
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
          this.updateTimer();
        }, 1000);
      
        // Start the timer with the generated time limit
        this.timeLimit = randomTimeLimit;
      }
      
      updateTimer() {
        // Calculate the elapsed time
        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - this.startTime) / 1000);
      
        // Calculate the remaining time
        const remainingTime = this.timeLimit - elapsedTime;
      
        // Update the timer element
        this.timerElement.textContent = `Time: ${remainingTime}s`;
      
        // Add a CSS class to the timer element when the time is running out
        if (remainingTime <= 10) {
          this.timerElement.classList.add('timer-urgent');
        } else {
          this.timerElement.classList.remove('timer-urgent');
        }
      
        // Check if the time limit is reached
        if (remainingTime <= 0) {
          this.gameOver();
        }
      }
      
      gameLoop() {
        // Update the game state
        this.update();
      
        // Render the game visuals
        this.render();
      
        // Check for level completion or game over
        if (this.checkLevelCompletion()) {
          this.nextLevel();
        } else if (this.checkGameOver()) {
          this.gameOver();
        } else {
          // Continue the game loop
          requestAnimationFrame(() => {
            this.gameLoop();
          });
        }
      }
      
      characterMovement(event) {
        const speed = 10;
        const containerWidth = this.gameContainer.offsetWidth;
        const containerHeight = this.gameContainer.offsetHeight;
        const characterWidth = this.character.offsetWidth;
        const characterHeight = this.character.offsetHeight;
        const characterPositionX = parseInt(this.character.style.left);
        const characterPositionY = parseInt(this.character.style.top);
      
        let newPositionX = characterPositionX;
        let newPositionY = characterPositionY;
      
        if (event.key === 'ArrowUp') {
          newPositionY = Math.max(characterPositionY - speed, 0);
        } else if (event.key === 'ArrowDown') {
          newPositionY = Math.min(characterPositionY + speed, containerHeight - characterHeight);
        } else if (event.key === 'ArrowLeft') {
          newPositionX = Math.max(characterPositionX - speed, 0);
        } else if (event.key === 'ArrowRight') {
          newPositionX = Math.min(characterPositionX + speed, containerWidth - characterWidth);
        }
      
        this.character.style.left = newPositionX + 'px';
        this.character.style.top = newPositionY + 'px';
      }
  
    update() {
      // Update game state
    }
  
    render() {
      // Render game visuals
    }
  
    gameOver() {
      // Handle game over condition
    }
  }
  
  // Character class
  class Character {
    constructor() {
    }
  
    move(direction) {
      // Move the character
    }
  
    collideWithFood(foodItem) {
      // Handle collision with food item
    }
  
    collideWithInsulin(insulinItem) {
      // Handle collision with insulin item
    }
  
    eatFood(portions) {
      // Process food consumption
    }
  
    administerInsulin(units, type) {
      // Process insulin administration
    }
  }
  
  // FoodItem class
class FoodItem {
    constructor(name, imageSrc, carbsPer100gr, glycemicIndex) {
      this.name = name;
      this.imageSrc = imageSrc;
      this.carbsPer100gr = carbsPer100gr;
      this.glycemicIndex = glycemicIndex;
    }
  }
  
  // Create sample food items
  const foodItems = [
    new FoodItem('Apple', 'istockphoto-1141529240-612x612.jpg', 14, 40),
    new FoodItem('Banana', 'descarga.jpg', 22, 52),
    new FoodItem('Orange', 'orange photo.jpg', 11, 42),
    // Add more food items as needed
  ];
  
  // InsulinItem class
class InsulinItem {
    constructor(name, imageSrc, unitsPerDose, type) {
      this.name = name;
      this.imageSrc = imageSrc;
      this.unitsPerDose = unitsPerDose;
      this.type = type;
    }
  }
  
  // Create sample insulin items
  const insulinItems = [
    new InsulinItem('Basal Insulin', 'basal-insulin.png', 10, 'basal'),
    new InsulinItem('Bolus Insulin', 'bolus-insulin.png', 5, 'bolus'),
    // Add more insulin items as needed
  ];
  
  // Create an instance of the Game class
  const game = new Game();
  
  // Start the game
  game.startGame();
  