/// <reference types="Cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  //https://on.cypress.io/interacting-with-elements

  // describe("My First Test", () => {
    it("Click search input!", () => {
      cy.get(".input-search")
        .type("hello")
        .should("have.value", "hello");
    });
    it("Select English Language", () => {
      cy.get(".input-search")
        .type("hello1")
        .should("have.value", "hello1");
    })
  // });
});
