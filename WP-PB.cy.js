describe('WiraPOS - Paket Bisnis', () => {

  beforeEach(() => {
    cy.visit('https://cmsdev-pos.hummatech.com/paket-bisnis')
    cy.viewport(1366, 768)
    cy.wait(3000)
  })

  // ==================================================
  // WP-PB-001 (PASS)
  // ==================================================
  it('WP-PB-001 - Membuka Halaman Paket Bisnis', () => {
    cy.url().should('include', '/paket-bisnis')
    cy.contains('PAKET BISNIS').should('be.visible')
  })

  // ==================================================
  // WP-PB-002 (FAIL - Tombol Beli Sekarang Bug)
  // ==================================================
  it('WP-PB-002 - Tombol Beli Sekarang', () => {

    cy.contains('Beli Sekarang')
      .scrollIntoView()
      .click({ force: true })

    // Seharusnya pindah halaman
    cy.url().should('not.include', '/paket-bisnis')

  })

  // ==================================================
  // WP-PB-003 (FAIL - Form Login Bug)
  // ==================================================
  it('WP-PB-003 - Form Login Kasir', () => {

    cy.get('input[placeholder*="Email"]')
      .type('admin@gmail.com')

    cy.get('input[placeholder*="Sandi"]')
      .type('12345678')

    cy.get('input[placeholder*="Email"]')
      .should('have.value', 'admin@gmail.com')

  })

  // ==================================================
  // WP-PB-004 (FAIL - Tombol Masuk Bug)
  // ==================================================
  it('WP-PB-004 - Tombol Masuk', () => {

    cy.contains('Masuk')
      .click({ force: true })

    // Seharusnya login berhasil
    cy.url().should('not.include', '/paket-bisnis')

  })

  // ==================================================
  // WP-PB-005 (FAIL - Tombol Coba Sekarang Bug)
  // ==================================================
  it('WP-PB-005 - Tombol Coba Sekarang', () => {

    cy.contains('Coba Sekarang')
      .scrollIntoView()
      .click({ force: true })

    // Seharusnya berpindah halaman
    cy.url().should('not.include', '/paket-bisnis')

  })

  // ==================================================
  // WP-PB-006 (FAIL - Tombol Panah Bug)
  // ==================================================
  it('WP-PB-006 - Tombol Panah Produk', () => {

    cy.get('button')
      .last()
      .click({ force: true })

    // Seharusnya membuka halaman detail produk
    cy.url().should('not.include', '/paket-bisnis')

  })

})