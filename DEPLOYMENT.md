# 🚀 Cloud Deployment Guide - Task Management API

This document provides step-by-step instructions to deploy the Task Management API to the cloud using [Render](https://render.com/).

---

## 🌐 1. Prerequisites

Before deploying, ensure the following:

- A Render account: [Sign up here](https://render.com)
- A GitHub/GitLab repo with your complete project code
- MongoDB Atlas account (for cloud database)
- `.env` file with required variables (see `.env.example`)

---

## 🐳 2. Dockerfile (already included)

Render supports Docker-based deployment.

Sample `Dockerfile`:

```dockerfile
# Use Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build (if needed)
# RUN npm run build

# Expose port
EXPOSE 5000

# Start the server
CMD ["npm", "run", "dev"]
