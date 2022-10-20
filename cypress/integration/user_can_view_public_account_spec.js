describe("Public Account", () => {
  it("can view other people's account from the timeline, clicking on their names", () => {
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
    cy.get(".profile-link").click();
    cy.contains("h1", "nameone's Account");
  });

  it("can view other people's account and their posts from the timeline, clicking on their names", () => {
    //sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone1@example.com");
    cy.get("#password").type("Password@1");
    cy.get("#submit").click();

    // submit a post
    cy.contains("#logout", "Logout");
    cy.get("#new-post-form")
      .find('[type="text"]')
      .type("Hope you have a great day!");
    cy.get("#new-post-form").submit();

    //logout
    cy.get("#logout").click();

    //sign in
    cy.get("#email").type("someone2@example.com");
    cy.get("#password").type("Password@1");
    cy.get("#submit").click();

    // submit a post
    cy.contains("#logout", "Logout");
    cy.get("#new-post-form")
      .find('[type="text"]')
      .type("How is everyone doing?");
    cy.get("#new-post-form").submit();

    //submit another post
    cy.get("#new-post-form").find('[type="text"]').type("Heyyy");
    cy.get("#new-post-form").submit();

    // click on their name
    cy.get(".posts > .post").eq(3).find(".profile-link").click();
    cy.contains("h1", "nameone's Account");
    cy.get(".post:contains('nameone')").its("length").should("eq", 2);
  });
});
