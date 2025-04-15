# Fortune Cookie Commit Messages

A fun and quirky web application that generates fortune cookie-style Git commit messages to save you from thinking of clever commit messages.

## Features

- 🔮 Randomly generates commit messages styled as fortune cookie wisdom
- ✨ Adds a random emoji prefix to each message
- 📋 Copy to clipboard functionality
- 🕒 Keeps track of message history
- 💾 Stores history in localStorage for persistence

## Technologies Used

- HTML/CSS/JavaScript
- [Advice Slip API](https://api.adviceslip.com/)
- LocalStorage for message history

## How It Works

1. The app fetches random advice from the Advice Slip API
2. Formats the advice as a commit message (lowercase first letter, removes period, truncates if too long)
3. Adds a random emoji prefix
4. Displays the formatted message
5. Stores in history for future reference

## Usage

Simply open `index.html` in a web browser and:
1. Click "Generate Fortune" to get a new commit message
2. Click "Copy to Clipboard" to copy the message
3. View and reuse previous messages from the history section

## Screenshot
<img width="1511" alt="Screenshot 2025-04-15 at 5 01 16 PM" src="https://github.com/user-attachments/assets/58d1c6c3-a5e2-4ff7-8618-08a74f3991a1" />
