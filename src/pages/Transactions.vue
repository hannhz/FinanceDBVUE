<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Manajemen Transaksi</h1>
      <button class="btn btn--primary">
        <Plus :size="18" /> Tambah Transaksi
      </button>
    </div>

    <div class="table-container" style="padding: 0">
      <DxDataGrid
        :data-source="allTransactions"
        :show-borders="false"
        :show-row-lines="true"
        :show-column-lines="false"
        :row-alternation-enabled="true"
        :hover-state-enabled="true"
        column-auto-width
        :allow-column-reordering="true"
        :allow-column-resizing="true"
        column-resizing-mode="widget"
        :style="{ fontSize: '14px' }"
      >
        <DxFilterRow :visible="true" />
        <DxHeaderFilter :visible="true" />
        <DxSearchPanel
          :visible="true"
          placeholder="Cari deskripsi, klien..."
          :width="280"
        />
        <DxSorting mode="multiple" />
        <DxSelection mode="multiple" show-check-boxes-mode="always" />
        <DxColumnChooser :enabled="true" mode="select" title="Pilih Kolom" />

        <DxToolbar>
          <DxItem name="searchPanel" />
          <DxItem name="columnChooserButton" />
          <DxItem location="after">
            <button class="btn btn--secondary btn--sm" @click="exportGrid">
              <Download :size="16" /> Ekspor
            </button>
          </DxItem>
        </DxToolbar>

        <DxColumn
          data-field="id"
          caption="No"
          :width="60"
          alignment="center"
          :allow-filtering="false"
        />
        <DxColumn
          data-field="tanggal"
          caption="Tanggal"
          data-type="date"
          format="dd/MM/yyyy"
          :width="130"
          :sort-order="'desc'"
        />
        <DxColumn data-field="deskripsi" caption="Deskripsi" :min-width="180" />
        <DxColumn
          data-field="kategori"
          caption="Kategori"
          :width="130"
          :cell-render="kategoriCellRender"
        />
        <DxColumn data-field="klien" caption="Klien/Vendor" :width="170" />
        <DxColumn
          data-field="jumlah"
          caption="Jumlah (Rp)"
          :width="170"
          alignment="right"
          data-type="number"
          :cell-render="amountCellRender"
        />
        <DxColumn
          data-field="status"
          caption="Status"
          :width="130"
          alignment="center"
          :cell-render="statusCellRender"
        />

        <DxPaging :default-page-size="10" />
        <DxPager
          :show-page-size-selector="true"
          :allowed-page-sizes="[5, 10, 25, 50]"
          :show-info="true"
          info-text="Menampilkan {0}-{1} dari {2}"
          :show-navigation-buttons="true"
        />
      </DxDataGrid>
    </div>
  </div>
</template>

<script>
import { Plus, Download } from "vue-feather-icons";
import {
  recentTransactions,
  formatRupiah,
  statusLabels,
} from "../data/mockData";

import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxPager,
  DxSorting,
  DxFilterRow,
  DxHeaderFilter,
  DxSearchPanel,
  DxToolbar,
  DxItem,
  DxSelection,
  DxColumnChooser,
} from "devextreme-vue/data-grid";

export default {
  name: "Transactions",
  components: {
    Plus,
    Download,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxPager,
    DxSorting,
    DxFilterRow,
    DxHeaderFilter,
    DxSearchPanel,
    DxToolbar,
    DxItem,
    DxSelection,
    DxColumnChooser,
  },
  data() {
    // Gabungkan data
    const allTransactions = [
      ...recentTransactions,
      {
        id: 9,
        tanggal: "2026-04-22",
        deskripsi: "Langganan Software Adobe",
        kategori: "Pengeluaran",
        klien: "Adobe Systems",
        jumlah: -450000,
        status: "dibatalkan",
      },
      {
        id: 10,
        tanggal: "2026-04-20",
        deskripsi: "Refund Layanan Server",
        kategori: "Pemasukan",
        klien: "AWS Inc.",
        jumlah: 500000,
        status: "selesai",
      },
      {
        id: 11,
        tanggal: "2026-04-18",
        deskripsi: "Sewa Gudang April",
        kategori: "Pengeluaran",
        klien: "PT Gudang Utama",
        jumlah: -15000000,
        status: "selesai",
      },
      {
        id: 12,
        tanggal: "2026-04-15",
        deskripsi: "Proyek Redesign Website",
        kategori: "Pemasukan",
        klien: "CV Kreatif Digital",
        jumlah: 22000000,
        status: "selesai",
      },
    ];
    return {
      allTransactions,
      formatRupiah,
      statusLabels,
    };
  },
  methods: {
    exportGrid() {
      // Implementasi ekspor
      console.log("Export grid");
    },
    amountCellRender(cellInfo) {
      const val = cellInfo.data.jumlah;
      const color = val >= 0 ? "#16A34A" : "#E53E3E";
      const sign = val >= 0 ? "+" : "";
      return `<span style="font-weight:600;font-variant-numeric:tabular-nums;color:${color}">${sign}${formatRupiah(
        val,
      )}</span>`;
    },
    kategoriCellRender(cellInfo) {
      const isIncome = cellInfo.data.kategori === "Pemasukan";
      const badgeClass = isIncome ? "badge--selesai" : "badge--terlambat";
      return `<span class="badge ${badgeClass}" style="font-size:11px">${cellInfo.data.kategori}</span>`;
    },
    statusCellRender(cellInfo) {
      const status = cellInfo.data.status;
      const label = this.statusLabels[status];
      return `<span class="badge badge--${status}">${label}</span>`;
    },
  },
};
</script>

