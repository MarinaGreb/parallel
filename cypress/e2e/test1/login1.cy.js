const users = require("../../fixtures/users.json");
const boxPage = require("../../fixtures/pages/boxPage.json");
const generalElements = require("../../fixtures/pages/general.json");
const dashBordPage = require("../../fixtures/pages/dashBoardPage.json");

let cookie = "connect.sid=s%3A-yoJwYfe1GtvrcbCV4LxyYhtrw904USQ.j1nLxDaLGuUt%2Br%2Bj%2FBCC2AcocFkeI32X9H96F8nClJc";
import { faker } from "@faker-js/faker";

describe("User can create box and run it", () => {
  //Пользователь 1 логинится

  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let maxAmount = 50;
  let currency = "Евро";
  let inviteLink;
  let boxKey;
  let wishes =
    faker.word.noun() +
    " " +
    faker.word.adjective() +
    " " +
    faker.word.adverb();

  it("user logins and create a box", () => {
    cy.visit("/login");
    cy.login(users.userAuthor.email, users.userAuthor.password);

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
  it('login2', () => {
    cy.visit("/login");
    cy.login(users.userAuthor.email, users.userAuthor.password);
 cy.clearCookies();
})
it('login3', () => {
  cy.visit("/login");
  cy.login(users.userAuthor.email, users.userAuthor.password);
cy.clearCookies();
})
it('login3', () => {
  cy.visit("/login");
  cy.login(users.userAuthor.email, users.userAuthor.password);
cy.clearCookies();
})
it('login3', () => {
  cy.visit("/login");
  cy.login(users.userAuthor.email, users.userAuthor.password);
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
