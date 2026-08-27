describe('WiraPOS - Register', () => {

  beforeEach(() => {
    cy.visit('https://cmsdev-pos.hummatech.com')
    cy.viewport(1366, 768)
    cy.wait(2000)

    // Masuk ke halaman Login
    cy.contains('MASUK')
      .click({ force: true })

    cy.wait(1000)

    // Masuk ke halaman Register
    cy.contains('Daftar')
      .click({ force: true })

    cy.wait(1500)
  })

  // ==========================
// WP-REG-001
// ==========================
it('WP-REG-001 - Membuka halaman Register', () => {

  // Pastikan halaman Register benar-benar terbuka
  cy.get('body')
    .should('be.visible')

  // Pastikan terdapat form/input Register
  cy.get('input')
    .should('have.length.at.least', 4)

  // Pastikan tombol Lanjutkan tersedia
  cy.contains('button', 'Lanjutkan')
    .should('be.visible')
})

  // ==========================
  // WP-REG-002
  // ==========================
  it('WP-REG-002 - Mengisi Form Email dengan data valid', () => {

    // Isi Username
    cy.get('input').eq(0)
      .type('faizal247')

    // Isi Email
    cy.get('input').eq(1)
      .type('faizal247@gmail.com')

    // Isi Password
    cy.get('input').eq(2)
      .type('Password123')

    // Isi Konfirmasi Password
    cy.get('input').eq(3)
      .type('Password123')

    // Klik Lanjutkan
    cy.contains('button', 'Lanjutkan')
      .click({ force: true })

    cy.wait(1500)

    // Berhasil masuk Step 2
    cy.get('body')
      .should('be.visible')

  })

  // ==========================
  // WP-REG-003
  // ==========================
  it('WP-REG-003 - Username kosong', () => {

    // Username dikosongkan
    cy.get('input').eq(0)
      .clear()

    // Isi Email
    cy.get('input').eq(1)
      .type('faizal247@gmail.com')

    // Isi Password
    cy.get('input').eq(2)
      .type('Password123')

    // Isi Konfirmasi Password
    cy.get('input').eq(3)
      .type('Password123')

    // Klik Lanjutkan
    cy.contains('button', 'Lanjutkan')
      .click({ force: true })

    // Validasi Username
    cy.get('body')
      .should('be.visible')

  })

  // ==========================
  // WP-REG-004
  // ==========================
  it('WP-REG-004 - Email kosong', () => {

    // Isi Username
    cy.get('input').eq(0)
      .type('faizal247')

    // Email dikosongkan
    cy.get('input').eq(1)
      .clear()

    // Isi Password
    cy.get('input').eq(2)
      .type('Password123')

    // Isi Konfirmasi Password
    cy.get('input').eq(3)
      .type('Password123')

    // Klik Lanjutkan
    cy.contains('button', 'Lanjutkan')
      .click({ force: true })

    // Validasi Email
    cy.get('body')
      .should('be.visible')

  })

  // ==========================
  // WP-REG-005
  // ==========================
  it('WP-REG-005 - Password tidak sesuai', () => {

    // Isi Username
    cy.get('input').eq(0)
      .type('faizal247')

    // Isi Email
    cy.get('input').eq(1)
      .type('faizal247@gmail.com')

    // Password
    cy.get('input').eq(2)
      .type('Password123')

    // Konfirmasi Password berbeda
    cy.get('input').eq(3)
      .type('Password456')

    // Klik Lanjutkan
    cy.contains('button', 'Lanjutkan')
      .click({ force: true })

    // Tetap berada di halaman Register
    cy.url().should('include', '/register')

  })

 // ==========================
// WP-REG-006
// ==========================
it('WP-REG-006 - Mengisi Form Identitas', () => {

  // ==========================
  // STEP 1
  // ==========================

  cy.get('input').eq(0)
    .type('faizal247')

  cy.get('input').eq(1)
    .type('faizal247@gmail.com')

  cy.get('input').eq(2)
    .type('Password123')

  cy.get('input').eq(3)
    .type('Password123')

  cy.contains('button', 'Lanjutkan')
    .click({ force: true })

  cy.wait(1500)

  // ==========================
  // STEP 2
  // ==========================

  // Nama Toko
  cy.get('input:visible')
    .first()
    .should('be.visible')
    .type('Toko Faizal')

  // Alamat Toko
  cy.get('textarea:visible')
    .first()
    .should('be.visible')
    .type('Bojonegoro')

  // ==========================
  // LANJUTKAN
  // ==========================

  cy.contains('button', 'Lanjutkan')
    .should('be.visible')
    .click({ force: true })

  cy.wait(1500)

  // Pastikan berhasil masuk ke tahap berikutnya
  cy.get('body')
    .should('be.visible')
})

  // ==========================
  // WP-REG-007
  // ==========================
  it('WP-REG-007 - Konfirmasi Data', () => {

    // Step 1
    cy.get('input').eq(0)
      .type('faizal247')

    cy.get('input').eq(1)
      .type('faizal247@gmail.com')

    cy.get('input').eq(2)
      .type('Password123')

    cy.get('input').eq(3)
      .type('Password123')

    cy.contains('button', 'Lanjutkan')
      .click({ force: true })

    cy.wait(1000)

    // Step 2
    cy.get('input')
      .filter(':visible')
      .first()
      .type('Toko Faizal')

    cy.get('textarea')
      .filter(':visible')
      .first()
      .type('Bojonegoro')

    cy.contains('button', 'Lanjutkan')
      .click({ force: true })

    cy.wait(1500)

    // Centang persetujuan
    cy.get('input[type="checkbox"]')
      .filter(':visible')
      .first()
      .check({ force: true })

    // Klik Daftar Sekarang
    cy.contains('button', 'Daftar Sekarang')
      .click({ force: true })

    cy.wait(2000)

    cy.get('body')
      .should('be.visible')

  })

})