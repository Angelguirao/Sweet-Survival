// Game class
class Game {
    constructor(foodItems, insulinItems) {
      // Initialize game components
      this.gameContainer = document.getElementById('gameContainer');
      this.bloodGlucoseContainer = document.getElementById('bloodGlucoseContainer');
      this.character = document.createElement('div');
      this.bloodGlucoseLevel = document.createElement('div');
      this.bloodGlucoseBar = document.createElement('div');
      this.timerElement = document.createElement('div');

      this.character.id = 'character';
      this.bloodGlucoseLevel.id = 'bloodGlucoseLevel';
      this.bloodGlucoseBar.id = 'bloodGlucoseBar';
      this.timerElement.id = 'timer';

      this.gameContainer.appendChild(this.character);
      this.gameContainer.appendChild(this.bloodGlucoseLevel);
      this.gameContainer.appendChild(this.bloodGlucoseBar);
      this.gameContainer.appendChild(this.timerElement);

      this.foodItems = foodItems; // Assign food items to the property
      this.insulinItems = insulinItems; // Assign insulin items to the property
      this.startButton = null; // Store reference to the start button
    }

      // Function to start the game
      startGame() {
        // Create and add the start button
        this.createStartButton();
        this.gameContainer.appendChild(this.startButton);

        // Add event listener to start button
        this.startButton.addEventListener('click', () => {
          
          // Remove the start button
          this.gameContainer.removeChild(this.startButton);
          
          // Initialize game components
          this.initializeCharacter();
          this.initializeBloodGlucoseBar();
          this.initializeTimer();
          this.initializeFoodItems();;
        });
      }

      initializeCharacter() {
        // Set initial character properties and position
        this.character.style.width = '50px';
        this.character.style.height = '50px';
        this.character.style.backgroundColor = 'blue';
        this.character.style.position = 'absolute';
        this.character.style.left = Math.floor(Math.random() * (this.gameContainer.offsetWidth - 50)) + 'px';
        this.character.style.top = Math.floor(Math.random() * (this.gameContainer.offsetHeight - 50)) + 'px';
        // Add event listener for character movement
        document.addEventListener('keydown', (event) => {
          this.characterMovement(event);
      });
      }

      initializeBloodGlucoseBar() {
        // Set the initial blood glucose level randomly within the desired range
        this.minBloodGlucoseLevel = 70; // Specify the minimum blood glucose level
        this.maxBloodGlucoseLevel = 180; // Specify the maximum blood glucose level
        this.bloodGlucoseLevelValue = Math.floor(Math.random() * (this.maxBloodGlucoseLevel - this.minBloodGlucoseLevel + 1)) + this.minBloodGlucoseLevel;

         // Create the blood glucose bar
        this.bloodGlucoseBar = document.createElement('div');
        this.bloodGlucoseBar.style.height = '40px';
        this.bloodGlucoseBar.style.width = '0%';
        this.bloodGlucoseContainer.appendChild(this.bloodGlucoseBar);

          // Create the blood glucose value
        this.bloodGlucoseLevelText = document.createElement('div');
        this.bloodGlucoseLevelText.style.fontSize = '18px';
        this.bloodGlucoseLevelText.style.fontWeight = 'bold';
        this.bloodGlucoseLevelText.style.color = 'black';
        this.bloodGlucoseLevelText.innerHTML = this.bloodGlucoseLevelValue;
        this.bloodGlucoseContainer.appendChild(this.bloodGlucoseLevelText);

        // Update the blood glucose bar based on the initial level
        this.updateBloodGlucoseBar();
      }

