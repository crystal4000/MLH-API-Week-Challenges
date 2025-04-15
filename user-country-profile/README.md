# User-Country Profile Project

This project integrates two APIs to create a comprehensive user-country profile. It fetches a random user profile and retrieves detailed information about the user's country.

## Project Structure

```
user-country-profile
├── index.html         # Main HTML document
├── css
│   └── styles.css     # Styles for the application
├── js
│   ├── app.js         # Main JavaScript file for API orchestration
│   ├── userApi.js     # Functions to interact with the RandomUser API
│   └── countryApi.js   # Functions to interact with the REST Countries API
├── assets
│   └── favicon.ico     # Favicon for the application
└── README.md           # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd user-country-profile
   ```

2. **Open the project in your preferred code editor.**

3. **Open `index.html` in a web browser to view the application.**

## Usage

- Upon loading the application, a random user profile will be fetched from the RandomUser API.
- The application will then extract the user's country and make a request to the REST Countries API to retrieve detailed information about that country.
- The combined data will be displayed in the user interface.

## Functionality Overview

- **RandomUser API**: Generates random user profiles, including location and country information.
- **REST Countries API**: Provides detailed information about countries, including population, area, and languages spoken.

## Screenshot
<img width="1512" alt="Screenshot 2025-04-15 at 5 08 13 PM" src="https://github.com/user-attachments/assets/391a06e5-05fb-4162-a097-6b20d0198138" />


## License

This project is open-source and available for modification and distribution.
