import { artistIdList } from '../fixtures/example';

describe('<UserContainer />', () => {
  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });

  afterEach(() => {
    cy.saveLocalStorageCache();
  });

  it('should select/deselect favorite artists', () => {
    cy.wait(2000);
    const artistList = cy.get('#artistList');
    artistList.children().should('have.length', 20);

    for (let i = 0; i < 5; i++) {
      cy.get(`[data-id='${artistIdList[i]}']`).click();
    }

    cy.contains('Next').click();
    cy.url().should('include', '/waiting');
  });
});
