const EMAIL_ADMIN = 'faisalgaming1245@gmail.com'
const PASSWORD_ADMIN = '12345678'
const T60 = { timeout: 60000 }

const loginAdmin = () => {
  cy.session('admin', () => {
    cy.visit('/login')
    cy.get('body').then(($body) => {
      if ($body.find('input[placeholder="Email"]').length === 0) {
        cy.wait(5000)
        cy.reload()
      }
    })
    cy.get('input[placeholder="Email"]', T60).type(EMAIL_ADMIN)
    cy.get('input[placeholder*="Kata Sandi"]', T60).type(PASSWORD_ADMIN)
    cy.contains('button', /masuk/i, T60).click()
    cy.url(T60).should('not.include', '/login')
  })
}

const bukaMenuKartu = (nama) => {
  cy.get('body').then(($body) => {
    const selector = nama ? `h3:contains("${nama}")` : 'h3'
    if ($body.find(selector).length === 0) {
      cy.reload()
      cy.contains('button', 'Tambah Akun', T60).should('be.visible')
    }
    const target = nama ? cy.contains('h3', nama) : cy.get('h3').first()
    target
      .closest('div[class*="rounded"], div[class*="bg-white"], div[class*="shadow"]')
      .find('button')
      .first()
      .click()
  })
}

const tambahAkun = (nama, role) => {
  cy.contains('button', 'Tambah Akun').click()
  cy.get('input[placeholder*="Username" i], input[name*="user" i]').first().type(nama)
  cy.get('input[placeholder*="example.com"]').type(`${nama}@test.com`)
  cy.get('input[type="password"]').first().type('12345678')
  cy.get('input[type="password"]').last().type('12345678')
  cy.get('select').eq(0).select(role)
  cy.get('select').eq(1).select('Aktif')
  cy.contains('button', 'Simpan').click()
}

describe('Menguji halaman Daftar Karyawan WiraPOS', () => {
  beforeEach(() => {
    cy.wait(8000)
    loginAdmin()
    cy.visit('/users')
    cy.contains('button', 'Tambah Akun', T60).should('be.visible')
  })

  // WP-KARYAWAN-001
  it('Menguji submenu Karyawan', () => {
    cy.contains('Pengguna', T60).click()
    cy.contains('a, button', 'Karyawan', T60).click()
    cy.contains('Daftar Karyawan').should('be.visible')
    cy.get('input[placeholder*="Cari"]').should('be.visible')
    cy.contains('button', 'Tambah Akun').should('be.visible')
  })

  // WP-KARYAWAN-002
  it('Menguji Tambah Akun dengan role Auditor', () => {
    const nama = `auditor${Date.now()}`
    tambahAkun(nama, 'Auditor')
    cy.contains(nama, T60).should('be.visible')
    cy.contains(/auditor/i).should('be.visible')
  })

  // WP-KARYAWAN-003
  it('Menguji Tambah Akun dengan role Kasir Website', () => {
    const nama = `kasirweb${Date.now()}`
    tambahAkun(nama, 'Kasir Website')
    cy.contains(nama, T60).should('be.visible')
    cy.contains(/cashier/i).should('be.visible')
  })

  // WP-KARYAWAN-004
  it('Menguji Tambah Akun dengan role Pegawai', () => {
    const nama = `pegawai${Date.now()}`
    tambahAkun(nama, 'Pegawai')
    cy.contains(nama, T60).should('be.visible')
    cy.contains(/employee/i).should('be.visible')
  })

  // WP-KARYAWAN-005
  it('Menguji menu "..." pada kartu karyawan', () => {
    bukaMenuKartu()
    cy.contains('Detail').should('be.visible')
    cy.contains('Edit').should('be.visible')
    cy.contains('Hapus').should('be.visible')
  })

  // WP-KARYAWAN-006
  it('Menguji opsi Detail pada menu "..."', () => {
    bukaMenuKartu()
    cy.contains('Detail').click()
    cy.contains('Detail User', T60).should('be.visible')
    cy.contains('Informasi Dasar').should('be.visible')
    cy.contains('Nama Lengkap').should('be.visible')
    cy.contains('Email').should('be.visible')
    cy.contains('Role').should('be.visible')
    cy.contains('Bergabung Pada').should('be.visible')
    cy.contains('Terhubung Dengan').should('be.visible')
    cy.contains('Ringkasan Aktivitas').should('be.visible')
    cy.contains('Kembali').should('be.visible')
  })

  // WP-KARYAWAN-007
  it('Menguji tombol Kembali pada halaman detail', () => {
    bukaMenuKartu()
    cy.contains('Detail').click()
    cy.contains('Kembali').click()
    cy.url().should('include', '/users')
    cy.contains('button', 'Tambah Akun', T60).should('be.visible')
  })

  // WP-KARYAWAN-008
  it('Menguji Edit dan Simpan data karyawan', () => {
    const namaLama = `edit${Date.now()}`
    const namaBaru = `${namaLama}x`
    tambahAkun(namaLama, 'Pegawai')
    cy.contains(namaLama, T60).should('be.visible')
    bukaMenuKartu(namaLama)
    cy.contains('Edit').click()
    cy.get('input[placeholder*="Username" i], input[name*="user" i], input[type="text"]').first().clear()
    cy.wait(500)
    cy.get('input[placeholder*="Username" i], input[name*="user" i], input[type="text"]').first().type(namaBaru)
    cy.contains('button', 'Simpan').click()
    cy.contains('Pengguna berhasil diperbarui', T60).should('be.visible')
    cy.contains(namaBaru, T60).should('be.visible')
  })

  // WP-KARYAWAN-009
  it('Menguji Hapus pada menu "..."', () => {
    const nama = `hapus${Date.now()}`
    tambahAkun(nama, 'Pegawai')
    cy.contains(nama, T60).should('be.visible')
    cy.wait(2000)
    bukaMenuKartu(nama)
    cy.contains('Hapus').click()
    cy.contains('Apakah anda yakin').should('be.visible')
    cy.contains('button', /Ya, hapus/i).click()
    cy.contains('User berhasil dihapus', T60).should('be.visible')
    cy.contains(nama).should('not.exist')
  })
})