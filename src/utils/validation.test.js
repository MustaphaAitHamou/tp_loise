// src/utils/validation.test.js
import {
    calculateAge,
    isAdult,
    isValidPostalCode,
    isValidName,
    isValidEmail,
  } from './validation';
  
  describe('Validation Functions', () => {
    test('calculateAge - age correct', () => {
      // Exemple : si la date est il y a 20 ans
      const date = new Date();
      date.setFullYear(date.getFullYear() - 20);
      const isoDate = date.toISOString().split('T')[0];
      expect(calculateAge(isoDate)).toBe(20);
    });
  
    test('isAdult retourne false si moins de 18 ans', () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 17);
      const isoDate = date.toISOString().split('T')[0];
      expect(isAdult(isoDate)).toBe(false);
    });
  
    test('isAdult retourne true pour 18 ans et plus', () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 18);
      const isoDate = date.toISOString().split('T')[0];
      expect(isAdult(isoDate)).toBe(true);
    });
  
    test('isValidPostalCode - format valide', () => {
      expect(isValidPostalCode('75001')).toBe(true);
      expect(isValidPostalCode('1234')).toBe(false);
      expect(isValidPostalCode('7500A')).toBe(false);
    });
  
    test('isValidName - accepte les lettres avec accents, espaces et tirets', () => {
      expect(isValidName('Émilie')).toBe(true);
      expect(isValidName('Jean-Pierre')).toBe(true);
      expect(isValidName('Anne Marie')).toBe(true);
      expect(isValidName('Marie123')).toBe(false);
      expect(isValidName('Jean@')).toBe(false);
    });
  
    test('isValidEmail - format email', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('test.example.com')).toBe(false);
      expect(isValidEmail('test@com')).toBe(false);
    });
  });
  