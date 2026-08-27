describe('WiraPOS - Informasi', () => {

  beforeEach(() => {
    cy.visit('https://cmsdev-pos.hummatech.com/informasi')
    cy.viewport(1366,768)
    cy.wait(3000)
  })

  // WP-INF-001
  it('WP-INF-001 - Membuka halaman Informasi', () => {
    cy.url().should('include','/informasi')
    cy.get('body').should('contain','Kenapa Bisnis Wajib Pakai POS Digital di 2025')
  })
  // WP-INF-003
  it('WP-INF-002 - Menampilkan Informasi Detail', () => {

    cy.contains('Kenapa Bisnis Wajib Pakai POS Digital di 2025')
      .scrollIntoView()
      .click({force:true})

    cy.get('body').should('be.visible')
  })
  it('WP-INF-003 - Klik Beranda pada breadcrumb', () => {

    cy.contains('Beranda')
      .click({ force: true })

    cy.url().should('eq', 'https://cmsdev-pos.hummatech.com/')
  })

  it('WP-INF-004 - Klik Information pada breadcrumb', () => {

    cy.visit('https://cmsdev-pos.hummatech.com/informasi-detail')

    cy.contains('Information')
      .click({ force: true })

    cy.url().should('include', '/informasi')
  })


})