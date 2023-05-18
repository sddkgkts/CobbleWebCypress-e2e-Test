
const { AdminPage } = require('../pageObject/AdminPage');
const { BasePage } = require('./BasePage');

const adminPage = new AdminPage();


class CategoryManagementPage extends BasePage {


    getAttributeBox(boxName, boxContent) {
        cy.get(`input[name=${boxName}]`).clear().type(boxContent);
    }

    getAttributeBoxForDesciption(boxName, boxContent) {
        cy.get(`textarea[name=${boxName}]`).clear().type(boxContent);

    }

    getCategoryFromRowGroup(categoryType) {
        return cy.get(`div[role="rowgroup"]`).find(`span:contains(${categoryType})`);
    }

    fillTheCategorySpecification(categoryAttribute) {
        this.getAttributeBox("name", categoryAttribute.name);
        this.getAttributeBox("urlKey", categoryAttribute.urlKey);
        this.getAttributeBox("pageTitle", categoryAttribute.pageTitle);
        this.getAttributeBoxForDesciption("description", categoryAttribute.description)
        this.getAttributeBox("metaKeywords", categoryAttribute.metaKeywords);
        this.getAttributeBox("metaDescription", categoryAttribute.metaDescription);
    }

    setProduct(productList) {
        productList.forEach((product) => {
            const trimmedProduct = product.trim();

            cy.get('#react-select-8-input')
                .click()
                .type(trimmedProduct, { delay: 100 })
                .wait(1000)
                .type('{enter}');

            cy.wait(1000);
        });
    }

    navigateToUICategoryPage(categorySetup) {
        cy.get(`input[name="urlKey"]`).next().then(function ($a) {
            // extract the fully qualified href property
            const href = $a.prop('href')
            // and now visit the href directly
            cy.visit(href).wait(2000);
            cy.url().should('include', categorySetup.categoryAttribute.urlKey);

        })

    }


    navigateToCategory(categoryName) {
        cy.wait(1000);
        return cy.get('span').contains(categoryName)
    }

    deleteCategory(categoryType, categoryName, slideBarItem) {
        cy.visit(Cypress.env('baseUrl'));
        adminPage.getWebElementFromSlideBarMenu(slideBarItem).click();
        cy.wait(1000);
        this.clickExpandMenuForCategory(categoryType, categoryName)
        this.getButton('Delete').click();
        this.getButton('Remove').click();
    }

    clickExpandMenuForCategory(categoryType, categoryName) {
        this.getCategoryFromRowGroup(categoryType).parents('div.rst__nodeContent').find('button[type="button"]').click();
        this.navigateToCategory(categoryName).click();
    }

    getAllertMessage() {
        return cy.get('div.message').invoke('text').then((text) => {
            return text
        })
    }





}
module.exports = {
    CategoryManagementPage
}




// SPECIFICATIONS = {"name": "Under 200£ Producs", "urlKey": "under_200", "pageTitle": "Under 200£", 
// "description": "The product that is under 200£ is listed", "metaKeywords": "art, galery, artist",
// "metaDescription": "art is to art, galery is to art, art is performed by artist", "conditions": "New" }

//SPECIFICATIONS = { name: "Under 200£ Producs", urlKey: "under_200", pageTitle: "Under 200£", description: "The product that is under 200£ is listed", metaKeywords: art, galery, artist,metaDescription: "art is to art, galery is to art, art is performed by artist", conditions: "New" }
