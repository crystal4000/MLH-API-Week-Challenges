import pygame
import random
import sys
import requests

# Initialize pygame
pygame.init()

# Game constants
SCREEN_WIDTH = 720
SCREEN_HEIGHT = 480
GRID_SIZE = 20
GRID_WIDTH = SCREEN_WIDTH // GRID_SIZE
GRID_HEIGHT = SCREEN_HEIGHT // GRID_SIZE
SNAKE_SPEED = 10

# Colors
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
BLACK = (0, 0, 0)

# Create the screen
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption('Python Snake Game')
clock = pygame.time.Clock()

# Font setup
font = pygame.font.SysFont('Arial', 25)

# Open Trivia API for bonus questions
def get_trivia_question():
    try:
        response = requests.get("https://opentdb.com/api.php?amount=1&type=boolean")
        data = response.json()
        if data["response_code"] == 0:
            return {
                "question": data["results"][0]["question"],
                "answer": data["results"][0]["correct_answer"]
            }
        return None
    except:
        return None

class Snake:
    def __init__(self):
        self.positions = [(GRID_WIDTH // 2, GRID_HEIGHT // 2)]
        self.length = 1
        self.direction = random.choice([
            (0, -1),  # Up
            (0, 1),   # Down
            (-1, 0),  # Left
            (1, 0)    # Right
        ])
        self.color = GREEN
        self.score = 0
        
    def get_head_position(self):
        return self.positions[0]
    
    def update(self):
        head_x, head_y = self.get_head_position()
        dx, dy = self.direction
        new_x = (head_x + dx) % GRID_WIDTH
        new_y = (head_y + dy) % GRID_HEIGHT
        
        # Game over if snake collides with itself
        if (new_x, new_y) in self.positions[1:]:
            return True  # Game over
        
        self.positions.insert(0, (new_x, new_y))
        
        # Remove the tail if the snake didn't eat food
        if len(self.positions) > self.length:
            self.positions.pop()
            
        return False  # Game continues
    
    def render(self, surface):
        for p in self.positions:
            rect = pygame.Rect((p[0] * GRID_SIZE, p[1] * GRID_SIZE), (GRID_SIZE, GRID_SIZE))
            pygame.draw.rect(surface, self.color, rect)
            pygame.draw.rect(surface, WHITE, rect, 1)  # Draw border
            
    def reset(self):
        self.positions = [(GRID_WIDTH // 2, GRID_HEIGHT // 2)]
        self.length = 1
        self.direction = random.choice([
            (0, -1),  # Up
            (0, 1),   # Down
            (-1, 0),  # Left
            (1, 0)    # Right
        ])
        self.score = 0
        
    def handle_keys(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_UP and self.direction != (0, 1):
                    self.direction = (0, -1)
                elif event.key == pygame.K_DOWN and self.direction != (0, -1):
                    self.direction = (0, 1)
                elif event.key == pygame.K_LEFT and self.direction != (1, 0):
                    self.direction = (-1, 0)
                elif event.key == pygame.K_RIGHT and self.direction != (-1, 0):
                    self.direction = (1, 0)
        return False

class Food:
    def __init__(self):
        self.position = (0, 0)
        self.color = RED
        self.randomize_position()
        
    def randomize_position(self):
        self.position = (
            random.randint(0, GRID_WIDTH - 1),
            random.randint(0, GRID_HEIGHT - 1)
        )
        
    def render(self, surface):
        rect = pygame.Rect(
            (self.position[0] * GRID_SIZE, self.position[1] * GRID_SIZE),
            (GRID_SIZE, GRID_SIZE)
        )
        pygame.draw.rect(surface, self.color, rect)
        pygame.draw.rect(surface, WHITE, rect, 1)

class SpecialFood:
    def __init__(self):
        self.position = (0, 0)
        self.color = BLUE
        self.active = False
        self.timer = 0
        self.question = None
        
    def activate(self):
        self.active = True
        self.timer = 150  # Will be active for 150 frames (about 5 seconds at 30 FPS)
        self.position = (
            random.randint(0, GRID_WIDTH - 1),
            random.randint(0, GRID_HEIGHT - 1)
        )
        self.question = get_trivia_question()
        
    def update(self):
        if self.active:
            self.timer -= 1
            if self.timer <= 0:
                self.active = False
                
    def render(self, surface):
        if self.active:
            rect = pygame.Rect(
                (self.position[0] * GRID_SIZE, self.position[1] * GRID_SIZE),
                (GRID_SIZE, GRID_SIZE)
            )
            pygame.draw.rect(surface, self.color, rect)
            pygame.draw.rect(surface, WHITE, rect, 1)

def show_score(score):
    score_text = font.render(f'Score: {score}', True, WHITE)
    screen.blit(score_text, (10, 10))

def show_game_over(score):
    screen.fill(BLACK)
    
    game_over_text = font.render('GAME OVER', True, WHITE)
    score_text = font.render(f'Final Score: {score}', True, WHITE)
    restart_text = font.render('Press R to Restart or Q to Quit', True, WHITE)
    
    screen.blit(game_over_text, (SCREEN_WIDTH // 2 - game_over_text.get_width() // 2, SCREEN_HEIGHT // 2 - 60))
    screen.blit(score_text, (SCREEN_WIDTH // 2 - score_text.get_width() // 2, SCREEN_HEIGHT // 2 - 30))
    screen.blit(restart_text, (SCREEN_WIDTH // 2 - restart_text.get_width() // 2, SCREEN_HEIGHT // 2 + 30))
    
    pygame.display.update()
    
    waiting_for_key = True
    while waiting_for_key:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_r:
                    waiting_for_key = False
                elif event.key == pygame.K_q:
                    pygame.quit()
                    sys.exit()

def show_trivia(question):
    if not question:
        return None
    
    overlay = pygame.Surface((SCREEN_WIDTH, SCREEN_HEIGHT))
    overlay.set_alpha(200)
    overlay.fill(BLACK)
    screen.blit(overlay, (0, 0))
    
    question_text = font.render(question["question"], True, WHITE)
    true_text = font.render('Press T for True', True, WHITE)
    false_text = font.render('Press F for False', True, WHITE)
    
    # Word wrap for long questions
    words = question["question"].split()
    lines = []
    line = ""
    for word in words:
        test_line = line + word + " "
        test_text = font.render(test_line, True, WHITE)
        if test_text.get_width() > SCREEN_WIDTH - 40:
            lines.append(line)
            line = word + " "
        else:
            line = test_line
    lines.append(line)
    
    y_pos = SCREEN_HEIGHT // 2 - (len(lines) * 30) // 2
    
    for line in lines:
        text = font.render(line, True, WHITE)
        screen.blit(text, (SCREEN_WIDTH // 2 - text.get_width() // 2, y_pos))
        y_pos += 30
    
    screen.blit(true_text, (SCREEN_WIDTH // 2 - true_text.get_width() // 2, y_pos + 20))
    screen.blit(false_text, (SCREEN_WIDTH // 2 - false_text.get_width() // 2, y_pos + 50))
    
    pygame.display.update()
    
    waiting_for_key = True
    while waiting_for_key:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_t:
                    return "True" == question["answer"]
                elif event.key == pygame.K_f:
                    return "False" == question["answer"]

def main():
    snake = Snake()
    food = Food()
    special_food = SpecialFood()
    special_food_chance = 0.01  # 1% chance per frame
    game_over = False
    
    while True:
        if game_over:
            show_game_over(snake.score)
            snake.reset()
            food.randomize_position()
            special_food.active = False
            game_over = False
        
        # Check for quit or direction change
        if snake.handle_keys():
            break
            
        # Update snake position
        game_over = snake.update()
        
        # Update special food
        special_food.update()
        
        # Check if snake ate the regular food
        if snake.get_head_position() == food.position:
            snake.length += 1
            snake.score += 1
            food.randomize_position()
            
            # Ensure food doesn't spawn on snake
            while food.position in snake.positions:
                food.randomize_position()
        
        # Check if snake ate the special food
        if special_food.active and snake.get_head_position() == special_food.position:
            if special_food.question:
                correct = show_trivia(special_food.question)
                if correct:
                    snake.length += 3
                    snake.score += 5
                
            special_food.active = False
        
        # Random chance to spawn special food
        if not special_food.active and random.random() < special_food_chance:
            special_food.activate()
        
        # Draw everything
        screen.fill(BLACK)
        snake.render(screen)
        food.render(screen)
        if special_food.active:
            special_food.render(screen)
        show_score(snake.score)
        
        pygame.display.update()
        clock.tick(SNAKE_SPEED)

if __name__ == "__main__":
    main()