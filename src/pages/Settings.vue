<template>
  <div>
    <div class="page-header"><h1 class="page-title">Pengaturan</h1></div>

    <div class="settings-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'settings-tab',
          { 'settings-tab--active': activeTab === tab.id },
        ]"
      >
        <component :is="tab.iconComponent" :size="18" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Profil Perusahaan -->
    <div
      v-if="activeTab === 'profil'"
      class="chart-container"
      style="max-width: 700px"
    >
      <div class="profile-header">
        <div class="profile-logo">SAE</div>
        <div>
          <div class="profile-name">CV. Sejahtera Abadi Ekatama</div>
          <div class="profile-updated">Diperbarui: 01 Mei 2026</div>
          <button class="btn btn--ghost btn--sm">
            <Upload :size="14" /> Ubah Logo
          </button>
        </div>
      </div>
      <div v-for="(field, idx) in companyFields" :key="idx" class="form-field">
        <label>{{ field.label }}</label>
        <input class="filter-bar__input" v-model="field.value" />
      </div>
      <div>
        <button class="btn btn--primary">
          <Save :size="16" /> Simpan Perubahan
        </button>
      </div>
    </div>

    <!-- Manajemen User -->
    <div v-if="activeTab === 'user'" class="table-container">
      <div class="table-container__header">
        <span class="table-container__title">Daftar Pengguna</span
        ><button class="btn btn--primary btn--sm">+ Tambah User</button>
      </div>
      <table class="user-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(u, idx) in mockUsers" :key="idx">
            <td>{{ u.nama }}</td>
            <td>{{ u.email }}</td>
            <td>
              <span class="badge badge--draft">{{ u.role }}</span>
            </td>
            <td>
              <span
                :class="`badge ${u.status ? 'badge--selesai' : 'badge--dibatalkan'}`"
                >{{ u.status ? "Aktif" : "Nonaktif" }}</span
              >
            </td>
            <td><button class="btn btn--ghost btn--sm">Edit</button></td>
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
      <div v-for="(field, idx) in prefFields" :key="idx" class="form-field">
        <label>{{ field.label }}</label>
        <select class="filter-bar__select" v-model="field.selected">
          <option v-for="opt in field.options" :key="opt">{{ opt }}</option>
        </select>
      </div>
      <button class="btn btn--primary">
        <Save :size="16" /> Simpan Perubahan
      </button>
    </div>

    <!-- Kategori -->
    <div
      v-if="activeTab === 'kategori'"
      class="chart-container"
      style="max-width: 500px"
    >
      <div class="settings-section-title">Kategori Transaksi</div>
      <div v-for="(cat, idx) in categoryList" :key="idx" class="category-item">
        <span>{{ cat }}</span
        ><button class="btn btn--ghost btn--sm">Edit</button>
      </div>
      <button class="btn btn--secondary btn--sm">+ Tambah Kategori</button>
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
} from "lucide-vue-next";

export default {
  name: "Settings",
  components: { Building2, Users, Tag, SlidersHorizontal, Save, Upload },
  data() {
    return {
      activeTab: "profil",
      tabs: [
        { id: "profil", label: "Profil Perusahaan", iconComponent: Building2 },
        { id: "user", label: "Manajemen User", iconComponent: Users },
        { id: "kategori", label: "Kategori", iconComponent: Tag },
        {
          id: "preferensi",
          label: "Preferensi",
          iconComponent: SlidersHorizontal,
        },
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

<style scoped>
.settings-tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 28px;
}
.settings-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  background: none;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}
.settings-tab--active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
  font-weight: 600;
}
.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-border-light);
  margin-bottom: 28px;
}
.profile-logo {
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
}
.profile-name {
  font-size: 18px;
  font-weight: 700;
}
.profile-updated {
  font-size: 13px;
  color: var(--color-text-muted);
  margin-top: 2px;
}
.form-field {
  margin-bottom: 18px;
}
.form-field label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: 6px;
}
.user-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.user-table th {
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}
.user-table td {
  padding: 13px 16px;
  border-bottom: 1px solid var(--color-border-light);
}
.settings-section-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
}
.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--color-border-light);
}
</style>
