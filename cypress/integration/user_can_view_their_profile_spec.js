describe("Profile Page", () => {
    it("can view their profile page when signed in", () => {
        // sign up
        cy.visit("/users/new");
        cy.get("#name").type("name");
        cy.get("#email").type("someone@example.com");
        cy.get("#password1").type("Password@1");
        cy.get("#password2").type("Password@1");
        cy.get("#submit").click();

        //view the profile page
        cy.contains("#logout", "Logout");
        cy.get("#view-profile").click();
        
    });
});