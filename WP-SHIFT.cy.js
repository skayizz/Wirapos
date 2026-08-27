describe('WP-SHIFT - Shift Kasir', () => {

  const email = 'faisalgaming1245@gmail.com';
  const password = '12345678';


  // =====================================================
  // BEFORE EACH
  // =====================================================
  beforeEach(() => {

    // 1. Buka halaman login
    cy.visit('https://cmsdev-pos.hummatech.com/login');

    // 2. Email
    cy.get('input[type="email"]', { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type(email);

    // 3. Password
    cy.get('input[type="password"]', { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type(password);

    // 4. Login
    cy.get('button[type="submit"]', { timeout: 15000 })
      .should('be.visible')
      .click();

    // 5. Pastikan login berhasil
    cy.url({ timeout: 15000 })
      .should('not.include', '/login');

    cy.wait(1000);

    // 6. Klik menu Shift
    cy.contains('a', 'Shift', { timeout: 15000 })
      .click({ force: true });

    // 7. Tunggu halaman Shift
    cy.wait(1500);
  });


  // =====================================================
  // WP-SHIFT-001
  // Menguji menu Shift
  // =====================================================
  it('WP-SHIFT-001 - Menguji menu Shift', () => {

    cy.url({ timeout: 15000 })
      .should('not.include', '/login');

    // Tabel Shift
    cy.get('table', { timeout: 15000 })
      .should('exist');

    // Kolom tabel
    cy.contains('th', 'User', { timeout: 10000 })
      .should('exist');

    cy.contains('th', 'Waktu', { timeout: 10000 })
      .should('exist');

    cy.contains('th', 'Tanggal Buka', { timeout: 10000 })
      .should('exist');

    cy.contains('th', 'Tanggal Tutup', { timeout: 10000 })
      .should('exist');

    cy.contains('th', 'Uang Keluar', { timeout: 10000 })
      .should('exist');

    cy.contains('th', 'Uang Masuk', { timeout: 10000 })
      .should('exist');

    cy.contains('th', 'Aksi', { timeout: 10000 })
      .should('exist');

    // Kolom pencarian
    cy.get('input:visible', { timeout: 10000 })
      .should('have.length.greaterThan', 0);

    // Pastikan ada tombol
    cy.get('button:visible', { timeout: 10000 })
      .should('have.length.greaterThan', 0);

    // Export Shift
    cy.contains('button', 'Export Shift', { timeout: 10000 })
      .should('exist');
  });


  // =====================================================
// WP-SHIFT-002
// Menguji tombol Filter Data
// =====================================================
it('WP-SHIFT-002 - Menguji tombol Filter Data', () => {

  // Pastikan berada di halaman Shift
  cy.url({ timeout: 15000 })
    .should('not.include', '/login');

  // ===================================================
  // BUKA FILTER
  // ===================================================
  cy.get('button[class*="border-blue-600"]', { timeout: 15000 })
    .should('be.visible')
    .click({ force: true });

  // Pastikan 2 input tanggal muncul
  cy.get('input[type="date"]', { timeout: 10000 })
    .should('have.length.at.least', 2);

  // ===================================================
  // ISI TANGGAL
  // ===================================================
  cy.get('input[type="date"]')
    .eq(0)
    .should('be.visible')
    .clear()
    .type('2026-08-01');

  cy.get('input[type="date"]')
    .eq(1)
    .should('be.visible')
    .clear()
    .type('2026-08-14');

  // ===================================================
  // RESET
  // ===================================================
  cy.contains('button', 'Reset', { timeout: 10000 })
    .should('be.visible')
    .click({ force: true });

  // ===================================================
  // BUKA FILTER LAGI
  // ===================================================
  cy.get('button[class*="border-blue-600"]', { timeout: 10000 })
    .should('be.visible')
    .click({ force: true });

  // Pastikan input tanggal muncul lagi
  cy.get('input[type="date"]', { timeout: 10000 })
    .should('have.length.at.least', 2);

  // Pastikan tanggal sudah kosong setelah Reset
  cy.get('input[type="date"]')
    .eq(0)
    .should('have.value', '');

  cy.get('input[type="date"]')
    .eq(1)
    .should('have.value', '');

  // ===================================================
  // ISI KEMBALI TANGGAL
  // ===================================================
  cy.get('input[type="date"]')
    .eq(0)
    .type('2026-08-01');

  cy.get('input[type="date"]')
    .eq(1)
    .type('2026-08-14');

  // ===================================================
  // TERAPKAN
  // ===================================================
  cy.contains('button', 'Terapkan', { timeout: 10000 })
    .should('be.visible')
    .click({ force: true });

  // Pastikan kembali ke tabel Shift
  cy.get('table', { timeout: 15000 })
    .should('be.visible');
});


  // =====================================================
  // WP-SHIFT-003
  // MENGUJI TOMBOL EXPORT SHIFT
  // =====================================================
  it('WP-SHIFT-003 - Menguji tombol Export Shift', () => {

    // Pastikan tombol Export Shift tersedia
    cy.contains('button', 'Export Shift', {
      timeout: 15000
    })
      .should('exist')
      .click();


    // ===================================================
    // CEK NOTIFIKASI
    // ===================================================

    cy.contains('File berhasil diunduh', {
      timeout: 15000
    })
      .should('be.visible');

  });

});