const users = require("../../fixtures/users.json");
const boxPage = require("../../fixtures/pages/boxPage.json");
const generalElements = require("../../fixtures/pages/general.json");
const dashBordPage = require("../../fixtures/pages/dashBoardPage.json");


let cookie = "connect.sid=s%3AFVGTby9fEkZOukakBZNvaH1DJze60tvw.sqjm6H1nITsCXS3qF66E6qLe2LOmCK%2BAvbNzZJBf5ss";
import { faker } from "@faker-js/faker";

describe("User can create box and run it", () => {
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let maxAmount = 50;
  let currency = "Евро";
  let boxKey;


  it("user logins and create a box", () => {
    cy.visit("/login");
    cy.login(users.user1.email, users.user1.password);

    cy.contains("Создать коробку").click();
    cy.get(boxPage.boxNameField).type(newBoxName);
    cy.get(boxPage.boxKeyField).then((key) => {
      boxKey = Cypress.$(key).val(); //Сохранение значения из поля Идентификатор в переменную boxKey
      cy.log(boxKey);
    });
    // cy.log(boxKey);
    cy.get(generalElements.arrowRight).click();

    cy.get(boxPage.sixthIcon).click();
    cy.get(generalElements.arrowRight).click();

    cy.get(boxPage.giftPriceToggel).check({ force: true });
    // cy.get('.switch__toggle').click();
    cy.get(boxPage.maxAmount).type(maxAmount);
    cy.get(boxPage.currency).select(currency);
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.layoutSelector).click("left"); //клик вне формы
    cy.get(generalElements.arrowRight).click();
    // cy.get(generalElements.arrowRight).click();

    cy.get(dashBordPage.createdBoxName).should("have.text", newBoxName);
    cy.get(dashBordPage.toggleMenu)
      .invoke("text")
      .then((text) => {
        cy.log(text);
        expect(text).to.include("Участники");
        expect(text).to.include("Моя карточка");
        expect(text).to.include("Подопечный");
      });
  });
  it('login4', () => {
    cy.visit("/login");
    cy.login(users.user1.email, users.user1.password);
 cy.clearCookies();
})
it('login5', () => {
  cy.visit("/login");
  cy.login(users.user1.email, users.user1.password);
cy.clearCookies();
})
it('login5', () => {
  cy.visit("/login");
  cy.login(users.user1.email, users.user1.password);
cy.clearCookies();
})
it('login5', () => {
  cy.visit("/login");
  cy.login(users.user1.email, users.user1.password);
cy.clearCookies();
})

  after("Delete Box", () => {
    cy.request({
      method: "DELETE",
      headers: {
        Cookie: cookie,
      },
      url: `/api/box/${boxKey}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
