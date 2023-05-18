const fs = require('fs');
const { AdminPage } = require('../pageObject/AdminPage');
const { CategoryManagementPage } = require('../pageObject/CategoryManagementPage');


const adminPage = new AdminPage();

const categoryManagementPage = new CategoryManagementPage();
class TestTools {
  getTitle() {
    return cy.title();
  }

  readFile(path) {

    return cy.readFile(path, 'utf8')
  }

  navigateToCategoryCreationPage(categorySetup) {
    adminPage.getWebElementFromSlideBarMenu(categorySetup.pageName).click();
    categoryManagementPage.clickExpandMenuForCategory(categorySetup.categoryType, categorySetup.categoryAttribute.name)
  }
}

module.exports = {
  TestTools
}