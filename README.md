# sweetSurvival

[Click here to see deployed game](xxx)

## Description

In this game, players take control of a character living with diabetes who must navigate through a virtual environment while facing various life situations that simulate the challenges of managing blood glucose levels. The main objective is to collect healthy food items while avoiding unhealthy ones and administering insulin when necessary to maintain the character's blood glucose within a target range.

The game features multiple levels, each representing a different life scenario with specific challenges related to blood glucose management. As players progress, the levels become increasingly difficult, presenting more complex situations to overcome.

Each level introduces a unique scenario, such as a birthday party, a busy workday, or a vacation. These scenarios include different types of food items and insulin requirements, mirroring real-life challenges faced by individuals managing their blood glucose.

## MVP

- Game main elements: 

* Character: introduce a character for being able to play the game throughout each level;
* Food items: introduce food items that appear randomly throughout the levels, affecting the character's blood glucose levels;
* Insulin Pens: introduce insulin items that appear randomly throughout the levels, affecting the character's blood glucose levels;
* Spaces: create the appropriate setting for the character to interact with food items and insulin pens;

- Character actions:

* Move: implement basic controls to allow the player to navigate the character using keyboard arrow keys;
* Eat: enable the character to eat food items by colliding with them. Upon collision, display the nutritional information of the food item, including the carbohydrates per 100g and the glycemic index., prompt the player to input the number of portions consumed;
* Administer insulin: allow the character to administer insulin by colliding with insulin items. Upon collision, prompt the player to input the number of insulin units and select the type of insulin, differentiating between basal and bolus insulin;

- Blood glucose management: Track the character's blood glucose level and display it to the player in real-time;
- Target range: Define a target range for blood glucose levels and indicate whether the character's level is within or outside that range;
- Time limit: Set a time limit for each level to add a sense of urgency and challenge;
- Level progression: Implement the logic for level progression

## Backlog
- Additional levels: Create more levels with different scenarios and challenges, providing a diverse range of life situations that simulate blood glucose management difficulties.
- Power-ups: Introduce power-ups that can temporarily boost the character's blood glucose control or provide special abilities to navigate the levels more effectively.
- Multiple characters: Allow players to choose from a selection of characters, each with their own unique abilities or characteristics that impact blood glucose management.

## Data structure

1. Game Class:

Properties:
Character: The instance of the character controlled by the player.
Levels: An array or collection of Level objects representing the different levels in the game.
CurrentLevel: A reference to the currently active Level object.
ScoreSystem: An instance of the ScoringSystem class to manage the player's score.
InputManager: An instance of the InputManager class to handle player input.
Timer: An instance of the Timer class to manage the game's timing and time limits.
GameOver: A boolean flag indicating whether the game is over.

startGame(): Starts the game and initializes the necessary components.
update(): Updates the game state and handles input from the player.
render(): Renders the game visuals on the screen.
gameOver(): Handles the game over condition and displays the final score.
nextLevel(): Progresses to the next level of the game.

2. Character Class:

Properties: Name, gender, age, appearance, positionX, positionY, bloodGlucoseLevel, targetRange.
move(direction): Moves the character in the specified direction.
collideWithFood(foodItem): Handles the collision with a food item and triggers the appropriate actions.
collideWithInsulin(insulinItem): Handles the collision with an insulin item and prompts the player to input the insulin units and type.
eatFood(portions): Processes the consumption of food by the character based on the specified number of portions.
administerInsulin(units, type): Processes the administration of insulin by the character based on the specified number of units and type.

3. FoodItem Class:

Properties: Name, image, carbohydratesPer100g, glycemicIndex.
Methods: None (or getter/setter methods for the properties).

4. InsulinItem Class:

Properties: Name, image, insulinType.
Methods: None (or getter/setter methods for the properties).

5. Level Class:

Properties: Background, foodItems (array), insulinItems (array), levelNumber, levelTimeLimit.
initialize(): Initializes the level with the appropriate background, food items, and insulin units.
update(): Updates the state of the level, including the movement of food items and insulin units.
checkCollisions(): Checks for collisions between the character and the food items or insulin units.
checkLevelCompletion(): Checks if the level objectives have been met and triggers the appropriate actions.
displayNutritionalInfo(foodItem): Displays the nutritional information of a food item on the screen.

6. Scoring System Class:

Properties: Score.
calculateScore(): Calculates the player's score based on various factors such as blood glucose control, level completion, accuracy, and efficiency.
updateScore(): Updates the score based on the player's actions and performance.

7. InputManager Class:

handleKeyPress(key): Handles the player's key press events for character movement and other actions.

8. Timer Class:

startTimer(): Starts the level timer and tracks the remaining time.
checkTimeLimit(): Checks if the time limit for the level has been reached and triggers the appropriate actions.


## States y States Transitions

1. Main Menu:

This is the initial screen that appears when the game is launched.
It provides options for starting a new game, accessing settings, viewing high scores, or exiting the game.
The main menu may also include additional features like character selection or customization.

2. Level Selection:

After choosing to start a new game, the player is presented with a level selection screen.
This screen displays the available levels that the player can choose to play.
Each level may have a corresponding visual representation or description to provide context.

3. Gameplay:

This is the primary view where the actual gameplay takes place.
It shows the virtual environment, including the character, food items, insulin items, and other relevant visual elements.
The gameplay view also includes the blood glucose level display, progress bar, and any educational messages or tips.
Player input is captured in this view to control the character's movement, interact with items, and manage blood glucose levels.

4. Game Over:

When the game ends, the game over screen is displayed.
It shows the final score achieved by the player and provides options to replay the level, go back to the main menu, or exit the game.
The game over screen may also include a summary of the player's performance or achievements during the gameplay session.

5. Settings:

The settings view allows players to adjust various game options and preferences.
It typically includes options for sound volume, graphics quality, control settings, and language selection.


## Task
_List of tasks in order of priority_


## Links

- [Trello Link](https://trello.com/b/BhAXmGrl/sweetsurvival)
- [Slides Link](https://docs.google.com/presentation/d/1kgpZR4PhB84UQNu3L-w9hL5zyX1OxOPwOcVqkgl3BiI/edit#slide=id.p)
- [Github repository Link](https://github.com/Angelguirao/sweetSurvival)
- [Deployment Link](xxx)