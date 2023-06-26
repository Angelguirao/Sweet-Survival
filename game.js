// Game class
class Game {
    constructor(foodItems, insulinItems) {
      // Initialize game components
      this.gameContainer = document.getElementById('gameContainer');
      this.bloodGlucoseContainer = document.getElementById('bloodGlucoseContainer');
      this.character = document.createElement('div');
      this.timerElement = document.createElement('div');
      this.minBloodGlucoseTarget = document.createElement('div');
      this.maxBloodGlucoseTarget = document.createElement('div');
      this.resultElement = document.createElement('div');

      // Set the IDs and styles for the game components

      this.character.id = 'character';
      this.timerElement.id = 'timer';
      this.minBloodGlucoseTarget.id = 'minBloodGlucoseTarget';
      this.maxBloodGlucoseTarget.id = 'maxBloodGlucoseTarget';
      this.resultElement.id = 'result';

      // Append the game components to the respective containers

      this.gameContainer.appendChild(this.character);
      this.gameContainer.appendChild(this.timerElement);
      this.bloodGlucoseContainer.appendChild(this.minBloodGlucoseTarget);
      this.bloodGlucoseContainer.appendChild(this.maxBloodGlucoseTarget);
      this.gameContainer.appendChild(this.resultElement);
      
      // Store the food items and insulin items

      this.foodItems = foodItems; // Assign food items to the property
      this.insulinItems = insulinItems; // Assign insulin items to the property

      // Initialize other properties

      this.startButton = null; // Store reference to the start button
      this.timerInterval = null; // Store reference to the timer interval
      this.bloodGlucoseUpdateInterval = null; // Store reference to the blood glucose update interval
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
          this.initializeFoodItems(5); // Set the maximum number of food items to display
          this.initializeInsulinItems(5); // Set the maximum number of insulin items to display
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

        // Add a property for storing the direction of the blood glucose level
        this.bloodGlucoseDirection = Math.random() < 0.5 ? 'increase' : 'decrease';

         // Create the blood glucose bar
        this.bloodGlucoseBar = document.createElement('div');
        this.bloodGlucoseBar.style.height = '40px';
        this.bloodGlucoseBar.style.width = '100%';
        this.bloodGlucoseBar.style.borderRadius = '5px';
        this.bloodGlucoseContainer.appendChild(this.bloodGlucoseBar);

          // Create the blood glucose value
        this.bloodGlucoseLevelText = document.createElement('div');
        this.bloodGlucoseLevelText.style.fontSize = '30px';
        this.bloodGlucoseLevelText.style.fontWeight = 'bold';
        this.bloodGlucoseLevelText.style.color = 'black';
        this.bloodGlucoseLevelText.innerHTML = this.bloodGlucoseLevelValue;
        this.bloodGlucoseContainer.appendChild(this.bloodGlucoseLevelText);

          // Create the blood glucose min and max targets

        this.minBloodGlucoseTarget.style.width = '50px';
        this.minBloodGlucoseTarget.style.height = '50px';
        this.minBloodGlucoseTarget.style.backgroundColor = 'white';
        this.minBloodGlucoseTarget.style.color = 'red';
        this.minBloodGlucoseTarget.style.fontSize = '30px';
        this.minBloodGlucoseTarget.style.fontWeight = 'bold';

        this.maxBloodGlucoseTarget.style.width = '50px';
        this.maxBloodGlucoseTarget.style.height = '50px';
        this.maxBloodGlucoseTarget.style.backgroundColor = 'white';
        this.maxBloodGlucoseTarget.style.color = 'red';
        this.maxBloodGlucoseTarget.style.fontSize = '30px';
        this.maxBloodGlucoseTarget.style.fontWeight = 'bold';

        this.minBloodGlucoseTarget.innerHTML = this.minBloodGlucoseLevel;
        this.maxBloodGlucoseTarget.innerHTML = this.maxBloodGlucoseLevel;

         // Position the blood glucose min and max targets
        this.positionBloodGlucoseTargets();

        // Update the blood glucose bar based on the initial level
        this.updateBloodGlucoseBar();
      }

