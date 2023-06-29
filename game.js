// Game class
class Game {
    constructor(foodItems, insulinItems) {
      // Initialize game components
      this.gameContainer = document.getElementById('gameContainer');
      this.bloodGlucoseContainer = document.getElementById('bloodGlucoseContainer');
      this.backgroundAudio = new Audio('man-is-he-mega-glbml-22045.mp3');
      this.backgroundAudio.loop = true;
      this.eatSound = new Audio('eating-sound-effect-36186.mp3');
      this.insulinSound = new Audio('089048_woosh-slide-in-88642.mp3');
      this.winningMusic = new Audio('8-bit-video-game-win-level-sound-version-1-145827.mp3');
      this.losingMusic = new Audio('8-bit-video-game-lose-sound-version-4-145477.mp3');

      
      // Store the food items and insulin items

      this.foodItems = foodItems; // Assign food items to the property
      this.insulinItems = insulinItems; // Assign insulin items to the property

      // Initialize other properties

      this.startButton = null; // Store reference to the start button
      this.timerInterval = null; // Store reference to the timer interval
      this.bloodGlucoseUpdateInterval = null; // Store reference to the blood glucose update interval
      this.imageFlag = 1;
      this.gameContainer.style.display = 'none'; // Set the initial display to 'none'
      this.collisionDetected = false;
      this.increasingRate = 0;
      this.currentImpact = 0;
      this.currentChange = 0;
      this.messageContainer = null;
      this.dosageInput = null;
      this.dosage = null;
      this.bloodGlucoseChange = null;
      this.decreasingRate = null;
      this.playerAteFood = false;
      this.playerInjectedInsulin = false;
      this.bloodGlucoseDirection = Math.random() < 0.5 ? 'increase' : 'decrease';
      this.minFluctuationRate = 1;
      this.maxFluctuationRate = 3;
      this.fluctuationRate = Math.round(Math.random() * (this.maxFluctuationRate - this.minFluctuationRate + 1)) + this.minFluctuationRate;
      this.totalImpact = 0;
    }

    showInstructions() {
      // Create a container for the instructions
      this.instructionsContainer = document.createElement('div');
      this.instructionsContainer.id = 'instructions';
      this.instructionsContainer.style.backgroundColor = 'black';
      this.instructionsContainer.style.border = '1px solid #ccc';
      this.instructionsContainer.style.borderRadius = '5px';
      this.instructionsContainer.style.width = '800px';
    
      // Create the content for the instructions
      const instructionsText = document.createElement('p');
      instructionsText.style.marginBottom = '20px';
    
      // Create the "Welcome" text with specific styles
      const welcomeText = document.createElement('span');
      welcomeText.innerHTML = 'Welcome!';
      welcomeText.style.fontSize = '25px'; // Increase the font size
      welcomeText.style.fontWeight = 'bold'; // Set the font weight to bold
      welcomeText.style.color = 'white'; // Set the text color to white
    
      // Create the remaining text
      const remainingText = document.createElement('span');
      remainingText.innerHTML = "<br><br> In this game, you will take control of a character living with type 1 diabetes.<br><br> The main objective is to collect food items and administer insulin when necessary to maintain the character's blood glucose within a target range. <br><br>  If you successfully maintain yourself within the range until the countdown ends, you win! If you go out of range at any point during the game, you lose!<br><br> Are you ready, sweety?";
      remainingText.style.fontSize = '24px';
      remainingText.style.color = 'white';

      // Append the welcome text and remaining text to the instructions content
      instructionsText.appendChild(welcomeText);
      instructionsText.appendChild(remainingText);
    
      // Append the instructions content to the container
      this.instructionsContainer.appendChild(instructionsText);
    
      // Add the instructions container to the body
      document.body.appendChild(this.instructionsContainer);
    }
    
  
    // Function to create the start button
      createStartButton() {
        this.startButton = document.createElement('button');
        this.startButton.textContent = "Let's go!";
        this.startButton.style.fontSize = '20px';
        this.startButton.style.padding = '10px 30px';
        this.startButton.style.marginTop = '20px';
        this.startButton.style.marginBottom = '20px';
        this.startButton.style.border = 'none';
        this.startButton.style.backgroundColor = '#ffd2ed';
        this.startButton.style.color = 'black';
        this.startButton.style.cursor = 'pointer';
        this.startButton.style.fontWeight = 'bold';

  
      // Append the start button to the instructions container
      this.instructionsContainer.appendChild(this.startButton);
    }
  
