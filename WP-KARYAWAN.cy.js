describe('WP-KARYAWAN - Pengujian Menu Karyawan', () => {

  const email = 'faisalgaming1245@gmail.com'
  const password = '12345678'

  const usernameAuditor = `cypress_auditor_${Date.now()}`
  const usernameKasir = `cypress_kasir_${Date.now()}`
  const usernamePegawai = `cypress_pegawai_${Date.now()}`

  const editUsername = 'keonhooo'


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

    cy.contains('button', /^Masuk$/i, { timeout: 15000 })
      .should('be.visible')
      .click()

    // Tunggu proses login dan redirect
    cy.url({ timeout: 20000 })
      .should('not.include', '/login')

    // Tunggu dashboard selesai dimuat
    cy.wait(2000)
  })


  // =========================================================
  // HELPER
  // BUKA MENU PENGGUNA
  // =========================================================
  function bukaMenuPengguna() {

    cy.contains('button', /^Pengguna$/i, {
      timeout: 15000
    })
      .should('exist')
      .click({ force: true })

    cy.wait(500)
  }


  // =========================================================
  // HELPER
  // BUKA HALAMAN KARYAWAN
  // =========================================================
  function bukaHalamanKaryawan() {

    bukaMenuPengguna()

    cy.contains('a, button', /^Karyawan$/i, {
      timeout: 10000
    })
      .should('exist')
      .click({ force: true })

    cy.wait(1500)

    cy.contains(/Daftar Karyawan/i, {
      timeout: 15000
    })
      .should('exist')
  }


  // =========================================================
  // HELPER
  // BUKA TAMBAH AKUN
  // =========================================================
  function bukaTambahAkun() {

    cy.contains('button', /Tambah Akun/i, {
      timeout: 15000
    })
      .should('exist')
      .click({ force: true })

    cy.wait(500)

    cy.contains(/Tambah Akun|Tambah Karyawan/i, {
      timeout: 10000
    })
      .should('exist')
  }


  // =========================================================
  // HELPER
  // INPUT USERNAME
  // =========================================================
  function isiUsername(username) {

    cy.get('input:visible', {
      timeout: 10000
    })
      .then(($inputs) => {

        let ditemukan = false

        $inputs.each((index, element) => {

          const placeholder =
            (element.getAttribute('placeholder') || '')
              .toLowerCase()

          const name =
            (element.getAttribute('name') || '')
              .toLowerCase()

          const id =
            (element.getAttribute('id') || '')
              .toLowerCase()

          if (
            placeholder.includes('username') ||
            name.includes('username') ||
            id.includes('username')
          ) {

            cy.wrap(element)
              .clear()
              .type(username)

            ditemukan = true

            return false
          }
        })

        if (!ditemukan) {

          cy.wrap($inputs.eq(0))
            .clear()
            .type(username)
        }
      })
  }


  // =========================================================
  // HELPER
  // PASSWORD
  // =========================================================
  function isiPassword() {

    cy.get('input[type="password"]:visible', {
      timeout: 10000
    })
      .then(($passwords) => {

        expect($passwords.length)
          .to.be.greaterThan(0)

        cy.wrap($passwords.eq(0))
          .clear()
          .type(password)

        if ($passwords.length > 1) {

          cy.wrap($passwords.eq(1))
            .clear()
            .type(password)
        }
      })
  }


  // =========================================================
  // HELPER
  // PILIH ROLE
  // =========================================================
  function pilihRole(role) {

    cy.get('select:visible').then(($selects) => {

      let ditemukan = false

      $selects.each((index, element) => {

        const options = [...element.options]
          .map(option =>
            option.textContent.trim()
          )

        const adaRole = options.some(option =>
          option.toLowerCase() === role.toLowerCase()
        )

        if (adaRole) {

          cy.wrap(element)
            .select(role, { force: true })

          ditemukan = true

          return false
        }
      })

      if (!ditemukan) {

        cy.contains(/Pilih Role/i, {
          timeout: 10000
        })
          .filter(':visible')
          .last()
          .click({ force: true })

        cy.contains(role, {
          timeout: 5000
        })
          .should('exist')
          .click({ force: true })
      }
    })
  }


  // =========================================================
  // HELPER
  // PILIH STATUS AKTIF
  // =========================================================
  function pilihStatusAktif() {

    cy.get('select:visible').then(($selects) => {

      let ditemukan = false

      $selects.each((index, element) => {

        const options = [...element.options]
          .map(option =>
            option.textContent.trim().toLowerCase()
          )

        if (
          options.includes('aktif') ||
          options.includes('active')
        ) {

          const optionAktif =
            [...element.options].find(option =>
              /aktif|active/i.test(option.textContent)
            )

          if (optionAktif) {

            cy.wrap(element)
              .select(optionAktif.value, {
                force: true
              })
          }

          ditemukan = true

          return false
        }
      })

      if (!ditemukan) {

        cy.contains(/Pilih Status|Status/i, {
          timeout: 10000
        })
          .filter(':visible')
          .last()
          .click({ force: true })

        cy.contains(/^Aktif$/i, {
          timeout: 5000
        })
          .should('exist')
          .click({ force: true })
      }
    })
  }


  // =========================================================
  // HELPER
  // TAMBAH AKUN
  // =========================================================
  function tambahAkun(username, role) {

    bukaTambahAkun()

    isiUsername(username)

    isiPassword()

    pilihRole(role)

    pilihStatusAktif()

    cy.contains('button', /^Simpan$/i, {
      timeout: 10000
    })
      .filter(':visible')
      .last()
      .should('exist')
      .click({ force: true })

    cy.wait(1500)
  }


  // =========================================================
  // HELPER
  // MENU TITIK TIGA
  // =========================================================
  function bukaMenuTitikTiga() {

    cy.get('button:visible', {
      timeout: 15000
    })
      .then(($buttons) => {

        let ditemukan = false

        $buttons.each((index, button) => {

          const text =
            button.textContent.trim()

          const aria =
            button.getAttribute('aria-label') || ''

          const title =
            button.getAttribute('title') || ''

          if (
            text === '...' ||
            text === '⋮' ||
            aria.toLowerCase().includes('menu') ||
            title.toLowerCase().includes('menu')
          ) {

            cy.wrap(button)
              .click({ force: true })

            ditemukan = true

            return false
          }
        })

        if (!ditemukan) {

          // Fallback tombol terakhir
          cy.wrap($buttons.last())
            .click({ force: true })
        }
      })

    cy.wait(500)
  }


  it('WP-KARYAWAN-001 - Menguji submenu Karyawan', () => {

  bukaHalamanKaryawan()

  // =====================================================
  // 1. Pastikan halaman Daftar Karyawan
  // =====================================================
  cy.contains(/Daftar Karyawan/i, {
    timeout: 15000
  })
    .should('exist')

  // =====================================================
  // 2. Pastikan kolom pencarian ada
  // =====================================================
  cy.get('input:visible', {
    timeout: 15000
  })
    .should('have.length.at.least', 1)

  // =====================================================
  // 3. Cari tombol strip 3 dekat pencarian
  // =====================================================
  cy.get('button:visible', {
    timeout: 15000
  })
    .then(($buttons) => {

      let tombolFilter = null

      $buttons.each((index, button) => {

        const text =
          button.textContent.trim()

        const aria =
          button.getAttribute('aria-label') || ''

        const title =
          button.getAttribute('title') || ''

        const html =
          button.innerHTML.toLowerCase()

        // Cari tombol berdasarkan:
        // - strip 3
        // - menu
        // - filter
        // - icon lucide
        if (
          text === '☰' ||
          text === '⋮' ||
          text === '...' ||
          aria.toLowerCase().includes('filter') ||
          aria.toLowerCase().includes('menu') ||
          title.toLowerCase().includes('filter') ||
          title.toLowerCase().includes('menu') ||
          html.includes('filter') ||
          html.includes('menu')
        ) {

          tombolFilter = button

          return false
        }
      })

      // Kalau ditemukan
      if (tombolFilter) {

        cy.wrap(tombolFilter)
          .click({ force: true })

      } else {

        // =================================================
        // FALLBACK
        // Cari tombol yang posisinya paling dekat input
        // =================================================

        cy.get('input:visible')
          .first()
          .then(($input) => {

            const inputRect =
              $input[0].getBoundingClientRect()

            let kandidat = null
            let jarakTerdekat = Infinity

            $buttons.each((index, button) => {

              const rect =
                button.getBoundingClientRect()

              // Tombol di sebelah kanan input
              if (
                rect.left >= inputRect.right - 20 &&
                Math.abs(rect.top - inputRect.top) < 100
              ) {

                const jarak =
                  Math.abs(rect.left - inputRect.right)

                if (jarak < jarakTerdekat) {

                  jarakTerdekat = jarak
                  kandidat = button
                }
              }
            })

            if (kandidat) {

              cy.wrap(kandidat)
                .click({ force: true })

            } else {

              throw new Error(
                'Tombol strip 3/filter di dekat pencarian tidak ditemukan'
              )
            }
          })
      }
    })

  // =====================================================
  // 4. Setelah strip 3 diklik, pastikan filter muncul
  // =====================================================
  cy.contains(/Filter Data/i, {
    timeout: 10000
  })
    .should('exist')

  // =====================================================
  // 5. Tombol Tambah Akun tetap harus ada
  // =====================================================
  cy.contains(/Tambah Akun/i, {
    timeout: 10000
  })
    .should('exist')
})

