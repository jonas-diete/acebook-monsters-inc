describe("Home page", () => {
  it("has a title", () => {
    cy.visit("/sessions/new");
    cy.get("title").should("contain", "login");
    cy.contains("h1", "Welcome to AceBook");
  });
});
