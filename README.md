<p align="center">
  <img src= "https://github.com/Angelguirao/Sweet-Survival/assets/44321245/54e2eb6f-ab18-4549-979e-727d3546d24e" >
</p>

# Sweet Survival

[Click here to see deployed game](https://angelguirao.github.io/Sweet-Survival/)

## Description

In this game, the player takes control of a character living with type 1 diabetes.

The main objective is to collect food items and administer insulin when necessary to maintain the character's blood glucose within a target range.

If the player successfully maintain his glucose within the range until the countdown ends, he wins! If he goes out of range at any point during the game, he loses!

## MVP

- Move: implement basic controls to allow the player to navigate the character using keyboard arrow keys.

- Eat: enable the character to eat food items by colliding with them; Upon collision, display the nutritional information of the food item including the carbohydrates per 100g and the glycemic index.

- Administer insulin: allow the character to administer insulin by colliding with insulin items. Upon collision, prompt the player to input the number of insulin units.

- Blood glucose management: track the character's blood glucose level and display it to the player in real-time.

- Target range: Define a target range for blood glucose levels; Indicate whether the character's level is within or outside that range.

- Time limit: Set a time limit for each level to add a sense of urgency and challenge.

- Start Game: Allows the player to initialize the game and begin playing with instructions.

- Restart Game: option to restart the game at game over screen.

- Game Over Screen: displays a game over screen when certain conditions are met, indicating the end of the game.

- Winning Logic: defines the winning condition for the game. Checks if the player has achieved the specific objectives or goals to win. Triggers the game over screen with a winning message when the player meets the winning condition.

- Losing Logic: Defines the losing condition for the game. Checks if the player has failed to meet certain requirements or has exhausted all chances or time. Triggers the game over screen with a losing message when the player meets the losing condition.

## Backlog

- Additional levels: Create more levels with different scenarios and challenges, providing a diverse range of life situations that simulate blood glucose management difficulties.
- Power-ups: Introduce power-ups that can temporarily boost the character's blood glucose control or provide special abilities to navigate the levels more effectively.
- Multiple characters: Allow players to choose from a selection of characters, each with their own unique abilities or characteristics that impact blood glucose management.
- Level progression: Implement the logic for level progression

## Data structure

1. Game Class:

Properties:


Methods:
- showInstructions();
- createStartButton();
- initializeCharacter();
- initializeBloodGlucoseBar();
- initializeMinAndMaxTargets();
- initializeTimer();
- initializeFoodItems(maxFoodItems)
- initializeInsulinItems(maxInsulinItems)
- initializeMinAndMaxTargets();
- updateBloodGlucoseLevel();
- updateBloodGlucoseBar();
- startCountdown();
- checkGameOutcome();
- showOutcomeScreen(isWin);
- resetGame();
- characterMovement(event);
- checkCollisionWithFoodItems();
- checkCollisionWithInsulinItems();
- displayFoodProperties(foodItem);
- displayInsulinProperties(insulinItem);
- startGame();


2. FoodItem Class:

Properties: Name, image, totalCarbs, glycemicIndex, position.
Methods: None.

3. InsulinItem Class:

Properties: Name, image, type, position.
Methods: None.

## States y States Transitions

1. Initial Screen:

This is the initial screen that appears when the game is launched.
It provides basic instructions and a button for starting a new game.

2. Gameplay:

This is the primary view where the actual gameplay takes place.
It shows the virtual environment, including the character, food items, insulin items, and other relevant visual elements.
The gameplay view also includes the blood glucose level display, progress bar, and any educational messages or tips.
Player input is captured in this view to control the character's movement, interact with items, and manage blood glucose levels.

3. Game Over:

When the game ends, the game over screen is displayed.
It shows the final result achieved by the player and a restart button to play again.

## Links

- [Trello Link](https://trello.com/b/BhAXmGrl/sweetsurvival)
- [Slides Link](https://docs.google.com/presentation/d/15z58um46oZHen_dA_O-UbgfJaLkFB-3vxb19QqvOMys/edit#slide=id.p)
- [Github repository Link](https://github.com/Angelguirao/sweetSurvival)
- [Deployment Link](https://angelguirao.github.io/sweetSurvival/)
