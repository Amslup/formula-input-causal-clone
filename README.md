# formula-input-causal-clone
Formula input functionality similar to Causal.app using React, Zustand, and React Query
Formula Input Editor - Causal.app Clone

A React-based formula input system that replicates Causal.app functionality with support for variables, operators, and real-time calculation.

📋 Project Overview

This project implements a comprehensive formula input editor similar to Causal.app, built with modern React technologies. It supports various variable types, mathematical operators, and includes bonus calculation functionality with dummy values.

✨ Features

Core Functionality

•
✅ Formula Input Field with "=" prefix

•
✅ Variable Support with multiple prefixes:

•
# (Numeric): Sales cycle, Demos, Revenue

•
% (Percentage): Churn rate, Growth rate

•
⊙ (Time): month

•
$ (Currency): ACV



•
✅ Mathematical Operators: +, -, *, /, (, )

•
✅ Natural Numbers: Direct number input support

•
✅ Text Input: Writing text between tags

•
✅ Tag Deletion: Backspace functionality to remove elements

•
✅ Autocomplete: API integration with mock data

•
✅ Dropdown Menus: Information panels for each variable tag

•
✅ Bonus Calculation: Formula evaluation with dummy variable values

Technical Features

•
📱 Responsive Design: Works on mobile, tablet, and desktop

•
🎨 Modern UI: Clean interface matching Causal.app aesthetics

•
⚡ Real-time Updates: Instant formula preview and calculation

•
🔧 Extensible: Easy to add new variables and operators

🛠️ Technology Stack

•
Frontend Framework: React 18

•
State Management: Zustand

•
API Management: React Query (@tanstack/react-query)

•
Styling: Tailwind CSS

•
Build Tool: Vite

•
UI Components: Custom components with class-variance-authority

📦 Installation

Prerequisites

•
Node.js (v18 or higher)

•
npm or pnpm

Setup

Bash


# Clone the repository
git clone https://github.com/Amslup/formula-input-causal-clone.git

# Navigate to project directory
cd formula-input-causal-clone

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser


Build for Production

Bash


# Create production build
npm run build

# Preview production build
npm run preview


🎯 Usage

Basic Formula Creation

1.
Click Variable Buttons: Use the colored variable buttons to add different types of variables

2.
Add Operators: Click operator buttons (+, -, *, /, (, )) to build mathematical expressions

3.
Type Directly: Enter custom text and numbers in the input field

4.
Calculate: Click the "🧮 Calculate" button to see results with dummy values

Example Formulas

•
= # Sales cycle (months) - % Churn rate + ⊙ month

•
= # Revenue * % Growth Rate

•
= (# Demos + # Revenue) / 2

•
= $ ACV * ⊙ month - % Churn rate

