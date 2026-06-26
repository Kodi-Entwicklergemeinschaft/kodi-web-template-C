# Web App

<!-- kodi-badges -->
[![Lizenz: EUPL-1.2](https://img.shields.io/badge/Lizenz-EUPL%201.2-blue.svg)](LICENSE) ![Open Source](https://img.shields.io/badge/Open%20Source-Ja-brightgreen.svg) ![Smart City](https://img.shields.io/badge/Smart%20City-Kommunal-orange.svg) ![Sprache](https://img.shields.io/badge/Sprache-TypeScript-informational.svg) ![KODI](https://img.shields.io/badge/KODI-Entwicklergemeinschaft-blueviolet.svg)
<!-- /kodi-badges -->

This project is a frontend application built with your preferred framework (e.g., React, Vue, etc.). Below are the steps to build and deploy the app locally using PM2.

---

## 🚀 Build and Serve with PM2

After making changes and you're ready to deploy the app, follow these steps:

### 1. Build the App

```bash
npm run build


pm2 serve build/ 3000 --spa --name "Web-App"

pm2 status           # View all processes
pm2 restart Web-App  # Restart the app
pm2 stop Web-App     # Stop the app
pm2 delete Web-App   # Delete the app from PM2