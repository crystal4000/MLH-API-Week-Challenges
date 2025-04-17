# XKCD API Challenge

## Overview
This project is a web application that interfaces with the XKCD Comics API. Users can browse through XKCD comics with various navigation options including viewing the latest comic, random comics, as well as navigating to the first, last, next, or previous comics. The application also allows searching for specific comics by their ID number.

## Features
- View latest XKCD comic
- Navigate through comics (previous, next, first, last)
- Get a random comic
- Search for a specific comic by ID
- Responsive design for all devices

## Tech Stack
- **HTML5**: Structure and content
- **CSS3**: Styling with Bootstrap 4.3.1
- **JavaScript**: Interactive functionality using ES6 Classes
- **Fetch API**: For handling API requests
- **XKCD API**: Comic data source

## Project Structure
```
/
├── index.html      # Main HTML document
├── style.css       # Custom CSS styles
├── script.js       # JavaScript functionality
└── README.md       # Project documentation
```

## Implementation Details
The application is implemented using two main classes:
1. **DomInterface**: Handles all UI interactions
2. **RequestController**: Manages API requests and state

The code follows an object-oriented approach with clear separation of concerns between the UI handling and the data fetching logic.

## API Usage
The application uses the XKCD API through a CORS-compatible endpoint. The main endpoints used are:
- Latest comic: `/info.0.json`
- Specific comic: `/{comic_id}/info.0.json`

## Setup Instructions
1. Clone this repository
2. Open `index.html` in your browser
3. No build steps or dependencies to install - it's ready to use!

## Learning Objectives
This project demonstrates:
- Working with third-party APIs
- Handling API responses and errors
- State management in JavaScript
- DOM manipulation
- Object-oriented JavaScript programming
- Error handling and user feedback

## Troubleshooting
If comics don't load, check your browser's console for errors. The most common issue is related to CORS restrictions, which has been addressed in the latest version by using a CORS-friendly API endpoint.

## Resources
- [XKCD Website](https://xkcd.com)
- [XKCD API Documentation](https://xkcd.com/json.html)
- [Challenge Page](https://theultimateapichallenge.com/challenges/xkcd-api)

## License
This project is created for educational purposes as part of the Ultimate API and MLH API Week Challenge.