// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Assurez-vous d'importer depuis react-dom/client
import App from './App';
import './index.css';

// Récupérer l'élément racine dans votre HTML
const container = document.getElementById('root');

// Créer la racine de l'application
const root = ReactDOM.createRoot(container);

// Monter l'application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
