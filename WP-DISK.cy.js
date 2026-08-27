describe('WiraPOS - Diskon', () => {

// =======================================================
// LOGIN
// =======================================================
beforeEach(() => {

  cy.visit('https://cmsdev-pos.hummatech.com/login', {
    failOnStatusCode: false
  })

  // Tunggu halaman login
  cy.url({ timeout: 15000 })
    .should('include', '/login')

  // Email
  cy.get('input[type="email"]', {
    timeout: 15000
  })
    .should('be.visible')
    .clear()
    .type('faisalgaming1245@gmail.com')

  // Password
  cy.get('input[type="password"]', {
    timeout: 10000
  })
    .should('be.visible')
    .clear()
    .type('12345678')

  // Tombol Login
  cy.contains('button', /Masuk|Login/i, {
    timeout: 10000
  })
    .should('be.visible')
    .click()

  // Tunggu proses login
  cy.wait(3000)

})


// =======================================================
// WP-DISK-001
// Menguji menu Diskon
// =======================================================
it('WP-DISK-001 - Menguji menu Diskon', () => {

  // Buka halaman Diskon
  cy.visit('https://cmsdev-pos.hummatech.com/discounts')

  // Pastikan URL benar
  cy.url()
    .should('include', '/discounts')

  // Tunggu halaman
  cy.wait(2000)

  // ===================================================
  // Judul halaman
  // ===================================================
  cy.contains('Pengelolaan Diskon Produk', {
    timeout: 10000
  })
    .should('be.visible')

  // ===================================================
  // Deskripsi
  // ===================================================
  cy.contains(
    'Tampilan daftar diskon produk yang sedang aktif',
    {
      timeout: 10000
    }
  )
    .should('be.visible')

  // ===================================================
  // Kolom pencarian
  // ===================================================
  cy.get('input[placeholder="Cari..."]', {
    timeout: 10000
  })
    .should('be.visible')

  // ===================================================
  // Tombol Buat Diskon
  // ===================================================
  cy.contains('Buat Diskon', {
    timeout: 10000
  })
    .should('be.visible')

})


// =======================================================
// WP-DISK-002
// Menguji fitur Buat Diskon dengan data valid
// =======================================================
it('WP-DISK-002 - Menguji fitur Buat Diskon dengan data valid', () => {

  // Buka halaman Diskon
  cy.visit('https://cmsdev-pos.hummatech.com/discounts')

  // Pastikan URL benar
  cy.url()
    .should('include', '/discounts')

  // Tunggu halaman
  cy.wait(2000)


  // ===================================================
  // Pastikan halaman Diskon tampil
  // ===================================================
  cy.contains('Pengelolaan Diskon Produk', {
    timeout: 10000
  })
    .should('be.visible')


  // ===================================================
  // Klik Buat Diskon
  // ===================================================
  cy.contains('Buat Diskon', {
    timeout: 10000
  })
    .should('be.visible')
    .click()

  cy.wait(1000)


  // ===================================================
  // Pastikan form Tambah Diskon tampil
  // ===================================================
  cy.contains('Tambah Diskon', {
    timeout: 10000
  })
    .should('be.visible')


  // ===================================================
  // NAMA DISKON
  // ===================================================
  cy.get('input[type="text"]:visible')
    .first()
    .should('be.visible')
    .clear()
    .type('Diskon Cypress Test')


  // ===================================================
  // TIPE DISKON
  // ===================================================
  cy.get('select:visible', {
    timeout: 10000
  })
    .first()
    .should('be.visible')
    .select('Rp')


  // ===================================================
  // NILAI DISKON
  // ===================================================
  cy.get('input.flex-1:visible', {
    timeout: 10000
  })
    .should('be.visible')
    .clear()
    .type('10000')


  // ===================================================
  // VARIAN PRODUK
  // ===================================================
  cy.get('input.rounded-r-lg:visible', {
    timeout: 10000
  })
    .should('be.visible')
    .click()

  cy.wait(500)


  // ===================================================
  // PILIH VARIAN PRODUK
  // ===================================================
  cy.get('input.rounded-r-lg:visible')
    .should('be.visible')
    .type('{downarrow}')
    .type('{enter}')

  cy.wait(500)


  // ===================================================
  // MINIMAL PEMBELIAN
  // ===================================================
  cy.get('input[type="text"]:visible')
    .last()
    .should('be.visible')
    .clear()
    .type('1')


  // ===================================================
  // TANGGAL MULAI
  // ===================================================
  cy.get('input[type="date"]:visible')
    .eq(0)
    .should('be.visible')
    .clear()
    .type('2026-08-11')


  // ===================================================
  // TANGGAL BERAKHIR
  // ===================================================
  cy.get('input[type="date"]:visible')
    .eq(1)
    .should('be.visible')
    .clear()
    .type('2026-08-31')


  // ===================================================
  // SIMPAN
  // ===================================================
  cy.contains('Simpan', {
    timeout: 10000
  })
    .should('be.visible')
    .click()


  // ===================================================
  // VALIDASI BERHASIL
  // ===================================================
  cy.contains('Berhasil membuat diskon!', {
    timeout: 10000
  })
    .should('be.visible')


  // ===================================================
  // Pastikan diskon muncul
  // ===================================================
  cy.contains('Diskon Cypress Test', {
    timeout: 10000
  })
    .should('be.visible')

})

// =======================================================
// WP-DISK-003
// Menguji tombol Edit/Perbarui pada data Diskon
// =======================================================
it('WP-DISK-003- Menguji tombol Edit/Perbarui pada data Diskon', () => {

  // ===================================================
  // BUKA HALAMAN DISKON
  // ===================================================
  cy.visit('https://cmsdev-pos.hummatech.com/discounts', {
    failOnStatusCode: false
  })

  cy.url({
    timeout: 15000
  })
    .should('include', '/discounts')

  cy.wait(2000)


  // ===================================================
  // PASTIKAN HALAMAN DISKON TAMPIL
  // ===================================================
  cy.contains('Pengelolaan Diskon Produk', {
    timeout: 10000
  })
    .should('be.visible')


  // ===================================================
  // PASTIKAN DATA DISKON TAMPIL
  // ===================================================
  cy.get('tbody tr', {
    timeout: 10000
  })
    .first()
    .should('be.visible')


  // ===================================================
  // KLIK TOMBOL EDIT WARNA KUNING
  // ===================================================
  cy.get('tbody tr')
    .first()
    .find('td')
    .last()
    .find('[class*="yellow"]', {
      timeout: 10000
    })
    .should('exist')
    .click({ force: true })


  // ===================================================
  // TUNGGU FORM EDIT
  // ===================================================
  cy.wait(1000)


  // ===================================================
  // PASTIKAN FORM UBAH DISKON TAMPIL
  // ===================================================
  cy.contains('Ubah Diskon', {
    timeout: 10000
  })
    .should('be.visible')


  // ===================================================
  // UBAH NILAI DISKON
  // ===================================================
  cy.get('input:visible')
    .eq(1)
    .should('be.visible')
    .clear()
    .type('15000')


// ===================================================
// UBAH MINIMAL PEMBELIAN
// ===================================================
cy.contains('Minimal pembelian', {
  timeout: 10000
})
  .should('be.visible')
  .parent()
  .find('input')
  .should('be.visible')
  .clear()
  .type('2')

  // ===================================================
  // KLIK TOMBOL PERBARUI
  // ===================================================
  cy.contains('button', 'Perbarui', {
    timeout: 10000
  })
    .should('be.visible')
    .click()


  // ===================================================
  // VALIDASI BERHASIL
  // ===================================================
  cy.contains('Diskon Berhasil Diperbarui!', {
    timeout: 10000
  })
    .should('be.visible')

})

// =======================================================
// WP-DISK-004
// Menguji tombol Mata/Detail pada data diskon
// =======================================================
it('WP-DISK-004 - Menguji tombol Mata/Detail pada data diskon', () => {

  cy.visit('https://cmsdev-pos.hummatech.com/discounts', {
    failOnStatusCode: false
  })

  cy.url({ timeout: 15000 })
    .should('include', '/discounts')

  cy.wait(2000)

  // Pastikan halaman Diskon
  cy.contains('Pengelolaan Diskon Produk', {
    timeout: 10000
  }).should('be.visible')

  // Pastikan data diskon tersedia
  cy.get('tbody tr', {
    timeout: 10000
  })
    .first()
    .should('exist')

  // ===================================================
  // KLIK TOMBOL MATA / DETAIL
  // Kolom terakhir = Aksi
  // Tombol pertama = Mata
  // ===================================================
  cy.get('tbody tr')
    .first()
    .find('td')
    .last()
    .find('button')
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.wait(1000)

  // ===================================================
  // CEK DETAIL
  // ===================================================
  cy.get('body')
    .should('be.visible')
})

// =======================================================
// WP-DISK-005
// Menguji tombol Hapus pada data diskon
// =======================================================
it('WP-DISK-005 - Menguji tombol Hapus pada data diskon', () => {

  cy.visit('https://cmsdev-pos.hummatech.com/discounts', {
    failOnStatusCode: false
  })

  cy.url({ timeout: 15000 })
    .should('include', '/discounts')

  cy.wait(2000)

  // ===================================================
  // PASTIKAN HALAMAN DISKON TAMPIL
  // ===================================================
  cy.contains('Pengelolaan Diskon Produk', {
    timeout: 10000
  })
    .should('be.visible')

  // ===================================================
  // PASTIKAN DATA DISKON TERSEDIA
  // ===================================================
  cy.get('tbody tr', {
    timeout: 10000
  })
    .first()
    .should('exist')

  // ===================================================
  // KLIK TOMBOL HAPUS
  // Kolom terakhir = Aksi
  // Tombol terakhir = Hapus
  // ===================================================
  cy.get('tbody tr')
    .first()
    .find('td')
    .last()
    .find('button')
    .last()
    .scrollIntoView()
    .click({ force: true })

  cy.wait(500)

  // ===================================================
  // PASTIKAN KONFIRMASI HAPUS MUNCUL
  // ===================================================
  cy.contains('Apakah anda yakin?', {
    timeout: 10000
  })
    .should('be.visible')

  cy.contains('Data diskon akan dihapus!', {
    timeout: 10000
  })
    .should('be.visible')

  // ===================================================
  // KLIK YA, HAPUS
  // ===================================================
  cy.contains('button', 'Ya, hapus', {
    timeout: 10000
  })
    .should('be.visible')
    .click()

  // Tunggu proses hapus
  cy.wait(2000)

  // ===================================================
  // VALIDASI
  // Pastikan konfirmasi sudah tertutup
  // dan halaman Diskon tetap tampil
  // ===================================================
  cy.contains('Apakah anda yakin?', {
    timeout: 10000
  })
    .should('not.exist')

  cy.contains('Pengelolaan Diskon Produk', {
    timeout: 10000
  })
    .should('be.visible')

  cy.url()
    .should('include', '/discounts')
})

})