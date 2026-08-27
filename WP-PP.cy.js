describe('WiraPOS - Pencampuran Produk', () => {

  const email = 'faisalgaming1245@gmail.com'
  const password = '12345678'

  // =========================================================
  // LOGIN
  // =========================================================
  beforeEach(() => {

    cy.visit('https://cmsdev-pos.hummatech.com/login', {
      failOnStatusCode: false
    })

    cy.get('input[type="email"]', { timeout: 20000 })
      .should('be.visible')
      .clear()
      .type(email)

    cy.get('input[type="password"]', { timeout: 20000 })
      .should('be.visible')
      .clear()
      .type(password)

    cy.contains('button', /^Masuk$/i, { timeout: 15000 })
      .should('be.visible')
      .click()

    cy.url({ timeout: 20000 })
      .should('not.include', '/login')

    cy.wait(3000)
  })


  // =========================================================
  // WP-PP-001
  // Menguji akses menu Pencampuran Produk
  // =========================================================
  it('WP-PP-001 - Menguji akses menu Pencampuran Produk', () => {

    cy.visit('https://cmsdev-pos.hummatech.com/blendings', {
      failOnStatusCode: false
    })

    cy.url({ timeout: 20000 })
      .should('include', '/blendings')

    cy.wait(3000)

    // Judul halaman
    cy.contains('Pencampuran Produk', {
      timeout: 15000
    })
      .should('be.visible')

    // Cari tombol berdasarkan teks, tidak dibatasi harus button
    cy.contains(/Tambah Pencampuran/i, {
      timeout: 15000
    })
      .should('be.visible')

  })
})