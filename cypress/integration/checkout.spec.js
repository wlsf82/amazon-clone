describe('Checkout', () => {
  context('Empty cart', () => {
    beforeEach(() => cy.visit('/checkout'))

    it('shows not product on empty cart', () => {
      cy.assertThatCartIsEmpty()
    })
  })

  describe('Not empty cart', () => {
    beforeEach(() => {
      cy.visit('/')

      cy.addTwoProductsToTheCart()
      cy.get('.header__link[href="/checkout"]')
        .click()
    })

    it('shows selected products', () => {
      cy.get('h2')
        .contains('Your shopping basket')
        .should('be.visible')

      cy.assertItHasNProducts(2)
      cy.get('.checkoutProduct')
        .first()
        .should('be.visible')
      cy.get('.checkoutProduct')
        .last()
        .should('be.visible')
    })

    it('update numbers of products when removing one of them', () => {
      cy.assertItHasNProducts(2)

      cy.removeFirstProductFromTheCart()

      cy.assertItHasNProducts(1)
    })

    it('updates to empty cart when removing all products', () => {
      cy.assertItHasNProducts(2)

      Cypress._.times(2, () => {
        cy.removeFirstProductFromTheCart()
      })

      cy.assertItHasNProducts(0)
      cy.assertThatCartIsEmpty()
    })
  })
})
