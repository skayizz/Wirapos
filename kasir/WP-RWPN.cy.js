const EMAIL = 'arliseka08@gmail.com'
const PASSWORD = '12345678'
const T60 = { timeout: 60000 }

Cypress.Commands.add('loginKasirGudang', () => {
  cy.session('kasir-gudang', () => {
    cy.visit('/login')
    cy.get('input[placeholder="Email"]').type(EMAIL)
    cy.get('input[placeholder*="Kata Sandi"]').type(PASSWORD)
    cy.contains('button', /masuk/i).click()
    cy.url().should('include', '/outlets')
  })
})

const bukaRiwayat = () => {
  cy.contains('Penjualan').click()
  cy.contains('a, button', 'Riwayat Penjualan').click()
  cy.url().should('include', '/riwayat-penjualan')
  cy.contains('Nama Kasir').should('be.visible')
}

describe('Menguji halaman Riwayat Penjualan WiraPOS', () => {
  beforeEach(() => {
    cy.loginKasirGudang()
    cy.visit('/outlets')
    cy.contains('button', 'Add Product', T60).should('be.visible')
  })

  // WP-RWPN-001
  it('Menguji submenu Riwayat Penjualan', () => {
    cy.contains('Penjualan').click()
    cy.contains('a, button', 'Riwayat Penjualan').click()
    cy.url().should('include', '/riwayat-penjualan')
    cy.contains('Riwayat Penjualan pusat').should('be.visible')
    cy.contains('Nama Kasir').should('be.visible')
    cy.contains('Nama Pembeli').should('be.visible')
    cy.contains('Jumlah Dibeli').should('be.visible')
    cy.contains('Total Harga').should('be.visible')
    cy.contains('Tanggal').should('be.visible')
    cy.contains('Status').should('be.visible')
    cy.contains('Aksi').should('be.visible')
    cy.get('input[placeholder="Cari riwayat penjualan..."]').should('be.visible')
    cy.contains('button', 'Setup Printer').should('be.visible')
    cy.contains('button', 'Export Riwayat Penjualan').should('be.visible')
  })

  // WP-RWPN-002
  it('Menguji tombol Kwitansi/Nota pada Aksi', () => {
    bukaRiwayat()
    cy.get('tbody tr').first().find('button').eq(0).click()
    cy.contains('div.fixed.inset-0', 'Kwitansi / Nota').within(() => {
      cy.contains('keonhooo').should('be.visible')
      cy.contains('Alamat Outlet').should('be.visible')
      cy.contains('Nama Kasir :').should('be.visible')
      cy.contains('Nama Pembeli :').should('be.visible')
      cy.contains('Produk').should('be.visible')
      cy.contains('Subtotal').should('be.visible')
      cy.contains(/#\d{10,}/).should('be.visible')
      cy.contains('Terimakasih atas kunjungan anda!').should('be.visible')
      cy.contains('button', 'Tutup').should('be.visible')
      cy.contains('button', 'Cetak ke Printer').should('be.visible')
    })
    cy.contains('button', 'Tutup').click()
    cy.contains('Kwitansi / Nota').should('not.exist')
  })

  // WP-RWPN-003
  it('Menguji tombol Cetak pada Aksi', () => {
    bukaRiwayat()
    cy.get('tbody tr').first().find('button').eq(1).click()
    cy.contains('Koneksi').should('be.visible')
    cy.contains('Pilih Printer').should('be.visible')
    cy.contains('Siap Cetak').should('be.visible')
    cy.contains('QZ Tray Belum Terhubung').should('be.visible')
    cy.contains('button', 'Hubungkan ke QZ Tray').should('be.visible')
    cy.contains('Download QZ Tray').should('be.visible')
  })

    // WP-RWPN-004
  it('Menguji tombol Detail pada Aksi', () => {
    bukaRiwayat()
    cy.get('tbody tr').first().find('button, a').last().click()
    cy.url().should('include', '/detail')
    cy.contains('Detail Riwayat Transaksi').should('be.visible')
    cy.contains('Transaksi Berhasil').should('be.visible')
    cy.contains('Nama Pembeli').should('be.visible')
    cy.contains('Nama Kasir').should('be.visible')
    cy.contains('Sub Total').should('be.visible')
    cy.contains('Diskon Transaksi').should('be.visible')
    cy.contains('Pajak').should('be.visible')
    cy.contains('button', 'Lihat Kwitansi/Nota').should('be.visible')
    cy.contains('button', 'Cetak Kwitansi/Nota').should('be.visible')
    cy.contains('Kembali').should('be.visible')
    cy.contains('Kembali').click()
    cy.url().should('include', '/riwayat-penjualan')
    cy.url().should('not.include', '/detail')
    cy.contains('Nama Kasir').should('be.visible')
  })
  
  // WP-RWPN-005
  it('Menguji tombol Export Riwayat Penjualan', () => {
    bukaRiwayat()
    cy.contains('button', 'Export Riwayat Penjualan').click()
    cy.contains('File berhasil diunduh', T60).should('be.visible')
  })
})