      positionBloodGlucoseTargets() {
        const barWidth = this.bloodGlucoseBar.offsetWidth;
        const barLeft = this.bloodGlucoseBar.offsetLeft;
        const barTop = this.bloodGlucoseBar.offsetTop;
      
        // Calculate the position of the targets relative to the blood glucose bar
        const targetWidth = this.minBloodGlucoseTarget.offsetWidth;
        const targetHeight = this.minBloodGlucoseTarget.offsetHeight;
        const targetTop = barTop - targetHeight;
      
        // Position the min target to the left of the blood glucose container
        const minTargetLeft = barLeft - targetWidth;
        this.minBloodGlucoseTarget.style.position = 'absolute';
        this.minBloodGlucoseTarget.style.left = `${minTargetLeft}px`;
        this.minBloodGlucoseTarget.style.top = `${targetTop}px`;
      
        // Position the max target to the right of the blood glucose container
        const maxTargetLeft = barLeft + barWidth;
        this.maxBloodGlucoseTarget.style.position = 'absolute';
        this.maxBloodGlucoseTarget.style.left = `${maxTargetLeft}px`;
        this.maxBloodGlucoseTarget.style.top = `${targetTop}px`;
      }
      
      updateBloodGlucoseBar() {
        const fullWidth = this.gameContainer.offsetWidth;
        const levelPercentage = (this.bloodGlucoseLevelValue - this.minBloodGlucoseLevel) / (this.maxBloodGlucoseLevel - this.minBloodGlucoseLevel);
        const currentWidth = fullWidth * levelPercentage;

        // Update the width of the variable blood glucose bar
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
      
        // Update the blood glucose level based on the stored direction
        if (this.bloodGlucoseDirection === 'increase') {
          this.bloodGlucoseLevelValue += fluctuationRate;
        } else {
          this.bloodGlucoseLevelValue -= fluctuationRate;
        }

        // Check if blood glucose level is outside the winning range
        if (this.bloodGlucoseLevelValue < 70 || this.bloodGlucoseLevelValue > 180) {
          this.showResult('lose');
          clearInterval(this.timerInterval);
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
        this.bloodGlucoseUpdateInterval = setInterval(() => {
          this.updateBloodGlucoseLevel();
        }, 2000);

        }

        startCountdown() {
          this.timerInterval = setInterval(() => {
            this.currentTime--;
            this.timerElement.innerHTML = this.currentTime;
        
              // Check if time is up
              if (this.currentTime === 0) {
                // Check if blood glucose is within the winning range
                if (this.bloodGlucoseLevelValue >= 70 && this.bloodGlucoseLevelValue <= 180) {
                  this.showResult('win');
                } else {
                  this.showResult('lose');
                }
                clearInterval(this.timerInterval);
}
          }, 1000);
        }

        showResult(outcome) {
          if (outcome === 'win') {
            this.resultElement.innerHTML = 'You are a blood glucose master!';
            this.resultElement.style.color = 'green';
          } else if (outcome === 'lose') {
            this.resultElement.innerHTML = 'Your blood sugar levels are out of range!';
            this.resultElement.style.color = 'red';
          }

          this.resultElement.style.fontSize = '24px';
          this.resultElement.style.fontWeight = 'bold';
          this.resultElement.style.position = 'absolute';
          this.resultElement.style.top = '50%';
          this.resultElement.style.left = '50%';
          this.resultElement.style.transform = 'translate(-50%, -50%)';
          clearInterval(this.bloodGlucoseUpdateInterval);
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
            foodItem.dataset.totalCarbs = randomFoodItem.totalCarbs;
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
        const totalCarbs = foodItem.dataset.totalCarbs;
        const glycemicIndex = foodItem.dataset.glycemicIndex;

        const alertContent = document.createElement('div');
        alertContent.style.fontFamily = 'Arial, sans-serif';
        alertContent.style.fontSize = '18px';
        alertContent.style.padding = '10px';

        const title = document.createElement('h2');
        title.style.marginTop = '0';
        title.style.marginBottom = '10px';
        title.textContent = 'Food Item';

        const foodName = document.createElement('p');
        foodName.style.marginTop = '0';
        foodName.textContent = `Name: ${name}`;

        const carbs = document.createElement('p');
        carbs.style.marginTop = '0';
        carbs.textContent = `Total Carbs: ${totalCarbs}`;

        const glycemic = document.createElement('p');
        glycemic.style.marginTop = '0';
        glycemic.textContent = `Glycemic Index: ${glycemicIndex}`;

        alertContent.appendChild(title);
        alertContent.appendChild(foodName);
        alertContent.appendChild(carbs);
        alertContent.appendChild(glycemic);

        const alertStyles = `
          background-color: #ffffff;
          border: 2px solid #000000;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          padding: 20px;
          font-family: Arial, sans-serif;
          font-size: 18px;
        `;

         // Create the modal dialog elements
          const modal = document.createElement('div');
          modal.style.position = 'fixed';
          modal.style.top = '0';
          modal.style.left = '0';
          modal.style.width = '100%';
          modal.style.height = '100%';
          modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
          modal.style.display = 'flex';
          modal.style.justifyContent = 'center';
          modal.style.alignItems = 'center';
          
          const dialog = document.createElement('div');
          dialog.style.maxWidth = '500px';
          dialog.style.background = 'white';
          dialog.style.borderRadius = '5px';
          dialog.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
          dialog.style.padding = '20px';

          
          dialog.innerHTML = `
          <h2 style="margin-top: 0; margin-bottom: 10px;">Food Item</h2>
          <p style="margin-top: 0;">Name: ${name}</p>
          <p style="margin-top: 0;">Total Carbs: ${totalCarbs}</p>
          <p style="margin-top: 0;">Glycemic Index: ${glycemicIndex}</p>
        `;
        
        const eatButton = document.createElement('button');
          eatButton.textContent = 'Eat';
          eatButton.style.backgroundColor = '#ffffff';
          eatButton.style.border = '1px solid #000000';
          eatButton.style.borderRadius = '5px';
          eatButton.style.padding = '10px 20px';
          eatButton.style.cursor = 'pointer';
          eatButton.addEventListener('click', () => {
            const totalCarbsIntake = parseInt(totalCarbs);
            const glycemicIndexIntake = parseInt(glycemicIndex);
          
            const totalImpact = totalCarbsIntake * 5;
            let increasingRate;
          
            if (glycemicIndexIntake < 55) {
              increasingRate = 1;
            } else if (glycemicIndexIntake >= 56 && glycemicIndexIntake <= 69) {
              increasingRate = 0.5;
            } else if (glycemicIndexIntake > 70) {
              increasingRate = 0.2;
            }
          
            let currentImpact = 0;
            const interval = setInterval(() => {
              if (currentImpact >= totalImpact || this.currentTime === 0 ||
                (this.bloodGlucoseLevelValue < 70 || this.bloodGlucoseLevelValue > 180)) {
                clearInterval(interval);
                return;
              }
          
              this.bloodGlucoseLevelValue += increasingRate;
              currentImpact += increasingRate;
          
              // Update the blood glucose level text and bar
              this.updateBloodGlucoseBar();
            }, 1000);
          
            // Remove the modal dialog
            document.body.removeChild(modal);
          });

        const closeButton = document.createElement('button');
          closeButton.textContent = 'Discard';
          closeButton.style.backgroundColor = '#ffffff';
          closeButton.style.border = '1px solid #000000';
          closeButton.style.borderRadius = '5px';
          closeButton.style.padding = '10px 20px';
          closeButton.style.cursor = 'pointer';
          closeButton.addEventListener('click', () => {
            this.discardFoodItem(foodItem); // Call the discardFoodItem function
            document.body.removeChild(modal);
        });
          
        dialog.appendChild(eatButton);
        dialog.appendChild(closeButton);
        modal.appendChild(dialog);
        document.body.appendChild(modal);
      }

      discardFoodItem(foodItem) {
        this.gameContainer.appendChild(foodItem); // Reinsert the food item into the game container
        this.foodItems.push(foodItem); // Add the food item back to the foodItems array
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
    constructor(name, imageSrc, totalCarbs, glycemicIndex) {
      this.name = name;
      this.imageSrc = imageSrc;
      this.totalCarbs = totalCarbs;
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
  