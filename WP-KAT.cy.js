describe('WiraPOS - Kategori', () => {

  // ==================================================
  // LOGIN + MASUK HALAMAN KATEGORI
  // ==================================================

  beforeEach(() => {

    cy.viewport(1366, 768)

    // Buka halaman login
    cy.visit('https://cmsdev-pos.hummatech.com/login')

    cy.wait(2000)

    // ==========================
    // EMAIL
    // ==========================

    cy.get('input:visible')
      .eq(0)
      .should('be.visible')
      .click()
      .clear()
      .type('faisalgaming1245@gmail.com')

    // ==========================
    // PASSWORD
    // ==========================

    cy.get('input:visible')
      .eq(1)
      .should('be.visible')
      .click()
      .clear()
      .type('12345678')

    // ==========================
    // LOGIN
    // ==========================

    cy.contains('button', 'Masuk')
      .should('be.visible')
      .click()

    cy.wait(5000)

    // ==========================
    // HALAMAN KATEGORI
    // ==========================

    cy.visit('https://cmsdev-pos.hummatech.com/categories')

    cy.wait(3000)

    cy.url()
      .should('include', '/categories')

    cy.contains('Kategori')
      .should('be.visible')
  })


  // ==================================================
  // WP-KAT-001
  // Menguji akses menu Kategori
  // ==================================================

  it('WP-KAT-001 - Menguji akses menu Kategori', () => {

    cy.url()
      .should('include', '/categories')

    cy.contains('Kategori')
      .should('be.visible')

    // Pastikan tombol Tambah Kategori tampil
    cy.contains('button', 'Tambah Kategori')
      .should('be.visible')
  })


  // ==================================================
  // WP-KAT-002
  // Menguji fitur Tambah Kategori
  // ==================================================

  it('WP-KAT-002 - Menguji fitur Tambah Kategori', () => {

    const namaKategori = 'Kategori Cypress Test'

    // Klik Tambah Kategori
    cy.contains('button', 'Tambah Kategori')
      .should('be.visible')
      .click()

    cy.wait(500)

    // ==========================
    // MODAL TAMBAH
    // ==========================

    cy.get('.fixed.inset-0')
      .should('be.visible')
      .within(() => {

        cy.get('input:visible')
          .first()
          .should('be.visible')
          .clear()
          .type(namaKategori)

        cy.contains('button', /^Tambah$/)
          .should('be.visible')
          .click({ force: true })
      })

    cy.wait(1500)

    // ==========================
    // HASIL
    // ==========================

    cy.contains(namaKategori)
      .should('be.visible')
  })


  // ==================================================
  // WP-KAT-003
  // Menguji fitur pencarian
  // ==================================================

  it('WP-KAT-003 - Menguji fitur pencarian pada halaman Kategori', () => {

    cy.get('input[placeholder="Cari..."]')
      .should('be.visible')
      .click()
      .type('Cypress')

    cy.wait(1500)

    cy.get('body')
      .should('be.visible')
  })


  // ==================================================
  // WP-KAT-004
  // Menguji fitur Filter Data
  // ==================================================

  it('WP-KAT-004 - Menguji fitur Filter Data pada halaman Kategori', () => {

    // ==========================
    // CARI TOMBOL FILTER
    // ==========================

    cy.get('input[placeholder="Cari..."]')
      .should('be.visible')
      .then(($input) => {

        const inputRect = $input[0].getBoundingClientRect()

        cy.get('button:visible').then(($buttons) => {

          let filterButton = null

          $buttons.each((index, button) => {

            const rect = button.getBoundingClientRect()

            // Tombol filter berada di sebelah kanan input
            if (
              rect.left > inputRect.right &&
              rect.top >= inputRect.top - 20 &&
              rect.bottom <= inputRect.bottom + 20
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
    // TANGGAL DARI
    // ==========================

    cy.get('input:visible')
      .filter('[type="date"]')
      .eq(0)
      .should('be.visible')
      .clear()
      .type('2026-01-01')

    // ==========================
    // TANGGAL SAMPAI
    // ==========================

    cy.get('input:visible')
      .filter('[type="date"]')
      .eq(1)
      .should('be.visible')
      .clear()
      .type('2026-12-31')

    // ==========================
    // TERAPKAN
    // ==========================

    cy.contains('button', 'Terapkan')
      .should('be.visible')
      .click({ force: true })

    cy.wait(1500)

    // ==========================
    // HASIL
    // ==========================

    cy.url()
      .should('include', '/categories')

    cy.contains('Kategori')
      .should('be.visible')
  })


  // ==================================================
  // WP-KAT-005
  // Menguji fitur Edit Kategori
  // ==================================================

  it('WP-KAT-005 - Menguji fitur edit kategori pada halaman Kategori', () => {

    const namaKategori = 'Kategori Edit Cypress'
    const namaKategoriBaru = 'Kategori Edit Cypress Updated'

    // ==========================
    // TAMBAH KATEGORI
    // ==========================

    cy.contains('button', 'Tambah Kategori')
      .should('be.visible')
      .click()

    cy.wait(500)

    cy.get('.fixed.inset-0')
      .should('be.visible')
      .within(() => {

        cy.get('input:visible')
          .first()
          .should('be.visible')
          .clear()
          .type(namaKategori)

        cy.contains('button', /^Tambah$/)
          .should('be.visible')
          .click({ force: true })
      })

    cy.wait(1500)

    // Pastikan kategori muncul
    cy.contains(namaKategori)
      .should('be.visible')

    // ==========================
    // CARI BARIS KATEGORI
    // ==========================

    cy.contains('tr', namaKategori)
      .should('be.visible')
      .within(() => {

        // Tombol edit
        cy.get('button')
          .first()
          .click({ force: true })
      })

    cy.wait(500)

    // ==========================
    // MODAL EDIT
    // ==========================

    cy.get('.fixed.inset-0')
      .should('be.visible')
      .within(() => {

        cy.get('input:visible')
          .first()
          .should('be.visible')
          .clear()
          .type(namaKategoriBaru)

        cy.contains('button', 'Simpan')
          .should('be.visible')
          .click({ force: true })
      })

    cy.wait(1500)

    // ==========================
    // HASIL EDIT
    // ==========================

    cy.contains(namaKategoriBaru)
      .should('be.visible')
  })



// WP-KAT-006
// Menguji fitur Hapus Kategori
// ==================================================

it('WP-KAT-006 - Menguji fitur hapus kategori pada halaman Kategori', () => {

  const namaKategori = 'Kategori Hapus Cypress'

  // ==========================
  // TAMBAH KATEGORI
  // ==========================

  cy.contains('button', 'Tambah Kategori')
    .should('be.visible')
    .click()

  cy.wait(500)

  cy.get('.fixed.inset-0')
    .should('be.visible')
    .within(() => {

      cy.get('input:visible')
        .first()
        .should('be.visible')
        .clear()
        .type(namaKategori)

      cy.contains('button', /^Tambah$/)
        .should('be.visible')
        .click({ force: true })
    })

  cy.wait(1500)

  // ==========================
  // PASTIKAN DATA ADA
  // ==========================

  cy.contains(namaKategori)
    .should('be.visible')

  // ==========================
  // KLIK TOMBOL HAPUS
  // ==========================

  cy.contains('tr', namaKategori)
    .should('be.visible')
    .within(() => {

      cy.get('button')
        .last()
        .click({ force: true })

    })

  cy.wait(700)

  // ==========================
  // SWEETALERT KONFIRMASI
  // ==========================

  cy.get('.swal2-container')
    .should('be.visible')

  cy.get('#swal2-title')
    .should('be.visible')

  // ==========================
  // KLIK YA, HAPUS
  // ==========================

  cy.get('.swal2-confirm')
    .should('be.visible')
    .click({ force: true })

  cy.wait(1500)

  // ==========================
  // PASTIKAN DATA TERHAPUS
  // ==========================

  cy.contains(namaKategori)
    .should('not.exist')

})

})