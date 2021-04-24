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

Cypress.Commands.add('removeFirstProductFromCart', () => {
  cy.get('.checkoutProduct__info > button')
    .first()
    .click()
})
