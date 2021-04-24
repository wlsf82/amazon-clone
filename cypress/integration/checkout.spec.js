describe('Checkout', () => {
  context('Empty cart', () => {
    beforeEach(() => cy.visit('/checkout'))

    it('shows not product on empty cart', () => {
      cy.get('h2')
        .contains('Your shopping basket is empty')
        .should('be.visible')
      cy.get('p')
        .contains('You have no items in your basket. To buy one or add item to basket click the add to basket button')
        .should('be.visible')
    })
  })

  describe('Not empty cart', () => {
    beforeEach(() => {
      cy.visit('/')

      Cypress._.times(2, () => {
        cy.get('.product button')
          .first()
          .click()
      })

      cy.get('.header__link[href="/checkout"]')
        .click()
    })

    it('shows selected products', () => {
      cy.get('h2')
        .contains('Your shopping basket')
        .should('be.visible')

      cy.get('.checkoutProduct')
        .should('have.length', 2)
      cy.get('.checkoutProduct')
        .first()
        .should('be.visible')
      cy.get('.checkoutProduct')
        .last()
        .should('be.visible')
    })

    it('update numbers of products when removing one of them', () => {
      cy.get('.checkoutProduct')
        .should('have.length', 2)

      cy.get('.checkoutProduct__info > button')
        .first()
        .click()

      cy.get('.checkoutProduct')
        .should('have.length', 1)
    })

    it('updates to empty cart when remeoving all of them', () => {
      cy.get('.checkoutProduct')
        .should('have.length', 2)

      Cypress._.times(2, () => {
        cy.get('.checkoutProduct__info > button')
          .first()
          .click()
      })

      cy.get('.checkoutProduct')
        .should('have.length', 0)
      cy.get('h2')
        .contains('Your shopping basket is empty')
        .should('be.visible')
    })
  })
})
