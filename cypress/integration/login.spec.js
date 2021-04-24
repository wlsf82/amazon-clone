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
    cy.login(Cypress.env('user_email'), 'invalid')

    cy.on("window:alert", str => expect(str).to.equal(
      'The password is invalid or the user does not have a password.'
    ))
  })

  it('alerts about unnexisting user', () => {
    cy.login('unnexisting-user@example.com', 'somepassword')

    cy.on("window:alert", str => expect(str).to.contain(
      'There is no user record corresponding to this identifier. The user may have been deleted.'
    ))
  })

  it('successfully logs in', () => {
    cy.login(Cypress.env('user_email'), Cypress.env('user_password'))

    cy.get('.header__optionLineOne')
      .contains(`Hello ${Cypress.env('user_email')}`)
      .should('be.visible')
  })

  context('Create acount', () => {
    it('alerts about already existing user', () => {
      cy.fillLoginForm(Cypress.env('user_email'), 'some-other-secret-password')
      cy.get('.login__registerBtn')
        .click()

      cy.on("window:alert", str => expect(str).to.equal(
        'The email address is already in use by another account.'
      ))
    })
  })
})
