describe('WiraPOS - Halaman Panduan', () => {

  beforeEach(() => {
    cy.visit('https://cmsdev-pos.hummatech.com/panduan')
    cy.viewport(1366, 768)
    cy.wait(3000)
  })

  // ==========================
  // WP-PAN-001
  // ==========================
  it('WP-PAN-001 - Membuka halaman Panduan', () => {
    cy.url().should('include', '/panduan')
    cy.contains('Pusat Panduan').should('be.visible')
  })

  // ==========================
  // WP-PAN-002 (BUG)
  // ==========================
  it('WP-PAN-002 - Menguji fitur pencarian', () => {

    cy.get('input')
      .first()
      .clear()
      .type('Peraturan Wirapos{enter}')

    cy.wait(2000)

    cy.contains('Peraturan Wirapos').should('be.visible')

  })// ==========================================
// WP-PAN-003
// ==========================================
it('WP-PAN-003 - Panduan Umum', () => {

  cy.contains('Panduan Umum')
    .scrollIntoView()
    .closest('.bg-white')
    .find('button')
    .click({ force: true })

  cy.url().should('not.include', '/panduan')
})

// ==========================================
// WP-PAN-004
// ==========================================
it('WP-PAN-004 - Mulai dengan WiraPOS', () => {

  cy.contains('Mulai dengan WiraPOS')
    .scrollIntoView()
    .closest('.bg-white')
    .find('button')
    .click({ force: true })

  cy.url().should('not.include', '/panduan')
})

// ==========================================
// WP-PAN-005
// ==========================================
it('WP-PAN-005 - Panduan Owner', () => {

  cy.contains('Panduan Owner')
    .scrollIntoView()
    .closest('.bg-white')
    .find('button')
    .click({ force: true })

  cy.url().should('not.include', '/panduan')
})

// ==========================================
// WP-PAN-006
// ==========================================
it('WP-PAN-006 - Panduan Kasir', () => {

  cy.contains('Panduan Kasir')
    .scrollIntoView()
    .closest('.bg-white')
    .find('button')
    .click({ force: true })

  cy.url().should('not.include', '/panduan')
})

// ==========================================
// WP-PAN-007
// ==========================================
it('WP-PAN-007 - Panduan Warehouse', () => {

  cy.contains('Panduan Warehouse')
    .scrollIntoView()
    .closest('.bg-white')
    .find('button')
    .click({ force: true })

  cy.url().should('not.include', '/panduan')
})

// ==========================================
// WP-PAN-008
// ==========================================
it('WP-PAN-008 - Panduan Retail', () => {

  cy.contains('Panduan Retail')
    .scrollIntoView()
    .closest('.bg-white')
    .find('button')
    .click({ force: true })

  cy.url().should('not.include', '/panduan')
})

// ==========================================
// WP-PAN-009
// ==========================================
it('WP-PAN-009 - Panduan Admin', () => {

  cy.contains('Panduan Admin')
    .scrollIntoView()
    .closest('.bg-white')
    .find('button')
    .click({ force: true })

  cy.url().should('not.include', '/panduan')
})

// ==========================================
// WP-PAN-010
// ==========================================
it('WP-PAN-010 - Laporan Penjualan', () => {

  cy.contains('Laporan Penjualan')
    .scrollIntoView()
    .closest('.bg-white')
    .find('button')
    .click({ force: true })

  cy.url().should('not.include', '/panduan')
})

// ==========================================
// WP-PAN-011
// ==========================================
it('WP-PAN-011 - Manajemen Stok', () => {

  cy.contains('Manajemen Stok')
    .scrollIntoView()
    .closest('.bg-white')
    .find('button')
    .click({ force: true })

  cy.url().should('not.include', '/panduan')
})

// ==========================================
// WP-PAN-012
// ==========================================
it('WP-PAN-012 - Tambah & Edit Produk', () => {

  cy.contains('Tambah & Edit Produk')
    .scrollIntoView()
    .closest('.bg-white')
    .find('button')
    .click({ force: true })

  cy.url().should('not.include', '/panduan')
})

// ==========================================
// WP-PAN-013
// ==========================================
it('WP-PAN-013 - Kelola Pengguna', () => {

  cy.contains('Kelola Pengguna')
    .scrollIntoView()
    .closest('.bg-white')
    .find('button')
    .click({ force: true })

  cy.url().should('not.include', '/panduan')
})

// ==========================================
// WP-PAN-014
// ==========================================
it('WP-PAN-014 - WiraPOS Mobile', () => {

  cy.contains('WiraPOS Mobile')
    .scrollIntoView()
    .closest('.bg-white')
    .find('button')
    .click({ force: true })

  cy.url().should('not.include', '/panduan')
})
})