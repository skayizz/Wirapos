describe('WiraPOS - Retail', () => {

// =======================================================
// LOGIN
// =======================================================
beforeEach(() => {

  cy.visit('https://cmsdev-pos.hummatech.com/login', {
    failOnStatusCode: false
  })

  // Pastikan halaman login
  cy.url({
    timeout: 15000
  })
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
// WP-RET-001
// Menguji akses menu Retail
// =======================================================
it('WP-RET-001 - Menguji akses menu Retail', () => {

  // ===================================================
  // Buka halaman Retail
  // ===================================================
  cy.visit('https://cmsdev-pos.hummatech.com/retails')

  // Pastikan URL benar
  cy.url({
    timeout: 15000
  })
    .should('include', '/retails')

  // Tunggu data Retail
  cy.wait(2000)


  // ===================================================
  // Pastikan halaman Retail tampil
  // ===================================================
  cy.contains('Informasi Retail', {
    timeout: 10000
  })
    .should('be.visible')


  // ===================================================
  // Pastikan tombol Tambah Retail tampil
  // ===================================================
  cy.contains('Tambah Retail', {
    timeout: 10000
  })
    .should('be.visible')

})


// =======================================================
// WP-RET-002
// Menguji fitur menambahkan data Retail
// =======================================================
it('WP-RET-002 - Menguji fitur menambahkan data Retail', () => {

  // ===================================================
  // Buka halaman Retail
  // ===================================================
  cy.visit('https://cmsdev-pos.hummatech.com/retails')

  // Pastikan URL benar
  cy.url({
    timeout: 15000
  })
    .should('include', '/retails')

  // Tunggu halaman
  cy.wait(2000)


  // ===================================================
  // Pastikan halaman Retail tampil
  // ===================================================
  cy.contains('Informasi Retail', {
    timeout: 10000
  })
    .should('be.visible')


  // ===================================================
  // Klik Tambah Retail
  // ===================================================
  cy.contains('Tambah Retail', {
    timeout: 10000
  })
    .should('be.visible')
    .click()

  cy.wait(1000)


  // ===================================================
  // Pastikan halaman Tambah Retail
  // ===================================================
  cy.url({
    timeout: 10000
  })
    .should('include', '/retails/create')


  // ===================================================
  // Pastikan form tampil
  // ===================================================
  cy.contains('Nama Retail', {
    timeout: 10000
  })
    .should('be.visible')


  // ===================================================
  // NAMA RETAIL
  // ===================================================
  cy.get('input[placeholder="Masukkan nama retail"]', {
    timeout: 10000
  })
    .should('be.visible')
    .clear()
    .type('Retail Cypress Test')


  // ===================================================
  // NO TELP
  // ===================================================
  cy.get('input[placeholder="No telepon retail"]', {
    timeout: 10000
  })
    .should('be.visible')
    .clear()
    .type('081234567890')


  // ===================================================
  // EMAIL
  // ===================================================
  cy.get('input[placeholder="Email retail"]', {
    timeout: 10000
  })
    .should('be.visible')
    .clear()
    .type('contohretailcypress@gmail.com')


  // ===================================================
  // PASSWORD
  // ===================================================
  cy.get('input[placeholder="Password retail"]', {
    timeout: 10000
  })
    .should('be.visible')
    .clear()
    .type('12345678')


  // ===================================================
  // ALAMAT
  // ===================================================
  cy.get('textarea[placeholder="Masukkan alamat"]', {
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
  // TAMBAH
  // ===================================================
  cy.contains('button', 'Tambah', {
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
  // Pastikan Retail muncul
  // ===================================================
  cy.contains('Retail Cypress Test', {
    timeout: 10000
  })
    .should('be.visible')

})

it('WP-RET-003 - Menguji tombol Laba Rugi pada Detail Retail', () => {

  // 1. Login
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

  // 2. Buka Retail
  cy.visit('https://cmsdev-pos.hummatech.com/retails')

  cy.url({ timeout: 15000 })
    .should('include', '/retails')

  cy.wait(3000)

  // 3. Klik Detail Retail pertama
  cy.contains('button', /Detail/i, { timeout: 15000 })
    .first()
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(2000)

  // 4. Pastikan masuk Detail Retail
  cy.url({ timeout: 15000 })
    .should('include', '/retails/')
    .and('include', '/detail')

  // 5. Klik Laba Rugi
  cy.contains('Laba Rugi', { timeout: 15000 })
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(3000)

  // 6. Pastikan halaman Laporan Laba Rugi
  cy.contains('Laporan Laba Rugi', { timeout: 15000 })
    .should('be.visible')
})


it('WP-RET-004 - Menguji tombol Periksa Laporan', () => {

  // 1. Login
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

  // 2. Buka Retail
  cy.visit('https://cmsdev-pos.hummatech.com/retails')

  cy.url({ timeout: 15000 })
    .should('include', '/retails')

  cy.wait(3000)

  // 3. Klik Detail Retail
  cy.contains('button', /Detail/i, { timeout: 15000 })
    .first()
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(2000)

  // 4. Pastikan masuk Detail Retail
  cy.url({ timeout: 15000 })
    .should('include', '/retails/')
    .and('include', '/detail')

  // 5. Klik Laba Rugi
  cy.contains('Laba Rugi', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')
    .click({ force: true })

  cy.wait(3000)

  // 6. Pastikan halaman Laporan Laba Rugi
  cy.contains('Laporan Laba Rugi', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')

  // 7. Pilih tipe laporan Bulanan
  cy.contains('Bulanan', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')
    .click({ force: true })

  cy.wait(1000)

  // 8. Pilih bulan
  cy.get('input[type="month"]:visible', { timeout: 15000 })
    .first()
    .should('exist')
    .type('2026-08')

  // 9. Klik Periksa Laporan
  cy.contains('button', 'Periksa Laporan', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')
    .click({ force: true })

  cy.wait(3000)

  // 10. Validasi laporan
  cy.contains('Pendapatan', { timeout: 15000 })
    .should('exist')

  cy.contains('Pengeluaran', { timeout: 15000 })
    .should('exist')

  cy.contains('Total Pendapatan', { timeout: 15000 })
    .should('exist')

  cy.contains('Total Pengeluaran', { timeout: 15000 })
    .should('exist')

  cy.contains('Laba Rugi', { timeout: 15000 })
    .should('exist')
})

it('WP-RET-005 - Menguji tombol Cetak Laporan', () => {

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
  // 2. BUKA RETAIL
  // ===================================================
  cy.visit('https://cmsdev-pos.hummatech.com/retails')

  cy.url({ timeout: 15000 })
    .should('include', '/retails')

  cy.wait(3000)

  // ===================================================
  // 3. KLIK DETAIL RETAIL
  // ===================================================
  cy.contains('button', /Detail/i, { timeout: 15000 })
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.wait(2000)

  // ===================================================
  // 4. PASTIKAN MASUK DETAIL RETAIL
  // ===================================================
  cy.url({ timeout: 15000 })
    .should('include', '/retails/')
    .and('include', '/detail')

  // ===================================================
  // 5. KLIK LABA RUGI
  // ===================================================
  cy.contains('Laba Rugi', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')
    .click({ force: true })

  cy.wait(3000)

  // ===================================================
  // 6. PASTIKAN HALAMAN LAPORAN LABA RUGI
  // ===================================================
  cy.contains('Laporan Laba Rugi', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')

  // ===================================================
  // 7. PASTIKAN TIPE LAPORAN = BULANAN
  // ===================================================
  cy.get('select', { timeout: 15000 })
    .first()
    .should('exist')
    .select('Bulanan')

  // ===================================================
  // 8. ISI BULAN
  // ===================================================
  cy.get('input[type="month"]', { timeout: 15000 })
    .should('exist')
    .first()
    .type('2026-08')

  // ===================================================
  // 9. PASTIKAN BULAN SUDAH TERISI
  // ===================================================
  cy.get('input[type="month"]', { timeout: 15000 })
    .first()
    .should('have.value', '2026-08')

  // ===================================================
  // 10. KLIK PERIKSA LAPORAN
  // ===================================================
  cy.contains('button', 'Periksa Laporan', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')
    .click({ force: true })

  cy.wait(5000)

  // ===================================================
  // 11. PASTIKAN LAPORAN MUNCUL
  // ===================================================
  cy.contains('Pendapatan', { timeout: 15000 })
    .should('exist')

  cy.contains('Pengeluaran', { timeout: 15000 })
    .should('exist')

  cy.contains('Total Pendapatan', { timeout: 15000 })
    .should('exist')

  cy.contains('Total Pengeluaran', { timeout: 15000 })
    .should('exist')

  cy.contains('Laba Rugi', { timeout: 15000 })
    .should('exist')

  // ===================================================
  // 12. KLIK CETAK LAPORAN
  // ===================================================
  cy.contains('Cetak Laporan', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')
    .click({ force: true })

  cy.wait(3000)
})

it('WP-RET-006 - Menguji tombol Statistik pada retail', () => {

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
  // 2. BUKA MENU RETAIL
  // ===================================================
  cy.visit('https://cmsdev-pos.hummatech.com/retails')

  cy.wait(3000)

  cy.url({ timeout: 15000 })
    .should('include', '/retails')

  // ===================================================
  // 3. KLIK DETAIL RETAIL
  // ===================================================
  cy.contains('button', 'Detail', { timeout: 15000 })
    .first()
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(3000)

  // ===================================================
  // 4. PASTIKAN MASUK DETAIL RETAIL
  // ===================================================
  cy.url({ timeout: 15000 })
    .should('include', '/retails/')
    .and('include', '/detail')

  // ===================================================
  // 5. KLIK TAB STATISTIK DI DALAM DETAIL RETAIL
  //    Menggunakan teks unik "Analisis statistik retail"
  // ===================================================
  cy.contains('Analisis statistik retail', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')
    .click({ force: true })

  cy.wait(3000)

  // ===================================================
  // 6. PASTIKAN MASUK HALAMAN STATISTIK RETAIL
  // ===================================================
  cy.url({ timeout: 15000 })
    .should('include', '/retails/')
    .and('include', 'statistik')

  // ===================================================
  // 7. PASTIKAN STATISTIK TRANSAKSI BULANAN
  // ===================================================
  cy.contains('Statistik Transaksi Bulanan', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')

  // ===================================================
  // 8. PASTIKAN DATA TRANSAKSI RETAIL
  // ===================================================
  cy.contains('Data Transaksi Retail', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')

  // ===================================================
  // 9. PASTIKAN TAB TRANSAKSI PENJUALAN
  // ===================================================
  cy.contains('Transaksi Penjualan', { timeout: 15000 })
    .should('exist')

  // ===================================================
  // 10. PASTIKAN TAB REQUEST STOCK
  // ===================================================
  cy.contains('Request Stock', { timeout: 15000 })
    .should('exist')
})


it('WP-RET-007 - Menguji dropdown Bulanan/Tahunan pada Statistik Transaksi', () => {

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
  // 2. BUKA RETAIL
  // ===================================================
  cy.visit('https://cmsdev-pos.hummatech.com/retails')

  cy.url({ timeout: 15000 })
    .should('include', '/retails')

  cy.wait(3000)

  // ===================================================
  // 3. KLIK DETAIL RETAIL
  // ===================================================
  cy.contains('button', 'Detail', { timeout: 15000 })
    .first()
    .scrollIntoView()
    .click({ force: true })

  cy.wait(3000)

  // ===================================================
  // 4. PASTIKAN DETAIL RETAIL
  // ===================================================
  cy.url({ timeout: 15000 })
    .should('include', '/retails/')
    .and('include', '/detail')

  // ===================================================
  // 5. KLIK STATISTIK DI DALAM DETAIL RETAIL
  // ===================================================
  cy.contains('Analisis statistik retail', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')
    .click({ force: true })

  cy.wait(3000)

  // ===================================================
  // 6. PASTIKAN HALAMAN STATISTIK RETAIL
  // ===================================================
  cy.url({ timeout: 15000 })
    .should('include', '/retails/')
    .and('include', 'statistik')

  // ===================================================
  // 7. PASTIKAN STATISTIK TRANSAKSI BULANAN
  // ===================================================
  cy.contains('Statistik Transaksi Bulanan', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')

  // ===================================================
  // 8. KLIK DROPDOWN BULANAN
  //    AMBIL TEKS BULANAN YANG TERAKHIR
  // ===================================================
  cy.contains('Bulanan', { timeout: 15000 })
    .last()
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(1000)

  // ===================================================
  // 9. PILIH TAHUNAN
  // ===================================================
  cy.contains('Tahunan', { timeout: 15000 })
    .last()
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(3000)

  // ===================================================
  // 10. PASTIKAN DROPDOWN BERUBAH MENJADI TAHUNAN
  // ===================================================
  cy.contains('Tahunan', { timeout: 15000 })
    .last()
    .should('be.visible')

  // ===================================================
  // 11. PASTIKAN STATISTIK TETAP TAMPIL
  // ===================================================
  cy.contains('Statistik Transaksi', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')

  // ===================================================
  // 12. BUKA DROPDOWN TAHUNAN
  // ===================================================
  cy.contains('Tahunan', { timeout: 15000 })
    .last()
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(1000)

  // ===================================================
  // 13. PILIH BULANAN
  // ===================================================
  cy.contains('Bulanan', { timeout: 15000 })
    .last()
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(3000)

  // ===================================================
  // 14. PASTIKAN KEMBALI KE BULANAN
  // ===================================================
  cy.contains('Statistik Transaksi Bulanan', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')

})


it('WP-RET-008 - Menguji tab Data Transaksi Retail', () => {

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
  // 2. BUKA MENU RETAIL
  // ===================================================
  cy.visit('https://cmsdev-pos.hummatech.com/retails')

  cy.url({ timeout: 15000 })
    .should('include', '/retails')

  cy.wait(3000)

  // ===================================================
  // 3. KLIK DETAIL RETAIL
  // ===================================================
  cy.contains('button', 'Detail', { timeout: 15000 })
    .first()
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(3000)

  // ===================================================
  // 4. PASTIKAN MASUK DETAIL RETAIL
  // ===================================================
  cy.url({ timeout: 15000 })
    .should('include', '/retails/')
    .and('include', '/detail')

  // ===================================================
  // 5. KLIK TAB STATISTIK DI DALAM DETAIL RETAIL
  // ===================================================
  cy.contains('Analisis statistik retail', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')
    .click({ force: true })

  cy.wait(3000)

  // ===================================================
  // 6. PASTIKAN HALAMAN STATISTIK RETAIL
  // ===================================================
  cy.url({ timeout: 15000 })
    .should('include', '/retails/')
    .and('include', 'statistik')

  // ===================================================
  // 7. PASTIKAN SECTION DATA TRANSAKSI RETAIL
  // ===================================================
  cy.contains('Data Transaksi Retail', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')

  // ===================================================
  // 8. KLIK TAB TRANSAKSI PENJUALAN
  // ===================================================
  cy.contains('Transaksi Penjualan', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')
    .click({ force: true })

  cy.wait(2000)

  // ===================================================
  // 9. PASTIKAN TABEL TRANSAKSI PENJUALAN
  // ===================================================
  cy.contains('Tanggal Transaksi', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')

  cy.contains('ID Transaksi', { timeout: 15000 })
    .should('exist')

  cy.contains('Nama Kasir', { timeout: 15000 })
    .should('exist')

  cy.contains('Total Bayar', { timeout: 15000 })
    .should('exist')

  // ===================================================
  // 10. KLIK TAB REQUEST STOCK
  // ===================================================
  cy.contains('Request Stock', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')
    .click({ force: true })

  cy.wait(2000)

  // ===================================================
  // 11. PASTIKAN REQUEST STOCK TAMPIL
  // ===================================================
  cy.contains('Request Stock', { timeout: 15000 })
    .should('exist')

})

it('WP-RET-009 - Menguji tombol BEP pada retail', () => {

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
  // 2. BUKA MENU RETAIL
  // ===================================================
  cy.visit('https://cmsdev-pos.hummatech.com/retails')

  cy.url({ timeout: 15000 })
    .should('include', '/retails')

  cy.wait(3000)

  // ===================================================
  // 3. KLIK DETAIL RETAIL
  // ===================================================
  cy.contains('button', 'Detail', { timeout: 15000 })
    .first()
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.wait(3000)

  // ===================================================
  // 4. PASTIKAN MASUK DETAIL RETAIL
  // ===================================================
  cy.url({ timeout: 15000 })
    .should('include', '/retails/')
    .and('include', '/detail')

  // ===================================================
  // 5. KLIK TAB BEP DI DALAM DETAIL RETAIL
  // ===================================================
  cy.contains('Analisis Break Even Point retail', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')
    .click({ force: true })

  cy.wait(3000)

  // ===================================================
  // 6. PASTIKAN MASUK HALAMAN BEP RETAIL
  // ===================================================
  cy.url({ timeout: 15000 })
    .should('include', '/retails/')
    .and('include', 'bep')

  // ===================================================
  // 7. PASTIKAN TOTAL MODAL
  // ===================================================
  cy.contains('Total Modal', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')

  // ===================================================
  // 8. PASTIKAN TOTAL TERCAPAI
  // ===================================================
  cy.contains('Total Tercapai', { timeout: 15000 })
    .should('exist')

  // ===================================================
  // 9. PASTIKAN PROGRES MODAL
  // ===================================================
  cy.contains('Progres Modal', { timeout: 15000 })
    .should('exist')

  // ===================================================
  // 10. PASTIKAN MODAL AWAL
  // ===================================================
  cy.contains('Modal Awal', { timeout: 15000 })
    .should('exist')

  // ===================================================
  // 11. PASTIKAN ESTIMASI TERCAPAI
  // ===================================================
  cy.contains('Estimasi Tercapai', { timeout: 15000 })
    .should('exist')

  // ===================================================
  // 12. PASTIKAN STATUS DALAM PROGRES
  // ===================================================
  cy.contains('Dalam Progres', { timeout: 15000 })
    .should('exist')

  // ===================================================
  // 13. PASTIKAN GRAFIK STATISTIK PENCAPAIAN MODAL
  // ===================================================
  cy.contains('Statistik Pencapaian Modal', { timeout: 15000 })
    .scrollIntoView()
    .should('exist')

  // ===================================================
  // 14. PASTIKAN KOMPONEN GRAFIK
  // ===================================================
  cy.contains('Akumulasi Keuntungan', { timeout: 15000 })
    .should('exist')

  cy.contains('Laba Bersih', { timeout: 15000 })
    .should('exist')

  cy.contains('Target Modal', { timeout: 15000 })
    .should('exist')

})

})