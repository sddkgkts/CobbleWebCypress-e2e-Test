/// <reference types="cypress" />

const testSteps = require('../e2e/testSteps')


const testData = require('./../../testData.json');
const categorySetup = testData.categorySetup;
const updateCategorySetup = testData.categorySetupUpdate;
const productFilterSetup = testData.filterProductSetup;



describe('[E2E] [Positive] Create a custom category and read, update based on product attributes succesfully', { testIsolation: false }, () => {
  before(() => {
    cy.clearAllCookies();
    cy.navigateToUrl('/');
  });
  describe('[E2E] [Positive] Login with valid credential and navigate to product page', () => {
    testSteps.loginWithValidCredentials();
    testSteps.navigateSlideBarMenuButton(productFilterSetup.pageName);
  });

  describe('[E2E] [Positive] Filter product with given specification and get product SKUs', () => {
    testSteps.filterProducts(productFilterSetup.productFilterSpecification);
    testSteps.getProductSKU();
  });

  describe('[E2E] [Positive] Navigate category creation page and create new category', () => {
    testSteps.navigateSlideBarMenuButton(categorySetup.pageName);
    testSteps.createNewCategoryReleatedProductSKU(categorySetup)
  });
  describe('[E2E] [Positive] Navigate to UI and check that category created successfully', () => {
    testSteps.checkThatCategoryPageCreatedSuccessfullyOnUI(categorySetup, 'created', productFilterSetup)
    testSteps.checkActiveInactiveButtonFunctionality(categorySetup, 'Inactive');
    testSteps.checkActiveInactiveButtonFunctionality(categorySetup, 'Active');
  });
  describe('[E2E] [Positive] Check active/Inactive button works succsessfully', () => {
    testSteps.checkActiveInactiveButtonFunctionality(categorySetup, 'Inactive');
    testSteps.checkActiveInactiveButtonFunctionality(categorySetup, 'Active');
  });

  describe('[E2E] [Positive] Update category and check that category update succesfully ', () => {
    testSteps.updateNewlyCreatedCategoryRelatedProductSKU(categorySetup, updateCategorySetup)
    testSteps.checkThatCategoryPageCreatedSuccessfullyOnUI(updateCategorySetup, 'updated', productFilterSetup)
  });
  describe('[E2E] [Positive] Delete category that was created newly', () => {
    testSteps.deleteCreatedAndUpdatedCategory(updateCategorySetup)
  });

});
