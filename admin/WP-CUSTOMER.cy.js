const EMAIL_ADMIN = 'faisalgaming1245@gmail.com'
const PASSWORD_ADMIN = '12345678'
const T60 = { timeout: 60000 }

const loginAdmin = () => {
  cy.session('admin', () => {
    cy.visit('/login')
    cy.get('body').then(($body) => {
      if ($body.find('input[placeholder="Email"]').length === 0) {
        cy.wait(5000)
        cy.reload()
      }
    })
    cy.get('input[placeholder="Email"]', T60).type(EMAIL_ADMIN)
    cy.get('input[placeholder*="Kata Sandi"]', T60).type(PASSWORD_ADMIN)
    cy.contains('button', /masuk/i, T60).click()
    cy.url(T60).should('not.include', '/login')
  })
}

describe('Menguji halaman Daftar Customer WiraPOS', () => {
  beforeEach(() => {
    loginAdmin()
    cy.visit('/users')
    cy.contains('Pengguna', T60).should('be.visible')
  })

  // WP-CUSTOMER-001
  it('Menguji submenu Customer', () => {
    cy.contains('Pengguna', T60).click()
    cy.contains('a, button', 'Customer', T60).click()
    cy.url().should('include', '/customers')
    cy.contains('Customers').should('be.visible')
    cy.get('input[placeholder*="Cari"]').should('be.visible')
    cy.contains('Tidak ada data Pengguna Customers').should('be.visible')
  })
})