describe('WiraPOS - Halaman Kontak', () => {

  beforeEach(() => {
    cy.visit('https://cmsdev-pos.hummatech.com/kontak')
    cy.viewport(1366, 768)
    cy.wait(3000)
  })

  // ===========================
  // WP-KT-001 (PASS)
  // ===========================
  it('WP-KT-001 - Membuka halaman Kontak', () => {
    cy.url().should('include', '/kontak')
    cy.get('body').should('be.visible')
  })

  // ===========================
  // WP-KT-002 (FAIL)
  // ===========================
  it('WP-KT-002 - Tombol Tinggalkan Kami Pesan', () => {
    cy.contains('Tinggalkan Kami Pesan')
      .click({ force: true })

    // Seharusnya pindah halaman/form
    cy.url().should('not.include', '/kontak')
  })

  it('WP-KT-003 - Facebook', () => {
  cy.get('a[href*="facebook"]')
    .should('have.attr', 'href')
    .and('include', 'facebook')
})

it('WP-KT-004 - Instagram', () => {
  cy.get('a[href*="instagram"]')
    .should('have.attr', 'href')
    .and('include', 'instagram')
})

  it('WP-KT-005 - Twitter', () => {
  cy.get('a[href*="twitter"], a[href*="x.com"]')
    .should('have.attr', 'href')
})

  // ===========================
  // WP-KT-006 (PASS)
  // ===========================
  it('WP-KT-006 - Input Email Newsletter', () => {

    cy.contains('Subscribe')
      .scrollIntoView()

    cy.get('input[type="email"]')
      .last()
      .type('faizal@gmail.com')

    cy.get('input[type="email"]')
      .last()
      .should('have.value','faizal@gmail.com')

  })

  // ===========================
  // WP-KT-007 (FAIL)
  // ===========================
  it('WP-KT-007 - Tombol Subscribe', () => {

    cy.contains('Subscribe')
      .scrollIntoView()

    cy.get('input[type="email"]')
      .last()
      .type('faizal@gmail.com')

    cy.contains('Subscribe')
      .click({force:true})

    // Seharusnya muncul notifikasi berhasil
    cy.contains('Berhasil Subscribe').should('be.visible')

  })

  // ===========================
  // WP-KT-008 (PASS)
  // ===========================
  it('WP-KT-008 - Menu Beranda', () => {

    cy.contains('Beranda')
      .last()
      .click({force:true})

    cy.url().should('eq','https://cmsdev-pos.hummatech.com/')

  })

  // ===========================
  // WP-KT-009 (FAIL)
  // ===========================
  it('WP-KT-009 - Privacy Policy', () => {

    cy.contains('Privacy Policy')
      .click({force:true})

    // Seharusnya tidak 404
    cy.contains('Privacy Policy').should('be.visible')

  })

  // ===========================
  // WP-KT-010 (PASS)
  // ===========================
  it('WP-KT-010 - Menu Produk', () => {

    cy.contains('Produk')
      .click({force:true})

    cy.url().should('include','hardware')

  })

  // ===========================
  // WP-KT-011 (FAIL)
  // ===========================
  it('WP-KT-011 - Menu Kontak', () => {

    cy.contains('Kontak')
      .last()
      .click({force:true})

    // Seharusnya reload / membuka halaman kontak
    cy.url().should('not.include','/kontak')

  })

  it('WP-KT-012 - LinkedIn', () => {
  cy.get('a[href*="linkedin"]')
    .should('have.attr', 'href')
    .and('include', 'linkedin')
})

  // ===========================
  // WP-KT-013 (PASS)
  // ===========================
  it('WP-KT-013 - Facebook Footer', () => {

    cy.visit('https://cmsdev-pos.hummatech.com/kontak')

    cy.get('a[href*="facebook"]')
      .last()
      .invoke('removeAttr','target')
      .click()

    cy.url().should('include','facebook')

  })

})