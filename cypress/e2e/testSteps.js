/// <reference types="cypress" />
const { LoginPage } = require('../pageObject/LoginPage');
const { AdminPage } = require('../pageObject/AdminPage');
const { ProductPage } = require('../pageObject/ProductPage');
const { CategoryManagementPage } = require('../pageObject/CategoryManagementPage');
const { TestTools } = require('./TestTools');
const { CategoryUIPage } = require('../pageObject/CategoryUIPage');


const loginPage = new LoginPage();
const adminPage = new AdminPage();
const productPage = new ProductPage();
const categoryManagementPage = new CategoryManagementPage();
const categoryUIPage = new CategoryUIPage();
const testTool = new TestTools();

let productSKUs;

async function loginWithValidCredentials() {
  it('[E2E] [Positive] Login as admin with valid credentials', () => {
    const expectedLoginPageTitle = 'Administration - Login';
    testTool.getTitle().should('eq', expectedLoginPageTitle);

    loginPage.username().type(Cypress.env('username'));
    loginPage.password().type(Cypress.env('password'))
    loginPage.loginButton().click()

    const expectedTitle = 'Order';
    testTool.getTitle().should('eq', expectedTitle);

  });
}

async function navigateSlideBarMenuButton(pageName) {
  it(`[E2E] [Positive] Navigate to ${pageName} page`, () => {
    adminPage.getWebElementFromSlideBarMenu(pageName).click()
    testTool.getTitle().should('eq', pageName);
  });
}

async function filterProducts(specifications) {
  it(`[E2E] [Positive] Filter products base on product attribute page`, () => {
    productPage.filterButton().click();
    for (const key in specifications) {
      productPage.selectFilterSpecification(specifications[key].name).click()
      productPage.selectFilterAttribute(specifications[key]);
      productPage.selectFilterSpecification(specifications[key].name).click()
    }
    productPage.getButton(' Apply ').click();
  });
}


async function getProductSKU() {
  it(`[E2E] [Positive] Get product SKU's`, () => {
    productSKUs = productPage.getProductSkuFromFilteredTable();
  });
}


async function createNewCategoryReleatedProductSKU(categorySetup) {
  it('[E2E] [Positive] Create a new category releated product SKU', () => {
    categoryManagementPage.getCategoryFromRowGroup(categorySetup.categoryType).click();
    categoryManagementPage.getButton('Add Category').click();
    categoryManagementPage.fillTheCategorySpecification(categorySetup.categoryAttribute);
    categoryManagementPage.getButton('Product list').click();
    categoryManagementPage.setProduct(productSKUs);
    categoryManagementPage.getButton('Save').click();
    const actualMessage = categoryManagementPage.getAllertMessage();
    actualMessage.should('eq', 'New category has been added successfully')
  });
}

async function checkActiveInactiveButtonFunctionality(categorySetup, functionType ) {
  it(`[E2E] [Positive] Check ${functionType} button functionalty`, () => {
    cy.navigateToUrl('/');
    testTool.navigateToCategoryCreationPage(categorySetup);
    categoryManagementPage.getButton(functionType).click();
    categoryManagementPage.getButton('Save').click(); 
    categoryManagementPage.navigateToUICategoryPage(categorySetup);
    if (functionType=='Inactive'){
    categoryUIPage.getNumberOfProducts().should('not.equal', productSKUs.length);  
    } else {
      categoryUIPage.getNumberOfProducts().should('eq', productSKUs.length);
    }
  });
}


async function updateNewlyCreatedCategoryRelatedProductSKU(categorySetup, updateCategorySetup) {
  it('[E2E] [Positive] Update category that was creat newly', () => {
    cy.navigateToUrl('/');
    testTool.navigateToCategoryCreationPage(categorySetup);
    categoryManagementPage.fillTheCategorySpecification(updateCategorySetup.categoryAttribute);
    categoryManagementPage.getButton('Save').click();
    const actualMessage = categoryManagementPage.getAllertMessage();
    actualMessage.should('eq', 'Category has been updated successfully')
  });
}

async function checkThatCategoryPageCreatedSuccessfullyOnUI(categorySetup, condition, productFilterSetup) {
  it(`[E2E] [Positive] Check the UI page for the newly ${condition} category`, () => {
    testTool.navigateToCategoryCreationPage(categorySetup);
    categoryManagementPage.navigateToUICategoryPage(categorySetup)
    categoryUIPage.getPageTitle().should('eq', categorySetup.categoryAttribute.pageTitle);
    categoryUIPage.getPageDescription().should('eq', categorySetup.categoryAttribute.description);
    categoryUIPage.getNumberOfProducts().should('eq', productSKUs.length);
    const artistNames = categoryUIPage.getArtistNames();
    artistNames.each((artistName) => {
      expect(artistName).to.contain(productFilterSetup.productFilterSpecification['Artist name'].text);
    });

    const prices = categoryUIPage.getPrices();
    prices.each((priceElement) => {
      const priceText = priceElement.text(); // Extract the text value from the element
      const priceValue = parseFloat(priceText.replace(/[^0-9.-]+/g, '')); // Convert the text to a number

      expect(priceValue).to.be.lt(parseFloat(productFilterSetup.productFilterSpecification['Selling price'].text));
    });
  });

}

async function deleteCreatedAndUpdatedCategory(updateCategorySetup) {
  it('[E2E] [Positive] Delete category that was created newly', () => {
    const expectedMessage = 'Category has been deleted successfully '
    const slideBarItem = 'Category management'
    categoryManagementPage.deleteCategory(updateCategorySetup.categoryType, updateCategorySetup.categoryAttribute.name, updateCategorySetup.pageName)
    const actualMessage = categoryManagementPage.getAllertMessage();
    actualMessage.should('eq', expectedMessage);
    categoryManagementPage.closeAllert()
    categoryManagementPage.logOut();
    categoryManagementPage.getUrl().should('eq', 'https://affordableartfairs-int.cobbleweb.co.uk/')
  });
}



module.exports = {
  loginWithValidCredentials,
  navigateSlideBarMenuButton,
  filterProducts,
  getProductSKU,
  createNewCategoryReleatedProductSKU,
  updateNewlyCreatedCategoryRelatedProductSKU,
  checkThatCategoryPageCreatedSuccessfullyOnUI,
  deleteCreatedAndUpdatedCategory,
  checkActiveInactiveButtonFunctionality
 
}