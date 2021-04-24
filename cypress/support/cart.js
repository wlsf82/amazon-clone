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