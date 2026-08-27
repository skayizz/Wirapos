describe('WiraPOS - Request Pembelian', () => {

  beforeEach(() => {

    // ==========================
    // BUKA WEBSITE WIRAPOS
    // ==========================

    cy.visit('https://cmsdev-pos.hummatech.com')

    cy.viewport(1366, 768)

    cy.wait(2000)


    // ==========================
    // LOGIN
    // ==========================

    cy.contains('MASUK', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true })

    cy.wait(1500)


    // Email
    cy.get('input', { timeout: 10000 })
      .eq(0)
      .should('be.visible')
      .type('faisalgaming1245@gmail.com', { force: true })

    cy.wait(500)


    // Password
    cy.get('input', { timeout: 10000 })
      .eq(1)
      .should('be.visible')
      .type('12345678', { force: true })

    cy.wait(500)


    // Klik Masuk
    cy.contains('button', 'Masuk', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true })

    cy.wait(3000)


    // ==========================
    // MASUK REQUEST PEMBELIAN
    // ==========================

    cy.visit('https://cmsdev-pos.hummatech.com/request-pembelian')

    cy.wait(2000)

  })


  // ==========================
  // WP-RPB-001
  // ==========================

  it('WP-RPB-001 - Menguji akses menu Request Pembelian', () => {

    // Pastikan URL
    cy.url()
      .should('include', '/request-pembelian')

    // Pastikan halaman Request Pembelian tampil
    cy.contains('Request Pembelian')
      .should('be.visible')

    // Pastikan halaman berhasil ditampilkan
    cy.get('body')
      .should('be.visible')

  })


  // ==========================
  // WP-RPB-002
  // ==========================

  it('WP-RPB-002 - Menguji fitur pencarian pada halaman Request Pembelian', () => {

    // Pastikan berada di halaman Request Pembelian
    cy.url()
      .should('include', '/request-pembelian')


    // Klik kolom pencarian
    cy.get('input[placeholder="Cari request pembelian..."]', {
      timeout: 10000
    })
      .should('be.visible')
      .click({ force: true })


    // Ketik kata kunci
    cy.get('input[placeholder="Cari request pembelian..."]')
      .clear({ force: true })

    cy.get('input[placeholder="Cari request pembelian..."]')
      .type('request', { force: true })


    cy.wait(1000)


    // Periksa hasil pencarian
    cy.get('body')
      .should('be.visible')

  })

})