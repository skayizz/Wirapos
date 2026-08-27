describe('WiraPOS - Riwayat Penjualan', () => {

  beforeEach(() => {

    // ==========================
    // BUKA WEBSITE WIRAPOS
    // ==========================

    cy.visit('https://cmsdev-pos.hummatech.com', {
      timeout: 30000,
      failOnStatusCode: false
    })

    cy.viewport(1366, 768)

    cy.wait(3000)


    // ==========================
    // LOGIN
    // ==========================

    cy.contains('MASUK', { timeout: 15000 })
      .should('be.visible')
      .click({ force: true })

    cy.wait(2000)


    // ==========================
    // EMAIL
    // ==========================

    cy.get('input', { timeout: 15000 })
      .eq(0)
      .should('be.visible')
      .click({ force: true })

    cy.get('input')
      .eq(0)
      .clear({ force: true })

    cy.get('input')
      .eq(0)
      .type('faisalgaming1245@gmail.com', {
        force: true
      })


    // ==========================
    // PASSWORD
    // ==========================

    cy.wait(500)

    cy.get('input', { timeout: 15000 })
      .eq(1)
      .should('be.visible')
      .click({ force: true })

    cy.get('input')
      .eq(1)
      .clear({ force: true })

    cy.get('input')
      .eq(1)
      .type('12345678', {
        force: true
      })


    // ==========================
    // LOGIN
    // ==========================

    cy.wait(500)

    cy.contains('button', 'Masuk', { timeout: 15000 })
      .should('be.visible')
      .click({ force: true })

    cy.wait(4000)


    // ==========================
    // RIWAYAT PENJUALAN
    // ==========================

    cy.visit(
      'https://cmsdev-pos.hummatech.com/riwayat-penjualan',
      {
        timeout: 30000,
        failOnStatusCode: false
      }
    )

    cy.wait(3000)

  })


  // ==========================
  // WP-RP-001
  // ==========================

  it('WP-RP-001 - Membuka halaman Riwayat Penjualan', () => {

    cy.url()
      .should('include', '/riwayat-penjualan')

    cy.contains('Riwayat Penjualan')
      .should('be.visible')

  })


  // ==========================
  // WP-RP-002
  // ==========================

  it('WP-RP-002 - Menampilkan data Riwayat Penjualan', () => {

    cy.contains('Nama Kasir')
      .should('be.visible')

    cy.contains('Nama Pembeli')
      .should('be.visible')

    cy.contains('Jumlah Dibeli')
      .should('be.visible')

    cy.contains('Total Harga')
      .should('be.visible')

    cy.contains('Tanggal')
      .should('be.visible')

    cy.contains('Status')
      .should('be.visible')

    cy.contains('Aksi')
      .should('be.visible')

  })


  // ==========================
  // WP-RP-003
  // ==========================

  it('WP-RP-003 - Mencari Riwayat Penjualan', () => {

    cy.get('input[placeholder="Cari riwayat penjualan..."]', {
      timeout: 15000
    })
      .should('be.visible')
      .click({ force: true })

    cy.get('input[placeholder="Cari riwayat penjualan..."]')
      .clear({ force: true })

    cy.get('input[placeholder="Cari riwayat penjualan..."]')
      .type('faizal', { force: true })

    cy.wait(1000)

    cy.get('body')
      .should('be.visible')

  })


  // ==========================
  // WP-RP-004
  // ==========================

  it('WP-RP-004 - Export Riwayat Penjualan', () => {

    cy.contains('button', 'Export Riwayat Penjualan', {
      timeout: 15000
    })
      .should('be.visible')
      .click({ force: true })

    cy.wait(2000)

    cy.get('body')
      .should('be.visible')

  })


  // ==========================
  // WP-RP-005
  // ==========================

  it('WP-RP-005 - Menguji tombol Terapkan pada Filter Data Riwayat Penjualan', () => {

    cy.url()
      .should('include', '/riwayat-penjualan')

    cy.wait(1500)


    // ==========================
    // CARI TOMBOL FILTER
    // ==========================

    cy.get('input[placeholder="Cari riwayat penjualan..."]', {
      timeout: 15000
    })
      .should('be.visible')
      .then(($input) => {

        const inputRect =
          $input[0].getBoundingClientRect()

        cy.get('button:visible').then(($buttons) => {

          let filterButton = null

          $buttons.each((index, button) => {

            const buttonRect =
              button.getBoundingClientRect()

            if (
              buttonRect.left > inputRect.right &&
              buttonRect.top >= inputRect.top - 20 &&
              buttonRect.bottom <= inputRect.bottom + 20
            ) {
              filterButton = button
              return false
            }

          })

          expect(filterButton).to.not.equal(null)

          cy.wrap(filterButton)
            .click({ force: true })

        })

      })


    cy.wait(1000)


    // ==========================
    // FILTER DATA
    // ==========================

    cy.get('body')
      .should('contain', 'Filter Data')


    // ==========================
    // ISI FILTER
    // ==========================

    cy.get('input:visible')
      .not('[placeholder="Cari riwayat penjualan..."]')
      .eq(0)
      .should('be.visible')
      .type('1', { force: true })

    cy.get('input:visible')
      .not('[placeholder="Cari riwayat penjualan..."]')
      .eq(1)
      .should('be.visible')
      .type('100', { force: true })

    cy.get('input:visible')
      .not('[placeholder="Cari riwayat penjualan..."]')
      .eq(2)
      .should('be.visible')
      .type('10000', { force: true })

    cy.get('input:visible')
      .not('[placeholder="Cari riwayat penjualan..."]')
      .eq(3)
      .should('be.visible')
      .type('1000000', { force: true })


    // ==========================
    // TERAPKAN
    // ==========================

    cy.contains('button', 'Terapkan', {
      timeout: 10000
    })
      .should('be.visible')
      .click({ force: true })

    cy.wait(1500)


    // ==========================
    // HASIL
    // ==========================

    cy.url()
      .should('include', '/riwayat-penjualan')

    cy.get('body')
      .should('be.visible')

  })

})