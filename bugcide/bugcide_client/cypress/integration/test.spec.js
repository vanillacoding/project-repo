describe('initial test', () => {
  const projectName = 'mock project';

  before(() => {
    cy.login();
  });

  it('create a new project', () => {
    cy.get('.content-header .btn-basic')
      .click()
      .get('.modal-content').then($el => {
        Cypress.dom.isVisible($el);
      })
      .get('.modal-content .input-basic')
      .type(projectName)
      .get('.modal-content .btn-basic')
      .click()
      .wait(2000)
      .get('.project-table tbody tr:first-child a')
      .contains(projectName);
  });

  it("doesn't create a project if user types an invalid project name", () => {
    cy.get('.content-header .btn-basic')
      .click()
      .get('.modal-content').then($el => {
        Cypress.dom.isVisible($el);
      })
      .get('.modal-content .input-basic')
      .type(projectName)
      .get('.modal-content .btn-basic')
      .click()
      .get('.label-info.txt-red')
      .contains('same name already exist')
      .get('.btn-close')
      .click();
  });

  it('render project detail page', () => {
    cy.get('.pagination .btn-page:last-child')
      .click()
      .wait(2000)
      .get('.project-table tbody tr:last-child a')
      .click()
      .wait(2000)
      .get('.time-list')
      .should('have.length', 2)
      .get('.time-list .btn-more')
      .click({ multiple: true })
      .wait(1000)
      .click({ multiple: true })
      .wait(1000);
  });

  it('toggle sorting if user click toggle button', () => {
    cy.get('.toggle-switch > label')
      .click()
      .wait(2000);
  });

  it('render Graph tab in detail page', () => {
    cy.get('.tab-header li')
      .each($el => {
        $el
          .children('.btn-tab')
          .click();
      })
      .wait(2000)
      .window()
      .scrollTo('bottom', {
        duration: 3000,
        easing: 'swing'
      });
  });

  it('go back to list page if user click List button', () => {
    cy.get('.content-header a.btn-basic')
      .click()
      .get('.pagination .btn-page:first-child')
      .click()
      .wait(3000);
  });

  after(() => {
    cy.get('.project-table tbody tr:first-child a')
      .click()
      .get('.btn-delete')
      .click()
      .get('.modal-content .input-basic')
      .type(projectName)
      .get('.modal-content .btn-basic')
      .click();
  });
});
