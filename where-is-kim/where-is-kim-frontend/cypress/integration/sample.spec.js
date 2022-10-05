describe("The Home page", () => {
  describe("Signup", () => {
    it("should register new user", () => {
      cy.visit("/");
      cy.get("form a").click();
      cy.url().should("include", "signup");
      cy.get('input[type="text"]')
        .type("Kim sun hwa")
        .should("have.value", "Kim sun hwa");
      cy.get('input[type="email"]')
        .type("kim@kim")
        .should("have.value", "kim@kim");
      cy.get('input[type="password"]')
        .type("asdf")
        .should("have.value", "asdf");
      cy.get("button").click();
    });
    // should remove user createad just now..
  });
});
