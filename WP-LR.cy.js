describe('WP-LR - Laporan Laba Rugi', () => {

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

    // 6. Tunggu halaman/dashboard
    cy.wait(1000);

    // 7. Klik menu Laporan Laba Rugi
    // Sidebar menggunakan position: fixed,
    // sehingga klik dipaksa hanya pada menu sidebar.
    cy.contains('a', 'Laporan Laba Rugi', {
      timeout: 15000
    })
      .click({ force: true });

    // 8. Tunggu halaman laporan
    cy.wait(1500);
  });



  // =====================================================
  // WP-LR-001
  // Menguji menu Laporan Laba Rugi
  // =====================================================
  it('WP-LR-001 - Menguji menu Laporan Laba Rugi', () => {

    // Pastikan tidak kembali ke halaman login
    cy.url({ timeout: 15000 })
      .should('not.include', '/login');

    // Pastikan password login sudah tidak ada
    cy.get('input[type="password"]')
      .should('not.exist');

    // Pastikan halaman memiliki elemen form
    cy.get('input:visible, button:visible', {
      timeout: 15000
    })
      .should('have.length.greaterThan', 0);
  });



 it('WP-LR-002 - Menguji dropdown Tipe Laporan', () => {

  // Buka dropdown
  cy.contains('Tipe Laporan', { timeout: 15000 })
    .should('exist')
    .click({ force: true });

  // Pilih Harian
  cy.contains('Harian', { timeout: 10000 })
    .should('exist')
    .click({ force: true });

  // Pastikan muncul input untuk periode Harian
  cy.get('input:visible', { timeout: 10000 })
    .should('have.length.greaterThan', 0);


  // =================================================
  // BULANAN
  // =================================================

  cy.contains('Tipe Laporan', { timeout: 10000 })
    .click({ force: true });

  cy.contains('Bulanan', { timeout: 10000 })
    .should('exist')
    .click({ force: true });

  // Pastikan field bulan muncul
  cy.get('input:visible', { timeout: 10000 })
    .should('have.length.greaterThan', 0);


  // =================================================
  // TAHUNAN
  // =================================================

  cy.contains('Tipe Laporan', { timeout: 10000 })
    .click({ force: true });

  cy.contains('Tahunan', { timeout: 10000 })
    .should('exist')
    .click({ force: true });

  // Pastikan field tahun muncul
  cy.get('input:visible', { timeout: 10000 })
    .should('have.length.greaterThan', 0);

});

it('WP-LR-003 - Menguji tombol Periksa Laporan', () => {

  // =================================================
  // PILIH TIPE LAPORAN BULANAN
  // =================================================

  cy.contains('Tipe Laporan', { timeout: 15000 })
    .should('exist')
    .click({ force: true });

  cy.contains('Bulanan', { timeout: 10000 })
    .should('exist')
    .click({ force: true });


  // =================================================
  // CARI FIELD BULAN
  // =================================================

  cy.get('input:visible', { timeout: 10000 })
    .should('have.length.greaterThan', 0)
    .then(($inputs) => {

      let monthInput = null;

      $inputs.each((index, element) => {

        const type =
          (element.getAttribute('type') || '').toLowerCase();

        const name =
          (element.getAttribute('name') || '').toLowerCase();

        const id =
          (element.getAttribute('id') || '').toLowerCase();

        const placeholder =
          (element.getAttribute('placeholder') || '').toLowerCase();

        if (
          type === 'month' ||
          name.includes('bulan') ||
          name.includes('month') ||
          id.includes('bulan') ||
          id.includes('month') ||
          placeholder.includes('bulan') ||
          placeholder.includes('month')
        ) {
          monthInput = element;
          return false;
        }
      });


      // =================================================
      // ISI BULAN
      // =================================================

      if (monthInput) {

        cy.wrap(monthInput)
          .clear()
          .type('2026-08');

      } else {

        // Jika input bukan type month,
        // gunakan input pertama yang terlihat
        cy.wrap($inputs.first())
          .click()
          .clear()
          .type('08/2026');
      }
    });


  // =================================================
  // TUNGGU FORM MEMPROSES INPUT
  // =================================================

  cy.wait(1500);


  // =================================================
  // CARI TOMBOL PERIKSA
  // =================================================

  cy.contains('button', /^Periksa/, {
    timeout: 15000
  })
    .should('exist')
    .should('not.be.disabled');


  // =================================================
  // KLIK PERIKSA LAPORAN
  // =================================================

  cy.contains('button', /^Periksa/, {
    timeout: 15000
  })
    .click();


  // =================================================
  // TUNGGU HASIL LAPORAN
  // =================================================

  cy.wait(1500);


  // =================================================
  // CEK LAPORAN
  // =================================================

  cy.contains('Pendapatan', {
    timeout: 15000
  })
    .should('exist');

  cy.contains('Transaksi', {
    timeout: 15000
  })
    .should('exist');

  cy.contains('Total Pendapatan', {
    timeout: 15000
  })
    .should('exist');

  cy.contains('Pengeluaran', {
    timeout: 15000
  })
    .should('exist');

  cy.contains('Total Pengeluaran', {
    timeout: 15000
  })
    .should('exist');

  cy.contains('Laba Rugi', {
    timeout: 15000
  })
    .should('exist');


  // =================================================
  // CEK TOMBOL CETAK
  // =================================================

  cy.contains('button', 'Cetak Laporan', {
    timeout: 15000
  })
    .should('exist');

});

