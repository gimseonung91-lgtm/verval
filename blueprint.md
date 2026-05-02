# ABA Training Web App Blueprint

## Project Overview
This application is designed for ABA (Applied Behavior Analysis) training sessions, specifically focusing on Verbal Behavior (VB) categories: Mand, Tact, Echoic, and Intraverbal. It targets special education environments with an emphasis on high accessibility, data recording, and progress tracking.

## Features & Implementation
- **Student Management**: Mandatory name entry before training starts. Persistent display of the current student's name.
- **Mand (Requesting)**: A dynamic list of items that can be added or deleted to facilitate requesting behavior training.
- **Tact (Naming)**: Large visual stimuli (300px+) with a variety of items (Apple, Grape, Car, Pencil, Cup, Dog) presented randomly or sequentially.
- **Echoic (Mimetic)**: Integration with Web Speech API (TTS) for vocal modeling. Success/Fail logging with toast notifications.
- **Intraverbal (Responding)**: Question-answer prompts with a visual non-clickable "answer box". Includes a reaction time (latency) stopwatch and a 10-second automatic failure timeout.
- **Analytics & History**: 
    - Data stored in `localStorage`.
    - Data Structure: `[Student Name, Type, Item, Result, Latency, Timestamp]`.
    - Tabular view with filtering by student name.

## Design Standards
- **Typography**: Sans-serif (Pretendard/Roboto/System) for clarity.
- **Visuals**: Large buttons (min 48px height), high contrast, vibrant yet clean colors.
- **Feedback**: Toast messages for action confirmation.

## Current Steps
1. Create a single-file `index.html` containing all CSS and JS.
2. Implement `localStorage` logic for data persistence.
3. Add filtering functionality for the history table.
4. Verify all constraints (Large Tact images, Intraverbal timeout, etc.).
