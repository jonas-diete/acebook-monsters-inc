describe("Timeline", () => {

  it("can submit posts, when signed in, and view them", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("name");
    cy.get("#email").type("someone@example.com");
    cy.get("#password1").type("Password@1");
    cy.get("#password2").type("Password@1");
    cy.get("#submit").click();

    // submit a post

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get("#new-post-form").find('[type="text"]').type("Hi, guys!");
    cy.get("#new-post-form").submit();

    cy.get(".post").first().contains("Hi, guys!");
  });
});
