# 🎭 Joke Machine

A fun web application that fetches jokes from various APIs and displays them dynamically.

## Screenshot

<img width="1512" alt="Screenshot 2025-04-15 at 7 10 07 PM" src="https://github.com/user-attachments/assets/83c5f182-3671-406d-be7d-4a49272cd54c" />


## 📖 Overview

Joke Machine is an interactive web application that provides endless entertainment by fetching jokes from multiple sources. Whether you're in the mood for a groan-worthy dad joke, a tech-related programming joke, or a legendary Chuck Norris fact, this application has you covered.

## ✨ Features

- **Multiple Joke Categories**:
  - Random jokes from various categories
  - Dad jokes for those who appreciate pun-tastic humor
  - Programming jokes for the tech-savvy
  - Chuck Norris jokes because... well, Chuck Norris

- **Interactive UI**:
  - Category selection buttons
  - Loading spinners for feedback during API calls
  - Special reveal button for two-part jokes
  - Modern, responsive design that works on mobile and desktop

- **Sharing Capabilities**:
  - Copy jokes to clipboard
  - Share directly to Twitter, Facebook, and WhatsApp
  - Social sharing with pre-formatted text

## 🛠️ Technologies Used

- **HTML5** - For structure
- **CSS3** - For styling and animations
- **JavaScript** - For dynamic content and API interactions
- **Fetch API** - For making HTTP requests to joke APIs
- **Web Share API** - For native sharing functionality

## 📡 APIs Used

The application fetches jokes from the following APIs:

- [JokeAPI](https://jokeapi.dev/) - For general and programming jokes
- [icanhazdadjoke](https://icanhazdadjoke.com/) - For dad jokes
- [Chuck Norris IO](https://api.chucknorris.io/) - For Chuck Norris jokes

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (to fetch jokes from APIs)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/crystal4000/MLH-API-Week-Challenges/tree/main/joke-machine.git
   ```

2. Navigate to the project directory:
   ```bash
   cd joke-machine
   ```

3. Open `index.html` in your browser:
   ```bash
   # On macOS
   open index.html
   
   # On Windows
   start index.html
   
   # On Linux
   xdg-open index.html
   ```

Alternatively, you can use a local development server like Live Server in VS Code.


## 💡 How It Works

1. **API Request**: When you click a category button, the application sends a request to the respective API.
2. **Processing Response**: The response is processed to handle different joke formats (single-line or two-part).
3. **Dynamic Display**: The joke is displayed on the page without refreshing.
4. **Sharing**: You can easily share jokes to social media or copy them to clipboard.

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🧩 Project Structure

```
joke-machine/
├── index.html      # Main HTML file with structure
└── README.md       # This file
```

## 🛣️ Future Enhancements

- Add user accounts to save favorite jokes
- Implement joke rating system
- Add more joke categories and sources
- Create a daily joke notification feature
- Implement dark mode toggle

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Thanks to all the joke API providers for their free services
- Inspiration from various joke websites and applications

---

Made with ❤️ by [Your Name](https://github.com/crytal4000)

Don't forget to leave a ⭐ if you found this useful!
