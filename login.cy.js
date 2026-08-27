describe('Automation Testing Login SauceDemo', () => {

  it('Login berhasil menggunakan username dan password yang valid', () => {
    cy.visit('https://www.saucedemo.com/');

    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    cy.url().should('include', '/inventory.html');
  });

  it('Login gagal ketika password salah', () => {
    cy.visit('https://www.saucedemo.com/');

    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('password_salah');
    cy.get('#login-button').click();

    cy.get('[data-test="error"]').should(
      'contain',
      'Username and password do not match any user in this service'
    );
  }); 
  it('Menampilkan pesan error ketika username kosong', () => {
    cy.visit('https://www.saucedemo.com/');

    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

     cy.get('[data-test="error"]').should(
      'contain',
      'Username is required'
    );
  });
});