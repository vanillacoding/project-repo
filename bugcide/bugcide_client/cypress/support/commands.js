Cypress.Commands.add('login', () => {
  window.localStorage.setItem('bugcideToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NpYWxJZCI6Im1vY2tJZCIsImlhdCI6MTU3MzYzOTY3NH0.PVvb5c7OyoEztjLZkMxZqK3QNtMkElIzdMmWjBknpxw');
  cy.visit('/');
});
