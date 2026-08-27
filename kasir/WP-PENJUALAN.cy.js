const EMAIL = 'arliseka08@gmail.com'
const PASSWORD = '12345678'

Cypress.Commands.add('loginKasirGudang', () => {
  cy.session('kasir-gudang', () => {
    cy.visit('/login')
    cy.get('input[placeholder="Email"]').type(EMAIL)
    cy.get('input[placeholder*="Kata Sandi"]').type(PASSWORD)
    cy.contains('button', /masuk/i).click()
    cy.url().should('include', '/outlets')
  })
})

describe('Menguji menu Penjualan sebagai Kasir', () => {
  beforeEach(() => {
    cy.loginKasirGudang()
    cy.visit('/outlets')
  })

  // WP-PENJUALAN-001
  it('Menu Penjualan terbuka dan menampilkan submenu Kasir & Riwayat Penjualan', () => {
    cy.contains('Penjualan').click()
    cy.contains('a, button', 'Kasir').should('be.visible')
    cy.contains('a, button', 'Riwayat Penjualan').should('be.visible')
  })
})