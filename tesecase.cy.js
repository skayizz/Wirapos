describe('WiraPOS - Satuan', () => {

  // ==================================================
  // LOGIN + MASUK HALAMAN SATUAN
  // ==================================================

  beforeEach(() => {

    cy.viewport(1366, 768)

    // Buka halaman login
    cy.visit('https://cmsdev-pos.hummatech.com/login')

    cy.wait(2000)

    // Email
    cy.get('input:visible')
      .eq(0)
      .should('be.visible')
      .click()
      .clear()
      .type('faisalgaming1245@gmail.com')

    // Password
    cy.get('input:visible')
      .eq(1)
      .should('be.visible')
      .click()
      .clear()
      .type('12345678')

    // Login
    cy.contains('button', 'Masuk')
      .should('be.visible')
      .click()

    cy.wait(5000)
 })
it('WP-PROD-006 - Menguji tombol Export Produk', () => {

  // Pastikan sudah berada di halaman Produk
  cy.url()
    .should('include', '/products')

  cy.wait(1000)

  // Cari tombol Export Produk
  cy.contains('Export Produk')
    .should('exist')
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(2000)

  // Pastikan tetap di halaman Produk
  cy.url()
    .should('include', '/products')

})
})