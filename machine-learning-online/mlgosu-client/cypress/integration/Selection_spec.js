describe('Selection Component', () => {
  beforeEach(() => {
    const url =
        "https://drive.google.com/uc?export=download&id=1j78fFH-IZUXnEmW0dNgOd9M2w64oU1zj";
    cy.visit('/');
    cy.get('Input')
      .type(url);
    cy.get('#abledBtn')
      .click();
  });

  it('span value should be guest if not logged in', () => {
    cy.get('span')
      .should('text', 'guest');
  });

  it('typing test', async () => {
    await cy.get('#price')
            .click();

    await cy.get('#y')
            .should('text', 'price');
  });

});
