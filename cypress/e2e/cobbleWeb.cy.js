/// <reference types="cypress" />

const testSteps = require('../e2e/testSteps')


const testData = require('./../../testData.json');
const categorySetup = testData.categorySetup;
const updateCategorySetup = testData.categorySetupUpdate;
const productFilterSetup = testData.filterProductSetup;



describe('[E2E] [Positive] Create a custom category and read, update based on product attributes succesfully', { testIsolation: false }, () => {
  before(() => {
    cy.navigateToUrl('/');
  });

  testSteps.loginWithValidCredentials();
  testSteps.navigateSlideBarMenuButton(productFilterSetup.pageName);
  testSteps.filterProducts(productFilterSetup.productFilterSpecification);
  testSteps.getProductSKU();
  testSteps.navigateSlideBarMenuButton(categorySetup.pageName);
  testSteps.createNewCategoryReleatedProductSKU(categorySetup)
  testSteps.checkThatCategoryPageCreatedSuccessfullyOnUI(categorySetup, 'created', productFilterSetup)
  testSteps.checkActiveInactiveButtonFunctionality(categorySetup,'Inactive');
  testSteps.checkActiveInactiveButtonFunctionality(categorySetup,'Active');
  testSteps.updateNewlyCreatedCategoryRelatedProductSKU(categorySetup, updateCategorySetup)
  testSteps.checkThatCategoryPageCreatedSuccessfullyOnUI(updateCategorySetup, 'updated', productFilterSetup)
  testSteps.deleteCreatedAndUpdatedCategory(updateCategorySetup)
});
