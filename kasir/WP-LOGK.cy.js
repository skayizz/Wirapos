const EMAIL = 'arliseka08@gmail.com'
const PASSWORD = '12345678'

const INPUT_EMAIL = 'input[placeholder="Email"]'
const INPUT_PASSWORD = 'input[placeholder*="Kata Sandi"]'
const T = { timeout: 30000 }

describe('WP-LOGK | Menguji halaman login WiraPOS', () => {

  // WP-LOGK-001
  it('Membuka halaman Login', () => {
    cy.visit('/')
    cy.contains('a, button, [role="button"]', /masuk/i, T).first().click()
    cy.url().should('include', '/login')
    cy.get(INPUT_EMAIL, T).should('be.visible')
    cy.get(INPUT_PASSWORD, T).should('be.visible')
    cy.contains('button', /masuk/i, T).should('be.visible')
  })

  // WP-LOGK-002
  it('Login dengan akun kasir valid', () => {
    cy.visit('/login')
    cy.get(INPUT_EMAIL, T).clear().type(EMAIL)
    cy.get(INPUT_PASSWORD, T).clear().type(PASSWORD)
    cy.contains('button', /masuk/i, T).click()
    cy.url().should('include', '/outlets')
    cy.contains('Berhasil melakukan login', T).should('be.visible')
    cy.contains('Kasir Gudang', T).should('be.visible')
  })

  // WP-LOGK-003
  it('Login tanpa mengisi email', () => {
    cy.visit('/login')
    cy.get(INPUT_EMAIL, T).clear()
    cy.get(INPUT_PASSWORD, T).clear().type(PASSWORD)
    cy.contains('button', /masuk/i, T).click()
    cy.url().should('include', '/login')
    cy.contains('Email tidak boleh kosong', T).should('be.visible')
  })

  // WP-LOGK-004
  it('Login tanpa mengisi password', () => {
    cy.visit('/login')
    cy.get(INPUT_EMAIL, T).clear().type(EMAIL)
    cy.get(INPUT_PASSWORD, T).clear()
    cy.contains('button', /masuk/i, T).click()
    cy.url().should('include', '/login')
    cy.contains('Password tidak boleh kosong', T).should('be.visible')
  })
})