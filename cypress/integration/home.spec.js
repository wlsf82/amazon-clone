describe('Home', () => {
  beforeEach(() => cy.visit('/'))

  it('lists five products and add 2 to the shopping cart', () => {
    cy.get('.product')
      .should('have.length', 5)

    Cypress._.times(2, () => {
      cy.get('.product button')
        .first()
        .click()
    })

    cy.get('.header__basketCount')
      .should('be.visible')
      .and('have.text', '2')
  })
})