it('WP-KARYAWAN-002 - Menguji Tambah Akun dengan role Auditor', () => {

  // =====================================================
  // MASUK KE HALAMAN KARYAWAN
  // =====================================================
  bukaHalamanKaryawan()

  // =====================================================
  // KLIK TAMBAH AKUN
  // =====================================================
  // Tombol Tambah Akun berada di halaman Daftar Karyawan.
  // Cari berdasarkan teks saja, tidak memakai helper lama.
  cy.contains('Tambah Akun', {
    timeout: 15000
  })
    .should('exist')
    .click({ force: true })

  // =====================================================
  // TUNGGU FORM TAMBAH AKUN
  // =====================================================
  cy.get('input[placeholder="Masukkan username"]', {
    timeout: 15000
  })
    .should('exist')

  // =====================================================
  // USERNAME
  // =====================================================
  cy.get('input[placeholder="Masukkan username"]')
    .clear()
    .type(usernameAuditor)

  // =====================================================
  // EMAIL
  // =====================================================
  cy.get('input[placeholder="johndoe@example.com"]')
    .clear()
    .type(`auditor${Date.now()}@example.com`)

  // =====================================================
  // PASSWORD
  // =====================================================
  cy.get('input[placeholder="Masukkan password"]')
    .first()
    .clear()
    .type(password)

  // =====================================================
  // KONFIRMASI PASSWORD
  // =====================================================
  cy.get('input[placeholder="Masukkan konfirmasi password"]')
    .clear()
    .type(password)

  // =====================================================
  // ROLE = AUDITOR
  // =====================================================
  cy.get('select:visible', {
    timeout: 10000
  })
    .then(($selects) => {

      const roleSelect = [...$selects].find((select) => {

        return [...select.options].some((option) =>
          option.textContent.trim()
            .toLowerCase() === 'auditor'
        )

      })

      expect(roleSelect).to.exist

      cy.wrap(roleSelect)
        .select('Auditor', {
          force: true
        })
    })

  // =====================================================
  // STATUS = AKTIF
  // =====================================================
  cy.get('select:visible')
    .then(($selects) => {

      const statusSelect = [...$selects].find((select) => {

        return [...select.options].some((option) =>
          option.textContent.trim()
            .toLowerCase() === 'aktif'
        )

      })

      expect(statusSelect).to.exist

      cy.wrap(statusSelect)
        .select('Aktif', {
          force: true
        })
    })

  // =====================================================
// =====================================================
// SIMPAN
// =====================================================
cy.contains('button', /^Simpan$/i, {
  timeout: 10000
})
  .should('exist')
  .click({ force: true })

// Tunggu request dan refresh data
cy.wait(2500)

// =====================================================
// USER HARUS MUNCUL
// =====================================================
cy.contains(usernameAuditor, {
  timeout: 15000
})
  .should('exist')

// =====================================================
// ROLE HARUS AUDITOR
// Case insensitive
// =====================================================
cy.contains(/Auditor/i, {
  timeout: 15000
})
  .should('exist')
})


 it('WP-KARYAWAN-003 - Menguji Tambah Akun dengan role Kasir Website', () => {

  // =====================================================
  // 1. BUKA HALAMAN KARYAWAN
  // =====================================================
  bukaHalamanKaryawan()

  // Pastikan berada di Daftar Karyawan
  cy.contains('Daftar Karyawan', {
    timeout: 15000
  }).should('exist')


  // =====================================================
  // 2. KLIK TAMBAH AKUN
  // =====================================================
  cy.contains('Tambah Akun', {
    timeout: 15000
  })
    .should('exist')
    .click({ force: true })

  cy.wait(1000)


  // =====================================================
  // 3. PASTIKAN FORM TAMBAH AKUN TERBUKA
  // =====================================================
  cy.get('input[placeholder="Masukkan username"]', {
    timeout: 15000
  })
    .should('exist')


  // =====================================================
  // 4. ISI USERNAME
  // =====================================================
  const usernameKasir = `cypress_kasir_${Date.now()}`
  const emailKasir = `kasir${Date.now()}@example.com`

  cy.get('input[placeholder="Masukkan username"]')
    .clear()
    .type(usernameKasir)


  // =====================================================
  // 5. ISI EMAIL
  // =====================================================
  cy.get('input[placeholder="johndoe@example.com"]', {
    timeout: 10000
  })
    .should('exist')
    .clear()
    .type(emailKasir)


  // =====================================================
  // 6. ISI PASSWORD
  // =====================================================
  cy.get('input[placeholder="Masukkan password"]', {
    timeout: 10000
  })
    .should('exist')
    .clear()
    .type('12345678')


  // =====================================================
  // 7. ISI KONFIRMASI PASSWORD
  // =====================================================
  cy.get('input[placeholder="Masukkan konfirmasi password"]', {
    timeout: 10000
  })
    .should('exist')
    .clear()
    .type('12345678')


  // =====================================================
  // 8. PILIH ROLE KASIR WEBSITE
  // =====================================================
  cy.get('select:visible', {
    timeout: 10000
  }).then(($selects) => {

    let roleSelect = null

    $selects.each((index, element) => {

      const options = [...element.options]
        .map(option => option.textContent.trim())

      if (
        options.some(option =>
          option.toLowerCase() === 'kasir website'
        )
      ) {
        roleSelect = element
        return false
      }
    })

    expect(roleSelect).to.not.be.null

    cy.wrap(roleSelect)
      .select('Kasir Website', {
        force: true
      })
  })


  // =====================================================
  // 9. PILIH STATUS AKTIF
  // =====================================================
  cy.get('select:visible')
    .then(($selects) => {

      let statusSelect = null

      $selects.each((index, element) => {

        const options = [...element.options]
          .map(option => option.textContent.trim())

        if (
          options.some(option =>
            option.toLowerCase() === 'aktif'
          )
        ) {
          statusSelect = element
          return false
        }
      })

      expect(statusSelect).to.not.be.null

      cy.wrap(statusSelect)
        .select('Aktif', {
          force: true
        })
    })


  // =====================================================
  // 10. SIMPAN
  // =====================================================
  cy.contains('button', /^Simpan$/i, {
    timeout: 10000
  })
    .should('exist')
    .click({ force: true })


  // =====================================================
  // 11. TUNGGU PROSES SIMPAN
  // =====================================================
  cy.wait(2500)


  // =====================================================
  // 12. PASTIKAN KEMBALI KE DAFTAR KARYAWAN
  // =====================================================
  cy.contains('Daftar Karyawan', {
    timeout: 15000
  })
    .should('exist')


  // =====================================================
  // 13. PASTIKAN USER BARU MUNCUL
  // =====================================================
  cy.contains(usernameKasir, {
    timeout: 15000
  })
    .should('exist')
})
 it('WP-KARYAWAN-004 - Menguji Tambah Akun dengan role Pegawai', () => {

  // =====================================================
  // 1. BUKA MENU PENGGUNA
  // =====================================================
  cy.contains('Pengguna', {
    timeout: 15000
  })
    .should('exist')
    .click({ force: true })

  cy.wait(500)


  // =====================================================
  // 2. KLIK SUBMENU KARYAWAN
  // =====================================================
  cy.contains('Karyawan', {
    timeout: 15000
  })
    .should('exist')
    .click({ force: true })

  cy.wait(1500)


  // =====================================================
  // 3. PASTIKAN HALAMAN DAFTAR KARYAWAN
  // =====================================================
  cy.contains('Daftar Karyawan', {
    timeout: 15000
  })
    .should('exist')


  // =====================================================
  // 4. KLIK TAMBAH AKUN
  // =====================================================
  cy.contains('Tambah Akun', {
    timeout: 15000
  })
    .should('exist')
    .click({ force: true })

  cy.wait(1000)


  // =====================================================
  // 5. PASTIKAN FORM TAMBAH AKUN TERBUKA
  // =====================================================
  cy.get('input[placeholder="Masukkan username"]', {
    timeout: 15000
  })
    .should('exist')


  // =====================================================
  // 6. ISI USERNAME
  // =====================================================
  const usernamePegawai = `cypress_pegawai_${Date.now()}`
  const emailPegawai = `pegawai${Date.now()}@example.com`

  cy.get('input[placeholder="Masukkan username"]')
    .clear()
    .type(usernamePegawai)


  // =====================================================
  // 7. ISI EMAIL
  // =====================================================
  cy.get('input[placeholder="johndoe@example.com"]', {
    timeout: 10000
  })
    .should('exist')
    .clear()
    .type(emailPegawai)


  // =====================================================
  // 8. ISI PASSWORD
  // =====================================================
  cy.get('input[placeholder="Masukkan password"]', {
    timeout: 10000
  })
    .should('exist')
    .clear()
    .type('12345678')


  // =====================================================
  // 9. ISI KONFIRMASI PASSWORD
  // =====================================================
  cy.get('input[placeholder="Masukkan konfirmasi password"]', {
    timeout: 10000
  })
    .should('exist')
    .clear()
    .type('12345678')


  // =====================================================
  // 10. PILIH ROLE PEGAWAI
  // =====================================================
  cy.get('select:visible', {
    timeout: 10000
  })
    .then(($selects) => {

      let roleSelect = null

      $selects.each((index, element) => {

        const options = [...element.options]
          .map(option =>
            option.textContent.trim()
          )

        if (
          options.some(option =>
            option.toLowerCase() === 'pegawai'
          )
        ) {

          roleSelect = element
          return false
        }
      })

      expect(roleSelect).to.not.be.null

      cy.wrap(roleSelect)
        .select('Pegawai', {
          force: true
        })
    })


  // =====================================================
  // 11. PILIH STATUS AKTIF
  // =====================================================
  cy.get('select:visible')
    .then(($selects) => {

      let statusSelect = null

      $selects.each((index, element) => {

        const options = [...element.options]
          .map(option =>
            option.textContent.trim()
          )

        if (
          options.some(option =>
            option.toLowerCase() === 'aktif'
          )
        ) {

          statusSelect = element
          return false
        }
      })

      expect(statusSelect).to.not.be.null

      cy.wrap(statusSelect)
        .select('Aktif', {
          force: true
        })
    })


  // =====================================================
  // 12. KLIK SIMPAN
  // =====================================================
  cy.contains('button', /^Simpan$/i, {
    timeout: 10000
  })
    .should('exist')
    .click({ force: true })


  // =====================================================
  // 13. TUNGGU PROSES SIMPAN
  // =====================================================
  cy.wait(3000)


  // =====================================================
  // 14. PASTIKAN KEMBALI KE DAFTAR KARYAWAN
  // =====================================================
  cy.contains('Daftar Karyawan', {
    timeout: 15000
  })
    .should('exist')


  // =====================================================
  // 15. PASTIKAN USER BARU MUNCUL
  // =====================================================
  cy.contains(usernamePegawai, {
    timeout: 15000
  })
    .should('exist')

})

 it('WP-KARYAWAN - 005 Cari tombol menu kartu karyawan', () => {

  cy.contains('Pengguna', {
    timeout: 15000
  })
    .should('exist')
    .click({ force: true })

  cy.wait(500)

  cy.contains('Karyawan', {
    timeout: 15000
  })
    .should('exist')
    .click({ force: true })

  cy.wait(1500)

  cy.contains('Daftar Karyawan', {
    timeout: 15000
  })
    .should('exist')

  // =====================================================
  // TAMPILKAN SEMUA BUTTON DI HALAMAN
  // =====================================================
  cy.get('button:visible', {
    timeout: 15000
  })
    .then(($buttons) => {

      cy.log(`JUMLAH BUTTON: ${$buttons.length}`)

      $buttons.each((index, button) => {

        cy.log(
          `========== BUTTON ${index} ==========`
        )

        cy.log(
          button.outerHTML
        )

      })
    })

  // =====================================================
  // TAMPILKAN SEMUA ELEMEN YANG MENGANDUNG SVG
  // =====================================================
  cy.get('svg:visible', {
    timeout: 15000
  })
    .then(($svgs) => {

      cy.log(`JUMLAH SVG: ${$svgs.length}`)

      $svgs.each((index, svg) => {

        cy.log(
          `========== SVG ${index} ==========`
        )

        cy.log(
          svg.outerHTML
        )

      })
    })

})
it('WP-KARYAWAN-006 - Menguji opsi Detail pada menu "..."', () => {

  // =====================================================
  // 1. BUKA MENU PENGGUNA
  // =====================================================
  cy.contains('Pengguna', { timeout: 15000 })
    .should('exist')
    .click({ force: true })

  cy.wait(500)

  // =====================================================
  // 2. BUKA KARYAWAN
  // =====================================================
  cy.contains('Karyawan', { timeout: 15000 })
    .should('exist')
    .click({ force: true })

  cy.wait(1500)

  // =====================================================
  // 3. PASTIKAN DAFTAR KARYAWAN
  // =====================================================
  cy.contains('Daftar Karyawan', { timeout: 15000 })
    .should('exist')

  // =====================================================
  // 4. CARI TOMBOL TITIK TIGA
  // =====================================================
  cy.get('body').then(($body) => {

    let menuButton = null

    $body.find('button').each((index, button) => {

      const $button = Cypress.$(button)

      const text = ($button.text() || '').trim()

      // Abaikan tombol yang punya teks
      if (text !== '') {
        return
      }

      // Harus punya SVG
      if ($button.find('svg').length === 0) {
        return
      }

      const rect = button.getBoundingClientRect()

      if (
        rect.width > 0 &&
        rect.height > 0 &&
        rect.width <= 60 &&
        rect.height <= 60
      ) {
        menuButton = button
        return false
      }
    })

    expect(
      menuButton,
      'Tombol titik tiga karyawan'
    ).to.not.be.null

    cy.wrap(menuButton)
      .scrollIntoView()
      .click({ force: true })
  })

})

