const { BasePage } = require("./BasePage");
let storeTexts = [];
class ProductPage extends BasePage {

    filterButton() {
        return cy.get('i[class="fa fa-filter fa-fw"]').first();
    }

    selectFilterSpecification(attributeName) {
        return cy.get('input[type="checkbox"]').siblings(`a:contains(${attributeName})`);
    }

    selectFilterAttribute(specifications) {
        if (specifications.type != null || specifications.type != undefined) {
            if (specifications.text != undefined) {

                cy.get('div.filter-field')
                    .contains(specifications.name)
                    .parent()
                    .next('.filter-content')
                    .find('.form-widget-compound select')
                    .first()
                    .select(specifications.type);
                if (specifications.name != 'Shipping from') {
                    cy.get('div.filter-field')
                        .contains(specifications.name)
                        .parent()
                        .next('.filter-content')
                        .find('.form-widget-compound input')
                        .first()
                        .type(specifications.text);
                } else {

                    cy.get('select[id="filters_shippingFrom_value"]')
                    .select(specifications.text,{ force: true })
                    
                   
                    

                }

            } else {

                cy.get('div.filter-field')
                    .contains(specifications.name)
                    .parent()
                    .next('.filter-content')
                    .find('span.select2-selection')
                    .click();

                cy.get('span.select2-results')
                    .contains('li', specifications.type)
                    .type('{enter}');

            }
        }
    }
    getProductSkuFromFilteredTable() {
        cy.wait(1000)
        cy.get("tr td:nth-child(1)").each(($e1, index, $list) => {
            const text = $e1.text();
            storeTexts.push(text);
        });
        cy.log(storeTexts)
        return storeTexts
    }




}

module.exports = { ProductPage }

