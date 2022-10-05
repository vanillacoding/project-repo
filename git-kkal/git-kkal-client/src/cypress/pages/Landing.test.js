describe('Landing Page', () => {
  it('should have input', () => {
    cy.visit('');

    cy.get('input').should('exist');
  });

  it('should be able to input url', () => {
    cy.visit('');

    cy.get('.sc-dlfnuX').clear();
    cy.get('.sc-dlfnuX').type('https://github.com');
  });

  it('should show error modal in case of invalid input', () => {
    cy.visit('');

    cy.get('.sc-dlfnuX').clear();
    cy.get('.sc-dlfnuX').type('https://github.com/test/test.git');
    cy.get('.sc-eCstlR').click();
    cy.get('.Toastify__toast-body').click();
  });

  it('should be redirected after valid repo url input', () => {
    cy.visit('');

    cy.get('.sc-dlfnuX').clear();
    cy.get('.sc-dlfnuX').type(
      'https://github.com/soinboat/git-kkal-client.git',
    );
    cy.get('.sc-eCstlR').click();
    cy.location().should((loc) => {
      expect(loc.pathname.toString()).to.contain('/repository');
    });
  });
});
