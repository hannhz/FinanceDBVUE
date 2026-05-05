<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Pengaturan</h1>
    </div>

    <!-- Tabs -->
    <div
      style="
        display: flex;
        gap: 4px;
        border-bottom: 1px solid var(--color-border);
        margin-bottom: 28px;
      "
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :style="{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 20px',
          fontSize: '14px',
          fontWeight: activeTab === tab.id ? 600 : 500,
          color:
            activeTab === tab.id
              ? 'var(--color-primary)'
              : 'var(--color-text-secondary)',
          borderBottom: `2px solid ${
            activeTab === tab.id ? 'var(--color-primary)' : 'transparent'
          }`,
          background: 'none',
          cursor: 'pointer',
          marginBottom: '-1px',
        }"
      >
        <component :is="tab.icon" :size="18" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Profil Perusahaan -->
    <div
      v-if="activeTab === 'profil'"
      class="chart-container"
      style="max-width: 700px"
    >
      <div
        style="
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--color-border-light);
        "
      >
        <div
          style="
            width: 72px;
            height: 72px;
            border-radius: var(--radius-lg);
            background: linear-gradient(135deg, var(--color-primary), #2c5282);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 800;
            color: white;
          "
        >
          SAE
        </div>
        <div>
          <div style="font-size: 18px; font-weight: 700">
            CV. Sejahtera Abadi Ekatama
          </div>
          <div
            style="
              font-size: 13px;
              color: var(--color-text-muted);
              margin-top: 2px;
            "
          >
            Diperbarui: 01 Mei 2026
          </div>
          <button
            class="btn btn--ghost btn--sm"
            style="margin-top: 6px; padding: 4px 0"
          >
            <Upload :size="14" /> Ubah Logo
          </button>
        </div>
      </div>
      <div
        v-for="(field, idx) in companyFields"
        :key="idx"
        style="
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 18px;
        "
      >
        <label
          style="
            font-size: 13px;
            font-weight: 600;
            color: var(--color-text-secondary);
          "
          >{{ field.label }}</label
        >
        <input
          class="filter-bar__input"
          v-model="field.value"
          style="width: 100%"
        />
      </div>
      <div style="display: flex; gap: 12px; margin-top: 8px">
        <button class="btn btn--primary">
          <Save :size="16" /> Simpan Perubahan
        </button>
      </div>
    </div>

    <!-- Manajemen User -->
    <div v-if="activeTab === 'user'" class="table-container">
      <div class="table-container__header">
        <span class="table-container__title">Daftar Pengguna</span>
        <button class="btn btn--primary btn--sm">+ Tambah User</button>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px">
        <thead>
          <tr
            style="
              background: var(--color-background);
              border-bottom: 1px solid var(--color-border);
            "
          >
            <th
              v-for="h in userHeaders"
              :key="h"
              style="
                padding: 12px 16px;
                text-align: left;
                font-size: 12px;
                font-weight: 600;
                color: var(--color-text-secondary);
                text-transform: uppercase;
              "
            >
              {{ h }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(u, idx) in mockUsers"
            :key="idx"
            style="border-bottom: 1px solid var(--color-border-light)"
          >
            <td style="padding: 13px 16px; font-weight: 500">{{ u.nama }}</td>
            <td style="padding: 13px 16px; color: var(--color-text-secondary)">
              {{ u.email }}
            </td>
            <td style="padding: 13px 16px">
              <span class="badge badge--draft">{{ u.role }}</span>
            </td>
            <td style="padding: 13px 16px">
              <span
                :class="`badge ${
                  u.status ? 'badge--selesai' : 'badge--dibatalkan'
                }`"
                >{{ u.status ? "Aktif" : "Nonaktif" }}</span
              >
            </td>
            <td style="padding: 13px 16px">
              <button class="btn btn--ghost btn--sm">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Preferensi -->
    <div
      v-if="activeTab === 'preferensi'"
      class="chart-container"
      style="max-width: 500px"
    >
      <div
        v-for="(field, idx) in prefFields"
        :key="idx"
        style="margin-bottom: 18px"
      >
        <label
          style="
            display: block;
            font-size: 13px;
            font-weight: 600;
            color: var(--color-text-secondary);
            margin-bottom: 6px;
          "
          >{{ field.label }}</label
        >
        <select
          class="filter-bar__select"
          style="width: 100%"
          v-model="field.selected"
        >
          <option v-for="opt in field.options" :key="opt">{{ opt }}</option>
        </select>
      </div>
      <button class="btn btn--primary" style="margin-top: 8px">
        <Save :size="16" /> Simpan Perubahan
      </button>
    </div>

    <!-- Kategori -->
    <div
      v-if="activeTab === 'kategori'"
      class="chart-container"
      style="max-width: 500px"
    >
      <div style="font-size: 14px; font-weight: 600; margin-bottom: 16px">
        Kategori Transaksi
      </div>
      <div
        v-for="(cat, idx) in categoryList"
        :key="idx"
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid var(--color-border-light);
        "
      >
        <span style="font-size: 14px">{{ cat }}</span>
        <button class="btn btn--ghost btn--sm">Edit</button>
      </div>
      <button class="btn btn--secondary btn--sm" style="margin-top: 16px">
        + Tambah Kategori
      </button>
    </div>
  </div>
</template>

<script>
import {
  Building2,
  Users,
  Tag,
  SlidersHorizontal,
  Save,
  Upload,
} from "vue-feather-icons";

export default {
  name: "Settings",
  components: { Building2, Users, Tag, SlidersHorizontal, Save, Upload },
  data() {
    return {
      activeTab: "profil",
      tabs: [
        { id: "profil", label: "Profil Perusahaan", icon: "Building2" },
        { id: "user", label: "Manajemen User", icon: "Users" },
        { id: "kategori", label: "Kategori", icon: "Tag" },
        { id: "preferensi", label: "Preferensi", icon: "SlidersHorizontal" },
      ],
      companyFields: [
        { label: "Nama Perusahaan", value: "CV. Sejahtera Abadi Ekatama" },
        { label: "NPWP", value: "01.234.567.8-901.000" },
        { label: "Alamat", value: "Jl. Industri No. 45, Surabaya" },
        { label: "Telepon", value: "(031) 555-1234" },
        { label: "Email", value: "admin@sae.co.id" },
      ],
      mockUsers: [
        {
          nama: "Ahmad Suryadi",
          email: "ahmad@sae.co.id",
          role: "Owner",
          status: true,
        },
        {
          nama: "Siti Rahayu",
          email: "siti@sae.co.id",
          role: "Manajer Keuangan",
          status: true,
        },
        {
          nama: "Budi Hartono",
          email: "budi@sae.co.id",
          role: "Staf Admin",
          status: true,
        },
        {
          nama: "Dewi Lestari",
          email: "dewi@sae.co.id",
          role: "Staf Admin",
          status: false,
        },
      ],
      userHeaders: ["Nama", "Email", "Role", "Status", "Aksi"],
      prefFields: [
        {
          label: "Mata Uang",
          options: ["IDR - Rupiah", "USD - Dollar"],
          selected: "IDR - Rupiah",
        },
        {
          label: "Format Tanggal",
          options: ["DD/MM/YYYY", "YYYY-MM-DD", "MM/DD/YYYY"],
          selected: "DD/MM/YYYY",
        },
        {
          label: "Zona Waktu",
          options: ["WIB (UTC+7)", "WITA (UTC+8)", "WIT (UTC+9)"],
          selected: "WIB (UTC+7)",
        },
        {
          label: "Awal Tahun Fiskal",
          options: ["Januari", "April", "Juli"],
          selected: "Januari",
        },
      ],
      categoryList: [
        "Gaji",
        "Utilitas",
        "Material",
        "Pajak",
        "Sewa",
        "Lainnya",
      ],
    };
  },
};
</script>

