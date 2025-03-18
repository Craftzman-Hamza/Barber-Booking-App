# Barber-Booking-App

## Overview

Barber-Booking-App is a React Native application that enables users to book barber appointments, browse available barbers, and manage their bookings efficiently.

## Features

- User authentication (Sign up, Login, Forgot Password)
- Browse barber profiles and services
- Book and manage appointments
- Push notifications for reminders
- Secure payments integration
- Firebase Firestore database support
- Cross-platform compatibility (iOS & Android)
- Smooth and responsive UI

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Craftzman-Hamza/Barber-Booking-App.git
   cd Barber-Booking-App
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Firebase:
   - Place `google-services.json` in `android/app/` for Android.
   - Place `GoogleService-Info.plist` in `ios/` for iOS.
   - Create a `.env` file and add Firebase configuration:
     ```env
     REACT_APP_API_KEY=your_api_key
     REACT_APP_AUTH_DOMAIN=your_auth_domain
     REACT_APP_PROJECT_ID=your_project_id
     REACT_APP_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_MESSAGING_SENDER_ID=your_sender_id
     REACT_APP_APP_ID=your_app_id
     ```
4. Run the app:
   ```bash
   npm run android   # For Android
   npm run ios       # For iOS
   ```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
