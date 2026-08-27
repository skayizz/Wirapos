describe('WiraPOS Dashboard', () => {

  beforeEach(() => {
    cy.visit('https://cmsdev-pos.hummatech.com')
    cy.viewport(1366, 768)
  })

  // ==========================
  // WP-DASH-001
  // ==========================
  it('WP-DASH-001 - Mengakses Website', () => {
    cy.url().should('include', 'cmsdev-pos.hummatech.com')
    cy.get('body').should('be.visible')
  })

  // ==========================
  // WP-DASH-002
  // ==========================
  it('WP-DASH-002 - Layout Halaman Beranda', () => {
    cy.get('body').should('be.visible')

    cy.scrollTo('bottom')
    cy.wait(1000)
    cy.scrollTo('top')
  })

  // ==========================
  // WP-DASH-003
  // ==========================
  it('WP-DASH-003 - Menu Beranda', () => {
    cy.contains('Beranda').click({ force: true })
  })

  // ==========================
  // WP-DASH-004
  // ==========================
  it('WP-DASH-004 - Tombol Mulai Uji Coba', () => {
    cy.contains('Mulai Uji Coba')
      .scrollIntoView()
      .click({ force: true })
  })

  // ==========================
  // WP-DASH-005
  // ==========================
  it('WP-DASH-005 - Tombol Owner', () => {
    cy.contains('Owner')
      .scrollIntoView()
      .click({ force: true })
  })

  // ==========================
  // WP-DASH-006
  // ==========================
  it('WP-DASH-006 - Tombol Gudang', () => {
    cy.contains('Gudang')
      .scrollIntoView()
      .click({ force: true })
  })

  // ==========================
  // WP-DASH-007
  // ==========================
  it('WP-DASH-007 - Tombol Toko', () => {
    cy.contains('Toko')
      .scrollIntoView()
      .click({ force: true })
  })

  // ==========================
  // WP-DASH-008
  // ==========================
  it('WP-DASH-008 - Tombol Kasir', () => {
    cy.contains('Kasir')
      .scrollIntoView()
      .click({ force: true })
  })

  // ==========================
  // WP-DASH-009
  // ==========================
  it('WP-DASH-009 - Tombol Auditor', () => {
    cy.contains('Auditor')
      .scrollIntoView()
      .click({ force: true })
  })

  // ==========================
  // WP-DASH-010
  // ==========================
  it('WP-DASH-010 - Section Paket WiraPOS', () => {
    cy.contains('Paket')
      .scrollIntoView()

    cy.contains('Paket Free').should('be.visible')
    cy.contains('Paket Plus').should('be.visible')
    cy.contains('Paket Pro').should('be.visible')
  })

  // ==========================
  // WP-DASH-011
  // ==========================
  it('WP-DASH-011 - Paket Free', () => {
    cy.contains('Paket Free').scrollIntoView()
    cy.contains('Gratis').should('be.visible')
    cy.contains('Get Started').should('be.visible')
  })

  // ==========================
  // WP-DASH-012
  // ==========================
  it('WP-DASH-012 - Paket Plus', () => {
    cy.contains('Paket Plus').scrollIntoView()
    cy.contains('Kontak Kami').should('be.visible')
    cy.contains('Get Started').should('be.visible')
  })

  // ==========================
  // WP-DASH-013
  // ==========================
  it('WP-DASH-013 - Paket Pro', () => {
    cy.contains('Paket Pro').scrollIntoView()
    cy.contains('Rp').should('be.visible')
    cy.contains('Get Started').should('be.visible')
  })

  // ==========================
  // WP-DASH-014
  // ==========================
  it('WP-DASH-014 - Tombol Get Started Paket Free', () => {
    cy.contains('Paket Free').scrollIntoView()
    cy.contains('Get Started').click({ force: true })
  })

  // ==========================
  // WP-DASH-015
  // ==========================
  it('WP-DASH-015 - Tombol Get Started Paket Plus', () => {
    cy.contains('Paket Plus').scrollIntoView()
    cy.contains('Get Started').click({ force: true })
  })

  // ==========================
  // WP-DASH-016
  // ==========================
  it('WP-DASH-016 - Tombol Get Started Paket Pro', () => {
    cy.contains('Paket Pro').scrollIntoView()
    cy.contains('Get Started').click({ force: true })
  })

  // ==========================
  // WP-DASH-017
  // ==========================
  it('WP-DASH-017 - Layout Section Paket', () => {
    cy.contains('Paket').scrollIntoView()

    cy.contains('Paket Free').should('be.visible')
    cy.contains('Paket Plus').should('be.visible')
    cy.contains('Paket Pro').should('be.visible')
  })

  // ==========================
  // WP-DASH-018
  // ==========================
  it('WP-DASH-018 - Tampilan Tombol Get Started', () => {
    cy.contains('Paket').scrollIntoView()

    cy.contains('Get Started').should('be.visible')
  })

  it('WP-DASH-019 - Tombol Gabung dengan WiraPOS', () => {

  cy.contains('Gabung dengan WiraPOS')
    .scrollIntoView()
    .click({ force: true })

  cy.url().should('include', '/register')

})

})