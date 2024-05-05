import { loginPage } from "../pages/login"
import { secureArea } from "../pages/secureArea";

const userInfo = {
    incorrectUsername: 'abc',
    incorrectPassword: 'abc123',
    correctUsername: 'tomsmith',
    correctPassword: 'SuperSecretPassword!',
}

describe('Practice Test', () => {
    it('Incorrect Username Test', () => {
        cy.visit(loginPage.url);
        cy.get(loginPage.usernameInput).should('not.have.value');
        cy.get(loginPage.passwordInput).type(userInfo.correctPassword);
        cy.get(loginPage.loginButton).click();
        cy.get(loginPage.loginErrorAlert).should('be.visible').should('contain', 'Your username is invalid!');
    });

    it('Incorrect Password Test', () => {
        cy.visit(loginPage.url);
        cy.get(loginPage.usernameInput).type(userInfo.correctUsername);
        cy.get(loginPage.passwordInput).should('not.have.value');
        cy.get(loginPage.loginButton).click();
        cy.get(loginPage.loginErrorAlert).should('be.visible').should('contain', 'Your password is invalid!');
    });

    it('Successful Login Test', () => {
        cy.visit(loginPage.url);
        cy.get(loginPage.usernameInput).type(userInfo.correctUsername);
        cy.get(loginPage.passwordInput).type(userInfo.correctPassword);
        cy.get(loginPage.loginButton).click();
        cy.get(secureArea.successMessage).should('be.visible').should('contain', 'You logged into a secure area!');
        cy.get(secureArea.logoutButton).click();
        cy.get(secureArea.successMessage).should('be.visible').should('contain', 'You logged out of the secure area!');
    });

    it('Incorrect Username Test', () => {
        cy.visit(loginPage.url);
        cy.get(loginPage.usernameInput).type(userInfo.incorrectUsername);
        cy.get(loginPage.passwordInput).type(userInfo.correctPassword);
        cy.get(loginPage.loginButton).click();
        cy.get(loginPage.loginErrorAlert).should('be.visible').should('contain', 'Your username is invalid!');
    });

    it('Incorrect Password Test', () => {
        cy.visit(loginPage.url);
        cy.get(loginPage.usernameInput).type(userInfo.correctUsername);
        cy.get(loginPage.passwordInput).type(userInfo.incorrectPassword);
        cy.get(loginPage.loginButton).click();
        cy.get(loginPage.loginErrorAlert).should('be.visible').should('contain', 'Your password is invalid!');
    });

    it('Visit Logged Area URL Before Logging In Test', () => {
        cy.visit(secureArea.secureAreaUrl);
        cy.get(loginPage.loginErrorAlert).should('be.visible').should('contain', 'You must login to view the secure area!'); 
    });
});