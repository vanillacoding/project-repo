import axios from 'axios';

describe('<Profile />', () => {
  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });

  after(done => {
    axios.delete(`${Cypress.env().serverURI}/auth`);
    done();
  });

  it('should show favorite artists and favorite tracks', () => {
    cy.contains('Profile').click();

    cy.wait(2000);

    cy.get('.user-info').children().eq(0).should('contain', 'testuser');
    cy.get('.user-info').children().eq(1).should('contain', 'test@gmail.com');
    cy.get('.user-info').children().eq(2).should('contain', 'Total Score');
    cy.get('.user-info').children().eq(3).should('contain', 'Total Play');

    cy.get('.card-wrapper').eq(0).children().should('have.length', 5);
    cy.get('.card-wrapper').eq(1).children().should('have.length', 1);

    cy.scrollTo('bottom', { duration: 2000 });
    cy.scrollTo('top', { duration: 2000 });

    cy.contains('Game').click();

    cy.wait(1000);
    cy.contains('Logout').click();
  });
});
