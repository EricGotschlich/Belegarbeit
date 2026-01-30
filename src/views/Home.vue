<!-- HomeView.vue (vollständig – copy/paste) -->
<template>
  <div class="page">
    <!-- HERO -->
    <section class="hero">
      <div class="heroGrid">
        <div>
          <h1 class="h1">Logistik E-Learning</h1>
          <p class="muted heroText">
            Stücklistenanalyse, Bestellverfahren, ABC/XYZ-Analyse – plus logistischer Zielkonflikt als Transfer.
          </p>

          <div class="actions">
            <router-link to="/stuecklistenanalyse" class="btn primary">
              Start
              <span class="btnIcon">→</span>
            </router-link>

            <a href="#module" class="btn">Module</a>
          </div>

          <div class="kpiLine" style="margin-top: 12px;">
            <span class="kpiBadge">Szenario</span>
            <span class="kpiVal">Montageunternehmen · Endprodukt Material X</span>
          </div>
        </div>

        <div class="heroImgWrap">
          <!-- Optional: Wenn du kein Bild willst, kannst du diesen Block löschen -->
          <img
              src="../assets/wp.png"
              alt="HTW Berlin"
              class="heroImg"
              loading="lazy"
          />
        </div>
      </div>
    </section>

    <!-- UNTERNEHMENSVORSTELLUNG + ROTER FADEN -->
    <section class="card">
      <h2 class="h2">Unternehmensvorstellung (Szenario)</h2>
      <p class="muted">
        Wir betrachten ein Montageunternehmen, das das Endprodukt <b>Material X</b> herstellt. Für die Planung ist ein
        <b>Primärbedarf</b> vorgegeben. Über die <b>Stückliste</b> wird daraus der <b>Sekundärbedarf</b>
        für Baugruppen und Einzelteile abgeleitet. Die Teile werden im Rahmen der <b>Vorratsbeschaffung</b> mit geeigneten
        <b>Bestellverfahren</b> (u. a. <b>Meldebestand/Bestellzeitpunkt</b>) disponiert. Zur Steuerung werden Materialien zusätzlich
        mit der <b>ABC/XYZ-Analyse</b> klassifiziert. Dadurch wird der Zielkonflikt zwischen <b>Bestandsminimierung</b> und
        <b>Lieferfähigkeit</b> sichtbar.
      </p>

      <div class="twoCol" style="margin-top: 12px;">
        <div class="hintCard">
          <div class="hintTitle">Lernziele</div>
          <ul class="list">
            <li>Sekundärbedarf aus Primärbedarf ableiten (Stückliste)</li>
            <li>Meldebestand / Bestellzeitpunkt korrekt berechnen</li>
            <li>Materialien mit ABC & XYZ klassifizieren (Steuerung/Priorisierung)</li>
            <li>Zielkonflikt erkennen und begründet erklären</li>
          </ul>
        </div>

        <div class="hintCard">
          <div class="hintTitle">Lernpfad</div>
          <ol class="list">
            <li><b>Primärbedarf</b> für Endprodukt <b>Material X</b> ist gegeben.</li>
            <li><b>Stücklistenanalyse</b>: Aus der Stückliste wird der <b>Sekundärbedarf</b> abgeleitet.</li>
            <li><b>Bestellverfahren</b>: Festlegen, <b>wann</b> nachzubestellen ist (z. B. <b>Meldebestand</b>).</li>
            <li><b>ABC/XYZ-Analyse</b>: Teile nach <b>Wertanteil</b> und <b>Verbrauchsverhalten</b> klassifizieren.</li>
            <li><b>Zielkonflikt</b>: Entscheidungen wirken auf <b>Bestände</b> und <b>Lieferfähigkeit</b>.</li>
          </ol>
        </div>
      </div>
    </section>

    <!-- MODULE -->
    <section id="module" class="card">
      <h2 class="h2">Module</h2>
      <p class="muted" style="margin-bottom: 12px;">
        Starte mit der Stückliste (Bedarf ableiten), danach Bestellzeitpunkt bestimmen, anschließend Priorisierung mit ABC/XYZ,
        und zum Schluss Transfer über den Zielkonflikt.
      </p>

      <div class="grid4">
        <router-link
            v-for="m in modules"
            :key="m.title"
            :to="m.link"
            class="moduleCard"
        >
          <div class="moduleTop">
            <div class="moduleIcon">{{ m.icon }}</div>
            <div class="moduleTitle">{{ m.title }}</div>
          </div>
          <div class="moduleSub">{{ m.subtitle }}</div>
          <div class="moduleMeta">
            <span class="pill">{{ m.tag }}</span>
            <span class="go">Öffnen →</span>
          </div>
        </router-link>
      </div>

      <div class="footNote">
      </div>
    </section>

    <!-- HINWEIS -->
    <section class="card">
      <h2 class="h2">Hinweis</h2>
      <p class="muted" style="margin:0;">
        Fachbegriffe, Formeln und Merksätze sind direkt an den interaktiven Elementen platziert. Jede Seite enthält mindestens
        ein interaktives Element (Quiz/Rechner/Zuordnung), damit du den Inhalt nicht nur liest, sondern anwendest.
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHead } from "@vueuse/head";

