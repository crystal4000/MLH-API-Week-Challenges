# Terrible Karaoke Generator

A humorous web application that generates playlists of the most challenging karaoke songs to sing, using the Spotify API.

## Features

- 🎤 Creates playlists of notoriously difficult karaoke songs
- 🎚️ Adjustable difficulty level (from "Challenging" to "Impossible")
- 🎵 Displays why each song is particularly difficult to sing
- 💾 Mock functionality to save playlists to Spotify
- 🔒 OAuth authentication with Spotify

## Technologies Used

- HTML/CSS/JavaScript
- Spotify Web API
- OAuth 2.0 authentication

## Setup

1. Create a Spotify Developer account at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Create a new application
3. Set the redirect URI to match your deployment URL
4. Copy your Client ID to the application when prompted


## How It Works

The application:
1. Authenticates with Spotify using OAuth
2. Generates a playlist of difficult karaoke songs based on selected difficulty
3. Provides information about why each song is challenging (vocal range, speed, etc.)
4. Simulates saving the playlist to your Spotify account

## Note

This is a demo application that simulates playlist creation. In a production environment, you would need a server-side component to securely handle the OAuth token exchange.

## Screenshot
<img width="1511" alt="Screenshot 2025-04-15 at 5 02 02 PM" src="https://github.com/user-attachments/assets/65f07c33-ce22-4808-bdb5-a640777135ae" />