it('WP-LR-004 - Menguji tombol Reset', () => {

  // =================================================
  // PILIH TIPE LAPORAN BULANAN
  // =================================================

  cy.contains('Tipe Laporan', { timeout: 15000 })
    .should('exist')
    .click({ force: true });

  cy.contains('Bulanan', { timeout: 10000 })
    .should('exist')
    .click({ force: true });


  // =================================================
  // ISI PERIODE BULAN
  // =================================================

  cy.get('input:visible', { timeout: 10000 })
    .should('have.length.greaterThan', 0)
    .then(($inputs) => {

      let monthInput = null;

      $inputs.each((index, element) => {

        const type =
          (element.getAttribute('type') || '').toLowerCase();

        const name =
          (element.getAttribute('name') || '').toLowerCase();

        const id =
          (element.getAttribute('id') || '').toLowerCase();

        const placeholder =
          (element.getAttribute('placeholder') || '').toLowerCase();

        if (
          type === 'month' ||
          name.includes('bulan') ||
          name.includes('month') ||
          id.includes('bulan') ||
          id.includes('month') ||
          placeholder.includes('bulan') ||
          placeholder.includes('month')
        ) {
          monthInput = element;
          return false;
        }
      });


      if (monthInput) {

        cy.wrap(monthInput)
          .clear()
          .type('2026-08');

      } else {

        cy.wrap($inputs.first())
          .click()
          .clear()
          .type('08/2026');
      }
    });


  // =================================================
  // PASTIKAN DATA SUDAH TERISI
  // =================================================

  cy.wait(500);


  // =================================================
  // KLIK RESET
  // =================================================

  cy.contains('button', 'Reset', {
    timeout: 15000
  })
    .should('exist')
    .click();


  // =================================================
  // TUNGGU RESET
  // =================================================

  cy.wait(500);


  // =================================================
  // PASTIKAN FORM KEMBALI KOSONG
  // =================================================

  cy.get('input:visible', {
    timeout: 10000
  })
    .each(($input) => {

      const type =
        ($input.attr('type') || '').toLowerCase();

      // Input tanggal/month biasanya kembali kosong
      if (
        type === 'month' ||
        type === 'date' ||
        type === 'text'
      ) {
        expect($input.val()).to.be.oneOf(['', null]);
      }

    });

});

it('WP-LR-005 - Menguji tombol Cetak Laporan', () => {

  // =================================================
  // 1. PILIH TIPE LAPORAN BULANAN
  // =================================================

  cy.contains('Tipe Laporan', { timeout: 15000 })
    .should('exist')
    .click({ force: true });

  cy.contains('Bulanan', { timeout: 10000 })
    .should('exist')
    .click({ force: true });


  // =================================================
  // 2. CARI INPUT BULAN
  // =================================================

  cy.get('input:visible', { timeout: 10000 })
    .should('have.length.greaterThan', 0)
    .then(($inputs) => {

      let monthInput = null;

      $inputs.each((index, element) => {

        const type =
          (element.getAttribute('type') || '').toLowerCase();

        const name =
          (element.getAttribute('name') || '').toLowerCase();

        const id =
          (element.getAttribute('id') || '').toLowerCase();

        if (
          type === 'month' ||
          name.includes('bulan') ||
          name.includes('month') ||
          id.includes('bulan') ||
          id.includes('month')
        ) {
          monthInput = element;
          return false;
        }
      });


      // =================================================
      // 3. ISI BULAN AGUSTUS 2026
      // =================================================

      if (monthInput) {

        cy.wrap(monthInput)
          .clear()
          .type('2026-08');

      } else {

        // Fallback jika input bukan type month
        cy.wrap($inputs.first())
          .click()
          .clear()
          .type('08/2026');
      }
    });


  // =================================================
  // 4. TUNGGU FORM MEMPROSES PERIODE
  // =================================================

  cy.wait(1000);


  // =================================================
  // 5. KLIK PERIKSA LAPORAN
  // =================================================

  cy.contains('button', /^Periksa/, {
    timeout: 15000
  })
    .should('exist')
    .should('not.be.disabled')
    .click();


  // =================================================
  // 6. TUNGGU LAPORAN MUNCUL
  // =================================================

  cy.contains('Pendapatan', {
    timeout: 15000
  })
    .should('exist');

  cy.contains('Laba Rugi', {
    timeout: 15000
  })
    .should('exist');


  // =================================================
  // 7. PASTIKAN TOMBOL CETAK ADA
  // =================================================

  cy.contains('button', 'Cetak Laporan', {
    timeout: 15000
  })
    .should('exist');


  // =================================================
  // 8. KLIK CETAK LAPORAN
  // =================================================

  cy.contains('button', 'Cetak Laporan', {
    timeout: 15000
  })
    .click();


  // =================================================
  // 9. CEK NOTIFIKASI PDF
  // =================================================

  cy.contains('PDF berhasil diunduh', {
    timeout: 15000
  })
    .should('be.visible');

});

});