describe('WP-STAT - Statistik', () => {

  // =====================================================
  // LOGIN
  // =====================================================
  beforeEach(() => {

    cy.visit('https://cmsdev-pos.hummatech.com/login');

    cy.get('input[type="email"]', { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type('faisalgaming1245@gmail.com');

    cy.get('input[type="password"]', { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type('12345678');

    cy.contains('button', /login|masuk/i, { timeout: 15000 })
      .should('be.visible')
      .click();

    cy.url({ timeout: 15000 })
      .should('not.include', '/login');

    cy.wait(2000);
  });


  // =====================================================
  // WP-STAT-001
  // TEST CASE 23
  // Membuka menu Statistik
  // =====================================================
  it('WP-STAT-001 - Membuka menu Statistik', () => {

    // Klik menu Statistik pada sidebar
    cy.contains('Statistik', { timeout: 15000 })
      .first()
      .click({ force: true });

    // Memastikan halaman Statistik terbuka
    cy.url({ timeout: 15000 })
      .should('include', '/statistik');

  });


  it('WP-STAT-002 - Menguji tab Warehouse Retail Produk Diskon Bundling', () => {

  // =====================================================
  // MASUK KE HALAMAN STATISTIK
  // =====================================================
  cy.contains('Statistik', { timeout: 15000 })
    .first()
    .click({ force: true });

  cy.url({ timeout: 15000 })
    .should('include', '/statistik');

  cy.wait(1500);


  // =====================================================
  // TAB WAREHOUSE DI DALAM STATISTIK
  // =====================================================
  cy.contains('Warehouse', { timeout: 15000 })
    .last()
    .click({ force: true });

  cy.wait(500);


  // =====================================================
  // TAB RETAIL DI DALAM STATISTIK
  // =====================================================
  cy.contains('Retail', { timeout: 15000 })
    .last()
    .click({ force: true });

  cy.wait(500);


  // =====================================================
  // TAB PRODUK DI DALAM STATISTIK
  // =====================================================
  cy.contains('Produk', { timeout: 15000 })
    .last()
    .click({ force: true });

  cy.wait(500);


  // =====================================================
  // TAB DISKON DI DALAM STATISTIK
  // =====================================================
  cy.contains('Diskon', { timeout: 15000 })
    .last()
    .click({ force: true });

  cy.wait(500);


  // =====================================================
  // TAB BUNDLING DI DALAM STATISTIK
  // =====================================================
  cy.contains('Bundling', { timeout: 15000 })
    .last()
    .click({ force: true });

  cy.wait(500);

});

  // =====================================================
  // WP-STAT-003
  // Menguji dropdown Tahunan dan pilihan tahun
  // =====================================================
  it('WP-STAT-003 - Menguji dropdown Tahunan dan pilihan tahun', () => {

    // Buka menu Statistik
    cy.contains('Statistik', { timeout: 15000 })
      .first()
      .click({ force: true });

    cy.url({ timeout: 15000 })
      .should('include', '/statistik');

    cy.wait(1000);


    // =====================================================
    // CEK GRAFIK
    // =====================================================
    cy.contains('Statistik Pembelian Tahunan', { timeout: 15000 })
      .should('be.visible');


    // =====================================================
    // DROPDOWN PERIODE
    // =====================================================
    cy.contains('Tahunan', { timeout: 15000 })
      .should('be.visible')
      .click();

    cy.wait(500);


    // =====================================================
    // PILIH PERIODE TAHUNAN
    // =====================================================
    cy.contains('Tahunan', { timeout: 10000 })
      .last()
      .click();

    cy.wait(500);


    // =====================================================
    // PILIH TAHUN 2026
    // =====================================================
    cy.contains('2026', { timeout: 15000 })
      .should('be.visible')
      .click();

    cy.wait(500);


    // Jika muncul pilihan tahun 2026
    cy.contains('2026', { timeout: 10000 })
      .last()
      .click();

    cy.wait(1000);


    // =====================================================
    // VALIDASI GRAFIK
    // =====================================================
    cy.contains('Statistik Pembelian Tahunan', { timeout: 15000 })
      .should('be.visible');

    cy.contains('2026', { timeout: 10000 })
      .should('be.visible');

  });

});