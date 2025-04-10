// src/components/RegistrationForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationForm from './RegistrationForm';

describe('RegistrationForm Integration Tests', () => {
  beforeEach(() => {
    // On vide le localStorage avant chaque test.
    localStorage.clear();
  });

  test('Le bouton est désactivé si tous les champs ne sont pas remplis', () => {
    render(<RegistrationForm />);
    const button = screen.getByRole('button', { name: /Sauvegarder/i });
    expect(button).toBeDisabled();
  });

  test('Remplissage des champs active le bouton', () => {
    render(<RegistrationForm />);

    // Utilisation d'expressions régulières précises pour cibler les bons labels.
    const inputNom = screen.getByLabelText(/^Nom\s*:/i);
    const inputPrenom = screen.getByLabelText(/^Prénom\s*:/i);
    const inputEmail = screen.getByLabelText(/^Email\s*:/i);
    const inputDateNaissance = screen.getByLabelText(/^Date de naissance\s*:/i);
    const inputVille = screen.getByLabelText(/^Ville\s*:/i);
    const inputCodePostal = screen.getByLabelText(/^Code Postal\s*:/i);

    fireEvent.change(inputNom, { target: { value: 'Dupont' } });
    fireEvent.change(inputPrenom, { target: { value: 'Jean' } });
    fireEvent.change(inputEmail, { target: { value: 'jean.dupont@example.com' } });
    fireEvent.change(inputDateNaissance, { target: { value: '1990-01-01' } });
    fireEvent.change(inputVille, { target: { value: 'Paris' } });
    fireEvent.change(inputCodePostal, { target: { value: '75001' } });

    const button = screen.getByRole('button', { name: /Sauvegarder/i });
    expect(button).not.toBeDisabled();
  });

  test('Soumission réussie: sauvegarde dans le localStorage, toaster de succès, champs vidés', async () => {
    render(<RegistrationForm />);

    const inputNom = screen.getByLabelText(/^Nom\s*:/i);
    const inputPrenom = screen.getByLabelText(/^Prénom\s*:/i);
    const inputEmail = screen.getByLabelText(/^Email\s*:/i);
    const inputDateNaissance = screen.getByLabelText(/^Date de naissance\s*:/i);
    const inputVille = screen.getByLabelText(/^Ville\s*:/i);
    const inputCodePostal = screen.getByLabelText(/^Code Postal\s*:/i);

    fireEvent.change(inputNom, { target: { value: 'Dupont' } });
    fireEvent.change(inputPrenom, { target: { value: 'Jean' } });
    fireEvent.change(inputEmail, { target: { value: 'jean.dupont@example.com' } });
    fireEvent.change(inputDateNaissance, { target: { value: '1990-01-01' } });
    fireEvent.change(inputVille, { target: { value: 'Lyon' } });
    fireEvent.change(inputCodePostal, { target: { value: '69000' } });

    const button = screen.getByRole('button', { name: /Sauvegarder/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/enregistrement réussi/i)).toBeInTheDocument();
    });

    const savedUser = JSON.parse(localStorage.getItem('user'));
    expect(savedUser).toEqual({
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      dateNaissance: '1990-01-01',
      ville: 'Lyon',
      codePostal: '69000'
    });

    // Vérifier que les champs ont été vidés après la soumission réussie.
    expect(inputNom.value).toBe('');
    expect(inputPrenom.value).toBe('');
    expect(inputEmail.value).toBe('');
    expect(inputDateNaissance.value).toBe('');
    expect(inputVille.value).toBe('');
    expect(inputCodePostal.value).toBe('');
  });

  test('Soumission erronée: toaster d’erreur et messages d’erreur affichés', async () => {
    render(<RegistrationForm />);

    const inputNom = screen.getByLabelText(/^Nom\s*:/i);
    const inputPrenom = screen.getByLabelText(/^Prénom\s*:/i);
    const inputEmail = screen.getByLabelText(/^Email\s*:/i);
    const inputDateNaissance = screen.getByLabelText(/^Date de naissance\s*:/i);
    const inputVille = screen.getByLabelText(/^Ville\s*:/i);
    const inputCodePostal = screen.getByLabelText(/^Code Postal\s*:/i);

    // Remplissage de tous les champs avec des valeurs non vides, mais invalides
    fireEvent.change(inputNom, { target: { value: 'Dupont123' } }); // Contient des chiffres, donc invalide.
    fireEvent.change(inputPrenom, { target: { value: '123' } });       // Invalide selon la validation.
    fireEvent.change(inputEmail, { target: { value: 'emailinvalide' } }); // Format email incorrect.
    fireEvent.change(inputDateNaissance, { target: { value: '2010-01-01' } }); // Moins de 18 ans.
    fireEvent.change(inputVille, { target: { value: 'Paris' } }); // Ville non vide et considérée comme valide.
    fireEvent.change(inputCodePostal, { target: { value: 'ABCDE' } }); // Format invalide.

    // Puisque tous les champs sont remplis (même si erronés), le bouton doit être activé.
    const button = screen.getByRole('button', { name: /Sauvegarder/i });
    expect(button).not.toBeDisabled();

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/erreur dans le formulaire/i)).toBeInTheDocument();
    });

    // Vérifier que les messages d'erreur attendus s'affichent.
    expect(screen.getByText(/le nom est invalide/i)).toBeInTheDocument();
    expect(screen.getByText(/le prénom est invalide/i)).toBeInTheDocument();
    expect(screen.getByText(/l'email est invalide/i)).toBeInTheDocument();
    expect(screen.getByText(/vous devez avoir 18 ans ou plus/i)).toBeInTheDocument();
    expect(screen.getByText(/le code postal n'est pas valide/i)).toBeInTheDocument();
  });
});
