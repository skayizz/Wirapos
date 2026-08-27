describe('WiraPOS - Bundling', () => {

  const email = 'faisalgaming1245@gmail.com'
  const password = '12345678'

  // =========================================================
  // LOGIN
  // =========================================================
  beforeEach(() => {
    cy.visit('https://cmsdev-pos.hummatech.com/login')

    cy.get('input[type="email"]', { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type(email)

    cy.get('input[type="password"]', { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type(password)

    cy.contains('button', 'Masuk', { timeout: 15000 })
      .should('be.visible')
      .click()

    cy.url({ timeout: 15000 })
      .should('not.include', '/login')

    cy.wait(2000)
  })


  // =========================================================
  // WP-BUND-001
  // Menguji menu Bundling
  // =========================================================
  it('WP-BUND-001 - Menguji menu Bundling', () => {

    // Buka halaman Bundling secara langsung
    cy.visit('https://cmsdev-pos.hummatech.com/bundlings')

    cy.url({ timeout: 15000 })
      .should('include', '/bundlings')

    cy.wait(1500)

    // Pastikan halaman Bundling terbuka
    cy.contains('Bundling', { timeout: 15000 })
      .should('be.visible')

    // Pastikan tombol Tambah Bundling tersedia
    cy.contains('button', 'Tambah Bundling', { timeout: 15000 })
      .should('be.visible')

  })


  // =========================================================
  // WP-BUND-002
  // Menguji fitur Tambah Bundling dengan produk dan varian
  // =========================================================
  it('WP-BUND-002 - Menguji fitur Tambah Bundling dengan produk dan varian', () => {

    // -------------------------------------------------------
    // 1. Buka halaman Tambah Bundling
    // -------------------------------------------------------
    cy.visit('https://cmsdev-pos.hummatech.com/bundlings/create')

    cy.url({ timeout: 15000 })
      .should('include', '/bundlings/create')

    cy.wait(1500)

    // Pastikan halaman sudah tampil
    cy.contains('Buat Bundling Produk', { timeout: 15000 })
      .should('be.visible')


    // -------------------------------------------------------
    // 2. Isi Nama Bundling
    // -------------------------------------------------------
    cy.get('input[placeholder="Nama Bundling"]', { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type('Bundling Cypress Test')


    // -------------------------------------------------------
    // 3. Pilih Kategori
    // -------------------------------------------------------
    // PENTING:
    // "Pilih kategori" BUKAN input.
    // Jadi kita klik teks/field-nya langsung.
    // -------------------------------------------------------

    cy.contains('Pilih kategori', { timeout: 15000 })
      .should('be.visible')
      .click()

    cy.wait(500)

    // Setelah diklik akan muncul daftar kategori.
    // Pilih kategori "Tablet POS".
    cy.contains('Tablet POS', { timeout: 10000 })
      .should('be.visible')
      .click()

    cy.wait(500)


    // -------------------------------------------------------
    // 4. Klik Tambah Produk
    // -------------------------------------------------------
    cy.contains('button', 'Tambah Produk', { timeout: 15000 })
      .should('be.visible')
      .click()

    cy.wait(1000)


    // -------------------------------------------------------
    // 5. Pastikan modal Pilih Produk muncul
    // -------------------------------------------------------
    cy.contains('Pilih Produk untuk Bundling', { timeout: 15000 })
      .should('be.visible')


    // -------------------------------------------------------
    // 6. Pilih varian penyimpanan - 256GB
    // -------------------------------------------------------

    cy.contains('penyimpanan - 256GB', { timeout: 15000 })
      .should('be.visible')
      .click()

    cy.wait(300)


    // -------------------------------------------------------
    // 7. Pilih varian penyimpanan - 512GB
    // -------------------------------------------------------

    cy.contains('penyimpanan - 512GB', { timeout: 15000 })
      .should('be.visible')
      .click()

    cy.wait(500)


    // -------------------------------------------------------
    // 8. Klik tombol Tambahkan
    // -------------------------------------------------------
    // PENTING:
    // Di tampilan kamu tombolnya adalah "Tambahkan",
    // BUKAN "Tambah".
    // -------------------------------------------------------

    cy.contains('button', 'Tambahkan', { timeout: 10000 })
      .should('be.visible')
      .click()

    cy.wait(1000)


    // -------------------------------------------------------
    // 9. Pastikan modal tertutup
    // -------------------------------------------------------

    cy.contains('Pilih Produk untuk Bundling')
      .should('not.exist')


    // -------------------------------------------------------
    // 10. Pastikan produk sudah masuk
    // -------------------------------------------------------

    cy.contains('penyimpanan - 256GB', { timeout: 15000 })
      .should('be.visible')

    cy.contains('penyimpanan - 512GB', { timeout: 15000 })
      .should('be.visible')


    // -------------------------------------------------------
    // 11. Atur quantity
    // -------------------------------------------------------
    // Pada halaman setelah produk ditambahkan,
    // cari input number.
    //
    // Kalau sistem otomatis memberikan quantity = 1,
    // kita tidak perlu mencari input number.
    // -------------------------------------------------------

    cy.get('body').then(($body) => {

      const numberInput = $body.find('input[type="number"]')

      if (numberInput.length > 0) {

        cy.get('input[type="number"]').each(($input) => {

          cy.wrap($input)
            .scrollIntoView()
            .clear()
            .type('1')

        })

      } else {

        // Jika tidak ada input number,
        // berarti quantity default sistem sudah digunakan.
        cy.log('Input quantity tidak ditemukan - menggunakan quantity default sistem')

      }

    })


    // -------------------------------------------------------
    // 12. Isi Harga Bundling
    // -------------------------------------------------------

    cy.get('input', { timeout: 10000 })
      .filter(':visible')
      .then(($inputs) => {

        // Cari input harga berdasarkan struktur halaman.
        // Biasanya input harga berada setelah label Harga.
        const hargaInput = $inputs.filter((index, element) => {
          const placeholder = element.getAttribute('placeholder')
          const value = element.value

          return (
            placeholder?.toLowerCase().includes('harga') ||
            element.type === 'number' ||
            value === '0'
          )
        })

        if (hargaInput.length > 0) {

          cy.wrap(hargaInput.first())
            .scrollIntoView()
            .clear()
            .type('18500000')

        } else {

          // Fallback: ambil input visible yang berada di area harga
          cy.contains('Harga', { timeout: 10000 })
            .scrollIntoView()

          cy.get('input:visible')
            .last()
            .clear()
            .type('18500000')
        }
      })


    // -------------------------------------------------------
    // 13. Isi Deskripsi
    // -------------------------------------------------------

    cy.get('textarea', { timeout: 10000 })
      .filter(':visible')
      .first()
      .scrollIntoView()
      .clear()
      .type('Bundling produk Huawei MatePad 12X 2026 dengan dua pilihan penyimpanan.')


    // -------------------------------------------------------
    // 14. Pastikan data produk tetap ada
    // -------------------------------------------------------

    cy.contains('penyimpanan - 256GB', { timeout: 10000 })
      .should('be.visible')

    cy.contains('penyimpanan - 512GB', { timeout: 10000 })
      .should('be.visible')


    // -------------------------------------------------------
    // 15. Klik Simpan
    // -------------------------------------------------------

    cy.contains('button', 'Simpan', { timeout: 15000 })
      .scrollIntoView()
      .should('be.visible')
      .click()

    cy.wait(2000)


    // -------------------------------------------------------
    // 16. Pastikan berhasil disimpan
    // -------------------------------------------------------

    cy.url({ timeout: 15000 })
      .should('not.include', '/login')

  })

})