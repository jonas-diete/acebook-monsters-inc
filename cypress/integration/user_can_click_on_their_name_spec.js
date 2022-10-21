describe("Name link", () => {
    it("clicks on their name from the timeline and is redirected to their 'My Account' page", () => {
        // sign up
        cy.visit("/users/new");
        cy.get("#name").type("name");
        cy.get("#email").type("someone@example.com");
        cy.get("#password1").type("Password@1");
        cy.get("#password2").type("Password@1");
        cy.get("#submit").click();

        // submit a post
        cy.contains("#logout", "Logout");
        cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
        cy.get("#new-post-form").submit();
        
        // clicks on their name
        cy.get(".profile-link").click();

        //account page
        cy.contains("h1", "My Account");
        cy.contains("#account-name", "name");
    });
});