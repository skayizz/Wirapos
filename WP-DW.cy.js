describe('WiraPOS - Dashboard Warehouse Owner', () => {

  beforeEach(() => {

    // ==========================
    // BUKA WEBSITE
    // ==========================

    cy.visit('https://cmsdev-pos.hummatech.com')

    cy.viewport(1366, 768)

    cy.wait(2000)


    // ==========================
    // LOGIN OWNER
    // ==========================

    cy.contains('MASUK')
      .should('be.visible')
      .click({ force: true })

    cy.wait(1000)

    // Email
    cy.get('input')
      .filter(':visible')
      .eq(0)
      .should('be.visible')
      .type('faisalgaming1245@gmail.com')

    // Password
    cy.get('input')
      .filter(':visible')
      .eq(1)
      .should('be.visible')
      .type('12345678')

    // Klik Masuk
    cy.contains('button', 'Masuk')
      .should('be.visible')
      .click({ force: true })

    cy.wait(3000)

  })


  // ==========================
  // WP-DW-001
  // ==========================
  it('WP-DW-001 - Menguji tampilan halaman Beranda Dashboard Owner', () => {

    // Klik menu Beranda
    cy.contains('Beranda')
      .should('be.visible')
      .click({ force: true })

    cy.wait(1000)

    // Pastikan halaman Dashboard tampil
    cy.contains('Total Produk')
      .should('be.visible')

    cy.contains('Transaksi Warehouse')
      .should('be.visible')

    cy.contains('Pendapatan Warehouse')
      .should('be.visible')

    cy.contains('Pengeluaran Warehouse')
      .should('be.visible')

    // Pastikan halaman tampil
    cy.get('body')
      .should('be.visible')

  })


  // ==========================
  // WP-DW-002
  // ==========================
  it('WP-DW-002 - Menguji fitur Transaksi Warehouse pada Dashboard Owner', () => {

    // Pastikan bagian Transaksi Warehouse tampil
    cy.contains('Transaksi Warehouse')
      .should('be.visible')

    // Klik periode 1 Bulan
    cy.contains('1 Bulan')
      .should('be.visible')
      .click({ force: true })

    cy.wait(1000)

    // Pastikan data transaksi tetap tampil
    cy.contains('Transaksi Warehouse')
      .should('be.visible')

  })


  // ==========================
  // WP-DW-003
  // ==========================
  it('WP-DW-003 - Menguji fitur Pendapatan Warehouse pada Dashboard Owner', () => {

    // Scroll ke Pendapatan Warehouse
    cy.contains('Pendapatan Warehouse')
      .should('be.visible')
      .scrollIntoView()

    cy.wait(500)

    // Klik Pendapatan Warehouse
    cy.contains('Pendapatan Warehouse')
      .click({ force: true })

    cy.wait(1000)

    // Pastikan tetap tampil
    cy.contains('Pendapatan Warehouse')
      .should('be.visible')

    cy.get('body')
      .should('be.visible')

  })


  // ==========================
  // WP-DW-004
  // ==========================
  it('WP-DW-004 - Menguji tab Pengeluaran Warehouse pada Dashboard', () => {

    // Scroll ke Pengeluaran Warehouse
    cy.contains('Pengeluaran Warehouse')
      .should('be.visible')
      .scrollIntoView()

    cy.wait(500)

    // Klik Pengeluaran Warehouse
    cy.contains('Pengeluaran Warehouse')
      .click({ force: true })

    cy.wait(1000)

    // Pastikan tampil
    cy.contains('Pengeluaran Warehouse')
      .should('be.visible')

    cy.get('body')
      .should('be.visible')

  })


  // ==========================
  // WP-DW-005
  // ==========================
  it('WP-DW-005 - Menguji tombol Semua Transaksi pada History Pendapatan & Pengeluaran', () => {

    // Cari bagian History Pendapatan & Pengeluaran
    cy.contains('History Pendapatan & Pengeluaran')
      .should('be.visible')
      .scrollIntoView()

    cy.wait(500)

    // Klik Semua Transaksi
    cy.contains('Semua Transaksi')
      .should('be.visible')
      .click({ force: true })

    cy.wait(1500)

    // Pastikan masuk ke Riwayat Penjualan
    cy.url()
      .should('include', '/riwayat-penjualan')

    cy.contains('Riwayat Penjualan')
      .should('be.visible')

  })


// ==========================
// WP-DW-006
// ==========================
it('WP-DW-006 - Menguji tombol Semua Transaksi pada bagian Profit', () => {

  // Pastikan berada di Dashboard
  cy.url()
    .should('include', 'cmsdev-pos.hummatech.com')

  cy.wait(1000)

  // Cari semua tombol/link "Semua Transaksi"
  cy.contains('Semua Transaksi')
    .should('be.visible')
    .last()
    .click({ force: true })

  cy.wait(1500)

  // Pastikan diarahkan ke Riwayat Penjualan
  cy.url()
    .should('include', '/riwayat-penjualan')

  cy.contains('Riwayat Penjualan')
    .should('be.visible')
})
})