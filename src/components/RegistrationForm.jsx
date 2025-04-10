// src/components/RegistrationForm.jsx
import React, { useState, useEffect } from 'react';
import {
  calculateAge,
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
  const [toasterType, setToasterType] = useState(''); // "success" ou "error"
  const [isFormValid, setIsFormValid] = useState(false);

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
    if (formData.ville.trim() === "") {
      newErrors.ville = "La ville est obligatoire.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem('user', JSON.stringify(formData));
      setToasterMessage("Enregistrement réussi !");
      setToasterType("success");
      setFormData(initialState);
    } else {
      setToasterMessage("Erreur dans le formulaire. Veuillez corriger les erreurs.");
      setToasterType("error");
    }
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
          <label htmlFor="nom">Nom :</label>
          <input
            id="nom"
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
          />
          {errors.nom && <div className="error-message">{errors.nom}</div>}
        </div>
        <div>
          <label htmlFor="prenom">Prénom :</label>
          <input
            id="prenom"
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
          />
          {errors.prenom && <div className="error-message">{errors.prenom}</div>}
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="dateNaissance">Date de naissance :</label>
          <input
            id="dateNaissance"
            type="date"
            name="dateNaissance"
            value={formData.dateNaissance}
            onChange={handleChange}
          />
          {errors.dateNaissance && <div className="error-message">{errors.dateNaissance}</div>}
        </div>
        <div>
          <label htmlFor="ville">Ville :</label>
          <input
            id="ville"
            type="text"
            name="ville"
            value={formData.ville}
            onChange={handleChange}
          />
          {errors.ville && <div className="error-message">{errors.ville}</div>}
        </div>
        <div>
          <label htmlFor="codePostal">Code Postal :</label>
          <input
            id="codePostal"
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