// =========================================================
// WP-KARYAWAN-007
// =========================================================
it('WP-KARYAWAN-007 - Menguji tombol Kembali pada halaman detail', () => {

  // =====================================================
  // 1. BUKA HALAMAN KARYAWAN
  // =====================================================
  bukaHalamanKaryawan()

  cy.wait(1500)

  // =====================================================
  // 2. CARI TITIK 3 PADA KARTU KARYAWAN
  // =====================================================
  cy.get('button:visible').then(($buttons) => {

    let menuButton = null

    $buttons.each((index, button) => {

      const $button = Cypress.$(button)

      // Harus ada SVG
      if ($button.find('svg').length === 0) {
        return
      }

      // Tidak mempunyai teks
      if (($button.text() || '').trim() !== '') {
        return
      }

      const rect = button.getBoundingClientRect()

      // Tombol titik 3 biasanya kecil
      if (
        rect.width > 0 &&
        rect.height > 0 &&
        rect.width <= 60 &&
        rect.height <= 60
      ) {
        menuButton = button

        // Ambil tombol pertama yang sesuai
        return false
      }
    })

    expect(
      menuButton,
      'Titik tiga pada kartu Karyawan'
    ).to.not.be.null

    cy.wrap(menuButton)
      .scrollIntoView()
      .click({ force: true })
  })

  // =====================================================
  // 3. TUNGGU DROPDOWN MUNCUL
  // =====================================================
  cy.wait(1000)

  // =====================================================
  // 4. KLIK DETAIL
  // =====================================================
  cy.contains('Detail', {
    timeout: 15000,
    includeShadowDom: true
  })
    .should('exist')
    .click({ force: true })

  // =====================================================
  // 5. TUNGGU HALAMAN DETAIL
  // =====================================================
  cy.wait(1000)

  // =====================================================
  // 6. PASTIKAN MASUK HALAMAN DETAIL
  // =====================================================
  cy.contains('Informasi Dasar', {
    timeout: 15000,
    includeShadowDom: true
  })
    .should('exist')

  // =====================================================
  // 7. KLIK KEMBALI
  // =====================================================
  cy.contains('Kembali', {
    timeout: 15000,
    includeShadowDom: true
  })
    .should('exist')
    .click({ force: true })

  // =====================================================
  // 8. TUNGGU KEMBALI
  // =====================================================
  cy.wait(1000)

  // =====================================================
  // 9. PASTIKAN KEMBALI KE DAFTAR KARYAWAN
  // =====================================================
  cy.contains('Daftar Karyawan', {
    timeout: 15000,
    includeShadowDom: true
  })
    .should('exist')

  // =====================================================
  // 10. PASTIKAN TOMBOL TAMBAH AKUN
  // =====================================================
  cy.contains('Tambah Akun', {
    timeout: 15000,
    includeShadowDom: true
  })
    .should('exist')
})


