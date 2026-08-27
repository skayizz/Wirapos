describe('WiraPOS - FAQ', () => {

  beforeEach(() => {
    cy.viewport(1366, 768)
    cy.visit('https://cmsdev-pos.hummatech.com/faq')
    cy.wait(3000)
  })

  it('WP-FAQ-001 - Membuka halaman FAQ', () => {
  cy.visit('https://cmsdev-pos.hummatech.com/faq')
  cy.wait(3000)

  cy.url().should('include', '/faq')

  cy.get('body').should('contain.text', 'FAQ')
})
  // WP-FAQ-002
  it('WP-FAQ-002 - Menu Pertanyaan Umum', () => {
    cy.contains('Pertanyaan Umum').click()
    cy.contains('Apa itu Wirapos?').should('be.visible')
  })

 it('WP-FAQ-003 - Accordion Apa itu Wirapos?', () => {
  cy.contains('Apa itu Wirapos?').should('be.visible')

  cy.get('body')
    .should('contain.text', 'Wirapos adalah aplikasi Point of Sales')
})

  // WP-FAQ-004
  it('WP-FAQ-004 - Accordion Siapa saja yang bisa menggunakan Wirapos?', () => {
    cy.contains('Siapa saja yang bisa menggunakan Wirapos?').click()
    cy.wait(1000)
  })

  // WP-FAQ-005
  it('WP-FAQ-005 - Accordion Apakah Wirapos bisa digunakan untuk lebih dari satu toko?', () => {
    cy.contains('Apakah Wirapos bisa digunakan untuk lebih dari satu toko?').click()
    cy.wait(1000)
  })

  // WP-FAQ-006
  it('WP-FAQ-006 - Accordion Apa keuntungan menggunakan Wirapos dibanding pencatatan manual?', () => {
    cy.contains('Apa keuntungan menggunakan Wirapos dibanding pencatatan manual?').click()
    cy.wait(1000)
  })

  // WP-FAQ-007
  it('WP-FAQ-007 - Menu Role dan Akses', () => {
    cy.contains('Role dan Akses').click()
    cy.wait(1000)
    cy.contains('Role dan Akses').should('be.visible')
  })

  // WP-FAQ-008
  it('WP-FAQ-008 - Menu Registrasi dan Login', () => {
    cy.contains('Registrasi dan Login').click()
    cy.wait(1000)
    cy.contains('Registrasi dan Login').should('be.visible')
  })

  // WP-FAQ-009
  it('WP-FAQ-009 - Menu Penjualan dan Transaksi', () => {
    cy.contains('Penjualan dan Transaksi').click()
    cy.wait(1000)
    cy.contains('Penjualan dan Transaksi').should('be.visible')
  })

  // WP-FAQ-010
  it('WP-FAQ-010 - Menu Stok dan Gudang', () => {
    cy.contains('Stok dan Gudang').click()
    cy.wait(1000)
    cy.contains('Stok dan Gudang').should('be.visible')
  })

  // WP-FAQ-011
  it('WP-FAQ-011 - Menu Laporan & Analisis', () => {
    cy.contains('Laporan & Analisis').click()
    cy.wait(1000)
    cy.contains('Laporan & Analisis').should('be.visible')
  })

  // WP-FAQ-012
  it('WP-FAQ-012 - Menu Integrasi & Fitur Tambahan', () => {
    cy.contains('Integrasi & Fitur Tambahan').click()
    cy.wait(1000)
    cy.contains('Integrasi & Fitur Tambahan').should('be.visible')
  })

  // WP-FAQ-013
  it('WP-FAQ-013 - Menu Pengaturan & Keamanan', () => {
    cy.contains('Pengaturan & Keamanan').click()
    cy.wait(1000)
    cy.contains('Pengaturan & Keamanan').should('be.visible')
  })

  // =====================================
// WP-FAQ-014 - Menguji input Nama
// =====================================
it('WP-FAQ-014 - Menguji input Nama', () => {

  cy.contains('Hubungi Kami Disini!').scrollIntoView()

  cy.get('input[placeholder*="Nama"]')
    .should('be.visible')
    .type('Faizal')

  cy.get('input[placeholder*="Nama"]')
    .should('have.value', 'Faizal')

})

// =====================================
// WP-FAQ-015 - Menguji input Pertanyaan
// =====================================
it('WP-FAQ-015 - Menguji input Pertanyaan', () => {

  cy.contains('Hubungi Kami Disini!').scrollIntoView()

  cy.get('textarea, [placeholder*="Pertanyaan"]')
    .first()
    .should('be.visible')
    .type('Apakah WiraPOS menyediakan versi demo?')

  cy.get('textarea, [placeholder*="Pertanyaan"]')
    .first()
    .should('contain.value', 'Apakah WiraPOS menyediakan versi demo?')

})

// =====================================
// WP-FAQ-016 - Menguji tombol Kirim Pertanyaan
// =====================================
it('WP-FAQ-016 - Menguji tombol Kirim Pertanyaan', () => {

  cy.contains('Hubungi Kami Disini!').scrollIntoView()

  cy.get('input[placeholder*="Nama"]')
    .type('Faizal')

  cy.get('textarea, [placeholder*="Pertanyaan"]')
    .first()
    .type('Apakah WiraPOS menyediakan versi demo?')

  cy.contains('Kirim Pertanyaan')
    .click({ force: true })

  cy.wait(3000)

  // Seharusnya muncul notifikasi berhasil
  cy.contains('Berhasil')
    .should('be.visible')

})

})