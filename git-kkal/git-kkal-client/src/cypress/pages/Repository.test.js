const getToRepoPage = () => {
  cy.visit('');

  cy.get('.sc-dlfnuX').clear();
  cy.get('.sc-dlfnuX').type('https://github.com/soinboat/git-kkal-client.git');
  cy.get('.sc-eCstlR').click();
};

describe('Repository Page', () => {
  it('should change diff file list on click branch', () => {
    getToRepoPage();

    cy.get('.sc-hBEYId > :nth-child(2)').click();
    cy.get('.sc-crrszt').should('be.visible');
  });

  it('should change diff file list on click commit', () => {
    getToRepoPage();

    cy.get(':nth-child(3) > .sc-kfzBvY').click();
    cy.get('.sc-lmoMya > :nth-child(1)').should('be.visible');

    cy.get('.sc-hBEYId > :nth-child(2)').click();
    cy.get('.sc-crrszt').should('be.visible');
  });

  it('should be able to show diff page on click diff file name', () => {
    getToRepoPage();

    cy.get('.sc-lmoMya > :nth-child(1)').click();
    cy.get('.sc-iUuxjF').should('be.visible');
  });

  it('should show 3d graph on click 3d button', () => {
    getToRepoPage();

    cy.get('[name="3D"]').click();
    cy.get('.sc-iwyWTf').should('be.visible');
  });
});
