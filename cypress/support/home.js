Cypress.Commands.add('addTwoProductsToTheCart', () => {
  Cypress._.times(2, () => {
    cy.get('.product button')
      .first()
      .click()
  })
})
