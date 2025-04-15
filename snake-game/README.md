# Python Snake Game with Trivia

A classic Snake game implemented in Python with an educational twist - collect special food to answer trivia questions for bonus points!

## Features

- 🐍 Classic snake gameplay with arrow key controls
- ❓ Integration with Open Trivia Database API for random trivia questions
- 🍎 Regular food increases your snake length by 1
- 🔵 Special blue food appears randomly and triggers trivia questions
- 🧠 Correctly answering trivia questions gives 5 bonus points and increases length by 3
- 🎮 Game over screen with restart option

## Requirements

- Python 3.x
- Pygame library
- Requests library

## Installation

```bash
# Install required packages
pip install pygame requests
```

## How to Play
- Run the game:
```bash
    python 
```
- Use arrow keys to control the snake
- Collect red food to grow longer
- Collect blue special food to trigger trivia questions
- Answer with 'T' for True or 'F' for False
- Game ends when the snake collides with itself
- Press 'R' to restart or 'Q' to quit after game over

## Game Mechanics
- Snake wraps around the edges of the screen
- Special food appears randomly with a 1% chance per frame
- Trivia questions are fetched from the Open Trivia Database API
- Correct answers increase your score by 5 points

## Screenshot
[Add a screenshot of the game here]