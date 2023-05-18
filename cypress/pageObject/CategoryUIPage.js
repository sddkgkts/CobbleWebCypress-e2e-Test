const { BasePage } = require("./BasePage");

class CategoryUIPage extends BasePage  {

    getPageTitle() {
    return  cy.get('.top-content > h2')
        .invoke('text')
        .then((text)=>{
            return text
        })
    }

    getPageDescription() {
     return cy.get('.top-content > div')
        .invoke('text')
        .then((text)=>{
            return text
        })
    }

    getNumberOfProducts(){
      return  cy.get('a.product-item-link')
          .its('length')
          .then((length) => {
            return length
          });
    }

    getArtistNames(){
        let artistName = [];
   return cy.get('h4')
        .each(($element, index, $list) => {
        return  artistName.push($element.text());
        });
    }

    getPrices(){
       let price =[];
       return cy.get('div[aria-label="price"]')
        .each(($element,index, $list)=>{
          return  price.push($element.text());
        })
    }

}

module.exports = { CategoryUIPage  }