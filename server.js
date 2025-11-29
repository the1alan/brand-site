import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Указываем папку с файлами сайта
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для index.html на всякий случай
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Старт сервера с выводом в консоль
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

