describe('Diff Page', () => {
  it('should show diff on click diff file', () => {
    cy.visit('');

    cy.get('.sc-dlfnuX').clear();
    cy.get('.sc-dlfnuX').type(
      'https://github.com/soinboat/git-kkal-client.git',
    );
    cy.get('.sc-eCstlR').click();

    cy.get('.sc-cxFLGX').click();
    cy.get('.sc-eggMyH').should('be.visible');
  });
});
