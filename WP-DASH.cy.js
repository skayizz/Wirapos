describe('WiraPOS Hardware', () => {

  beforeEach(() => {
    cy.visit('https://cmsdev-pos.hummatech.com/hardware')
    cy.viewport(1366, 768)
  })

  // ==========================
  // WP-HW-001
  // ==========================
  it('WP-HW-001 - Mengakses Halaman Hardware', () => {
    cy.url().should('include', '/hardware')
    cy.get('body').should('be.visible')
  })

  // ==========================
  // WP-HW-002
  // ==========================
  it('WP-HW-002 - Tombol Mulai Uji Coba', () => {

    cy.contains('Mulai Uji Coba')
      .scrollIntoView()
      .click({ force: true })

    // Seharusnya berpindah halaman
    cy.url().should('not.eq', 'https://cmsdev-pos.hummatech.com/hardware')

  })

  // ==========================
  // WP-HW-003
  // ==========================
  it('WP-HW-003 - Tombol Lihat Outlet 1', () => {

    cy.contains('Lihat')
      .first()
      .scrollIntoView()
      .click({ force: true })

    // Seharusnya berpindah ke halaman detail
    cy.url().should('not.eq', 'https://cmsdev-pos.hummatech.com/hardware')

  })

  // ==========================
  // WP-HW-004
  // ==========================
  it('WP-HW-004 - Semua Perangkat', () => {

    cy.contains('Semua Perangkat')
      .scrollIntoView()
      .click({ force: true })

    cy.contains('Semua Perangkat').should('be.visible')

  })

  // ==========================
  // WP-HW-005
  // ==========================
  it('WP-HW-005 - Mobile POS', () => {

    cy.contains('Mobile POS')
      .scrollIntoView()
      .click({ force: true })

    cy.contains('Mobile POS').should('be.visible')

  })

  // ==========================
  // WP-HW-006
  // ==========================
  it('WP-HW-006 - Tablet POS', () => {

    cy.contains('Tablet POS')
      .scrollIntoView()
      .click({ force: true })

    cy.contains('Tablet POS').should('be.visible')

  })

  // ==========================
  // WP-HW-007
  // ==========================
  it('WP-HW-007 - Printer', () => {

    cy.contains('Printer')
      .scrollIntoView()
      .click({ force: true })

    cy.contains('Printer').should('be.visible')

  })

  // ==========================
  // WP-HW-008
  // ==========================
  it('WP-HW-008 - Computer', () => {

    cy.contains('Computer')
      .scrollIntoView()
      .click({ force: true })

    cy.contains('Computer').should('be.visible')

  })
  describe('WiraPOS Hardware - WP-HW-009 s/d WP-HW-014', () => {

  beforeEach(() => {
    cy.visit('https://cmsdev-pos.hummatech.com/hardware')
    cy.viewport(1366, 768)
  })

  // ==========================================
  // WP-HW-009
  // ==========================================
  it('WP-HW-009 - Tombol Lihat Detail produk test2', () => {

    cy.contains('Semua Perangkat').scrollIntoView()

    cy.contains('test2').should('be.visible')

    cy.contains('test2')
      .parentsUntil('body')
      .parent()
      .contains('Lihat Detail')
      .click({ force: true })

    cy.contains('Beli Sekarang').should('be.visible')

  })

  // ==========================================
  // WP-HW-010
  // ==========================================
  it('WP-HW-010 - Tombol Beli Sekarang', () => {

    cy.contains('Semua Perangkat').scrollIntoView()

    cy.contains('test2')
      .parentsUntil('body')
      .parent()
      .contains('Lihat Detail')
      .click({ force: true })

    cy.contains('Beli Sekarang')
      .click({ force: true })

    cy.contains('Pilih Varian').should('be.visible')

  })

  // ==========================================
  // WP-HW-011
  // ==========================================
  it('WP-HW-011 - Pilihan Warna dan Kapasitas', () => {

    cy.contains('Semua Perangkat').scrollIntoView()

    cy.contains('test2')
      .parentsUntil('body')
      .parent()
      .contains('Lihat Detail')
      .click({ force: true })

    cy.contains('Beli Sekarang')
      .click({ force: true })

    cy.contains('Pilih Varian').should('be.visible')

    cy.contains('Biru').click({ force: true })
    cy.contains('512 GB').click({ force: true })

    cy.contains('Pink').click({ force: true })
    cy.contains('1 TB').click({ force: true })

    cy.contains('Merah').click({ force: true })
    cy.contains('2 TB').click({ force: true })

  })

  // ==========================================
  // WP-HW-012
  // ==========================================
  it('WP-HW-012 - Beli via WhatsApp', () => {

    cy.contains('Semua Perangkat').scrollIntoView()

    cy.contains('test2')
      .parentsUntil('body')
      .parent()
      .contains('Lihat Detail')
      .click({ force: true })

    cy.contains('Beli Sekarang')
      .click({ force: true })

    cy.contains('Biru').click({ force: true })
    cy.contains('512 GB').click({ force: true })

    cy.contains('Beli via WhatsApp')
      .invoke('removeAttr', 'target')
      .click({ force: true })

    cy.url().should('include', 'wa')

  })

  // ==========================================
  // WP-HW-013 (BUG)
  // ==========================================
  it('WP-HW-013 - Tombol Coba Gratis', () => {

    cy.contains('Bangun Bisnis Lebih Cerdas')
      .scrollIntoView()

    cy.url().then((urlAwal) => {

      cy.contains('Coba Gratis')
        .click({ force: true })

      cy.wait(2000)

      // Jika tombol masih bug, test ini akan FAIL
      cy.url().should('not.eq', urlAwal)

    })

  })

  // ==========================================
  // WP-HW-014 (BUG)
  // ==========================================
  it('WP-HW-014 - Tombol Kirim Form Kontak', () => {

    cy.contains('Masih bingung soal WiraPOS?')
      .scrollIntoView()

    cy.get('input')
      .first()
      .type('faizal@test.com')

    cy.get('textarea')
      .type('Automation Testing')

    cy.url().then((urlAwal) => {

      cy.contains('button', 'KIRIM')
        .click({ force: true })

      cy.wait(2000)

      // Jika tombol masih bug, test ini akan FAIL
      cy.url().should('not.eq', urlAwal)

    })

  })

})

})