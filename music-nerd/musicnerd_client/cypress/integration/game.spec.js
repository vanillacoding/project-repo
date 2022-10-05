describe('<WaitingContainer />', () => {
  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });

  it('should start game', () => {
    cy.wait(2000);
    cy.contains('READY').click();
    cy.contains('GAME START').click();
  });

  it('should render chat message', () => {
    cy.wait(1000);
    cy.get('[placeholder="Type messages.."]').type('hello world!').should('have.value', 'hello world!');
    cy.contains('Send').click();

    cy.get('p').eq(0).should('contain', 'testuser');
    cy.get('p').eq(1).should('contain', 'hello world!');
  });

  it('should render trackcard and can add current track to favorite track list', () => {
    cy.wait(1000 * 10);
    cy.get('[placeholder="Type messages.."]')
      .type('music is playing..')
      .should('have.value', 'music is playing..');
    cy.contains('Send').click();

    cy.wait(1000 * 10);
    cy.get('[placeholder="Type messages.."]')
      .type('music ends in 10 sec...')
      .should('have.value', 'music ends in 10 sec...');
    cy.contains('Send').click();

    cy.wait(1000 * 6);
    cy.get('[placeholder="Type messages.."]')
      .type('...and, now track info card is open!!')
      .should('have.value', '...and, now track info card is open!!');
    cy.contains('Send').click();

    cy.wait(1000 * 4);
    cy.get('.coverimg').should('exist');
    cy.get('.heart').click();

    cy.wait(1500);
    cy.contains('EXIT').click();
  });
});

