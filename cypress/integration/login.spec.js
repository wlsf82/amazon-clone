describe('Login', () => {
  beforeEach(() => cy.visit('/login'))

  it('alterts about badly formatted email', () => {
    cy.get('[type="email"]')
      .type('invalid-email.com')
    cy.get('.login__signInBtn')
      .click()

    cy.on("window:alert", str => expect(str).to.equal(
      'The email address is badly formatted.'
    ))
  })

  it('alterts about invalid password', () => {
    cy.get('[type="email"]')
      .type('walmyr@example.com')
    cy.get('[type="password"]')
      .type('invalid')
    cy.get('.login__signInBtn')
      .click()

    cy.on("window:alert", str => expect(str).to.equal(
      'The password is invalid or the user does not have a password.'
    ))
  })

  it('alerts about unnexisting user', () => {
    cy.get('[type="email"]')
      .type('unnexisting-user@example.com')
    cy.get('[type="password"]')
      .type('somepassword')
    cy.get('.login__signInBtn')
      .click()

    cy.on("window:alert", str => expect(str).to.contain(
      'There is no user record corresponding to this identifier. The user may have been deleted.'
    ))
  })

  it('successfully logs in', () => {
    cy.get('[type="email"]')
      .type(Cypress.env('user_email'))
    cy.get('[type="password"]')
      .type(Cypress.env('user_password'), { log: false })
    cy.get('.login__signInBtn')
      .click()

    cy.get('.header__optionLineOne')
      .contains(`Hello ${Cypress.env('user_email')}`)
      .should('be.visible')
  })

  context('Create acount', () => {
    it('alerts about already existing user', () => {
      cy.get('[type="email"]')
        .type(Cypress.env('user_email'))
      cy.get('[type="password"]')
        .type('some-other-secret-password')
      cy.get('.login__registerBtn')
        .click()

      cy.on("window:alert", str => expect(str).to.equal(
        'The email address is already in use by another account.'
      ))
    })
  })
})
