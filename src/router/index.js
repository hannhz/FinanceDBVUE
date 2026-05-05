import { createRouter, createWebHistory } from 'vue-router';

import AppLayout from '@/layouts/AppLayout.vue';
import Login from '@/pages/Login.vue';
import Dashboard from '@/pages/Dashboard.vue';
import Transactions from '@/pages/Transactions.vue';
import Invoices from '@/pages/Invoices.vue';
import Expenses from '@/pages/Expenses.vue';
import Reports from '@/pages/Reports.vue';
import Settings from '@/pages/Settings.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: '', name: 'Dashboard', component: Dashboard },
      { path: 'transaksi', name: 'Transactions', component: Transactions },
      { path: 'invoice', name: 'Invoices', component: Invoices },
      { path: 'pengeluaran', name: 'Expenses', component: Expenses },
      { path: 'laporan', name: 'Reports', component: Reports },
      { path: 'pengaturan', name: 'Settings', component: Settings },
    ],
  },
  // redirect kalau path tidak dikenal (opsional)
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;