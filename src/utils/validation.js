// src/utils/validation.js

/**
 * Calcule l'âge à partir d'une date de naissance
 * @param {string} birthDate - Date de naissance au format ISO (YYYY-MM-DD)
 * @returns {number} âge calculé
 */
export function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }
  
  /**
   * Vérifie que l'utilisateur est majeur (>= 18 ans)
   * @param {string} birthDate
   * @returns {boolean}
   */
  export function isAdult(birthDate) {
    return calculateAge(birthDate) >= 18;
  }
  
  /**
   * Valide le code postal français (5 chiffres)
   * @param {string} postalCode
   * @returns {boolean}
   */
  export function isValidPostalCode(postalCode) {
    const regex = /^[0-9]{5}$/;
    return regex.test(postalCode);
  }
  
  /**
   * Valide un nom ou prénom
   * Autorise les lettres (y compris accents, trémas), espaces et tirets.
   * @param {string} name
   * @returns {boolean}
   */
  export function isValidName(name) {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
    return regex.test(name);
  }
  
  /**
   * Valide une adresse email basique
   * @param {string} email
   * @returns {boolean}
   */
  export function isValidEmail(email) {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  }
  