      // Function to start the game  
      startGame() {
        // Show the instructions
        this.showInstructions();
        
        // Create and add the start button
        this.createStartButton();

        // Add event listener to start button
        this.startButton.addEventListener('click', () => {
          
          this.backgroundAudio.play();
          
          // Remove the start button
          this.instructionsContainer.removeChild(this.startButton);

          // Remove the instructions container
          document.body.removeChild(this.instructionsContainer);

           // Show the game container
          this.gameContainer.style.display = 'block';
          
          // Initialize game components
          this.initializeCharacter();
          this.initializeBloodGlucoseBar();
          this.initializeMinAndMaxTargets();
          this.initializeTimer();
          this.initializeFoodItems(100); // Set the maximum number of food items to display
          this.initializeInsulinItems(100); // Set the maximum number of insulin items to display
        });
      }

      initializeCharacter() {
        // Create an <img> element for the character
        this.character = document.createElement('img');
        this.character.src = 'styles/assets/down_1.png'; // Set the initial image
        this.character.style.width = '80px';
        this.character.style.height = '80px';
        this.character.style.position = 'absolute';
        this.character.style.left = '50%'; // Set left position to 50% of the container width
        this.character.style.top = '50%'; // Set top position to 50% of the container height
    
        // Add the character element to the game container
        this.gameContainer.appendChild(this.character);
    
        // Add event listener for character movement
        document.addEventListener('keydown', (event) => {
            this.characterMovement(event);
        });
    }    

      initializeBloodGlucoseBar() {
        // Set the initial blood glucose level randomly within the desired range
        this.minBloodGlucoseLevel = 70; // Specify the minimum blood glucose level
        this.maxBloodGlucoseLevel = 180; // Specify the maximum blood glucose level
        this.bloodGlucoseLevelValue = 100;

         // Create the blood glucose bar
        this.bloodGlucoseBar = document.createElement('div');
        this.bloodGlucoseBar.style.height = '40px';
        this.bloodGlucoseBar.style.borderRadius = '5px';
        this.bloodGlucoseContainer.appendChild(this.bloodGlucoseBar);

          // Create the blood glucose value
        this.bloodGlucoseLevelText = document.createElement('div');
        this.bloodGlucoseLevelText.style.fontSize = '30px';
        this.bloodGlucoseLevelText.style.fontWeight = 'bold';
        this.bloodGlucoseLevelText.style.color = 'black';
        this.bloodGlucoseContainer.appendChild(this.bloodGlucoseLevelText);
      }

      initializeMinAndMaxTargets() {
        
        // Create a container for the min and max targets
        const targetsContainer = document.createElement('div');
        targetsContainer.id = 'bloodGlucoseTargetsContainer';
        this.bloodGlucoseContainer.appendChild(targetsContainer);
              
        // Create the blood glucose min and max targets
        this.minBloodGlucoseTarget = document.createElement('div');
        this.maxBloodGlucoseTarget = document.createElement('div');
        this.minBloodGlucoseTarget.id = 'minBloodGlucoseTarget';
        this.maxBloodGlucoseTarget.id = 'maxBloodGlucoseTarget';
        targetsContainer.appendChild(this.minBloodGlucoseTarget);
        targetsContainer.appendChild(this.maxBloodGlucoseTarget);

        // Calculate the displayed minimum and maximum values
        const displayedMinValue = 70;
        const displayedMaxValue = 180;

        // Create text nodes for the minimum and maximum values with smaller font size
        const minText = document.createElement('span');
        minText.style.fontSize = '20px';
        minText.style.marginBottom = '5px';
        minText.textContent = `${displayedMinValue}(min.)`;

        const maxText = document.createElement('span');
        maxText.style.fontSize = '20px';
        maxText.style.marginBottom = '5px';
        maxText.textContent = `${displayedMaxValue}(max.)`;

        // Append the text nodes to the min and max targets
        this.minBloodGlucoseTarget.appendChild(minText);
        this.maxBloodGlucoseTarget.appendChild(maxText);
      }

      updateBloodGlucoseLevel() {
        if (!this.playerAteFood && !this.playerInjectedInsulin) {

          // Update the blood glucose level based on the stored direction
          if (this.bloodGlucoseDirection === 'increase') {
            this.bloodGlucoseLevelValue += this.fluctuationRate;
          } else {
            this.bloodGlucoseLevelValue -= this.fluctuationRate;
          }
      
           // Update the blood glucose level text
          this.bloodGlucoseLevelText.innerHTML = `<span class="blood-glucose-value">${this.bloodGlucoseLevelValue}</span><span class="blood-glucose-unit">  (Your actual blood glucose in mg/dl)</span>`;
                }
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
            this.bloodGlucoseBar.style.backgroundColor = 'white';
          }

