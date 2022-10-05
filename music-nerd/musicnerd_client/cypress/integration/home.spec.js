describe('<HomeContainer />', () => {
  before(function() {
    cy.clearLocalStorageCache();
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });

  it('should proceed signup for test user.', () => {
    cy.visit('http://localhost:3000');

    cy.contains('Sign Up').click();
    cy.url().should('include', '/auth/signup');

    cy.get('[name=username]').type('testuser').should('have.value', 'testuser');
    cy.get('[name=email]').type('test@gmail.com').should('have.value', 'test@gmail.com');
    cy.get('[name=password]').type(123123).should('have.value', '123123');
    cy.get('[name=confirmationPassword]').type(123123).should('have.value', '123123');

    cy.get('[type=submit]').click();
    cy.url().should('include', '/auth/login');
  });

  it('should proceed login for test user.', () => {
    cy.contains('Login').click();
    cy.get('[type=email]').type('test@gmail.com').should('have.value', 'test@gmail.com');
    cy.get('[type=password]').type(123123).should('have.value', '123123');

    cy.get('[type=submit]').click();
  });
});
