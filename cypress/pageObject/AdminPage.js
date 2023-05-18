
const { BasePage } = require("./BasePage");

class AdminPage  extends BasePage {

 getWebElementFromSlideBarMenu(webElement){
   return cy.get(`ul[class="sidebar-menu tree"]`).find(`span:contains(${webElement})`);
 }

}

module.exports = { AdminPage }