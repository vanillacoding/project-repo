describe('<WaitingContainer />', () => {
  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });

  it('should able to create a game', () => {
    cy.contains('방 만들기').click();
    cy.get('[type=text]').type('this is not a room').should('have.value', 'this is not a room');

    cy.contains('X').click();
    cy.wait(1000);

    cy.contains('방 만들기').click();
    cy.get('[type=text]').type('testroom').should('have.value', 'testroom');
    cy.get('[type=submit]').click();
    cy.url().should('include', 'game');
  });
});
