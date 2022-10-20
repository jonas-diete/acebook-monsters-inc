describe("Public Account", () => {
  it("can go to other people's account and create a post", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#name").type("nameone");
    cy.get("#email").type("someone1@example.com");
    cy.get("#password1").type("Password@1");
    cy.get("#password2").type("Password@1");
    cy.get("#submit").click();

    // submit a post
    cy.contains("#logout", "Logout");
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    //logout
    cy.get("#logout").click();

    // sign up with a different account
    cy.visit("/users/new");
    cy.get("#name").type("nametwo");
    cy.get("#email").type("someone2@example.com");
    cy.get("#password1").type("Password@1");
    cy.get("#password2").type("Password@1");
    cy.get("#submit").click();

    // click on their name
    cy.get(".public-name").click();

    //visit their account
    cy.get("#new-post-form").find('[type="text"]').type("Hello nameone");
    cy.get("#new-post-form").submit();
    cy.get(".post").contains("Hello nameone");
    cy.get(".posts > .post").eq(1).contains("Hello, world!");
  });
  // it("can see their post on other people's account on the timeline", () => {});
});
