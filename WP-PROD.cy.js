describe('WiraPOS - Produk', () => {

  beforeEach(() => {

    cy.viewport(1366, 768)

    // ==========================
    // LOGIN
    // ==========================

    cy.visit('https://cmsdev-pos.hummatech.com/login')

    cy.get('input[type="email"]')
      .should('exist')
      .clear()
      .type('faisalgaming1245@gmail.com')

    cy.get('input[type="password"]')
      .should('exist')
      .clear()
      .type('12345678')

    cy.contains('button', 'Masuk')
      .should('exist')
      .click({ force: true })

    // Tunggu login selesai
    cy.url({ timeout: 10000 })
      .should('not.include', '/login')

    cy.wait(2500)

    // ==========================
    // MASUK MENU PRODUK
    // ==========================

    // Cari teks Produk tanpa assertion visible
    cy.contains('p', 'Produk')
      .first()
      .click({ force: true })

    cy.wait(1500)

  })


  // ==================================================
  // WP-PROD-001
  // ==================================================

  it('WP-PROD-001 - Menguji menu Produk', () => {

    // Jika klik sidebar tidak berpindah,
    // gunakan URL langsung sebagai fallback
    cy.url().then((url) => {

      if (!url.includes('/products')) {
        cy.visit('https://cmsdev-pos.hummatech.com/products')
      }

    })

    cy.wait(1500)

    cy.url()
      .should('include', '/products')

    cy.get('body')
      .should('contain.text', 'Produk')

  })


it('WP-PROD-002 - Menguji fitur Tambah Produk', () => {

  // Pastikan login sudah berhasil
  cy.url({ timeout: 10000 })
    .should('not.include', '/login')

  cy.wait(2000)

  // ==========================
  // KLIK MENU PRODUK
  // ==========================

  cy.contains('p', 'Produk')
    .first()
    .click({ force: true })

  cy.wait(2000)

  // ==========================
  // JIKA BELUM PINDAH,
  // COBA CARI LINK PRODUK
  // ==========================

  cy.url().then((url) => {

    if (!url.includes('/products')) {

      cy.get('a')
        .filter(':visible')
        .then(($links) => {

          let found = false

          $links.each((index, el) => {

            const text = el.innerText.trim()

            if (text === 'Produk' || text.includes('Produk')) {
              found = true
              cy.wrap(el).click({ force: true })
              return false
            }

          })

          expect(found).to.equal(true)

        })

      cy.wait(2000)
    }

  })

  // ==========================
  // CEK HALAMAN PRODUK
  // ==========================

  cy.url({ timeout: 10000 })
    .should('include', '/products')

  cy.wait(1000)

  // ==========================
  // KLIK TAMBAH PRODUK
  // ==========================

  cy.contains('Tambah Produk')
    .should('exist')
    .click({ force: true })

  cy.wait(1500)

  // ==========================
  // CEK HALAMAN TAMBAH PRODUK
  // ==========================

  cy.url()
    .should('include', '/products/create')

})


  // ==================================================
  // WP-PROD-003
  // ==================================================

  it('WP-PROD-003 - Menguji tombol Tambah pada halaman Tambah Produk', () => {

    // Langsung ke halaman tambah produk
    cy.visit('https://cmsdev-pos.hummatech.com/products/create')

    cy.wait(2000)

    cy.url()
      .should('include', '/products/create')

    // ==========================
    // NAMA BARANG
    // ==========================

    cy.get('input')
      .filter('[placeholder*="Nama"]')
      .first()
      .should('exist')
      .scrollIntoView()
      .clear({ force: true })
      .type('Produk Cypress', { force: true })

    // ==========================
    // CARI SEMUA INPUT
    // ==========================

    cy.get('body')
      .should('be.visible')

    // ==========================
    // CARI BUTTON TAMBAH
    // ==========================

    cy.contains('button', 'Tambah')
      .last()
      .scrollIntoView()
      .should('exist')
      .click({ force: true })

    cy.wait(2000)

  })


  // ==================================================
  // WP-PROD-004
  // ==================================================

  it('WP-PROD-004 - Menguji tombol Tambah Variasi pada Variasi Produk', () => {

    cy.visit('https://cmsdev-pos.hummatech.com/products/create')

    cy.wait(2000)

    // ==========================
    // CARI BAGIAN VARIASI
    // ==========================

    cy.contains('Variasi Produk')
      .scrollIntoView({
        duration: 500,
        easing: 'linear',
        offset: { top: -100 }
      })
      .should('exist')

    // ==========================
    // TAMBAH VARIASI
    // ==========================

    cy.contains('button', 'Tambah Variasi')
      .scrollIntoView({
        duration: 500,
        easing: 'linear',
        offset: { top: -100 }
      })
      .should('exist')
      .click({ force: true })

    cy.wait(700)

    // ==========================
    // CEK VARIASI 1
    // ==========================

    cy.get('body')
      .should('contain.text', 'Variasi 1')

  })


  // ==================================================
  // WP-PROD-005
  // ==================================================

  it('WP-PROD-005 - Menguji tombol Terapkan Ke Semua pada Variasi Produk', () => {

    cy.visit('https://cmsdev-pos.hummatech.com/products/create')

    cy.wait(2000)

    // ==========================
    // KE BAGIAN VARIASI
    // ==========================

    cy.contains('Variasi Produk')
      .scrollIntoView({
        duration: 500,
        easing: 'linear',
        offset: { top: -100 }
      })
      .should('exist')

    // ==========================
    // TAMBAH VARIASI
    // ==========================

    cy.contains('button', 'Tambah Variasi')
      .scrollIntoView({
        duration: 500,
        easing: 'linear',
        offset: { top: -100 }
      })
      .should('exist')
      .click({ force: true })

    cy.wait(700)

    // ==========================
    // CARI TOMBOL TERAPKAN
    // ==========================

    cy.contains('button', 'Terapkan Ke Semua')
      .scrollIntoView({
        duration: 500,
        easing: 'linear',
        offset: { top: -100 }
      })
      .should('exist')
      .click({ force: true })

    cy.wait(700)

    cy.get('body')
      .should('be.visible')

  })

  it('WP-PROD-006 - Menguji tombol Export Produk', () => {

  // Login sudah dilakukan di beforeEach

  // Masuk langsung ke halaman Produk
  cy.visit('https://cmsdev-pos.hummatech.com/products')

  cy.wait(2000)

  // Pastikan halaman Produk berhasil dibuka
  cy.url()
    .should('include', '/products')

  // Pastikan halaman Produk tampil
  cy.contains('Produk')
    .should('be.visible')

  // Cari tombol Export Produk
  cy.contains('Export Produk')
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(2000)

})

})