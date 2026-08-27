describe('WiraPOS - Warehouse', () => {

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
// WP-WARE-001
// Menguji menu Warehouse
// =======================================================
it('WP-WARE-001 - Menguji menu Warehouse', () => {

  // ===================================================
  // Buka halaman Warehouse
  // ===================================================
  cy.visit('https://cmsdev-pos.hummatech.com/warehouses')

  // Pastikan URL benar
  cy.url({
    timeout: 15000
  })
    .should('include', '/warehouses')

  // Tunggu data warehouse
  cy.wait(2000)


  // ===================================================
  // JUDUL HALAMAN
  // ===================================================
  cy.contains('Informasi Warehouse', {
    timeout: 10000
  })
    .should('be.visible')


  // ===================================================
  // KOLOM PENCARIAN
  // ===================================================
  cy.get('input[placeholder="Cari warehouse..."]', {
    timeout: 10000
  })
    .should('be.visible')


  // ===================================================
  // TOMBOL TAMBAH WAREHOUSE
  // ===================================================
  cy.contains('Tambah Warehouse', {
    timeout: 10000
  })
    .should('be.visible')

})

// =======================================================
// WP-WARE-002
// Menguji fitur Tambah Warehouse dengan data valid
// =======================================================
it('WP-WARE-002 - Menguji fitur Tambah Warehouse dengan data valid', () => {

  // ===================================================
  // Buka halaman Warehouse
  // ===================================================
  cy.visit('https://cmsdev-pos.hummatech.com/warehouses')

  cy.url({
    timeout: 15000
  })
    .should('include', '/warehouses')

  cy.wait(2000)


  // ===================================================
  // Pastikan halaman Warehouse tampil
  // ===================================================
  cy.contains('Informasi Warehouse', {
    timeout: 10000
  })
    .should('be.visible')


  // ===================================================
  // Klik Tambah Warehouse
  // ===================================================
  cy.contains('Tambah Warehouse', {
    timeout: 10000
  })
    .should('be.visible')
    .click()

  cy.wait(1000)


  // ===================================================
  // Pastikan form tampil
  // ===================================================
  cy.contains('Tambah Warehouse', {
    timeout: 10000
  })
    .should('be.visible')


  // ===================================================
  // UPLOAD GAMBAR
  // Dibuat langsung oleh Cypress,
  // jadi tidak membutuhkan file warehouse.jpg
  // ===================================================
  cy.get('input[type="file"]', {
    timeout: 10000
  })
    .should('exist')
    .selectFile({
      contents: Cypress.Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
        'base64'
      ),
      fileName: 'warehouse.jpg',
      mimeType: 'image/jpeg',
      lastModified: Date.now()
    }, {
      force: true
    })


  // ===================================================
  // NAMA WAREHOUSE
  // ===================================================
  cy.get('input[placeholder="Masukkan nama warehouse"]', {
    timeout: 10000
  })
    .should('be.visible')
    .clear()
    .type('Warehouse Cypress Test')


  // ===================================================
  // PENANGGUNG JAWAB
  // ===================================================
  cy.get('input[placeholder="Masukkan nama penanggung jawab"]', {
    timeout: 10000
  })
    .should('be.visible')
    .clear()
    .type('Muhammad Faizal')


  // ===================================================
  // NO TELP
  // ===================================================
  cy.get('input[placeholder="No telepon warehouse"]', {
    timeout: 10000
  })
    .should('be.visible')
    .clear()
    .type('081234567890')


  // ===================================================
  // EMAIL
  // ===================================================
  cy.get('input[placeholder="Email warehouse"]', {
    timeout: 10000
  })
    .should('be.visible')
    .clear()
    .type('warehousecypress@gmail.com')


  // ===================================================
  // PASSWORD
  // ===================================================
  cy.get('input[placeholder="Password warehouse"]', {
    timeout: 10000
  })
    .should('be.visible')
    .clear()
    .type('12345678')


 // ===================================================
// ALAMAT
// ===================================================
cy.get('textarea[placeholder="Masukkan alamat warehouse"]', {
  timeout: 10000
})
  .should('be.visible')
  .clear()
  .type('Jl. Contoh Alamat No. 123')


  // ===================================================
  // MODAL AWAL
  // ===================================================
  cy.get('input[placeholder="Masukkan modal awal"]', {
    timeout: 10000
  })
    .should('be.visible')
    .clear()
    .type('1000000')


  // ===================================================
  // SIMPAN
  // ===================================================
  cy.contains('button', 'Simpan', {
    timeout: 10000
  })
    .should('be.visible')
    .click()


  // ===================================================
  // VALIDASI BERHASIL
  // ===================================================
  cy.contains('berhasil', {
    timeout: 10000
  })
    .should('be.visible')


  // ===================================================
  // Pastikan warehouse muncul
  // ===================================================
  cy.contains('Warehouse Cypress Test', {
    timeout: 10000
  })
    .should('be.visible')

})
// =======================================================
// WP-WARE-003
// Menguji tombol Detail pada warehouse
// =======================================================
it('WP-WARE-003 - Menguji tombol Detail pada warehouse', () => {

  // Buka halaman Warehouse
  cy.visit('https://cmsdev-pos.hummatech.com/warehouses', {
    failOnStatusCode: false
  })

  // Pastikan URL benar
  cy.url({
    timeout: 15000
  })
    .should('include', '/warehouses')

  // Tunggu data selesai dimuat
  cy.wait(3000)

  // ===================================================
  // PASTIKAN HALAMAN WAREHOUSE
  // ===================================================
  cy.contains('Warehouse', {
    timeout: 15000
  })
    .should('exist')

  // ===================================================
  // CARI TOMBOL DETAIL
  // ===================================================
  cy.contains('button', /Detail/i, {
    timeout: 15000
  })
    .should('exist')
    .scrollIntoView()
    .click({ force: true })

  cy.wait(1500)

  // ===================================================
  // PASTIKAN HALAMAN DETAIL
  // ===================================================
  cy.contains(/Detail Warehouse/i, {
    timeout: 15000
  })
    .should('exist')
})

// =======================================================
// WP-WARE-004
// Menguji tombol Laba Rugi pada Detail Warehouse
// =======================================================
it('WP-WARE-004 - Menguji tombol Laba Rugi pada Detail Warehouse', () => {

  // Buka halaman Warehouse
  cy.visit('https://cmsdev-pos.hummatech.com/warehouses', {
    failOnStatusCode: false
  })

  // Pastikan URL benar
  cy.url({
    timeout: 15000
  })
    .should('include', '/warehouses')

  // Tunggu data warehouse
  cy.wait(3000)

  // ===================================================
  // PASTIKAN HALAMAN WAREHOUSE
  // ===================================================
  cy.contains('Warehouse', {
    timeout: 15000
  })
    .should('exist')

  // ===================================================
  // KLIK TOMBOL DETAIL
  // ===================================================
  cy.contains('button', /Detail/i, {
    timeout: 15000
  })
    .should('exist')
    .scrollIntoView()
    .click({ force: true })

  cy.wait(1500)

  // ===================================================
  // PASTIKAN DETAIL WAREHOUSE
  // ===================================================
  cy.contains(/Detail Warehouse/i, {
    timeout: 15000
  })
    .should('exist')

  // ===================================================
  // KLIK LABA RUGI
  // ===================================================
  cy.contains('button', /Laba Rugi/i, {
    timeout: 15000
  })
    .should('exist')
    .scrollIntoView()
    .click({ force: true })

  cy.wait(1500)

  // ===================================================
  // VALIDASI HALAMAN LABA RUGI
  // ===================================================
  cy.contains(/Laba Rugi|Laporan Laba Rugi/i, {
    timeout: 15000
  })
    .should('exist')
})

// =======================================================
// WP-WARE-005
// Menguji tombol Periksa Laporan
// =======================================================
it('WP-WARE-005 - Menguji tombol Periksa Laporan', () => {

  // Buka halaman Warehouse
  cy.visit('https://cmsdev-pos.hummatech.com/warehouses', {
    failOnStatusCode: false
  })

  // Pastikan URL benar
  cy.url({
    timeout: 15000
  })
    .should('include', '/warehouses')

  cy.wait(3000)

  // ===================================================
  // PASTIKAN HALAMAN WAREHOUSE
  // ===================================================
  cy.contains('Warehouse', {
    timeout: 15000
  })
    .should('exist')

  // ===================================================
  // KLIK DETAIL
  // ===================================================
  cy.contains('button', /Detail/i, {
    timeout: 15000
  })
    .should('exist')
    .scrollIntoView()
    .click({ force: true })

  cy.wait(1500)

  // ===================================================
  // PASTIKAN DETAIL WAREHOUSE
  // ===================================================
  cy.contains(/Detail Warehouse/i, {
    timeout: 15000
  })
    .should('exist')

  // ===================================================
  // KLIK LABA RUGI
  // ===================================================
  cy.contains('button', /Laba Rugi/i, {
    timeout: 15000
  })
    .should('exist')
    .scrollIntoView()
    .click({ force: true })

  cy.wait(1500)

  // ===================================================
  // PASTIKAN HALAMAN LABA RUGI
  // ===================================================
  cy.contains(/Laba Rugi|Laporan Laba Rugi/i, {
    timeout: 15000
  })
    .should('exist')

  // ===================================================
  // PILIH TIPE LAPORAN JIKA ADA
  // ===================================================
  cy.get('select:visible').then(($select) => {

    if ($select.length > 0) {
      cy.wrap($select)
        .first()
        .select(1)
    }

  })

  // ===================================================
  // PILIH BULAN
  // ===================================================
  cy.get('input[type="month"]:visible', {
    timeout: 10000
  })
    .first()
    .should('exist')
    .clear()
    .type('2026-08')

  // ===================================================
  // KLIK PERIKSA LAPORAN
  // ===================================================
  cy.contains('button', 'Periksa Laporan', {
    timeout: 15000
  })
    .should('exist')
    .scrollIntoView()
    .click({ force: true })

  cy.wait(1500)

  // ===================================================
  // VALIDASI LAPORAN
  // ===================================================
  cy.contains(/Laporan Laba Rugi|Laba Rugi/i, {
    timeout: 15000
  })
    .should('exist')
})

// =======================================================
// WP-WARE-006
// Menguji tombol Cetak Laporan
// =======================================================
it('WP-WARE-006 - Menguji tombol Cetak Laporan', () => {

  // Buka halaman Warehouse
  cy.visit('https://cmsdev-pos.hummatech.com/warehouses', {
    failOnStatusCode: false
  })

  // Pastikan URL benar
  cy.url({
    timeout: 15000
  })
    .should('include', '/warehouses')

  cy.wait(3000)

  // ===================================================
  // PASTIKAN HALAMAN WAREHOUSE
  // ===================================================
  cy.contains('Warehouse', {
    timeout: 15000
  })
    .should('exist')

  // ===================================================
  // KLIK DETAIL
  // ===================================================
  cy.contains('button', /Detail/i, {
    timeout: 15000
  })
    .should('exist')
    .scrollIntoView()
    .click({ force: true })

  cy.wait(1500)

  // ===================================================
  // PASTIKAN DETAIL WAREHOUSE
  // ===================================================
  cy.contains(/Detail Warehouse/i, {
    timeout: 15000
  })
    .should('exist')

  // ===================================================
  // KLIK LABA RUGI
  // ===================================================
  cy.contains('button', /Laba Rugi/i, {
    timeout: 15000
  })
    .should('exist')
    .scrollIntoView()
    .click({ force: true })

  cy.wait(1500)

  // ===================================================
  // PASTIKAN HALAMAN LABA RUGI
  // ===================================================
  cy.contains(/Laba Rugi|Laporan Laba Rugi/i, {
    timeout: 15000
  })
    .should('exist')

  // ===================================================
  // PILIH TIPE LAPORAN JIKA ADA
  // ===================================================
  cy.get('select:visible').then(($select) => {

    if ($select.length > 0) {
      cy.wrap($select)
        .first()
        .select(1)
    }

  })

  // ===================================================
  // PILIH BULAN
  // ===================================================
  cy.get('input[type="month"]:visible', {
    timeout: 10000
  })
    .first()
    .should('exist')
    .clear()
    .type('2026-08')

  // ===================================================
  // KLIK PERIKSA LAPORAN
  // ===================================================
  cy.contains('button', 'Periksa Laporan', {
    timeout: 15000
  })
    .should('exist')
    .scrollIntoView()
    .click({ force: true })

  cy.wait(1500)

  // ===================================================
  // KLIK CETAK LAPORAN
  // ===================================================
  cy.contains('button', /Cetak Laporan/i, {
    timeout: 15000
  })
    .should('exist')
    .scrollIntoView()
    .click({ force: true })

  cy.wait(1500)

  // ===================================================
  // VALIDASI PROSES CETAK
  // ===================================================
  cy.contains(/Laporan Laba Rugi|Cetak Laporan/i, {
    timeout: 15000
  })
    .should('exist')
})

it('WP-WARE-007 - Menguji tombol Statistik pada warehouse', () => {

  // 1. Buka menu Warehouse
  cy.contains('a', 'Warehouse', { timeout: 15000 })
    .scrollIntoView()
    .click({ force: true })

  // 2. Pastikan berada di halaman Warehouse
  cy.url({ timeout: 15000 })
    .should('include', '/warehouses')

  cy.wait(2000)

  // 3. Klik tombol Detail Warehouse pertama
  cy.contains('Detail', { timeout: 15000 })
    .should('be.visible')
    .first()
    .click({ force: true })

  cy.wait(3000)

  // 4. Pastikan masuk ke Detail Warehouse
  cy.url({ timeout: 15000 })
    .should('include', '/details')

  // 5. Klik Statistik
  cy.get('a[href*="/details/statistik"]', { timeout: 15000 })
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(3000)

  // 6. Pastikan masuk halaman Statistik
  cy.url({ timeout: 15000 })
    .should('include', '/details/statistik')

  // 7. Validasi halaman Statistik
  cy.contains('Statistik Warehouse', { timeout: 15000 })
    .should('be.visible')

  cy.contains('Statistik Pembelian Bulanan', { timeout: 15000 })
    .should('be.visible')

  cy.contains('Data Transaksi', { timeout: 15000 })
    .should('be.visible')
})
it('WP-WARE-008 - Menguji pilihan bulan dan dropdown Bulanan pada Statistik Pembelian Bulanan', () => {

  cy.visit('https://cmsdev-pos.hummatech.com/warehouses')

  cy.url({ timeout: 15000 })
    .should('include', '/warehouses')

  cy.wait(3000)

  // Klik Detail pertama
  cy.contains('button', 'Detail', { timeout: 15000 })
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.wait(2000)

  // Pastikan Detail
  cy.url({ timeout: 15000 })
    .should('include', '/details')

  // Klik Statistik
  cy.get('a[href*="/details/statistik"]', { timeout: 15000 })
    .click({ force: true })

  cy.wait(3000)

  // Pastikan Statistik
  cy.url({ timeout: 15000 })
    .should('include', '/details/statistik')

  // Pastikan section ada
  cy.contains('Statistik Pembelian Bulanan', { timeout: 15000 })
    .should('be.visible')

  // DEBUG: tampilkan semua elemen interaktif
  cy.get('input, select, button, a')
    .then(($elements) => {
      cy.log(`Jumlah elemen interaktif: ${$elements.length}`)

      $elements.each((index, el) => {
        cy.log(
          `${index} | ${el.tagName} | text="${el.innerText}" | type="${el.getAttribute('type')}" | class="${el.getAttribute('class')}"`
        )
      })
    })

})

it('WP-WARE-009 - Menguji filter Periode pada Data Transaksi', () => {

  // ===================================================
  // 1. LOGIN
  // ===================================================
  cy.visit('https://cmsdev-pos.hummatech.com/login')

  cy.get('input[type="email"]', { timeout: 15000 })
    .should('be.visible')
    .clear()
    .type('faisalgaming1245@gmail.com')

  cy.get('input[type="password"]', { timeout: 15000 })
    .should('be.visible')
    .clear()
    .type('12345678')

  cy.contains('button', /Masuk|Login/i, { timeout: 15000 })
    .should('be.visible')
    .click()

  cy.wait(3000)

  // ===================================================
  // 2. BUKA WAREHOUSE
  // ===================================================
  cy.visit('https://cmsdev-pos.hummatech.com/warehouses')

  cy.url({ timeout: 15000 })
    .should('include', '/warehouses')

  cy.wait(3000)

  // ===================================================
  // 3. KLIK DETAIL WAREHOUSE
  // ===================================================
  cy.contains('button', /Detail/i, { timeout: 15000 })
    .should('exist')
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.wait(2000)

  // ===================================================
  // 4. PASTIKAN MASUK DETAIL
  // ===================================================
  cy.url({ timeout: 15000 })
    .should('include', '/details')

  // ===================================================
  // 5. KLIK STATISTIK
  // ===================================================
  cy.get('a[href*="/details/statistik"]', { timeout: 15000 })
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(3000)

  // ===================================================
  // 6. PASTIKAN MASUK STATISTIK
  // ===================================================
  cy.url({ timeout: 15000 })
    .should('include', '/details/statistik')

  // ===================================================
  // 7. DATA TRANSAKSI
  // ===================================================
  cy.contains('Data Transaksi', { timeout: 15000 })
    .scrollIntoView()
    .should('be.visible')

  // ===================================================
  // 8. KLIK FILTER PERIODE
  // ===================================================
  cy.contains('Periode', { timeout: 15000 })
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(1000)

  // ===================================================
  // 9. PASTIKAN FILTER TERBUKA
  // ===================================================
  cy.contains('Pilih Periode', { timeout: 15000 })
    .should('exist')
})

it('WP-WARE-010 - Menguji filter Periode pada Data Riwayat Sering Pembelian Outlet', () => {

  // ===================================================
  // 1. LOGIN
  // ===================================================
  cy.visit('https://cmsdev-pos.hummatech.com/login')

  cy.get('input[type="email"]', { timeout: 15000 })
    .should('be.visible')
    .clear()
    .type('faisalgaming1245@gmail.com')

  cy.get('input[type="password"]', { timeout: 15000 })
    .should('be.visible')
    .clear()
    .type('12345678')

  cy.contains('button', /Masuk|Login/i, { timeout: 15000 })
    .should('be.visible')
    .click()

  cy.wait(3000)

  // ===================================================
  // 2. BUKA WAREHOUSE
  // ===================================================
  cy.visit('https://cmsdev-pos.hummatech.com/warehouses')

  cy.url({ timeout: 15000 })
    .should('include', '/warehouses')

  cy.wait(3000)

  // ===================================================
  // 3. KLIK DETAIL
  // ===================================================
  cy.contains('button', /Detail/i, { timeout: 15000 })
    .should('exist')
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.wait(2000)

  // ===================================================
  // 4. PASTIKAN DETAIL
  // ===================================================
  cy.url({ timeout: 15000 })
    .should('include', '/details')

  // ===================================================
  // 5. KLIK STATISTIK
  // ===================================================
  cy.get('a[href*="/details/statistik"]', { timeout: 15000 })
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(3000)

  // ===================================================
  // 6. PASTIKAN HALAMAN STATISTIK
  // ===================================================
  cy.url({ timeout: 15000 })
    .should('include', '/details/statistik')

  // ===================================================
  // 7. CARI DATA RIWAYAT SERING PEMBELIAN OUTLET
  // ===================================================
  cy.contains('Data Riwayat Sering Pembelian Outlet', {
    timeout: 15000
  })
    .scrollIntoView()
    .should('be.visible')

  // ===================================================
  // 8. KLIK FILTER PERIODE
  // ===================================================
  cy.contains('Periode', { timeout: 15000 })
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(1000)

  // ===================================================
  // 9. VALIDASI FILTER TERBUKA
  // ===================================================
  cy.contains('Pilih Periode', { timeout: 15000 })
    .should('exist')

})

it('WP-WARE-011 - Menguji tombol BEP pada warehouse', () => {

  // ===================================================
  // 1. LOGIN
  // ===================================================
  cy.visit('https://cmsdev-pos.hummatech.com/login')

  cy.get('input[type="email"]', { timeout: 15000 })
    .should('be.visible')
    .clear()
    .type('faisalgaming1245@gmail.com')

  cy.get('input[type="password"]', { timeout: 15000 })
    .should('be.visible')
    .clear()
    .type('12345678')

  cy.contains('button', /Masuk|Login/i, { timeout: 15000 })
    .should('be.visible')
    .click()

  cy.wait(3000)

  // ===================================================
  // 2. BUKA WAREHOUSE
  // ===================================================
  cy.visit('https://cmsdev-pos.hummatech.com/warehouses')

  cy.url({ timeout: 15000 })
    .should('include', '/warehouses')

  cy.wait(3000)

  // ===================================================
  // 3. KLIK DETAIL WAREHOUSE
  // ===================================================
  cy.contains('button', /Detail/i, { timeout: 15000 })
    .should('exist')
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.wait(2000)

  // ===================================================
  // 4. PASTIKAN MASUK DETAIL WAREHOUSE
  // ===================================================
  cy.url({ timeout: 15000 })
    .should('include', '/details')

  // ===================================================
  // 5. KLIK TAB BEP
  // ===================================================
  cy.contains('BEP', { timeout: 15000 })
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(3000)

  // ===================================================
  // 6. VALIDASI HALAMAN BEP
  // ===================================================

  // Total Modal
  cy.contains('Total Modal', { timeout: 15000 })
    .should('be.visible')

  // Total Tercapai
  cy.contains('Total Tercapai', { timeout: 15000 })
    .should('be.visible')

  // Progres Modal
  cy.contains('Progres Modal', { timeout: 15000 })
    .should('be.visible')

  // Modal Awal
  cy.contains('Modal Awal', { timeout: 15000 })
    .should('be.visible')

  // Estimasi Tercapai
  cy.contains('Estimasi Tercapai', { timeout: 15000 })
    .should('be.visible')

  // Status
  cy.contains('Dalam Progres', { timeout: 15000 })
    .should('be.visible')

  // Grafik
  cy.contains('Statistik Pencapaian Modal', { timeout: 15000 })
    .should('be.visible')
})

})