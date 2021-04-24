describe('Home', () => {
  beforeEach(() => cy.visit('/'))

  it('lists five products and add 2 to the shopping cart', () => {
    cy.get('.product')
      .should('have.length', 5)

    cy.addTwoProductsToTheCart()

    cy.get('.header__basketCount')
      .should('be.visible')
      .and('have.text', '2')
  })
})
