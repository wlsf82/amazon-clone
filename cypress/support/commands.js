Cypress.Commands.add('fillLoginForm', (userEmail, password) => {
  cy.get('[type="email"]')
      .type(userEmail)
  cy.get('[type="password"]')
    .type(password, { log: false })
})

Cypress.Commands.add('login', (userEmail, password) => {
  cy.fillLoginForm(userEmail, password)
  cy.get('.login__signInBtn')
    .click()
})

Cypress.Commands.add('addTwoProductsToTheCart', () => {
  Cypress._.times(2, () => {
    cy.get('.product button')
      .first()
      .click()
  })
})

Cypress.Commands.add('removeFirstProductFromTheCart', () => {
  cy.get('.checkoutProduct__info > button')
    .first()
    .click()
})

Cypress.Commands.add('assertCartHasNProducts', n => {
  cy.get('.header__basketCount')
    .should('be.visible')
    .and('have.text', `${n}`)
})

Cypress.Commands.add('assertItHasNProducts', n => {
  cy.get('.checkoutProduct')
    .should('have.length', n)
})

Cypress.Commands.add('assertThatCartIsEmpty', () => {
  cy.get('h2')
    .contains('Your shopping basket is empty')
    .should('be.visible')
  cy.get('p')
    .contains('You have no items in your basket. To buy one or add item to basket click the add to basket button')
    .should('be.visible')
  cy.assertCartHasNProducts(0)
})