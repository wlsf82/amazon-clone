describe('Login', () => {
  beforeEach(() => cy.visit('/login'))

  it('alterts about badly formatted email', () => {})

  it('alterts about invalid password', () => {})

  it('alerts about unnexisting user', () => {})

  it('successfully logs in', () => {})

  context('Create acount', () => {
    it('alerts about already existing user', () => {})
  })
})
