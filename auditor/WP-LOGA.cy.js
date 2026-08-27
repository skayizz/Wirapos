const EMAIL_AUDITOR = 'aaannnjay@gmail.com'
const PASSWORD_AUDITOR = '12345678'
const T = { timeout: 30000 }

describe('WP-LOGA | Menguji halaman login WiraPOS (Auditor)', () => {

  // WP-LOGA-001
  it('Membuka halaman Login', () => {
    cy.visit('/')
    cy.contains('a, button', /masuk/i).first().click()
    cy.url().should('include', '/login')
    cy.get('input[placeholder="Email"]').should('be.visible')
    cy.get('input[placeholder*="Kata Sandi"]').should('be.visible')
    cy.contains('button', /masuk/i).should('be.visible')
  })

  // WP-LOGA-002
  it('Login dengan akun auditor aktif yang dibuat Owner', () => {
    cy.visit('/login')
    cy.get('input[placeholder="Email"]').clear().type(EMAIL_AUDITOR)
    cy.get('input[placeholder*="Kata Sandi"]').clear().type(PASSWORD_AUDITOR)
    cy.contains('button', /masuk/i).click()
    cy.url().should('not.include', '/login')
    cy.contains(/auditor/i).should('be.visible')
  })

  // WP-LOGA-003
  it('Login tanpa mengisi email', () => {
    cy.visit('/login')
    cy.get('input[placeholder="Email"]').clear()
    cy.get('input[placeholder*="Kata Sandi"]').clear().type(PASSWORD_AUDITOR)
    cy.contains('button', /masuk/i).click()
    cy.url().should('include', '/login')
    cy.contains('Email tidak boleh kosong').should('be.visible')
  })

  // WP-LOGA-004
  it('Login tanpa mengisi password', () => {
    cy.visit('/login')
    cy.get('input[placeholder="Email"]').clear().type(EMAIL_AUDITOR)
    cy.get('input[placeholder*="Kata Sandi"]').clear()
    cy.contains('button', /masuk/i).click()
    cy.url().should('include', '/login')
    cy.contains('Password tidak boleh kosong').should('be.visible')
  })
})