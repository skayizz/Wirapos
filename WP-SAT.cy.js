describe('WiraPOS - Satuan', () => {

  // ==================================================
  // LOGIN + MASUK HALAMAN SATUAN
  // ==================================================

  beforeEach(() => {

    cy.viewport(1366, 768)

    // Buka halaman login
    cy.visit('https://cmsdev-pos.hummatech.com/login')

    cy.wait(2000)

    // Email
    cy.get('input:visible')
      .eq(0)
      .should('be.visible')
      .click()
      .clear()
      .type('faisalgaming1245@gmail.com')

    // Password
    cy.get('input:visible')
      .eq(1)
      .should('be.visible')
      .click()
      .clear()
      .type('12345678')

    // Login
    cy.contains('button', 'Masuk')
      .should('be.visible')
      .click()

    cy.wait(5000)

    // Masuk halaman Satuan
    cy.visit('https://cmsdev-pos.hummatech.com/units')

    cy.wait(3000)

    cy.url()
      .should('include', '/units')

  })


  // ==================================================
  // WP-SAT-001
  // Menguji akses menu Satuan
  // ==================================================

  it('WP-SAT-001 - Menguji akses menu Satuan', () => {

    cy.contains('Satuan')
      .should('be.visible')

    cy.get('body')
      .should('be.visible')

  })


  // ==================================================
  // WP-SAT-002
  // Menguji fitur tambah Satuan
  // ==================================================

  it('WP-SAT-002 - Menguji fitur tambah Satuan', () => {

    const namaSatuan = 'Satuan Cypress'
    const kodeSatuan = 'CYP'

    // Klik Tambah Satuan
    cy.contains('button', 'Tambah Satuan')
      .should('be.visible')
      .click()

    cy.wait(500)

    // ==========================
    // MODAL TAMBAH SATUAN
    // ==========================

    cy.get('.fixed.inset-0')
      .should('be.visible')
      .within(() => {

        // Nama Satuan
        cy.get('input:visible')
          .eq(0)
          .should('be.visible')
          .clear()
          .type(namaSatuan)

        // Kode Satuan
        cy.get('input:visible')
          .eq(1)
          .should('be.visible')
          .clear()
          .type(kodeSatuan)

        // Simpan
        cy.contains('button', 'Simpan')
          .should('be.visible')
          .click({ force: true })

      })

    cy.wait(1500)

    // ==========================
    // HASIL
    // ==========================

    cy.contains(namaSatuan)
      .should('be.visible')

    cy.contains(kodeSatuan)
      .should('be.visible')

  })

// ==================================================
// WP-SAT-003
// Menguji fitur filter pada halaman Satuan
// ==================================================

it('WP-SAT-003 - Menguji fitur filter pada halaman Satuan', () => {

  cy.url()
    .should('include', '/units')

  cy.wait(1000)

  // ==========================
  // CARI INPUT PENCARIAN
  // ==========================

  cy.get('input:visible')
    .first()
    .should('be.visible')
    .then(($input) => {

      const inputRect = $input[0].getBoundingClientRect()

      // ==========================
      // CARI TOMBOL FILTER
      // ==========================

      cy.get('button:visible').then(($buttons) => {

        let filterButton = null

        $buttons.each((index, button) => {

          const buttonRect = button.getBoundingClientRect()

          if (
            buttonRect.left > inputRect.right &&
            buttonRect.top >= inputRect.top - 30 &&
            buttonRect.top <= inputRect.bottom + 30
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

  cy.wait(700)

  // ==========================
  // MODAL FILTER
  // ==========================

  cy.get('.fixed.inset-0')
    .should('be.visible')

  // ==========================
  // TANGGAL DARI
  // ==========================

  cy.get('.fixed.inset-0 input:visible')
    .filter('[type="date"]')
    .eq(0)
    .should('be.visible')
    .clear()
    .type('2026-01-01')

  // ==========================
  // TANGGAL SAMPAI
  // ==========================

  cy.get('.fixed.inset-0 input:visible')
    .filter('[type="date"]')
    .eq(1)
    .should('be.visible')
    .clear()
    .type('2026-12-31')

  // ==========================
  // MINIMAL JUMLAH ITEM
  // ==========================

  cy.get('.fixed.inset-0 input:visible')
    .filter('[type="number"]')
    .eq(0)
    .clear()
    .type('1')

  // ==========================
  // MAKSIMAL JUMLAH ITEM
  // ==========================

  cy.get('.fixed.inset-0 input:visible')
    .filter('[type="number"]')
    .eq(1)
    .clear()
    .type('100')

  // ==========================
  // TERAPKAN
  // ==========================

  cy.get('.fixed.inset-0')
    .contains('button', 'Terapkan')
    .should('be.visible')
    .click({ force: true })

  cy.wait(1500)

  // ==========================
  // HASIL
  // ==========================

  cy.url()
    .should('include', '/units')

  cy.get('body')
    .should('be.visible')

})


  // ==================================================
  // WP-SAT-004
  // ==================================================

  it('WP-SAT-004 - Menguji tombol detail pada halaman Satuan', () => {

    cy.wait(1000)

    // Cari baris data pertama
    cy.get('tbody tr')
      .first()
      .should('be.visible')
      .within(() => {

        // Cari semua tombol pada kolom aksi
        cy.get('button')
          .should('have.length.at.least', 1)
          .then(($buttons) => {

            // Klik tombol yang pertama kali tersedia
            cy.wrap($buttons.last())
              .click({ force: true })

          })
      })

    cy.wait(2000)

    // ==========================
    // CEK HALAMAN DETAIL
    // ==========================

    cy.get('body')
      .should('be.visible')

    // Cek URL berubah atau terdapat informasi detail
    cy.url().then((url) => {

      if (url.includes('/units/')) {

        cy.url()
          .should('include', '/units/')

      } else {

        cy.contains('Nama Satuan')
          .should('be.visible')

      }

    })

  })


it('WP-SAT-005 - Menguji fitur tambah konversi pada Detail Satuan', () => {

  cy.url()
    .should('include', '/units')

  // ==========================
  // CARI DATA SATUAN
  // ==========================

  cy.contains('Satuan Cypress')
    .should('be.visible')
    .closest('tr')
    .within(() => {

      // Klik ikon mata / Detail
      cy.get('a')
        .first()
        .should('be.visible')
        .click({ force: true })
    })

  cy.wait(1500)

  // ==========================
  // DETAIL SATUAN
  // ==========================

  cy.contains('Detail Satuan')
    .should('be.visible')

  cy.contains('Daftar Konversi')
    .should('be.visible')

  // ==========================
  // TAMBAH KONVERSI
  // ==========================

  cy.contains('button', 'Tambah Konversi')
    .should('be.visible')
    .click({ force: true })

  cy.wait(500)

  cy.contains('Tambah Konversi')
    .should('be.visible')

  // ==========================
  // JUMLAH SATUAN ASAL
  // ==========================

  cy.get('input[name="amount"]')
    .should('have.value', '1')
    .and('be.disabled')

  // ==========================
  // PILIH SATUAN TUJUAN
  // ==========================

  cy.contains('-- Pilih Satuan --')
    .should('be.visible')
    .click({ force: true })

  cy.wait(500)

  cy.contains('Kilogram')
    .should('be.visible')
    .click({ force: true })

  // ==========================
  // NILAI KONVERSI
  // ==========================

  cy.get('input[placeholder="Isi manual sesuai kebutuhan"]')
    .should('be.visible')
    .type('1')

  // ==========================
  // SIMPAN
  // ==========================

  cy.contains('button', 'Simpan')
    .should('be.visible')
    .click({ force: true })

  cy.wait(2000)

  // ==========================
  // HASIL
  // ==========================

  cy.contains('Daftar Konversi')
    .should('be.visible')
})
})


