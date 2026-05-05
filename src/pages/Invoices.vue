<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Manajemen Invoice</h1>
      <button class="btn btn--primary">
        <Plus :size="18" /> Buat Invoice Baru
      </button>
    </div>

    <!-- Summary Cards -->
    <div
      style="
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        margin-bottom: 24px;
      "
    >
      <div
        v-for="(card, idx) in summaryCards"
        :key="idx"
        class="kpi-card"
        style="padding: 18px"
      >
        <div
          style="
            font-size: 13px;
            color: var(--color-text-secondary);
            margin-bottom: 6px;
          "
        >
          {{ card.label }}
        </div>
        <div :style="{ fontSize: '28px', fontWeight: 700, color: card.color }">
          {{ card.value }}
        </div>
      </div>
    </div>

    <!-- DataGrid -->
    <div class="table-container" style="padding: 0">
      <DxDataGrid
        :data-source="invoices"
        :show-borders="false"
        :show-row-lines="true"
        :show-column-lines="false"
        :row-alternation-enabled="true"
        :hover-state-enabled="true"
        column-auto-width
        :style="{ fontSize: '14px' }"
      >
        <DxFilterRow :visible="true" />
        <DxHeaderFilter :visible="true" />
        <DxSearchPanel
          :visible="true"
          placeholder="Cari nomor invoice / klien..."
          :width="300"
        />
        <DxSorting mode="multiple" />

        <DxToolbar>
          <DxItem name="searchPanel" />
        </DxToolbar>

        <DxColumn
          data-field="id"
          caption="No Invoice"
          :width="120"
          css-class="dx-font-weight-bold"
        />
        <DxColumn data-field="klien" caption="Klien" :min-width="160" />
        <DxColumn
          data-field="tanggalBuat"
          caption="Tanggal Dibuat"
          data-type="date"
          format="dd/MM/yyyy"
          :width="140"
        />
        <DxColumn
          data-field="jatuhTempo"
          caption="Jatuh Tempo"
          data-type="date"
          :width="140"
          :cell-render="dueDateCellRender"
        />
        <DxColumn
          data-field="jumlah"
          caption="Jumlah (Rp)"
          :width="160"
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
        <DxColumn
          caption="Aksi"
          :width="160"
          alignment="center"
          :allow-sorting="false"
          :allow-filtering="false"
          :cell-render="actionCellRender"
        />

        <DxPaging :default-page-size="10" />
        <DxPager
          :show-info="true"
          info-text="Menampilkan {0}-{1} dari {2}"
          :show-navigation-buttons="true"
        />
      </DxDataGrid>
    </div>
  </div>
</template>

<script>
import { Plus, Eye, Edit, Send, Trash2 } from "vue-feather-icons";
import { invoices, formatRupiah, statusLabels } from "../data/mockData";

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
} from "devextreme-vue/data-grid";

export default {
  name: "Invoices",
  components: {
    Plus,
    Eye,
    Edit,
    Send,
    Trash2,
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
  },
  data() {
    return {
      invoices,
      formatRupiah,
      statusLabels,
    };
  },
  computed: {
    summaryCards() {
      return [
        {
          label: "Total Invoice",
          value: this.invoices.length,
          color: "var(--color-primary)",
        },
        {
          label: "Belum Bayar",
          value: this.invoices.filter((i) => i.status === "belum").length,
          color: "var(--color-warning)",
        },
        {
          label: "Terlambat",
          value: this.invoices.filter((i) => i.status === "terlambat").length,
          color: "var(--color-danger)",
        },
        {
          label: "Lunas Bulan Ini",
          value: this.invoices.filter((i) => i.status === "lunas").length,
          color: "#16A34A",
        },
      ];
    },
  },
  methods: {
    dueDateCellRender(cellInfo) {
      const isOverdue = cellInfo.data.status === "terlambat";
      const color = isOverdue ? "var(--color-danger)" : "inherit";
      const fontWeight = isOverdue ? "600" : "400";
      const date = new Date(cellInfo.data.jatuhTempo).toLocaleDateString(
        "id-ID",
        { day: "2-digit", month: "2-digit", year: "numeric" },
      );
      return `<span style="color:${color};font-weight:${fontWeight}">${date}</span>`;
    },
    amountCellRender(cellInfo) {
      return `<span style="font-weight:600;font-variant-numeric:tabular-nums">${formatRupiah(
        cellInfo.data.jumlah,
      )}</span>`;
    },
    statusCellRender(cellInfo) {
      const status = cellInfo.data.status;
      const label = this.statusLabels[status];
      return `<span class="badge badge--${status}">${label}</span>`;
    },
    actionCellRender() {
      return `<div style="display:flex;gap:2px;justify-content:center">
        <button class="btn btn--icon btn--ghost" title="Lihat"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
        <button class="btn btn--icon btn--ghost" title="Edit"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3l4 4-7 7H10v-4l7-7z"/></svg></button>
        <button class="btn btn--icon btn--ghost" title="Kirim"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
        <button class="btn btn--icon btn--ghost" title="Hapus" style="color:var(--color-danger)"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
      </div>`;
    },
  },
};
</script>