      updateBloodGlucoseBar() {
        const fullWidth = this.gameContainer.offsetWidth;
        const levelPercentage = (this.bloodGlucoseLevelValue - this.minBloodGlucoseLevel) / (this.maxBloodGlucoseLevel - this.minBloodGlucoseLevel);
        const currentWidth = fullWidth * levelPercentage;

        this.bloodGlucoseBar.style.width = `${currentWidth}px`;

        if (this.bloodGlucoseLevelValue < 80) {
            this.bloodGlucoseBar.style.backgroundColor = 'blue';
          } else if (this.bloodGlucoseLevelValue >= 80 && this.bloodGlucoseLevelValue < 120) {
            this.bloodGlucoseBar.style.backgroundColor = 'green';
          } else if (this.bloodGlucoseLevelValue >= 120 && this.bloodGlucoseLevelValue < 160) {
            this.bloodGlucoseBar.style.backgroundColor = 'orange';
          } else if (this.bloodGlucoseLevelValue >= 160 && this.bloodGlucoseLevelValue <= 180) {
            this.bloodGlucoseBar.style.backgroundColor = 'red';
          } else {
            this.bloodGlucoseBar.style.backgroundColor = 'black';
          }

        this.bloodGlucoseLevelText.innerHTML = this.bloodGlucoseLevelValue;

        // Position the blood glucose level text to the right of the blood glucose bar
        const barRight = this.bloodGlucoseBar.offsetLeft + currentWidth;
        const textLeft = barRight + 10; // Add some extra spacing

        this.bloodGlucoseLevelText.style.position = 'absolute';
        this.bloodGlucoseLevelText.style.left = `${textLeft}px`;
        this.bloodGlucoseLevelText.style.top = this.bloodGlucoseBar.offsetTop + 'px';
      }

      updateBloodGlucoseLevel() {
        // Randomly select whether to increase or decrease the blood glucose level
        const increase = Math.random() < 0.5;
      
        // Generate a random fluctuation rate between 1 and 10
        const minFluctuationRate = 1;
        const maxFluctuationRate = 10;
        const fluctuationRate = Math.floor(Math.random() * (maxFluctuationRate - minFluctuationRate + 1)) + minFluctuationRate;
      
        // Update the blood glucose level based on the randomly selected increase/decrease and fluctuation rate
        if (increase) {
          this.bloodGlucoseLevelValue += fluctuationRate;
        } else {
          this.bloodGlucoseLevelValue -= fluctuationRate;
        }

         // Update the blood glucose level text
        this.bloodGlucoseLevelText.innerHTML = this.bloodGlucoseLevelValue;

        // Update the blood glucose bar
        this.updateBloodGlucoseBar();
      }

      initializeTimer() {
      
        this.timerElement.style.fontSize = '24px';
        this.timerElement.style.fontWeight = 'bold';
        this.timerElement.style.color = '#ffffff';
        this.timerElement.style.backgroundColor = '#000000';
        this.timerElement.style.padding = '10px';
        this.timerElement.style.borderRadius = '5px';
        this.timerElement.style.position = 'absolute';
        this.timerElement.style.top = '10px';
        this.timerElement.style.right = '10px';

        // Generate a random time limit between 30 seconds and 1 minute
        const minTimeLimit = 30; // Minimum time limit in seconds
        const maxTimeLimit = 60; // Maximum time limit in seconds
        const randomTimeLimit = Math.floor(Math.random() * (maxTimeLimit - minTimeLimit + 1)) + minTimeLimit;

        this.currentTime = randomTimeLimit;

        // Update the timer element with the initial time
        this.timerElement.innerHTML = this.currentTime;

        // Start the countdown timer
        this.startCountdown();

        // Start updating the blood glucose level at regular intervals
        setInterval(() => {
          this.updateBloodGlucoseLevel();
        }, 1000);

        }

        startCountdown() {
          this.timerInterval = setInterval(() => {
            this.currentTime--;
            this.timerElement.innerHTML = this.currentTime;
          }, 1000);
        }

