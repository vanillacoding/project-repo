declare namespace Cypress {
  interface Chainable<Subject> {
    saveLocalStorage(): Chainable<Subject>;
    restoreLocalStorage(): Chainable<Subject>;
  }
}
