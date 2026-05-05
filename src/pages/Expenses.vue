<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Pelacakan Pengeluaran</h1>
      <button class="btn btn--primary">
        <Plus :size="18" /> Catat Pengeluaran
      </button>
    </div>

    <!-- Top Row: Pie Chart + Summary -->
    <div
      style="
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 28px;
      "
    >
      <!-- Pie Chart -->
      <div class="chart-container">
        <div class="chart-container__title" style="margin-bottom: 12px">
          Kategori Biaya
        </div>
        <DxPieChart
          id="expensePieChart"
          :data-source="expenseCategories"
          type="doughnut"
          :inner-radius="0.55"
          :palette="expenseCategories.map((c) => c.color)"
        >
          <DxSize :height="260" />
          <DxSeries argument-field="label" value-field="value">
            <DxLabel
              :visible="true"
              position="outside"
              :customize-text="pieLabelText"
            >
              <DxConnector :visible="true" :width="1" />
            </DxLabel>
          </DxSeries>
          <DxLegend
            vertical-alignment="bottom"
            horizontal-alignment="center"
            item-text-position="right"
            marker-size="10"
          />
          <DxTooltip :enabled="true" :customize-tooltip="customizePieTooltip" />
        </DxPieChart>
      </div>

      <!-- Summary Panel -->
      <div class="chart-container">
        <div class="chart-container__title" style="margin-bottom: 8px">
          Pengeluaran Bulan Ini
        </div>
        <div
          style="
            font-size: 28px;
            font-weight: 700;
            color: var(--color-text-primary);
            margin-bottom: 4px;
          "
        >
          {{ formatRupiah(totalExpense) }}
        </div>
        <div
          style="
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 20px;
          "
        >
          <span class="kpi-card__trend kpi-card__trend--down">â–¼ -5.2%</span>
          <span style="font-size: 13px; color: var(--color-text-muted)"
            >vs bulan lalu</span
          >
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px">
          <div v-for="cat in expenseCategories" :key="cat.label">
            <div
              style="
                display: flex;
                justify-content: space-between;
                font-size: 13px;
                margin-bottom: 4px;
              "
            >
              <span style="display: flex; align-items: center; gap: 8px">
                <span
                  :style="{
                    width: '8px',
                    height: '8px',
                    borderRadius: '2px',
                    background: cat.color,
                  }"
                ></span>
                {{ cat.label }}
              </span>
              <span
                style="font-weight: 600; font-variant-numeric: tabular-nums"
                >{{ formatRupiah(cat.value) }}</span
              >
            </div>
            <div
              style="
                height: 4px;
                border-radius: 2px;
                background: var(--color-border-light);
              "
            >
              <div
                :style="{
                  height: '100%',
                  borderRadius: '2px',
                  background: cat.color,
                  width: `${cat.percentage}%`,
                  transition: 'width 0.5s ease',
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- DataGrid -->
    <div class="table-container" style="padding: 0">
      <div
        style="
          padding: 18px 22px;
          border-bottom: 1px solid var(--color-border-light);
        "
      >
        <span class="table-container__title">Riwayat Pengeluaran</span>
      </div>
      <DxDataGrid
        :data-source="expenses"
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
        <DxSorting mode="multiple" />

        <DxColumn
          data-field="tanggal"
          caption="Tanggal"
          data-type="date"
          format="dd/MM/yyyy"
          :width="130"
          :sort-order="'desc'"
        />
        <DxColumn data-field="deskripsi" caption="Deskripsi" :min-width="200" />
        <DxColumn
          data-field="kategori"
          caption="Kategori"
          :width="120"
          :cell-render="kategoriCellRender"
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
          data-field="bukti"
          caption="Bukti"
          :width="80"
          alignment="center"
          :allow-filtering="false"
          :cell-render="buktiCellRender"
        />
        <DxColumn
          caption="Aksi"
          :width="100"
          alignment="center"
          :allow-sorting="false"
          :allow-filtering="false"
          :cell-render="actionCellRender"
        />

        <DxPaging :default-page-size="10" />
        <DxPager :show-info="true" info-text="Menampilkan {0}-{1} dari {2}" />

        <DxSummary>
          <DxTotalItem
            column="jumlah"
            summary-type="sum"
            :customize-text="totalText"
          />
        </DxSummary>
      </DxDataGrid>
    </div>
  </div>
</template>

<script>
import { Plus, Edit, Trash2, Paperclip } from "vue-feather-icons";
import { expenses, expenseCategories, formatRupiah } from "../data/mockData";

import {
  DxPieChart,
  DxSeries,
  DxLabel,
  DxConnector,
  DxLegend,
  DxTooltip,
  DxSize,
} from "devextreme-vue/pie-chart";
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxPager,
  DxSorting,
  DxFilterRow,
  DxHeaderFilter,
  DxSummary,
  DxTotalItem,
} from "devextreme-vue/data-grid";

export default {
  name: "Expenses",
  components: {
    Plus,
    Edit,
    Trash2,
    Paperclip,
    DxPieChart,
    DxSeries,
    DxLabel,
    DxConnector,
    DxLegend,
    DxTooltip,
    DxSize,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxPager,
    DxSorting,
    DxFilterRow,
    DxHeaderFilter,
    DxSummary,
    DxTotalItem,
  },
  data() {
    return {
      expenses,
      expenseCategories,
      formatRupiah,
    };
  },
  computed: {
    totalExpense() {
      return this.expenseCategories.reduce((s, c) => s + c.value, 0);
    },
  },
  methods: {
    pieLabelText(pointInfo) {
      return `${pointInfo.percentText}`;
    },
    customizePieTooltip(pointInfo) {
      return {
        text: `${pointInfo.argumentText}\n${formatRupiah(pointInfo.value)}\n${
          pointInfo.percentText
        }`,
      };
    },
    totalText(data) {
      return `Total: ${formatRupiah(data.value)}`;
    },
    amountCellRender(cellInfo) {
      const val = cellInfo.data.jumlah;
      return `<span style="font-weight:600;font-variant-numeric:tabular-nums;color:#E53E3E">-${formatRupiah(
        val,
      )}</span>`;
    },
    kategoriCellRender(cellInfo) {
      const cat = this.expenseCategories.find(
        (c) => c.label === cellInfo.data.kategori,
      );
      const bg = cat ? `${cat.color}18` : "#F1F5F9";
      const co = cat ? cat.color : "#64748B";
      return `<span class="badge" style="background:${bg};color:${co};font-size:12px">${cellInfo.data.kategori}</span>`;
    },
    buktiCellRender(cellInfo) {
      return cellInfo.data.bukti
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent)"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>'
        : '<span style="color:var(--color-text-muted)">â€”</span>';
    },
    actionCellRender() {
      return `<div style="display:flex;gap:4px;justify-content:center">
        <button class="btn btn--icon btn--ghost"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3l4 4-7 7H10v-4l7-7z"/><path d="M4 20h16"/></svg></button>
        <button class="btn btn--icon btn--ghost" style="color:var(--color-danger)"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
      </div>`;
    },
  },
};
</script>

