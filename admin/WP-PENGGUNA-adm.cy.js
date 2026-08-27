const EMAIL_ADMIN = 'faisalgaming1245@gmail.com'
const PASSWORD_ADMIN = '12345678'
const T60 = { timeout: 60000 }

const loginAdmin = () => {
  cy.visit('/login')
  cy.get('input[placeholder="Email"]').type(EMAIL_ADMIN)
  cy.get('input[placeholder*="Kata Sandi"]').type(PASSWORD_ADMIN)
  cy.contains('button', /masuk/i).click()
  cy.url().should('not.include', '/login')
}

describe('WP-PENGGUNA-001 | Menguji menu Pengguna sebagai Admin', () => {
  beforeEach(() => {
    loginAdmin()
  })

  // WP-PENGGUNA-001
  it('Menu Pengguna terbuka dan menampilkan submenu Karyawan & Customer', () => {
    cy.contains('Pengguna', T60).click()
    cy.contains('a, button', 'Karyawan').should('be.visible')
    cy.contains('a, button', 'Customer').should('be.visible')
  })
})