useHead({
  title: "Startseite",
  meta: [
    {
      name: "description",
      content:
          "Interaktive E-Learning-Komponente: Stücklistenanalyse, Bestellverfahren, ABC/XYZ-Analyse und logistischer Zielkonflikt."
    }
  ]
});

/**
 * ✅ Reihenfolge = logischster Frontend-Flow:
 * Stückliste → Bestellverfahren → ABC/XYZ → Zielkonflikt
 */
const modules = ref([
  {
    title: "Stücklistenanalyse",
    subtitle: "Primärbedarf → Sekundärbedarf · Mengen-/Baukasten-/Strukturstückliste",
    icon: "▦",
    tag: "Bedarf ableiten",
    link: "/stuecklistenanalyse"
  },
  {
    title: "Bestellverfahren",
    subtitle: "Bestellzeitpunkt (Meldebestand) · Rechner + Prüffelder",
    icon: "🛒",
    tag: "Wann bestellen?",
    link: "/bestellverfahren"
  },
  {
    title: "ABC/XYZ-Analyse",
    subtitle: "Wertanteil (ABC) · Variationskoeffizient (XYZ) · Klassifikation",
    icon: "📈",
    tag: "Priorisieren",
    link: "/abc-xyz"
  },
  {
    title: "Zielkonflikt",
    subtitle: "Bestände ↔ Lieferfähigkeit · Transfer/Interpretation (interaktiv)",
    icon: "⇄",
    tag: "Trade-off",
    link: "/zielkonflikt"
  }
]);
</script>

<style scoped>
/* ===== Gleicher Look wie deine anderen Dark-Pages ===== */
:root { --brand: #49a3ff; }

.page{
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 18px 48px;
  color: #f1f5ff;
  background: #0f1115;
  min-height: 100vh;
}

.hero{
  padding: 22px 18px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(20,23,28,0.92), rgba(12,14,18,0.92));
  border: 1px solid #222733;
  box-shadow: 0 10px 26px rgba(0,0,0,0.25);
  margin-bottom: 14px;
}

.heroGrid{
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 14px;
  align-items: center;
}
@media (max-width: 980px){
  .heroGrid{ grid-template-columns: 1fr; }
}

.h1{
  margin: 0 0 8px;
  font-size: 44px;
  letter-spacing: 0.2px;
  color: var(--brand);
  font-weight: 900;
}

.h2{
  margin: 0 0 10px;
  font-size: 20px;
  color: #fff;
  font-weight: 900;
}

.heroText{ max-width: 62ch; }

