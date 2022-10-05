describe('Main Component', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('typing test', () => {
    const mockText = "I'm good."
    cy.get('Input')
      .type(mockText)
      .should('have.value', mockText);
  });

  it('Button should disabled if Input.value.length < 15', () => {
    cy.get('Button')
      .should('be.disabled');
  })


});
