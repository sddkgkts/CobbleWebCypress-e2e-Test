const { BasePage } = require("./BasePage");

class LoginPage extends BasePage {
  
  
    username() {
    return  cy.get("#username");
   
    }
  
    password() {
      return  cy.get("#password");
   
    }
  
    loginButton() {
      return  cy.get("button[type=submit]")
    }
  
  }
  
  module.exports = {
    LoginPage
  } 