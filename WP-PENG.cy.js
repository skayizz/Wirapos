describe('WP-PENG - Pengeluaran', () => {

  const email = 'faisalgaming1245@gmail.com'
  const password = '12345678'


  // =========================================================
  // BEFORE EACH
  // LOGIN + MASUK KE MENU PENGELUARAN
  // =========================================================

  beforeEach(() => {

    // =======================================================
    // 1. BUKA LOGIN
    // =======================================================

    cy.visit('https://cmsdev-pos.hummatech.com/login')


    // =======================================================
    // 2. ISI EMAIL
    // =======================================================

    cy.get('input[type="email"]', {
      timeout: 15000
    })
      .should('exist')
      .clear()
      .type(email)


    // =======================================================
    // 3. ISI PASSWORD
    // =======================================================

    cy.get('input[type="password"]', {
      timeout: 15000
    })
      .should('exist')
      .clear()
      .type(password)


    // =======================================================
    // 4. KLIK MASUK
    // =======================================================

    cy.contains('button', /masuk|login/i, {
      timeout: 15000
    })
      .should('exist')
      .click()


    // =======================================================
    // 5. PASTIKAN LOGIN BERHASIL
    // =======================================================

    cy.url({
      timeout: 15000
    })
      .should('not.include', '/login')


    // Tunggu dashboard selesai loading
    cy.wait(1500)


    // =======================================================
    // 6. CARI MENU PENGELUARAN
    // =======================================================

    cy.get('a', {
      timeout: 15000
    })
      .then(($links) => {

        let menuPengeluaran = null


        // ---------------------------------------------------
        // PRIORITAS 1
        // Cari berdasarkan href
        // ---------------------------------------------------

        for (let i = 0; i < $links.length; i++) {

          const link = $links[i]

          const href = (
            link.getAttribute('href') || ''
          ).toLowerCase()

          if (
            href.includes('pengeluaran') &&
            !href.includes('kategori')
          ) {
            menuPengeluaran = link
            break
          }
        }


        // ---------------------------------------------------
        // PRIORITAS 2
        // Jika href tidak ditemukan,
        // cari berdasarkan textContent
        // ---------------------------------------------------

        if (!menuPengeluaran) {

          for (let i = 0; i < $links.length; i++) {

            const link = $links[i]

            const text = (
              link.textContent || ''
            )
              .replace(/\s+/g, ' ')
              .trim()
              .toLowerCase()

            if (text === 'pengeluaran') {
              menuPengeluaran = link
              break
            }
          }
        }


        // ---------------------------------------------------
        // Pastikan menu ditemukan
        // ---------------------------------------------------

        expect(
          menuPengeluaran,
          'Menu Pengeluaran harus ditemukan'
        )
          .to.not.equal(null)


        // ---------------------------------------------------
        // Klik menu Pengeluaran
        // ---------------------------------------------------

        cy.wrap(menuPengeluaran)
          .click({
            force: true
          })

      })


    // =======================================================
    // 7. TUNGGU HALAMAN PENGELUARAN
    // =======================================================

    cy.wait(1500)


    // =======================================================
    // 8. PASTIKAN URL BUKAN KATEGORI PENGELUARAN
    // =======================================================

    cy.url({
      timeout: 15000
    })
      .should('not.include', 'kategori-pengeluaran')


    // =======================================================
    // 9. PASTIKAN HALAMAN PENGELUARAN
    // =======================================================

    cy.contains(
      'Pengeluaran',
      {
        timeout: 15000
      }
    )
      .should('exist')

  })


  // =========================================================
  // WP-PENG-001
  // Menguji menu Pengeluaran
  // =========================================================

  it(
    'WP-PENG-001 - Menguji menu Pengeluaran',
    () => {

      // =====================================================
      // 1. PASTIKAN JUDUL PENGELUARAN
      // =====================================================

      cy.contains(
        'Pengeluaran',
        {
          timeout: 15000
        }
      )
        .should('exist')


      // =====================================================
      // 2. KOLOM PENCARIAN
      // =====================================================

      cy.get(
        'input[placeholder*="Cari"], ' +
        'input[placeholder*="cari"], ' +
        'input[type="search"]',
        {
          timeout: 15000
        }
      )
        .should('exist')


      // =====================================================
      // 3. TOMBOL TAMBAH PENGELUARAN
      // =====================================================

      cy.contains(
        'button, a',
        /Tambah Pengeluaran/i,
        {
          timeout: 15000
        }
      )
        .should('exist')


      // =====================================================
      // 4. HEADER TABEL
      // =====================================================

      cy.contains(
        /Nama Pengeluaran/i,
        {
          timeout: 15000
        }
      )
        .should('exist')


      cy.contains(
        /^Jumlah$/i,
        {
          timeout: 15000
        }
      )
        .should('exist')


      cy.contains(
        /^Tanggal$/i,
        {
          timeout: 15000
        }
      )
        .should('exist')


      cy.contains(
        /^Aksi$/i,
        {
          timeout: 15000
        }
      )
        .should('exist')

    }
  )


  // =========================================================
  // WP-PENG-002
  // Menguji fitur Tambah Pengeluaran
  // =========================================================

  it(
    'WP-PENG-002 - Menguji fitur Tambah Pengeluaran',
    () => {

      // =====================================================
      // 1. KLIK TAMBAH PENGELUARAN
      // =====================================================

      cy.contains(
        'button, a',
        /Tambah Pengeluaran/i,
        {
          timeout: 15000
        }
      )
        .should('exist')
        .click({
          force: true
        })


      // =====================================================
      // 2. PASTIKAN FORM MUNCUL
      // =====================================================

      cy.contains(
        /Tambah Pengeluaran/i,
        {
          timeout: 15000
        }
      )
        .should('exist')


      // =====================================================
      // 3. NAMA PENGELUARAN
      // =====================================================

      cy.contains(
        'label',
        /Nama Pengeluaran/i,
        {
          timeout: 10000
        }
      )
        .parent()
        .find('input')
        .first()
        .clear()
        .type(
          'Pembelian Stok Tablet'
        )


      // =====================================================
      // 4. KATEGORI PENGELUARAN
      // =====================================================

      cy.contains(
        'label',
        /Kategori Pengeluaran/i,
        {
          timeout: 10000
        }
      )
        .parent()
        .then(($parent) => {

          const select = $parent.find('select')


          // -------------------------------------------------
          // Jika kategori menggunakan SELECT
          // -------------------------------------------------

          if (select.length > 0) {

            cy.wrap(select)
              .select(
                'Pengadaan Stok Barang'
              )

          }


          // -------------------------------------------------
          // Jika kategori menggunakan dropdown custom
          // -------------------------------------------------

          else {

            cy.wrap($parent)
              .click({
                force: true
              })


            cy.contains(
              'Pengadaan Stok Barang',
              {
                timeout: 10000
              }
            )
              .should('exist')
              .click({
                force: true
              })

          }

        })


      // =====================================================
      // 5. NOMINAL PENGELUARAN
      // =====================================================

      cy.contains(
        'label',
        /Nominal Pengeluaran|Jumlah Pengeluaran|Nominal/i,
        {
          timeout: 10000
        }
      )
        .parent()
        .find('input')
        .first()
        .clear()
        .type('2500000')


      // =====================================================
      // 6. DESKRIPSI
      // =====================================================

      cy.contains(
        'label',
        /Deskripsi/i,
        {
          timeout: 10000
        }
      )
        .parent()
        .find('textarea')
        .first()
        .clear()
        .type(
          'Pembelian stok tablet Huawei MatePad 12X 2026 untuk penjualan Agustus 2026'
        )


      // =====================================================
      // 7. KLIK SIMPAN
      // =====================================================

      cy.contains(
        'button',
        /Simpan/i,
        {
          timeout: 15000
        }
      )
        .should('exist')
        .click({
          force: true
        })


      // =====================================================
      // 8. TUNGGU PROSES SIMPAN
      // =====================================================

      cy.wait(1500)


      // =====================================================
      // 9. CEK NOTIFIKASI
      // =====================================================

      cy.contains(
        /Pengeluaran berhasil dibuat|berhasil dibuat|berhasil ditambahkan/i,
        {
          timeout: 15000
        }
      )
        .should('exist')


      // =====================================================
      // 10. CEK DATA MUNCUL
      // =====================================================

      cy.contains(
        'Pembelian Stok Tablet',
        {
          timeout: 15000
        }
      )
        .should('exist')

    }
  )


it('WP-PENG-003 - Menguji tombol Filter Pengeluaran', () => {

  // =====================================================
  // 1. PASTIKAN HALAMAN PENGELUARAN
  // =====================================================

  cy.contains('Pengeluaran', {
    timeout: 15000
  })
    .should('exist')


  // =====================================================
  // 2. CARI KOLOM PENCARIAN
  // =====================================================

  cy.get('input[placeholder="Cari..."]', {
    timeout: 15000
  })
    .should('exist')


  // =====================================================
  // 3. KLIK ICON FILTER / SLIDER
  //    Tepat di sebelah kanan kolom Cari...
  // =====================================================

  cy.get('input[placeholder="Cari..."]')
    .first()
    .then(($input) => {

      const inputElement = $input[0]

      const inputRect =
        inputElement.getBoundingClientRect()

      let filterButton = null


      // -------------------------------------------------
      // Cari button di seluruh halaman
      // yang posisinya tepat di sebelah kanan search
      // -------------------------------------------------

      cy.get('button').each(($button) => {

        const buttonElement = $button[0]

        const buttonRect =
          buttonElement.getBoundingClientRect()


        const jarakHorizontal =
          buttonRect.left - inputRect.right


        const jarakVertical =
          Math.abs(
            buttonRect.top - inputRect.top
          )


        if (
          jarakHorizontal >= -30 &&
          jarakHorizontal <= 100 &&
          jarakVertical <= 50 &&
          buttonRect.width > 0 &&
          buttonRect.height > 0
        ) {

          filterButton = buttonElement

        }

      })
        .then(() => {

          expect(
            filterButton,
            'Icon Filter/Slider di sebelah pencarian harus ditemukan'
          )
            .to.exist


          cy.wrap(filterButton)
            .click({
              force: true
            })

        })

    })


  // =====================================================
  // 4. PASTIKAN MODAL FILTER MUNCUL
  // =====================================================

  cy.contains(
    'Filter Pengeluaran',
    {
      timeout: 15000
    }
  )
    .should('be.visible')


  // =====================================================
  // 5. MINIMUM JUMLAH PENGELUARAN
  // =====================================================

  cy.get(
    'input[placeholder="Masukkan Jumlah"]',
    {
      timeout: 15000
    }
  )
    .eq(0)
    .should('be.visible')
    .clear()
    .type('1000000')


  // =====================================================
  // 6. MAKSIMUM JUMLAH PENGELUARAN
  // =====================================================

  cy.get(
    'input[placeholder="Masukkan Jumlah"]'
  )
    .eq(1)
    .should('be.visible')
    .clear()
    .type('5000000')


  // =====================================================
  // 7. DARI TANGGAL
  // =====================================================

  cy.contains(
    'label',
    'Dari Tanggal',
    {
      timeout: 10000
    }
  )
    .parent()
    .find('input[type="date"]')
    .should('be.visible')
    .clear()
    .type('2026-08-01')


  // =====================================================
  // 8. SAMPAI TANGGAL
  // =====================================================

  cy.contains(
    'label',
    'Sampai Tanggal',
    {
      timeout: 10000
    }
  )
    .parent()
    .find('input[type="date"]')
    .should('be.visible')
    .clear()
    .type('2026-08-31')


  // =====================================================
  // 9. KLIK TERAPKAN
  // =====================================================

  cy.contains(
    'button',
    'Terapkan',
    {
      timeout: 15000
    }
  )
    .should('be.visible')
    .click()


  // =====================================================
  // 10. TUNGGU FILTER DITERAPKAN
  // =====================================================

  cy.wait(1000)


  // =====================================================
  // 11. PASTIKAN MODAL TERTUTUP
  // =====================================================

  cy.contains(
    'Filter Pengeluaran'
  )
    .should('not.exist')


  // =====================================================
  // 12. PASTIKAN DATA PENGELUARAN TAMPIL
  // =====================================================

  cy.contains(
    'Nama Pengeluaran',
    {
      timeout: 15000
    }
  )
    .should('exist')

})

})