<template>
  <div class="app-shell">
    <nav class="navbar navbar-expand-lg app-nav fixed-top">
      <div class="container">
        <RouterLink to="/" class="navbar-brand d-flex flex-column text-decoration-none">
          <span class="fw-bold brandText">Logistik Lernpaket</span>
          <small class="brandSub">{{ authorLine }}</small>
        </RouterLink>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav"
            aria-controls="nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
          <i class="mdi mdi-menu"></i>
        </button>

        <div class="collapse navbar-collapse" id="nav">
          <ul class="navbar-nav ms-auto gap-2">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/">
                <i class="mdi mdi-view-grid-outline me-1"></i> Start
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/stuecklistenanalyse">
                <i class="mdi mdi-sitemap-outline me-1"></i> Stücklistenanalyse
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/bestellverfahren">
                <i class="mdi mdi-cart-outline me-1"></i> Bestellverfahren
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/abc-xyz">
                <i class="mdi mdi-chart-line me-1"></i> ABC/XYZ
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/zielkonflikt">
                <i class="mdi mdi-swap-horizontal me-1"></i> Zielkonflikt
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="main">
      <RouterView />
    </main>

    <footer class="app-footer">
      <div class="container py-3 text-center">
        <div class="small footerMuted">HTW Berlin – Produktionswirtschaft & Logistik</div>
        <div class="small footerText">{{ footerLine }}</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const authorLine = 'Eric Gotschlich';
const footerLine = computed(() => authorLine);
</script>

<style scoped>
.app-shell{
  min-height: 100vh;
  background: var(--app-bg, #0f1115);
  color: var(--app-text, #f1f5ff);
  display: flex;
  flex-direction: column;
}

.main{
  flex: 1;
  padding-top: 76px; /* Platz für fixed navbar */
}

.app-nav{
  background: rgba(20, 23, 28, 0.92);
  border-bottom: 1px solid var(--app-border, #222733);
  box-shadow: 0 10px 30px rgba(0,0,0,0.35);
  backdrop-filter: blur(10px);
}

.brandText{ color: var(--app-text, #f1f5ff); }
.brandSub{ color: rgba(217, 226, 242, 0.85); }

.nav-link{
  border-radius: 14px;
  padding: 0.55rem 0.8rem;
  color: rgba(241, 245, 255, 0.9) !important;
  transition: transform .15s ease, background .15s ease, border-color .15s ease;
}

.nav-link:hover{
  background: rgba(255,255,255,0.06);
  transform: translateY(-1px);
}

.nav-link.router-link-active{
  background: rgba(73, 163, 255, 0.18);
  border: 1px solid rgba(73, 163, 255, 0.45);
}

.navbar-toggler{
  border-color: rgba(255, 255, 255, 0.25);
  color: rgba(241, 245, 255, 0.9);
}
.navbar-toggler .mdi{ font-size: 1.25rem; }

@media (max-width: 991px){
  .navbar-collapse{
    margin-top: 12px;
    padding: 12px;
    border-radius: 16px;
    background: rgba(16, 19, 26, 0.98);
    border: 1px solid var(--app-border, #222733);
  }
}

.app-footer{
  background: rgba(20, 23, 28, 0.92);
  border-top: 1px solid var(--app-border, #222733);
}

.footerMuted{ color: rgba(217, 226, 242, 0.8); }
.footerText{ color: rgba(241, 245, 255, 0.92); }
</style>
