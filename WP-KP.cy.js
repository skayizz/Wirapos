describe('WP-KP - Kategori Pengeluaran', () => {

  const email = 'faisalgaming1245@gmail.com';
  const password = '12345678';

  // =====================================================
  // BEFORE EACH
  // =====================================================
  beforeEach(() => {

    cy.visit('https://cmsdev-pos.hummatech.com/login');

    // EMAIL
    cy.get('input[type="email"]', { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type(email);

    // PASSWORD
    cy.get('input[type="password"]', { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type(password);

    // LOGIN
    cy.get('input[type="password"]')
      .parents('form')
      .first()
      .within(() => {
        cy.get('button[type="submit"]')
          .should('be.visible')
          .click();
      });

    // TUNGGU LOGIN
    cy.url({ timeout: 15000 })
      .should('not.include', '/login');

    cy.wait(1000);

    // =================================================
    // KLIK KATEGORI PENGELUARAN
    // =================================================
    cy.contains('a', 'Kategori Pengeluaran', {
      timeout: 15000
    })
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    cy.wait(1000);

    // CEK HALAMAN
    cy.contains('Kategori Pengeluaran', {
      timeout: 15000
    }).should('exist');
  });


  // =====================================================
  // WP-KP-001
  // =====================================================
  it('WP-KP-001 - Admin dapat membuka menu Kategori Pengeluaran', () => {

    cy.contains('Nama Kategori', { timeout: 15000 })
      .should('exist');

    cy.contains('Total Items', { timeout: 10000 })
      .should('exist');

    cy.contains('Dibuat Tanggal', { timeout: 10000 })
      .should('exist');

    cy.contains('Aksi', { timeout: 10000 })
      .should('exist');

    cy.contains('Tambah Kategori', { timeout: 10000 })
      .should('exist');
  });


// =====================================================
// WP-KP-002
// =====================================================
it('WP-KP-002 - Admin dapat menambahkan kategori', () => {

  // 1. Klik tombol Tambah Kategori
  cy.contains('button', 'Tambah Kategori', {
    timeout: 15000
  })
    .should('be.visible')
    .click({ force: true });

  // 2. Pastikan modal terbuka
  cy.contains('Tambah Kategori Baru', {
    timeout: 10000
  })
    .should('be.visible');

  // 3. Cari input Nama di modal
  cy.get('input:visible', {
    timeout: 10000
  })
    .should('have.length.at.least', 1)
    .last()
    .clear()
    .type('Pengadaan Stok Barang')
    .should('have.value', 'Pengadaan Stok Barang');

  // 4. Blur input supaya perubahan terdeteksi aplikasi
  cy.get('input:visible')
    .last()
    .blur();

  cy.wait(500);

  // =================================================
  // 5. CARI FORM MODAL
  // =================================================

  cy.contains('Tambah Kategori Baru')
    .closest('form')
    .within(() => {

      // Pastikan tombol submit ada
      cy.get('button[type="submit"]', {
        timeout: 10000
      })
        .should('be.visible')
        .should('not.be.disabled')
        .click();
    });

  // =================================================
  // 6. TUNGGU PROSES SIMPAN
  // =================================================

  cy.wait(1500);

  // Modal seharusnya tertutup
  cy.contains('Tambah Kategori Baru', {
    timeout: 10000
  }).should('not.exist');

  // =================================================
  // 7. PASTIKAN DATA MASUK
  // =================================================

  cy.contains('Pengadaan Stok Barang', {
    timeout: 15000
  })
    .should('exist');
});


// =====================================================
// WP-KP-003
// =====================================================
it('WP-KP-003 - Admin dapat melihat detail kategori', () => {

  // Pastikan tabel memiliki data
  cy.get('tbody tr', {
    timeout: 15000
  })
    .should('have.length.at.least', 1);

  // =====================================================
  // CEK SEMUA AKSI PADA BARIS PERTAMA
  // =====================================================

  cy.get('tbody tr')
    .first()
    .within(() => {

      cy.get('button, a')
        .should('have.length.at.least', 1)
        .each(($el, index) => {

          cy.log(
            'AKSI ' + index +
            ' | text=' + $el.text().trim() +
            ' | title=' + ($el.attr('title') || '') +
            ' | aria=' + ($el.attr('aria-label') || '') +
            ' | href=' + ($el.attr('href') || '')
          );

        });
    });

  // =====================================================
  // CARI TOMBOL DETAIL
  // =====================================================

  cy.get('tbody tr')
    .first()
    .find('button, a')
    .then(($actions) => {

      let detailFound = false;

      $actions.each((index, el) => {

        const text = (el.innerText || '').trim().toLowerCase();
        const title = (el.getAttribute('title') || '').toLowerCase();
        const aria = (el.getAttribute('aria-label') || '').toLowerCase();

        if (
          text.includes('detail') ||
          text.includes('lihat') ||
          title.includes('detail') ||
          title.includes('lihat') ||
          aria.includes('detail') ||
          aria.includes('lihat')
        ) {
          detailFound = true;

          cy.wrap(el)
            .scrollIntoView()
            .click({ force: true });

          return false;
        }
      });

      // Kalau tidak menemukan tombol dengan nama Detail
      if (!detailFound) {
        cy.log('Tombol Detail tidak ditemukan berdasarkan text/title/aria-label');

        // Untuk sementara klik tombol pertama
        cy.wrap($actions.first())
          .scrollIntoView()
          .click({ force: true });
      }
    });

  // =====================================================
  // TUNGGU NAVIGASI / PROSES
  // =====================================================

  cy.wait(1500);

  // =====================================================
  // CEK HALAMAN DETAIL
  // =====================================================

  cy.url().then((url) => {
    cy.log('URL setelah klik aksi: ' + url);
  });

  cy.contains('Statistik Kategori Pengeluaran', {
    timeout: 15000
  })
    .should('exist');

  cy.contains('Total Pengeluaran', {
    timeout: 10000
  })
    .should('exist');

  cy.contains('Statistik Pengeluaran Bulanan', {
    timeout: 10000
  })
    .should('exist');

  cy.contains('Data Riwayat Kategori Pengeluaran', {
    timeout: 10000
  })
    .should('exist');

  cy.contains('Kembali', {
    timeout: 10000
  })
    .should('exist');
});

  // =====================================================
  // WP-KP-004
  // EDIT KATEGORI
  // =====================================================
  it('WP-KP-004 - Admin dapat mengedit kategori', () => {

    // Pastikan ada data
    cy.get('tbody tr', {
      timeout: 15000
    })
      .should('exist')
      .and('have.length.greaterThan', 0);

    // Baris pertama
    cy.get('tbody tr')
      .first()
      .within(() => {

        cy.get('button')
          .should('have.length.greaterThan', 1);

        // Tombol kedua = edit
        cy.get('button')
          .eq(1)
          .click({ force: true });
      });

    // Pastikan modal edit muncul
    cy.contains(/Edit Kategori|Edit/i, {
      timeout: 10000
    })
      .should('exist');

    // Cari input visible
    cy.get('input:visible')
      .should('have.length.greaterThan', 0)
      .last()
      .clear()
      .type('Pengadaan Stok Barang Updated');

    // Klik tombol Simpan / Update
    cy.contains('button', /Simpan|Update/i, {
      timeout: 10000
    })
      .should('be.visible')
      .click({ force: true });

    cy.wait(1000);

    // Pastikan data hasil edit muncul
    cy.contains('Pengadaan Stok Barang Updated', {
      timeout: 15000
    })
      .should('exist');
  });


  // =====================================================
  // WP-KP-005
  // HAPUS KATEGORI
  // =====================================================
  it('WP-KP-005 - Admin dapat menghapus kategori', () => {

    // Pastikan ada data
    cy.get('tbody tr', {
      timeout: 15000
    })
      .should('exist')
      .and('have.length.greaterThan', 0);

    // Ambil baris pertama
    cy.get('tbody tr')
      .first()
      .within(() => {

        cy.get('button')
          .should('have.length.greaterThan', 0);

        // Tombol terakhir = hapus
        cy.get('button')
          .last()
          .click({ force: true });
      });

    // =================================================
    // KONFIRMASI HAPUS
    // =================================================

    cy.contains('Apakah anda yakin?', {
      timeout: 10000
    })
      .should('exist');

    cy.contains('Data kategori akan dihapus!', {
      timeout: 10000
    })
      .should('exist');

    cy.contains('button', 'Ya, hapus!', {
      timeout: 10000
    })
      .should('be.visible')
      .click({ force: true });

    cy.wait(1000);

    // Pastikan proses hapus berhasil
    cy.contains('Kategori berhasil dihapus', {
      timeout: 15000
    })
      .should('exist');
  });

});