// =========================================================
// WP-KARYAWAN-008
// =========================================================
it('WP-KARYAWAN-008 - Menguji opsi Edit pada menu "..."', () => {

  // =====================================================
  // 1. BUKA HALAMAN KARYAWAN
  // =====================================================
  bukaHalamanKaryawan()

  cy.wait(1500)

  // =====================================================
  // 2. BUKA MENU TITIK TIGA
  // =====================================================
  cy.get('button:visible').then(($buttons) => {

    let menuButton = null

    $buttons.each((index, button) => {

      const $button = Cypress.$(button)

      // Harus memiliki SVG
      if ($button.find('svg').length === 0) {
        return
      }

      // Tidak memiliki teks
      if (($button.text() || '').trim() !== '') {
        return
      }

      const rect = button.getBoundingClientRect()

      // Ukuran tombol titik tiga
      if (
        rect.width > 0 &&
        rect.height > 0 &&
        rect.width <= 60 &&
        rect.height <= 60
      ) {
        menuButton = button
        return false
      }
    })

    expect(
      menuButton,
      'Tombol titik tiga karyawan'
    ).to.not.be.null

    cy.wrap(menuButton)
      .scrollIntoView()
      .click({ force: true })
  })

  // =====================================================
  // 3. TUNGGU MENU MUNCUL
  // =====================================================
  cy.wait(1000)

  // =====================================================
  // 4. KLIK EDIT
  // =====================================================
  cy.contains('Edit', {
    timeout: 15000,
    includeShadowDom: true
  })
    .should('exist')
    .click({ force: true })

  // =====================================================
  // 5. TUNGGU HALAMAN EDIT
  // =====================================================
  cy.wait(1000)

  // =====================================================
  // 6. PASTIKAN HALAMAN EDIT KARYAWAN
  // =====================================================
  cy.contains('Edit Karyawan', {
    timeout: 15000,
    includeShadowDom: true
  })
    .should('exist')

  // =====================================================
  // 7. PASTIKAN FORM EDIT
  // =====================================================
  cy.contains('Nama Lengkap', {
    timeout: 10000,
    includeShadowDom: true
  })
    .should('exist')

  cy.contains('Email', {
    timeout: 10000,
    includeShadowDom: true
  })
    .should('exist')

  cy.contains('Role', {
    timeout: 10000,
    includeShadowDom: true
  })
    .should('exist')
})


  // =========================================================
  // WP-KARYAWAN-009
  // =========================================================
  it('WP-KARYAWAN-009 - Menguji Hapus pada menu "..."', () => {

    bukaHalamanKaryawan()

    bukaMenuTitikTiga()

    cy.contains(/^Hapus$/i, {
      timeout: 10000
    })
      .should('exist')
      .click({ force: true })

    cy.wait(500)

    cy.contains(/Apakah anda yakin/i, {
      timeout: 10000
    })
      .should('exist')

    cy.contains(/Data User Karyawan akan dihapus/i)
      .should('exist')

    cy.contains('button', /Ya,\s*hapus!/i, {
      timeout: 10000
    })
      .should('exist')
      .click({ force: true })

    cy.contains(/User berhasil dihapus/i, {
      timeout: 15000
    })
      .should('exist')
  })

})