describe('WiraPOS - Restock', () => {

  const EMAIL = 'faisalgaming1245@gmail.com';
  const PASSWORD = '12345678';

  const PRODUCT = 'Huawei MatePad 12X 2026';
  const VARIANT = 'penyimpanan - 512GB';

  const DISTRIBUTOR = 'PT Hummatech WiraPOS Mandiri';
  const LOCATION = 'Bojonegoro';

  // =========================================================
  // LOGIN
  // =========================================================
  beforeEach(() => {
    cy.session(
      'owner-login',
      () => {
        cy.visit('https://cmsdev-pos.hummatech.com/login');

        cy.get('input[type="email"]', { timeout: 15000 })
          .should('be.visible')
          .clear()
          .type(EMAIL);

        cy.get('input[type="password"]', { timeout: 15000 })
          .should('be.visible')
          .clear()
          .type(PASSWORD);

        cy.contains('button', /^Masuk$/i, { timeout: 15000 })
          .should('be.visible')
          .click();

        cy.url({ timeout: 20000 })
          .should('not.include', '/login');

        cy.wait(3000);
      },
      {
        cacheAcrossSpecs: true
      }
    );
  });


  // =========================================================
  // WP-REST-001
  // Menguji menu Restock
  // =========================================================
  it('WP-REST-001 - Menguji menu Restock', () => {

    cy.visit('https://cmsdev-pos.hummatech.com/restock');

    cy.url({ timeout: 20000 })
      .should('include', '/restock');

    cy.wait(3000);

    // Judul halaman
    cy.contains('h1', /Riwayat Stock Warehouse/i, {
      timeout: 20000
    })
      .should('be.visible');

    // Menu Restock aktif
    cy.contains('a', /^Restock$/i, {
      timeout: 15000
    })
      .should('exist');

    // Input pencarian
    cy.get('input[placeholder*="Cari riwayat restock" i]', {
      timeout: 15000
    })
      .should('be.visible');

    // Tombol Tambah Restock
    cy.contains(
      'button',
      /^(Buat Restock Pertama|Tambah Restock)$/i,
      {
        timeout: 15000
      }
    )
      .filter(':visible')
      .first()
      .should('be.visible');

  });


  // =======================================================
// WP-REST-002
// =======================================================
it('WP-REST-002 - Menguji fitur Tambah Restock dengan produk dan distributor', () => {

  cy.visit('https://cmsdev-pos.hummatech.com/restock')
  cy.url().should('include', '/restock')

  cy.wait(3000)

  // Klik Tambah Restock
  cy.contains('button', /^(Buat Restock Pertama|Tambah Restock)$/i)
    .filter(':visible')
    .first()
    .should('be.visible')
    .click({ force: true })

  cy.wait(2500)

  // Pastikan halaman create
  cy.url().should('include', '/restock/create')

  cy.contains('Restock Produk')
    .should('be.visible')

  // Klik Tambah Nama Distributor
  cy.contains('button', /Tambah Nama Distributor/i)
    .filter(':visible')
    .first()
    .click({ force: true })

  cy.wait(1000)

  // =====================================================
  // NAMA DISTRIBUTOR
  // =====================================================
  cy.contains('label', /^Nama Distributor$/i)
    .should('be.visible')
    .then(($label) => {

      const id = $label.attr('for')

      if (id) {
        cy.get(`#${id}`)
          .should('be.visible')
          .clear()
          .type('PT Hummatech WiraPOS Mandiri')
      } else {
        cy.wrap($label)
          .parent()
          .find('input')
          .first()
          .should('be.visible')
          .clear()
          .type('PT Hummatech WiraPOS Mandiri')
      }

    })

  // =====================================================
  // LOKASI DISTRIBUTOR
  // =====================================================
  cy.contains('label', /^Lokasi Distributor$/i)
    .should('be.visible')
    .then(($label) => {

      const id = $label.attr('for')

      if (id) {
        cy.get(`#${id}`)
          .should('be.visible')
          .clear()
          .type('Bojonegoro')
      } else {
        cy.wrap($label)
          .parent()
          .find('input, textarea')
          .first()
          .should('be.visible')
          .clear()
          .type('Bojonegoro')
      }

    })

})

// =======================================================
// WP-REST-003
// =======================================================
it('WP-REST-003 - Memeriksa data hasil request restock', () => {

  cy.visit('https://cmsdev-pos.hummatech.com/restock')

  cy.url().should('include', '/restock')

  // Tunggu halaman selesai dimuat
  cy.wait(3000)

  // Pastikan halaman Riwayat Stock Warehouse tampil
  cy.contains('h1', /Riwayat Stock Warehouse/i, {
    timeout: 10000
  }).should('be.visible')

  // Tunggu proses request API
  cy.wait(2000)

  // Cek apakah ada data riwayat stock
  cy.get('body').should('be.visible')

  // Cari elemen yang berisi data
  cy.contains(/Produk|Product|Distributor|Jumlah|Quantity|Tanggal|Date/i, {
    timeout: 10000
  }).should('be.visible')

})
});