.muted{
  color: #d9e2f2;
  line-height: 1.55;
}

.card{
  background: #14171c;
  border: 1px solid #222733;
  border-radius: 18px;
  padding: 16px 16px 14px;
  box-shadow: 0 10px 26px rgba(0,0,0,0.22);
  margin-bottom: 14px;
}

/* Buttons (wie bei dir) */
.actions{
  display:flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 12px;
}
.btn{
  border: 1px solid #2a3142;
  background: #10131a;
  color: #eaf2ff;
  padding: 10px 14px;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 900;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.btn.primary{
  background: rgba(73,163,255,0.22);
  border-color: rgba(73,163,255,0.7);
}
.btnIcon{
  display:inline-block;
  font-weight: 900;
  transform: translateY(-1px);
}

/* KPI pill */
.kpiLine{
  display:flex;
  align-items:center;
  gap: 10px;
}
.kpiBadge{
  display:inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(73,163,255,0.7);
  background: rgba(73,163,255,0.16);
  font-weight: 900;
}
.kpiVal{
  font-weight: 900;
  color: #fff;
}

/* hero image */
.heroImgWrap{
  display:flex;
  justify-content: flex-end;
}
@media (max-width: 980px){
  .heroImgWrap{ justify-content: center; }
}
.heroImg{
  width: 100%;
  max-width: 380px;
  height: auto;
  border-radius: 18px;
  border: 1px solid #222733;
  box-shadow: 0 10px 26px rgba(0,0,0,0.25);
}

/* two columns hint cards */
.twoCol{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  align-items: stretch;
}
@media (max-width: 980px){
  .twoCol{ grid-template-columns: 1fr; }
}
.hintCard{
  background: #10131a;
  border: 1px solid #2a3142;
  border-radius: 16px;
  padding: 16px;
  height: 100%;
}
.hintTitle{
  color: #fff;
  font-weight: 900;
  margin-bottom: 10px;
}
.list{
  margin: 0 0 0 18px;
  padding: 0;
  color: #f2f6ff;
}
.list li{ margin: 6px 0; line-height: 1.6; }

/* module grid */
.grid4{
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
@media (max-width: 1100px){
  .grid4{ grid-template-columns: 1fr 1fr; }
}
@media (max-width: 700px){
  .grid4{ grid-template-columns: 1fr; }
}

.moduleCard{
  background: #10131a;
  border: 1px solid #2a3142;
  border-radius: 16px;
  padding: 14px;
  text-decoration: none;
  color: #eaf2ff;
  display:flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.12s ease, border-color 0.12s ease, box-shadow 0.12s ease;
}
.moduleCard:hover{
  transform: translateY(-2px);
  border-color: rgba(73,163,255,0.55);
  box-shadow: 0 12px 28px rgba(0,0,0,0.25);
}

.moduleTop{
  display:flex;
  align-items:center;
  gap: 10px;
}
.moduleIcon{
  width: 40px;
  height: 40px;
  border-radius: 14px;
  border: 1px solid rgba(73,163,255,0.35);
  background: rgba(73,163,255,0.12);
  display:grid;
  place-items:center;
  font-weight: 900;
  font-size: 18px;
}
.moduleTitle{
  font-weight: 900;
  color:#fff;
  font-size: 16px;
}
.moduleSub{
  color:#d9e2f2;
  line-height: 1.45;
  font-size: 13px;
}
.moduleMeta{
  display:flex;
  justify-content: space-between;
  align-items:center;
  margin-top: auto;
}
.pill{
  display:inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid #2a3142;
  background: rgba(255,255,255,0.06);
  color:#fff;
  font-weight: 900;
  font-size: 12px;
}
.go{
  color:#9fb2d1;
  font-weight: 900;
  font-size: 12px;
}

.footNote{
  margin-top: 12px;
  color:#9fb2d1;
  font-size: 12px;
}
</style>