        initializeFoodItems(maxFoodItems) {
          const shuffledFoodItems = this.shuffleArray(this.foodItems);
          const foodItemsToDisplay = shuffledFoodItems.slice(0, maxFoodItems);
  
          for (let i = 0; i < foodItemsToDisplay.length; i++) {
            const randomFoodItem = foodItemsToDisplay[i];
            const foodItem = document.createElement('img');
            foodItem.src = randomFoodItem.imageSrc;
            foodItem.style.width = '30px';
            foodItem.style.height = '30px';
            const containerWidth = this.gameContainer.offsetWidth;
            const containerHeight = this.gameContainer.offsetHeight;
            const positionX = Math.floor(Math.random() * (containerWidth - 50));
            const positionY = Math.floor(Math.random() * (containerHeight - 50));
            foodItem.style.position = 'absolute';
            foodItem.style.left = positionX + 'px';
            foodItem.style.top = positionY + 'px';
      
            // Set data attributes for food properties
            foodItem.dataset.name = randomFoodItem.name;
            foodItem.dataset.carbsPer100gr = randomFoodItem.carbsPer100gr;
            foodItem.dataset.glycemicIndex = randomFoodItem.glycemicIndex;
      
            this.foodItems[i] = foodItem;
            this.gameContainer.appendChild(foodItem);
          }
        }
        
        shuffleArray(array) {
          // This function randomly shuffles the elements of an array using the Fisher-Yates shuffle algorithm:
  
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }
      
        characterMovement(event) {
          const step = 10;
          
          const containerRect = this.gameContainer.getBoundingClientRect();
          const containerLeft = containerRect.left;
          const containerTop = containerRect.top;
          const containerWidth = containerRect.width;
          const containerHeight = containerRect.height;
        
          const characterRect = this.character.getBoundingClientRect();
          const characterLeft = characterRect.left - containerLeft;
          const characterTop = characterRect.top - containerTop;
        
          if (event.keyCode === 37 && characterLeft > 0) {
            this.character.style.left = Math.max(characterLeft - step, 0) + 'px';
          } else if (event.keyCode === 39 && characterLeft + characterRect.width < containerWidth) {
            this.character.style.left = Math.min(characterLeft + step, containerWidth - characterRect.width) + 'px';
          } else if (event.keyCode === 38 && characterTop > 0) {
            this.character.style.top = Math.max(characterTop - step, 0) + 'px';
          } else if (event.keyCode === 40 && characterTop + characterRect.height < containerHeight) {
            this.character.style.top = Math.min(characterTop + step, containerHeight - characterRect.height) + 'px';
          }
        
          // Check for collision with food items
          this.checkCollisionWithFoodItems();
        }
      
      checkCollisionWithFoodItems() {
        const characterRect = this.character.getBoundingClientRect();
    
        for (let i = 0; i < this.foodItems.length; i++) {
          const foodItem = this.foodItems[i];
          const foodItemRect = foodItem.getBoundingClientRect();
    
          if (
            characterRect.top < foodItemRect.bottom &&
            characterRect.bottom > foodItemRect.top &&
            characterRect.left < foodItemRect.right &&
            characterRect.right > foodItemRect.left
          ) {
            // Collision detected
            this.displayFoodProperties(foodItem);
            this.gameContainer.removeChild(foodItem);
            this.foodItems.splice(i, 1);
            break;
          }
        }
      }
      
      displayFoodProperties(foodItem) {
        const name = foodItem.dataset.name;
        const carbsPer100gr = foodItem.dataset.carbsPer100gr;
        const glycemicIndex = foodItem.dataset.glycemicIndex;
    
        alert(`Food: ${name}\nCarbs per 100g: ${carbsPer100gr}\nGlycemic Index: ${glycemicIndex}`);
      }

        // Function to create the start button
        createStartButton() {
          this.startButton = document.createElement('button');
          this.startButton.textContent = 'Start';
          this.startButton.style.fontSize = '20px';
          this.startButton.style.padding = '10px 20px';
          this.startButton.style.marginTop = '20px';
          this.startButton.style.position = 'absolute';
          this.startButton.style.left = '50%';
          this.startButton.style.top = '50%';
          this.startButton.style.transform = 'translate(-50%, -50%)';
        }
      
  }
  
  // Character class
  class Character {
    constructor() {
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
  const game = new Game(foodItems, insulinItems);
  
 // Start the game
game.startGame();
  