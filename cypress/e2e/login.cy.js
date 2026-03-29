/* eslint-disable no-undef */
/**
 * - Login spec
 *   - should display login page correctly
 *   - should show validation error when email is empty
 *   - should show validation error when password is empty
 *   - should show error message when login failed
 *   - should redirect to homepage when login success
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="nama@contoh.com"]').should('be.visible');
    cy.get('input[placeholder="••••••••"]').should('be.visible');
    cy.get('button').contains('Masuk Sekarang').should('be.visible');
  });

  it('should show validation error when email is empty', () => {
    cy.get('input[placeholder="••••••••"]').type('123123');

    cy.get('button').contains('Masuk Sekarang').click();

    cy.contains('Email wajib diisi').should('be.visible');
  });

  it('should show validation error when password is empty', () => {
    cy.get('input[placeholder="nama@contoh.com"]').type('test@gmail.com');

    cy.get('button').contains('Masuk Sekarang').click();

    cy.contains('Password wajib diisi').should('be.visible');
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="nama@contoh.com"]').type('salah@gmail.com');

    cy.get('input[placeholder="••••••••"]').type('salah123');

    cy.get('button').contains('Masuk Sekarang').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('User ID or password is wrong');
    });
  });

  it('should redirect to homepage when login success', () => {
    cy.get('input[placeholder="nama@contoh.com"]').type('ryuzaki@gmail.com');
    cy.get('input[placeholder="••••••••"]').type('12174964');

    cy.get('button').contains('Masuk Sekarang').click();

    // cek redirect
    cy.url().should('eq', 'http://localhost:5173/');

    // cek UI setelah login
    cy.contains('Log out').should('be.visible');
  });
});
