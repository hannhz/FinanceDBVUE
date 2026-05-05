// Mock data untuk development — akan diganti dengan API Laravel

export const kpiData = [
  {
    id: 'saldo',
    label: 'Saldo Kas Aktif',
    value: 1247500000,
    trend: 12.5,
    direction: 'up',
    color: 'green',
  },
  {
    id: 'piutang',
    label: 'Total Piutang',
    value: 458300000,
    trend: 3.2,
    direction: 'up',
    color: 'yellow',
  },
  {
    id: 'hutang',
    label: 'Hutang Jatuh Tempo',
    value: 285000000,
    trend: 8.1,
    direction: 'down',
    color: 'orange',
  },
  {
    id: 'profit',
    label: 'Net Profit Bulan Ini',
    value: 672150000,
    trend: 15.7,
    direction: 'up',
    color: 'blue',
  },
];

export const recentTransactions = [
  { id: 1, tanggal: '2026-05-01', deskripsi: 'Bayar Tagihan PLN', kategori: 'Pengeluaran', klien: 'PLN Persero', jumlah: -750000, status: 'selesai' },
  { id: 2, tanggal: '2026-05-01', deskripsi: 'Invoice Proyek Web #1023', kategori: 'Pemasukan', klien: 'CV Sukses Mandiri', jumlah: 15000000, status: 'selesai' },
  { id: 3, tanggal: '2026-04-30', deskripsi: 'Gaji Karyawan April', kategori: 'Pengeluaran', klien: 'Internal', jumlah: -45000000, status: 'selesai' },
  { id: 4, tanggal: '2026-04-29', deskripsi: 'Deposit Proyek ABC', kategori: 'Pemasukan', klien: 'PT Global Media', jumlah: 8000000, status: 'pending' },
  { id: 5, tanggal: '2026-04-28', deskripsi: 'Biaya Domain & Hosting', kategori: 'Pengeluaran', klien: 'Niagahoster', jumlah: -1250000, status: 'selesai' },
  { id: 6, tanggal: '2026-04-27', deskripsi: 'Royalti Penjualan Q1', kategori: 'Pemasukan', klien: 'PT Sentosa Group', jumlah: 3750000, status: 'pending' },
  { id: 7, tanggal: '2026-04-25', deskripsi: 'Pembelian Laptop Baru', kategori: 'Pengeluaran', klien: 'Tokopedia', jumlah: -12499000, status: 'selesai' },
  { id: 8, tanggal: '2026-04-24', deskripsi: 'Pembayaran Invoice #987', kategori: 'Pemasukan', klien: 'RS Harapan Sehat', jumlah: 42000000, status: 'selesai' },
];

export const cashFlowData = [
  { tanggal: '01 Apr', pemasukan: 25000000, pengeluaran: 18000000 },
  { tanggal: '05 Apr', pemasukan: 32000000, pengeluaran: 22000000 },
  { tanggal: '10 Apr', pemasukan: 28000000, pengeluaran: 35000000 },
  { tanggal: '15 Apr', pemasukan: 45000000, pengeluaran: 20000000 },
  { tanggal: '20 Apr', pemasukan: 38000000, pengeluaran: 42000000 },
  { tanggal: '25 Apr', pemasukan: 55000000, pengeluaran: 30000000 },
  { tanggal: '30 Apr', pemasukan: 42000000, pengeluaran: 48000000 },
  { tanggal: '01 Mei', pemasukan: 60000000, pengeluaran: 25000000 },
  { tanggal: '04 Mei', pemasukan: 35000000, pengeluaran: 28000000 },
];

export const invoices = [
  { id: 'INV-001', klien: 'PT Maju Bersama', tanggalBuat: '2026-04-01', jatuhTempo: '2026-05-01', jumlah: 25000000, status: 'lunas' },
  { id: 'INV-002', klien: 'CV Berkah Sejahtera', tanggalBuat: '2026-04-05', jatuhTempo: '2026-05-05', jumlah: 18000000, status: 'belum' },
  { id: 'INV-003', klien: 'RS Harapan Sehat', tanggalBuat: '2026-04-10', jatuhTempo: '2026-05-10', jumlah: 42000000, status: 'sebagian' },
  { id: 'INV-004', klien: 'PT Sentosa Group', tanggalBuat: '2026-03-15', jatuhTempo: '2026-04-15', jumlah: 30000000, status: 'terlambat' },
  { id: 'INV-005', klien: 'CV Digital Labs', tanggalBuat: '2026-04-20', jatuhTempo: '2026-05-20', jumlah: 12000000, status: 'draft' },
  { id: 'INV-006', klien: 'PT IndoMakmur', tanggalBuat: '2026-04-22', jatuhTempo: '2026-05-22', jumlah: 8500000, status: 'lunas' },
];

export const expenses = [
  { id: 1, tanggal: '2026-05-01', deskripsi: 'Gaji Karyawan Mei', kategori: 'Gaji', jumlah: 45000000, bukti: true },
  { id: 2, tanggal: '2026-04-28', deskripsi: 'Tagihan Listrik Kantor', kategori: 'Utilitas', jumlah: 2500000, bukti: true },
  { id: 3, tanggal: '2026-04-25', deskripsi: 'Beli Sparepart Mesin', kategori: 'Material', jumlah: 8750000, bukti: true },
  { id: 4, tanggal: '2026-04-20', deskripsi: 'Pajak Bulanan', kategori: 'Pajak', jumlah: 6375000, bukti: false },
  { id: 5, tanggal: '2026-04-18', deskripsi: 'Sewa Gudang April', kategori: 'Sewa', jumlah: 15000000, bukti: true },
  { id: 6, tanggal: '2026-04-15', deskripsi: 'Internet & Telepon', kategori: 'Utilitas', jumlah: 1800000, bukti: true },
];

export const expenseCategories = [
  { label: 'Gaji', value: 51000000, percentage: 40, color: '#3182CE' },
  { label: 'Material', value: 31875000, percentage: 25, color: '#ED8936' },
  { label: 'Utilitas', value: 19125000, percentage: 15, color: '#38B2AC' },
  { label: 'Pajak', value: 12750000, percentage: 10, color: '#E53E3E' },
  { label: 'Lainnya', value: 12750000, percentage: 10, color: '#A0AEC0' },
];

// Formatter Rupiah
export function formatRupiah(value) {
  const abs = Math.abs(value);
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(abs);
  return value < 0 ? `-${formatted}` : formatted;
}

export function formatRupiahShort(value) {
  const abs = Math.abs(value);
  if (abs >= 1e9) return `Rp ${(abs / 1e9).toFixed(1)} M`;
  if (abs >= 1e6) return `Rp ${(abs / 1e6).toFixed(0)} Jt`;
  if (abs >= 1e3) return `Rp ${(abs / 1e3).toFixed(0)} Rb`;
  return `Rp ${abs}`;
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export const statusLabels = {
  selesai: 'Selesai',
  pending: 'Pending',
  dibatalkan: 'Dibatalkan',
  lunas: 'Lunas',
  belum: 'Belum Bayar',
  terlambat: 'Terlambat',
  draft: 'Draft',
  sebagian: 'Sebagian',
};
