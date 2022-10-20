describe("AddFriends", () => {
  it("User can request a friendship with another user", () => {
    // sign up & in
    cy.visit("/users/new");
    cy.get("#name").type("Jonas");
    cy.get("#email").type("jonas@test.com");
    cy.get("#password1").type("Password@1");
    cy.get("#password2").type("Password@1");
    cy.get("#submit").click();

    // Create a post
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    //log out
    cy.get("#logout").click();

    // sign up & in as different user
    cy.visit("/users/new");
    cy.get("#name").type("James");
    cy.get("#email").type("james@test.com");
    cy.get("#password1").type("Password@1");
    cy.get("#password2").type("Password@1");
    cy.get("#submit").click();

    // click on other user link (in comment) to get to their profile
    cy.get("a.profile-link").click();

    // click on request friend, then it disappears
    cy.get("#friend-request-btn").click();
    cy.get("#friend-request-btn").should("not.exist");
  });
});