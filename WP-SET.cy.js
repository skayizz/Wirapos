describe('WP-SET - Settings / Pengaturan', () => {

  // =========================================================
  // LOGIN + BUKA SETTINGS
  // =========================================================
  beforeEach(() => {

    cy.visit('https://cmsdev-pos.hummatech.com/login');

    // Email
    cy.get('input[type="email"]', { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type('faisalgaming1245@gmail.com');

    // Password
    cy.get('input[type="password"]', { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type('12345678');

    // Tombol Login
    cy.contains('button', 'Masuk', { timeout: 15000 })
      .should('be.visible')
      .click();

    // Pastikan login berhasil
    cy.url({ timeout: 15000 })
      .should('not.include', '/login');

    // =====================================================
    // BUKA MENU SETTINGS
    // =====================================================

    cy.contains('a, button', 'Settings', { timeout: 15000 })
      .should('be.visible')
      .click();

    // Pastikan halaman Settings terbuka
    cy.contains('Menu Pengaturan Aplikasi', {
      timeout: 15000
    }).should('be.visible');
  });


  // =========================================================
  // WP-SET-001
  // Menguji menu Settings
  // =========================================================
  it('WP-SET-001 - Admin dapat membuka menu Settings', () => {

    // Pastikan section pengaturan tampil
    cy.contains('Menu Pengaturan Aplikasi', {
      timeout: 15000
    }).should('be.visible');

    // Tombol Batalkan Perubahan
    cy.contains('button', 'Batalkan Perubahan', {
      timeout: 15000
    }).should('be.visible');

    // Tombol Simpan Perubahan
    cy.contains('button', 'Simpan Perubahan', {
      timeout: 15000
    }).should('be.visible');
  });


// =========================================================
  // WP-SET-002
  // =========================================================
  it('WP-SET-002 - Menguji tombol Batalkan Perubahan', () => {

    cy.url({ timeout: 15000 })
      .should('include', 'settings');

    // Pastikan tombol ada
    cy.contains('Batalkan Perubahan', {
      timeout: 15000
    })
      .should('be.visible')
      .and('not.be.disabled');

    // Klik tombol
    cy.contains('Batalkan Perubahan', {
      timeout: 15000
    })
      .click();

    // Pastikan tetap di halaman Settings
    cy.url({ timeout: 15000 })
      .should('include', 'settings');
  });

  // =========================================================
  // WP-SET-003
  // Menguji Simpan Perubahan saat pengaturan kosong
  // =========================================================
  it('WP-SET-003 - Simpan Perubahan saat kosong menampilkan error', () => {

    cy.contains('Menu Pengaturan Aplikasi', {
      timeout: 15000
    }).should('be.visible');

    // Klik Simpan Perubahan
    cy.contains('button', 'Simpan Perubahan', {
      timeout: 15000
    })
      .should('be.visible')
      .click();

    // Pastikan pesan error muncul
    cy.contains('Gagal menyimpan pengaturan', {
      timeout: 15000
    }).should('be.visible');

    // Pastikan detail error muncul
    cy.contains('Settings wajib diisi', {
      timeout: 15000
    }).should('be.visible');
  });


  // =========================================================
  // WP-SET-004
  // Menguji link Coba muat ulang
  // =========================================================
  it('WP-SET-004 - Link Coba muat ulang dapat digunakan', () => {

    cy.contains('Menu Pengaturan Aplikasi', {
      timeout: 15000
    }).should('be.visible');

    // Klik Coba muat ulang
    cy.contains('a, button', 'Coba muat ulang', {
      timeout: 15000
    })
      .should('be.visible')
      .click();

    // Pastikan data Settings kembali tampil
    cy.contains('Menu Pengaturan Aplikasi', {
      timeout: 15000
    }).should('be.visible');
  });

});