// src/components/RegistrationForm.jsx
import React, { useState, useEffect } from 'react';
import {
  isAdult,
  isValidPostalCode,
  isValidName,
  isValidEmail,
} from '../utils/validation';

const initialState = {
  nom: '',
  prenom: '',
  email: '',
  dateNaissance: '',
  ville: '',
  codePostal: '',
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [toasterMessage, setToasterMessage] = useState(null);
  const [toasterType, setToasterType] = useState(''); // 'success' ou 'error'
  const [isFormValid, setIsFormValid] = useState(false);

  // Vérifier que tous les champs sont remplis pour activer le bouton
  useEffect(() => {
    const allFilled = Object.values(formData).every((v) => v.trim() !== '');
    setIsFormValid(allFilled);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Réinitialisation de l'erreur du champ au changement
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isValidName(formData.nom)) {
      newErrors.nom = "Le nom est invalide.";
    }
    if (!isValidName(formData.prenom)) {
      newErrors.prenom = "Le prénom est invalide.";
    }
    if (!isValidEmail(formData.email)) {
      newErrors.email = "L'email est invalide.";
    }
    if (!isAdult(formData.dateNaissance)) {
      newErrors.dateNaissance = "Vous devez avoir 18 ans ou plus.";
    }
    if (!isValidPostalCode(formData.codePostal)) {
      newErrors.codePostal = "Le code postal n'est pas valide.";
    }
    // La ville peut être simplement non vide dans ce cas
    if (formData.ville.trim() === "") {
      newErrors.ville = "La ville est obligatoire.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Sauvegarder dans le localStorage
      localStorage.setItem('user', JSON.stringify(formData));
      // Afficher le toaster de succès
      setToasterMessage("Enregistrement réussi !");
      setToasterType("success");
      // Réinitialiser le formulaire
      setFormData(initialState);
    } else {
      setToasterMessage("Erreur dans le formulaire. Veuillez corriger les erreurs.");
      setToasterType("error");
    }
    // On affiche le message temporairement
    setTimeout(() => {
      setToasterMessage(null);
    }, 3000);
  };

  return (
    <div className="registration-form">
      <h2>Inscription</h2>
      {toasterMessage && (
        <div className={`toaster ${toasterType}`}>
          {toasterMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
          />
          {errors.nom && <div className="error-message">{errors.nom}</div>}
        </div>
        <div>
          <label>Prénom :</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
          />
          {errors.prenom && <div className="error-message">{errors.prenom}</div>}
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div>
          <label>Date de naissance :</label>
          <input
            type="date"
            name="dateNaissance"
            value={formData.dateNaissance}
            onChange={handleChange}
          />
          {errors.dateNaissance && <div className="error-message">{errors.dateNaissance}</div>}
        </div>
        <div>
          <label>Ville :</label>
          <input
            type="text"
            name="ville"
            value={formData.ville}
            onChange={handleChange}
          />
          {errors.ville && <div className="error-message">{errors.ville}</div>}
        </div>
        <div>
          <label>Code Postal :</label>
          <input
            type="text"
            name="codePostal"
            value={formData.codePostal}
            onChange={handleChange}
          />
          {errors.codePostal && <div className="error-message">{errors.codePostal}</div>}
        </div>
        <button type="submit" disabled={!isFormValid}>
          Sauvegarder
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
