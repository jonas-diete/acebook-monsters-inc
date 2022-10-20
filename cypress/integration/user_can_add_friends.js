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

  it("User can accept a friend request and it shows on their friend list", () => {
    // sign up & in
    cy.visit("/users/new");
    cy.get("#name").type("Tom");
    cy.get("#email").type("tom@test.com");
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
    cy.get("#name").type("Guille");
    cy.get("#email").type("guille@test.com");
    cy.get("#password1").type("Password@1");
    cy.get("#password2").type("Password@1");
    cy.get("#submit").click();

    // click on other user link (in post) to get first user's profile
    cy.get("a.profile-link").first().click();

    // click on request friend
    cy.get("#friend-request-btn").click();

    //log out
    cy.get("#logout").click();

    // first user signs in again
    cy.get("#email").type("tom@test.com");
    cy.get("#password").type("Password@1");
    cy.get("#submit").click();

    // goes on their account page and accepts friend request
    cy.get("#account").click();
    cy.get("#accept-friend-request").click();

    // go on homepage, create post, then click on own link to get to public profile
    cy.visit("/posts");
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();
    cy.get("a.profile-link").first().click();

    // Added friend appears in friend list
    cy.contains("a.friend", "Guille");
  });
});