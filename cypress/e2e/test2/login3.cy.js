const users = require("../../fixtures/users.json");

describe('template spec', () => {
  it('login 6', () => {
       cy.visit("/login");
    cy.login(users.user2.email, users.user2.password);
    cy.clearCookies();
  })
  it('login 7', () => {
    cy.visit("/login");
 cy.login(users.user3.email, users.user3.password);
 cy.clearCookies();
})
})