describe("AddFriends", () => {
  it("Accept friend button disappears after accepting", () => {
    // Jonas logs in
    cy.visit("/sessions/new")
    cy.get("#email").type("jonas@test.com");
    cy.get("#password").type("Password@1");
    cy.get("#submit").click();

    // clicks on Tom's profile
    cy.get("a.profile-link").first().click();

    // clicks on request friend
    cy.get("#friend-request-btn").click();

    //logs out
    cy.get("#logout").click();

    // Tom signs in
    cy.get("#email").type("tom@test.com");
    cy.get("#password").type("Password@1");
    cy.get("#submit").click();

    // goes on their account page and accepts friend request, then button should disappear
    cy.get("#account").click();
    cy.get("#accept-friend-request").click();
    cy.get("#accept-friend-request").should("not.exist");

  });
});