// src/components/RegistrationForm.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import RegistrationForm from './RegistrationForm';

describe('RegistrationForm', () => {
  test('devrait afficher le titre "Inscription"', () => {
    render(<RegistrationForm />);
    const titleElement = screen.getByText(/Inscription/i);
    expect(titleElement).toBeInTheDocument();
  });
});
