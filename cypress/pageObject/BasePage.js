class BasePage  {

  getButton(buttonName) {
      return cy.get('button').contains(buttonName);
  }

   logOut(){
      cy.get('span.user-name').click();
      cy.get('.user-action').should('be.visible')
      .click();
    }

    closeAllert(){
      cy.get('.close-icon > img').click()
    }

    getUrl(){
     return cy.url();
    }



}

module.exports = { BasePage }