        // Position the blood glucose level text to the right of the blood glucose bar
        const barRight = this.bloodGlucoseBar.offsetLeft + currentWidth;
        const textLeft = barRight + 10; // Add some extra spacing

        this.bloodGlucoseLevelText.style.position = 'absolute';
        this.bloodGlucoseLevelText.style.left = `${textLeft}px`;
        this.bloodGlucoseLevelText.style.top = this.bloodGlucoseBar.offsetTop + 'px';
        this.bloodGlucoseLevelText.innerHTML = `<span class="blood-glucose-value">${this.bloodGlucoseLevelValue}</span><span class="blood-glucose-unit">  (Your actual blood glucose in mg/dl)</span>`;
      }

      initializeTimer() {
        this.timerElement = document.createElement('div');
        this.timerElement.id = 'timer';
        this.gameContainer.appendChild(this.timerElement);

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
        const minTimeLimit = 45; // Minimum time limit in seconds
        const maxTimeLimit = 60; // Maximum time limit in seconds
        const randomTimeLimit = Math.floor(Math.random() * (maxTimeLimit - minTimeLimit + 1)) + minTimeLimit;

        this.currentTime = randomTimeLimit;

        // Update the timer element with the initial time
        this.timerElement.innerHTML = this.currentTime;

        // Start the countdown timer
        this.startCountdown();

        // Start updating the blood glucose level at regular intervals

        this.updateBloodGlucoseLevel();
        this.updateBloodGlucoseBar();
        }

        startCountdown() {
          this.timerInterval = setInterval(() => {
            this.updateBloodGlucoseLevel();
            this.updateBloodGlucoseBar();
            this.currentTime--;

            // Update the timer element with the current time

            this.timerElement.innerHTML = this.currentTime;

            // Check if the blood glucose level is within the desired range (80-180)
            if (this.bloodGlucoseLevelValue < 70 || this.bloodGlucoseLevelValue > 180) {
              // Player loses if blood glucose is outside the range
              this.backgroundAudio.pause();
              this.backgroundAudio.currentTime = 0;
              this.showOutcomeScreen(false);
              clearInterval(this.timerInterval);
            }        
              // Check if the timer has reached 0
            if (this.currentTime === 0) {
              // Stop the timer interval
              this.backgroundAudio.pause();
              this.backgroundAudio.currentTime = 0;
              clearInterval(this.timerInterval);

              // Check the game outcome
              this.checkGameOutcome();
            }
          }, 1000);
        }

        checkGameOutcome() {
          // Check if the blood glucose level is within the desired range (70-180)
          if (this.bloodGlucoseLevelValue >= 70 && this.bloodGlucoseLevelValue <= 180) {
            // Player wins
            this.showOutcomeScreen(true);
          } else {
            // Player loses
            this.showOutcomeScreen(false);
          }
        }

        showOutcomeScreen(isWin) {
          // Hide the game container
          this.gameContainer.style.display = 'none';
          this.bloodGlucoseContainer.style.display = 'none';

          // Create the outcome screen container
          const outcomeContainer = document.createElement('div');
          outcomeContainer.style.backgroundColor = 'black';
          outcomeContainer.style.border = '1px solid #ccc';
          outcomeContainer.style.borderRadius = '5px';
          outcomeContainer.style.textAlign = 'center';
          outcomeContainer.style.width = '800px';
          outcomeContainer.style.marginTop = '200px';

          // Create the outcome message based on the game result
          const outcomeMessage = document.createElement('p');
          outcomeMessage.style.fontSize = '24px';
          outcomeMessage.style.color = 'white';
          outcomeMessage.style.marginTop = '50px'

          if (isWin) {
            this.winningMusic.play()
            outcomeMessage.textContent = 'Congratulations! You are a blood glucose master!';
          } else {
            this.losingMusic.play()
            outcomeMessage.textContent = 'Oops! Your blood glucose is out of range!';
          }

          // Create the restart button
          const restartButton = document.createElement('button');
          restartButton.textContent = 'Again!';
          restartButton.style.fontSize = '20px';
          restartButton.style.padding = '10px 30px';
          restartButton.style.marginTop = '15px';
          restartButton.style.marginBottom = '40px';
          restartButton.style.border = 'none';
          restartButton.style.backgroundColor = '#ffd2ed';
          restartButton.style.color = 'black'
          restartButton.style.cursor = 'pointer';
          restartButton.style.borderRadius = '5px';
          this.startButton.style.fontWeight = 'bold';

          // Add event listener to restart button
          restartButton.addEventListener('click', () => {
            // Remove the outcome screen
            document.body.removeChild(outcomeContainer);

            // Reset the game components
            this.resetGame();
          });

          // Append the outcome message and restart button to the outcome screen container
          outcomeContainer.appendChild(outcomeMessage);
          outcomeContainer.appendChild(restartButton);

          // Add the outcome screen container to the body
          document.body.appendChild(outcomeContainer);
        }

        resetGame() {
          // Clear the previous game

          this.gameContainer.innerHTML = '';
          this.bloodGlucoseContainer.innerHTML = '';

          this.gameContainer.style.display = 'block';
          this.bloodGlucoseContainer.style.display = 'block';
          
          this.foodItems = foodItems; 
          this.insulinItems = insulinItems; 

          this.backgroundAudio.loop = true;
          this.backgroundAudio.play();
        
          this.timerInterval = null; // Store reference to the timer interval
          this.bloodGlucoseUpdateInterval = null; // Store reference to the blood glucose update interval
          this.imageFlag = 1;
          this.collisionDetected = false;
          this.increasingRate = 0;
          this.currentImpact = 0;
          this.currentChange = 0;
          this.messageContainer = null;
          this.dosageInput = null;
          this.dosage = null;
          this.bloodGlucoseChange = null;
          this.decreasingRate = null;
          this.playerAteFood = false;
          this.playerInjectedInsulin = false;
          this.bloodGlucoseDirection = Math.random() < 0.5 ? 'increase' : 'decrease';
          this.minFluctuationRate = 1;
          this.maxFluctuationRate = 3;
          this.fluctuationRate = Math.round(Math.random() * (this.maxFluctuationRate - this.minFluctuationRate + 1)) + this.minFluctuationRate;
          this.totalImpact = 0;

          this.initializeCharacter();
          this.initializeTimer();
          this.initializeMinAndMaxTargets();
          this.initializeBloodGlucoseBar();
          this.initializeFoodItems(100);
          this.initializeInsulinItems(100);
        }

        initializeFoodItems(maxFoodItems) {
          const shuffledFoodItems = this.shuffleArray(this.foodItems);
          const foodItemsToDisplay = shuffledFoodItems.slice(0, maxFoodItems);
        
          // Clear the food item elements before rendering new ones
          this.foodItemElements = [];
        
          for (let i = 0; i < foodItemsToDisplay.length; i++) {
            const randomFoodItem = foodItemsToDisplay[i];
            const foodItem = document.createElement('img');
            foodItem.src = randomFoodItem.imageSrc;
            foodItem.style.width = '30px';
            foodItem.style.height = '30px';
            foodItem.style.position = 'absolute';
            foodItem.style.left = randomFoodItem.position.x + 'px'; // Use the position property
            foodItem.style.top = randomFoodItem.position.y + 'px'; // Use the position property
        
            // Set data attributes for food properties
            foodItem.dataset.name = randomFoodItem.name;
            foodItem.dataset.totalCarbs = randomFoodItem.totalCarbs;
            foodItem.dataset.glycemicIndex = randomFoodItem.glycemicIndex;
            foodItem.dataset.imageSrc = randomFoodItem.imageSrc;
        
            this.foodItemElements.push(foodItem); // Store the food item element separately
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

        initializeInsulinItems(maxInsulinItems) {
          const shuffledInsulinItems = this.shuffleArray(this.insulinItems);
          const insulinItemsToDisplay = shuffledInsulinItems.slice(0, maxInsulinItems);
        
          // Clear the insulin item elements before rendering new ones
          this.insulinItemElements = [];
        
          for (let i = 0; i < insulinItemsToDisplay.length; i++) {
            const randomInsulinItem = insulinItemsToDisplay[i];
            const insulinItem = document.createElement('img');
            insulinItem.src = randomInsulinItem.imageSrc;
            insulinItem.style.width = '35px';
            insulinItem.style.height = '35px';
            insulinItem.style.position = 'absolute';
            insulinItem.style.left = randomInsulinItem.position.x + 'px'; // Use the position property
            insulinItem.style.top = randomInsulinItem.position.y + 'px'; // Use the position property
        
            // Set data attributes for insulin properties
            insulinItem.dataset.name = randomInsulinItem.name;
            insulinItem.dataset.type = randomInsulinItem.type;
            insulinItem.dataset.imageSrc = randomInsulinItem.imageSrc;
        
            this.insulinItemElements.push(insulinItem); // Store the insulin item element separately
            this.gameContainer.appendChild(insulinItem);
          }
        }

        characterMovement(event) {
          if (this.collisionDetected) {
            return; // Exit the function if collision is detected
          }
          
          const step = 10;
          
          const containerRect = this.gameContainer.getBoundingClientRect();
          const containerLeft = containerRect.left;
          const containerTop = containerRect.top;
          const containerWidth = containerRect.width;
          const containerHeight = containerRect.height;
        
          const characterRect = this.character.getBoundingClientRect();
          const characterLeft = characterRect.left - containerLeft;
          const characterTop = characterRect.top - containerTop;

          // Toggle the image flag between 1 and 2
          if (this.imageFlag === 1) {
            this.imageFlag = 2;
          } else {
            this.imageFlag = 1;
          }
        
        if (event.keyCode === 37 && characterLeft > 0) {
          if (this.imageFlag === 1) {
              this.character.src = 'styles/assets/left_2.png';
          } else {
              this.character.src = 'styles/assets/left_1.png';
          }
          this.character.style.left = Math.max(characterLeft - step, 0) + 'px';
      } else if (event.keyCode === 39 && characterLeft + characterRect.width < containerWidth) {
          if (this.imageFlag === 1) {
              this.character.src = 'styles/assets/right_1.png';
          } else {
              this.character.src = 'styles/assets/right_2.png';
          }
          this.character.style.left = Math.min(characterLeft + step, containerWidth - characterRect.width) + 'px';
      } else if (event.keyCode === 38 && characterTop > 0) {
          if (this.imageFlag === 1) {
              this.character.src = 'styles/assets/up_1.png';
          } else {
              this.character.src = 'styles/assets/up_2.png';
          }
          this.character.style.top = Math.max(characterTop - step, 0) + 'px';
      } else if (event.keyCode === 40 && characterTop + characterRect.height < containerHeight) {
          if (this.imageFlag === 1) {
              this.character.src = 'styles/assets/down_1.png';
          } else {
              this.character.src = 'styles/assets/down_2.png';
          }
          this.character.style.top = Math.min(characterTop + step, containerHeight - characterRect.height) + 'px';
      }
        
          // Check for collision with food items
          this.checkCollisionWithFoodItems();

          // Check for collision with food items
          this.checkCollisionWithInsulinItems();
        }
      
      checkCollisionWithFoodItems() {
        
        if (this.collisionDetected) {
          return; // Exit the function if collision is detected
        }
        
        const characterRect = this.character.getBoundingClientRect();
    
        for (let i = 0; i < this.foodItemElements.length; i++) {
          const foodItem = this.foodItemElements[i];
          const foodItemRect = foodItem.getBoundingClientRect();
      
    
          if (
            characterRect.top < foodItemRect.bottom &&
            characterRect.bottom > foodItemRect.top &&
            characterRect.left < foodItemRect.right &&
            characterRect.right > foodItemRect.left
          ) {
            // Collision detected
            this.collisionDetected = true;

            this.displayFoodProperties(foodItem);
            this.gameContainer.removeChild(foodItem);
            this.foodItemElements.splice(i, 1);
            break;
          }
        }
      }

      checkCollisionWithInsulinItems() {
        if (this.collisionDetected) {
          return; // Exit the function if collision is detected
        }
      
        const characterRect = this.character.getBoundingClientRect();
      
        for (let i = 0; i < this.insulinItemElements.length; i++) {
          const insulinItem = this.insulinItemElements[i];
          const insulinItemRect = insulinItem.getBoundingClientRect();
      
          if (
            characterRect.top < insulinItemRect.bottom &&
            characterRect.bottom > insulinItemRect.top &&
            characterRect.left < insulinItemRect.right &&
            characterRect.right > insulinItemRect.left
          ) {
            // Collision detected
            this.collisionDetected = true;
      
            this.displayInsulinProperties(insulinItem);
            this.gameContainer.removeChild(insulinItem);
            this.insulinItemElements.splice(i, 1);
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
        title.style.textAlign = 'center';

        const foodName = document.createElement('p');
        foodName.style.marginTop = '25px';
        foodName.textContent = `Name: ${name}`;
        foodName.style.marginLeft = '10px';

        const carbs = document.createElement('p');
        carbs.style.marginTop = '0';
        carbs.textContent = `Total Carbs: ${totalCarbs}`;
        carbs.style.marginLeft = '10px';

        const glycemic = document.createElement('p');
        glycemic.style.marginTop = '0';
        glycemic.textContent = `Glycemic Index: ${glycemicIndex}`;
        glycemic.style.marginLeft = '10px';

        // Information icon for carbohydrates
        const carbsInfoIcon = document.createElement('span');
        carbsInfoIcon.innerHTML = '&#9432;';
        carbsInfoIcon.style.marginLeft = '5px';
        carbsInfoIcon.style.cursor = 'help';
        carbsInfoIcon.title = 'Each gram of carbohydrates raises blood sugar levels by 5mg/dl.';

        // Information icon for glycemic index
        const glycemicInfoIcon = document.createElement('span');
        glycemicInfoIcon.innerHTML = '&#9432;';
        glycemicInfoIcon.style.marginLeft = '5px';
        glycemicInfoIcon.style.cursor = 'help';
        glycemicInfoIcon.title = 'The glycemic index (GI) is a value assigned to foods based on how quickly and how high those foods cause increases in blood glucose levels. Foods low on the glycemic index scale (<55) tend to release glucose slowly and steadily. Foods high on the glycemic index (>70) release glucose rapidly.';

        carbs.appendChild(carbsInfoIcon);
        glycemic.appendChild(glycemicInfoIcon);
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

          dialog.appendChild(alertContent);
        
          const eatButton = document.createElement('button');
          eatButton.textContent = 'Eat';
          eatButton.style.width = '90px';
          eatButton.style.backgroundColor = '#ffd2ed';
          eatButton.style.border = '1px solid #000000';
          eatButton.style.borderRadius = '5px';
          eatButton.style.padding = '10px 20px';
          eatButton.style.cursor = 'pointer';
          eatButton.style.marginRight = '20px';
          eatButton.style.marginLeft = '20px';
          eatButton.addEventListener('click', () => {
            const totalCarbsIntake = parseInt(totalCarbs);
            const glycemicIndexIntake = parseInt(glycemicIndex);
          
            this.totalImpact = totalCarbsIntake * 5;

            if (glycemicIndexIntake < 55) {
              this.increasingRate = 1;
            } else if (glycemicIndexIntake >= 55 && glycemicIndexIntake <= 70) {
              this.increasingRate = 2;
            } else if (glycemicIndexIntake > 70) {
              this.increasingRate = 3;
            }
          
            const interval = setInterval(() => {
              if (this.currentImpact >= this.totalImpact || this.currentTime === 0 ||
                (this.bloodGlucoseLevelValue < 70 || this.bloodGlucoseLevelValue > 180)) {
                clearInterval(interval);
                return;
              }
          
              this.bloodGlucoseLevelValue += this.increasingRate;
              this.currentImpact += this.increasingRate;
          
              // Update the blood glucose level text and bar
              this.updateBloodGlucoseBar();
            }, 1000);

            // Play the sound
            this.eatSound.play();

            // Remove the modal dialog
            document.body.removeChild(modal);

            this.collisionDetected = false;
            this.playerAteFood = true;
          });

        const closeButton = document.createElement('button');
          closeButton.textContent = 'Discard';
          closeButton.style.backgroundColor = '#ffd2ed';
          closeButton.style.border = '1px solid #000000';
          closeButton.style.borderRadius = '5px';
          closeButton.style.padding = '10px 20px';
          closeButton.style.cursor = 'pointer';
          closeButton.style.marginRight = '20px'
          closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
            this.collisionDetected = false;
        });
          
        dialog.appendChild(eatButton);
        dialog.appendChild(closeButton);
        modal.appendChild(dialog);
        document.body.appendChild(modal);
      }

      displayInsulinProperties(insulinItem) {
        const name = insulinItem.dataset.name;
        const type = insulinItem.dataset.type;
      
        const alertContent = document.createElement('div');
        alertContent.style.fontFamily = 'Arial, sans-serif';
        alertContent.style.fontSize = '18px';
        alertContent.style.padding = '10px';
      
        const title = document.createElement('h2');
        title.style.marginTop = '0';
        title.style.marginBottom = '10px';
        title.textContent = 'Insulin Item';
      
        const insulinName = document.createElement('p');
        insulinName.style.marginTop = '0';
        insulinName.textContent = `Name: ${name}`;
      
        const insulinType = document.createElement('p');
        insulinType.style.marginTop = '0';
        insulinType.textContent = `Type: ${type}`;

         // Information icon for insulin type
         const insulinTypeIcon = document.createElement('span');
         insulinTypeIcon.innerHTML = '&#9432;';
         insulinTypeIcon.style.marginLeft = '5px';
         insulinTypeIcon.style.cursor = 'help';
         insulinTypeIcon.title = 'Fast-acting insulin works quickly and for a few hours to help prevent high blood sugar after meals. Long-acting insulin takes longer to start working but provides a baseline level of insulin for most of the day.';
      
        alertContent.appendChild(title);
        alertContent.appendChild(insulinName);
        alertContent.appendChild(insulinType);
        alertContent.appendChild(insulinTypeIcon);
      
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
      
        dialog.appendChild(alertContent);

        const discardButton = document.createElement('button');
        discardButton.textContent = 'Discard';
        discardButton.style.backgroundColor = '#ffd2ed';
        discardButton.style.border = '1px solid #000000';
        discardButton.style.borderRadius = '5px';
        discardButton.style.padding = '10px 20px';
        discardButton.style.cursor = 'pointer';
        discardButton.style.marginRight = '20px'
        discardButton.addEventListener('click', () => {
          document.body.removeChild(modal); // Remove the modal dialog
          this.collisionDetected = false;
        });

        const useButton = document.createElement('button');
        useButton.textContent = 'Use';
        useButton.style.width = '90px';
        useButton.style.backgroundColor = '#ffd2ed';
        useButton.style.border = '1px solid #000000';
        useButton.style.borderRadius = '5px';
        useButton.style.padding = '10px 20px';
        useButton.style.cursor = 'pointer';
        useButton.style.marginRight = '20px';
        useButton.style.marginLeft = '20px';
        useButton.addEventListener('click', () => {
              
        // Create the container for the dosage insulin input

        const container = document.createElement('div');
        container.style.padding = '20px';
        container.style.backgroundColor = '#f5f5f5';
        container.style.border = '1px solid #ccc';
        container.style.borderRadius = '5px';
        container.style.textAlign = 'center';
        container.style.position = 'absolute';
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';


        const heading = document.createElement('h2');
        heading.textContent = 'Insulin Dosage';

        const inputLabel = document.createElement('label');
        inputLabel.textContent = 'Enter the number of units*:';
        inputLabel.style.marginRight = '10px';

        const inputField = document.createElement('input');
        inputField.type = 'number';
        inputField.style.marginRight = '10px';

        const description = document.createElement('p');
        description.textContent = '*One unit of insulin is needed to drop the blood glucose by 50 mg/dl';
        description.style.marginTop = '10px';
        description.style.fontSize = '14px';

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Inject';
        submitButton.style.width = '90px';
        submitButton.style.backgroundColor = '#ffd2ed';
        submitButton.style.border = '1px solid #000000';
        submitButton.style.borderRadius = '5px';
        submitButton.style.padding = '10px 20px';
        submitButton.style.cursor = 'pointer';
        submitButton.style.marginTop = '10px';

    
        const errorLabel = document.createElement('p');
        errorLabel.style.color = 'red';

        container.appendChild(heading);
        container.appendChild(inputLabel);
        container.appendChild(inputField);
        container.appendChild(description);
        container.appendChild(submitButton);
        container.appendChild(errorLabel);

        this.gameContainer.appendChild(container);

        // Function to validate the input value
        function validateInput(value) {
          const dosage = parseInt(value);
          if (isNaN(dosage) || dosage < 1) {
            return false;
          }
          return true;
          }
        
        // Define the logic for the submit button click event
        submitButton.addEventListener('click', () => {
        this.insulinSound.play();
        this.dosageInput = inputField.value;

        if (this.validateInput(this.dosageInput)) {
          
          //insulin dosage logic

          container.parentNode.removeChild(container);

          this.dosage = parseInt(this.dosageInput);

          this.bloodGlucoseChange = this.dosage * 50;
          this.decreasingRate = this.bloodGlucoseChange / 10;

          const interval = setInterval(() => {
            if (
              this.currentChange >= this.bloodGlucoseChange ||
              this.currentTime === 0 ||
              (this.bloodGlucoseLevelValue < 70 || this.bloodGlucoseLevelValue > 180)
            ) {
              clearInterval(interval);
              updateBloodGlucoseBar();
              inputField.value = '';
              errorLabel.textContent = '';
              return;
            }
            this.bloodGlucoseLevelValue -= this.decreasingRate;
            this.currentChange += this.decreasingRate;

            // Update the blood glucose level text and bar
            this.updateBloodGlucoseBar();
          }, 2000);
        } else {
          errorLabel.textContent = 'Please enter a value above 0.';
        }
        this.collisionDetected = false;
        this.playerInjectedInsulin = true;
      });

      // Remove the modal dialog
      document.body.removeChild(modal);
    });

    dialog.appendChild(useButton);
    dialog.appendChild(discardButton);
    modal.appendChild(dialog);
    document.body.appendChild(modal);
  }

  validateInput(value) {
    const dosage = parseInt(value);
    if (isNaN(dosage) || dosage < 1) {
      return false;
    }
    return true;
  }
}
  
// FoodItem class
class FoodItem {
  constructor(name, imageSrc, totalCarbs, glycemicIndex, position) {
    this.name = name;
    this.imageSrc = imageSrc;
    this.totalCarbs = totalCarbs;
    this.glycemicIndex = glycemicIndex;
    this.position = position;
  }
}

// Create sample food items with positions
const foodItems = [
  new FoodItem('Grapes', 'styles/assets/grape.png', 11, 42, { x: 50, y: 50 }),
  new FoodItem('Birthday Cake', 'styles/assets/birthday cake.png', 35, 70, { x: 250, y: 50 }),
  new FoodItem('Cheese', 'styles/assets/cheese.png', 0, 0, { x: 450, y: 50 }),
  new FoodItem('Doughnut', 'styles/assets/doughnut.png', 25, 42, { x: 650, y: 50 }),
  new FoodItem('Drumsticks', 'styles/assets/drumsticks.png', 0, 0, { x: 850, y: 50 }),
  new FoodItem('Fish', 'styles/assets/fish.png', 0, 0, { x: 50, y: 175 }),
  new FoodItem('Hamburger', 'styles/assets/hamburger.png', 50, 70, { x: 250, y: 175 }),
  new FoodItem('Orange Juice', 'styles/assets/juice.png', 28, 85, { x: 450, y: 175 }),
  new FoodItem('Omelette', 'styles/assets/omelette.png', 0, 0, { x: 650, y: 175 }),
  new FoodItem('Shrimp', 'styles/assets/shrimp.png', 0, 0, { x: 850, y: 175 }),
  new FoodItem('Pizza', 'styles/assets/pizza.png', 75, 70, { x: 50, y: 425 }),
  new FoodItem('Popsicle', 'styles/assets/popsicle.png', 17, 70, { x: 250, y: 425 }),
  new FoodItem('Chocolate', 'styles/assets/choco.png', 17, 70, { x: 450, y: 425 }),
  new FoodItem('Fries', 'styles/assets/fries.png', 17, 60, { x: 650, y: 425 }),
  new FoodItem('Icrecream', 'styles/assets/icecream.png', 17, 60, { x: 850, y: 425 })
  // Add more food items as needed
];

// InsulinItem class
class InsulinItem {
  constructor(name, type, imageSrc, position) {
    this.name = name;
    this.type = type;
    this.imageSrc = imageSrc;
    this.position = position;
  }
}

// Create sample insulin items with positions
const insulinItems = [
  new InsulinItem('Humalog', 'Fast-Acting', 'styles/assets/injection mejorada.png', { x: 50, y: 300 }),
  new InsulinItem('Novorapid', 'Fast-Acting', 'styles/assets/injection mejorada.png', { x: 250, y: 300 }),
  new InsulinItem('Humalog', 'Fast-Acting', 'styles/assets/injection mejorada.png', { x: 450, y: 300 }),
  new InsulinItem('Novorapid', 'Fast-Acting', 'styles/assets/injection mejorada.png', { x: 650, y: 300 }),
  new InsulinItem('Humalog', 'Fast-Acting', 'styles/assets/injection mejorada.png', { x: 850, y: 300 }),
  // Add more insulin items as needed
];
  
  // Create an instance of the Game class
  const game = new Game(foodItems, insulinItems);
  
 // Start the game
game.startGame();
  