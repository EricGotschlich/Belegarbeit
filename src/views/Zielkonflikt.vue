<template>
  <div class="page">
    <h1 class="title">Logistischer Zielkonflikt</h1>

    <!-- Kontext / Theorie -->
    <div class="card">
      <h2 class="h2">Überblick</h2>
      <p class="muted">
        In der Logistik gibt es zwei grundsätzliche Zielrichtungen: <b>Erfüllung geforderter Logistikleistungen</b>
        (z. B. Lieferfähigkeit/Lieferbereitschaft) und <b>Minimierung der erforderlichen Logistikkosten</b>.
        Ein klassischer Zielkonflikt ist daher: <b>Bestände minimieren</b> ↔ <b>Lieferfähigkeit erhöhen</b>.
      </p>

      <div class="twoCol">
        <div class="hintCard">
          <div class="hintTitle">Begriffe</div>
          <ul class="list">
            <li><b>Lieferfähigkeit / Lieferbereitschaft:</b> Fähigkeit, Kundenbedarf sofort bedienen zu können (Verfügbarkeit).</li>
            <li><b>Bestände:</b> gebundenes Kapital + Lager-/Prozesskosten; sollen möglichst niedrig sein.</li>
            <li><b>Sicherheitsbestand:</b> puffert Verbrauchsschwankungen ab und verbessert die Lieferfähigkeit.</li>
          </ul>
        </div>

        <div class="hintCard">
          <div class="hintTitle">Wichtiger Hinweis</div>
          <p class="muted mini">
            Der Zusammenhang zwischen <b>Lieferfähigkeit</b> und <b>Sicherheitsbestand</b> ist
            <b>nicht linear</b>, sondern <b>exponentiell</b> – vollständige Lieferfähigkeit ist nahezu ausgeschlossen.
          </p>
          <div class="kpiLine">
            <span class="kpiBadge">Zielkonflikt</span>
            <span class="kpiVal">Bestände ↓  ↔  Lieferfähigkeit ↑</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="grid2">
      <!-- Aufgabe / Interaktion -->
      <div class="card">
        <h2 class="h2">Interaktive Aufgabe: Sicherheitsbestand einstellen</h2>
        <p class="muted mini">
          Stelle den <b>Sicherheitsbestand</b> so ein, dass du mindestens die geforderte <b>Lieferfähigkeit</b> erreichst –
          aber mit <b>so wenig Sicherheitsbestand wie möglich</b>.
        </p>

        <div class="taskBox">
          <div class="taskLine">
            Gefordert: <span class="kpiBadge">{{ targetService }}%</span> Lieferfähigkeit (mindestens)
          </div>

          <div class="sliderBlock">
            <div class="rowLine">
              <div class="label">Sicherheitsbestand</div>
              <div class="val"><b>{{ safetyStock }}%</b></div>
            </div>

            <input class="rng" type="range" v-model.number="safetyStock" min="0" max="100" step="1" />

            <div class="scaleLine">
              <span>0%</span><span>100%</span>
            </div>
          </div>

          <div class="kpis">
            <div class="kpi">
              <div class="kpiLabel">Bestandsniveau (Proxy)</div>
              <div class="kpiValBig">{{ safetyStock }}%</div>
              <div class="bar"><div class="barFill" :style="{ width: safetyStock + '%' }"></div></div>
            </div>

            <div class="kpi">
              <div class="kpiLabel">Lieferfähigkeit</div>
              <div class="kpiValBig">{{ serviceLevel }}%</div>
              <div class="bar"><div class="barFill" :style="{ width: serviceLevel + '%' }"></div></div>
            </div>
          </div>

          <div class="statusBox" :class="statusClass">
            <div class="statusTitle">{{ statusTitle }}</div>
            <div class="smallMuted">{{ statusText }}</div>
          </div>

          <div class="actions">
            <button class="btn primary" @click="newTask">Neue Aufgabe</button>
            <button class="btn" @click="resetTask">Zurücksetzen</button>

            <label class="toggle msAuto">
              <input type="checkbox" v-model="showSolution" />
              Lösung anzeigen
            </label>
          </div>

          <div v-if="showSolution" class="solBox">
            <div class="solTitle">Lösung / Richtwert</div>
            <div class="smallMuted">
              Minimaler Sicherheitsbestand (für mindestens {{ targetService }}%):
              <b>{{ sMinRounded }}%</b>.
              <span v-if="safetyStock >= sMinRounded">Du liegst {{ safetyStock - sMinRounded }}% darüber.</span>
              <span v-else>Dir fehlen {{ sMinRounded - safetyStock }}%.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Diagramm + Quiz -->
      <div class="card">
        <h2 class="h2">Kurve: Lieferfähigkeit vs. Sicherheitsbestand</h2>
        <p class="muted mini">
          Die Kurve steigt anfangs stark, flacht dann ab (exponentiell). 100% werden praktisch nicht erreicht.
        </p>

        <div class="diagramWrap">
          <svg class="diag" viewBox="0 0 100 100" preserveAspectRatio="none">
            <!-- Achsen -->
            <line x1="10" y1="90" x2="90" y2="90" class="axis" />
            <line x1="10" y1="90" x2="10" y2="10" class="axis" />

            <!-- Ziel-Linie -->
            <line
                x1="10"
                :y1="yFromService(targetService)"
                x2="90"
                :y2="yFromService(targetService)"
                class="targetLine"
            />
            <text x="12" :y="yFromService(targetService) - 2" class="targetText">
              Ziel {{ targetService }}%
            </text>

            <!-- Kurve -->
            <path :d="curvePath" class="curve" />

            <!-- Punkt -->
            <circle :cx="xFromSafety(safetyStock)" :cy="yFromService(serviceLevel)" r="2.4" class="dot" />
          </svg>

          <div class="axisLabel y">Lieferfähigkeit</div>
          <div class="axisLabel x">Sicherheitsbestand</div>
        </div>

        <div class="subcard">
          <div class="subTitle">Quiz</div>
          <div class="muted mini">Welche Aussage ist richtig?</div>

          <div class="quiz">
            <label class="opt">
              <input type="radio" value="a" v-model="quizChoice" />
              Der Zusammenhang Lieferfähigkeit ↔ Sicherheitsbestand ist linear.
            </label>
            <label class="opt">
              <input type="radio" value="b" v-model="quizChoice" />
              Der Zusammenhang Lieferfähigkeit ↔ Sicherheitsbestand ist exponentiell (100% kaum erreichbar).
            </label>
            <label class="opt">
              <input type="radio" value="c" v-model="quizChoice" />
              Sicherheitsbestand hat keinen Einfluss auf die Lieferfähigkeit.
            </label>

            <div class="actions">
              <button class="btn primary" @click="checkQuiz">Prüfen</button>
              <button class="btn" @click="resetQuiz">Zurücksetzen</button>
            </div>

            <div v-if="quizChecked" class="statusBox" :class="quizOk ? 'okBox' : 'badBox'">
              <div class="statusTitle">{{ quizOk ? "Richtig ✅" : "Falsch ❌" }}</div>
              <div class="smallMuted">
                Korrekt ist: exponentieller Zusammenhang; vollständige Lieferfähigkeit ist nahezu ausgeschlossen.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useHead } from "@vueuse/head";

useHead({ title: "Zielkonflikt" });

/**
 * Vorlesungs-nahes Modell:
 * - Lieferfähigkeit steigt mit Sicherheitsbestand exponentiell an
 * - 0% Sicherheitsbestand => 0% Lieferfähigkeit (keine “50% bei 0%” Logik)
 * - 100% Lieferfähigkeit wird praktisch nicht erreicht (wir kappen bei 99%)
 */
const K = 3.0;      // Steilheit
const SCALE = 70.0; // “wie schnell” sich die Kurve sättigt

function serviceFromSafety(s) {
  const x = Math.max(0, Math.min(100, Number(s) || 0));
  const raw = 100 * (1 - Math.exp(-(K * x) / SCALE)); // 0..~100
  return Math.min(99, Math.max(0, Math.round(raw)));
}

function minSafetyForService(target) {
  const t = Math.max(0, Math.min(99, Number(target) || 0)) / 100;
  if (t <= 0) return 0;
  // invert: t = 1 - exp(-(K*s)/SCALE)  =>  s = -(SCALE/K) * ln(1 - t)
  return -(SCALE / K) * Math.log(1 - t);
}

/* Aufgabe */
const candidates = [70, 75, 80, 85, 90, 95];
const targetService = ref(candidates[Math.floor(Math.random() * candidates.length)]);
const safetyStock = ref(35);
const showSolution = ref(false);

const serviceLevel = computed(() => serviceFromSafety(safetyStock.value));
const sMin = computed(() => minSafetyForService(targetService.value));
const sMinRounded = computed(() => Math.min(100, Math.max(0, Math.ceil(sMin.value))));

const statusTitle = computed(() => {
  if (serviceLevel.value < targetService.value) return "Noch nicht erreicht";
  const diff = safetyStock.value - sMinRounded.value;
  if (Math.abs(diff) <= 2) return "Perfekt eingestellt ✅";
  return "Ziel erreicht – aber geht noch schlanker";
});

const statusText = computed(() => {
  if (serviceLevel.value < targetService.value) {
    return `Erhöhe den Sicherheitsbestand, bis du mindestens ${targetService.value}% erreichst.`;
  }
  const diff = safetyStock.value - sMinRounded.value;
  if (Math.abs(diff) <= 2) {
    return "Du triffst (nahezu) den minimalen Sicherheitsbestand für die geforderte Lieferfähigkeit.";
  }
  return `Du erreichst das Ziel, hältst aber ca. ${diff}% mehr Sicherheitsbestand als nötig (mehr Bestand = mehr Kosten/Kapitalbindung).`;
});

const statusClass = computed(() => {
  if (serviceLevel.value < targetService.value) return "badBox";
  const diff = safetyStock.value - sMinRounded.value;
  if (Math.abs(diff) <= 2) return "okBox";
  return "warnBox";
});

function newTask() {
  targetService.value = candidates[Math.floor(Math.random() * candidates.length)];
  safetyStock.value = 35;
  showSolution.value = false;
  resetQuiz();
}

function resetTask() {
  safetyStock.value = 35;
  showSolution.value = false;
}

/* Diagramm helpers */
function xFromSafety(s) {
  const x = Math.max(0, Math.min(100, Number(s) || 0));
  return 10 + (x / 100) * 80;
}
function yFromService(pct) {
  const y = Math.max(0, Math.min(100, Number(pct) || 0));
  return 90 - (y / 100) * 80;
}

const curvePath = computed(() => {
  const pts = [];
  for (let s = 0; s <= 100; s += 2) {
    const y = serviceFromSafety(s);
    pts.push([xFromSafety(s), yFromService(y)]);
  }
  return pts
      .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
      .join(" ");
});

/* Quiz */
const quizChoice = ref("");
const quizChecked = ref(false);
const quizOk = computed(() => quizChoice.value === "b");

function checkQuiz() {
  quizChecked.value = true;
}
function resetQuiz() {
  quizChoice.value = "";
  quizChecked.value = false;
}
</script>

<style scoped>
:root { --brand: #49a3ff; }

.page{
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 18px 48px;
  color: #f1f5ff;
  background: #0f1115;
  min-height: 100vh;
}

.title{
  font-size: 34px;
  margin: 0 0 14px 0;
  color: var(--brand);
  font-weight: 900;
}

.card{
  background: #171a20;
  border: 1px solid #222733;
  border-radius: 18px;
  padding: 16px 16px 14px;
  box-shadow: 0 10px 26px rgba(0,0,0,0.22);
  margin-bottom: 14px;
}

.h2{
  margin: 0 0 10px;
  font-size: 18px;
  color: #fff;
  font-weight: 900;
}

.muted{ color: #d9e2f2; line-height: 1.55; }
.mini{ font-size: 13px; }
.smallMuted{ font-size: 12px; color: #9fb2d1; }

.twoCol{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 12px;
}
@media (max-width: 980px){
  .twoCol{ grid-template-columns: 1fr; }
}

.hintCard{
  background: #14171c;
  border: 1px solid #222733;
  border-radius: 14px;
  padding: 14px;
}
.hintTitle{ font-weight: 900; margin-bottom: 8px; color: #fff; }
.list{ margin: 0 0 0 18px; color: #f2f6ff; }
.list li{ margin: 6px 0; }

.kpiLine{ display:flex; align-items:center; gap: 10px; margin-top: 10px; }
.kpiBadge{
  display:inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(73,163,255,0.7);
  background: rgba(73,163,255,0.16);
  font-weight: 900;
  font-size: 12px;
}
.kpiVal{ font-weight: 900; color: #fff; }

.grid2{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
@media (max-width: 1100px){
  .grid2{ grid-template-columns: 1fr; }
}

/* Task Box */
.taskBox{
  background: #10131a;
  border: 1px solid #2a3142;
  border-radius: 16px;
  padding: 14px;
  margin-top: 10px;
}
.taskLine{
  display:flex;
  gap: 10px;
  align-items:center;
  color:#fff;
  font-weight: 900;
  margin-bottom: 10px;
}
.sliderBlock{ margin-top: 8px; }

.rowLine{
  display:flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}
.label{ font-weight: 900; color:#fff; }
.val{ color:#eaf2ff; }

.rng{ width: 100%; }

.scaleLine{
  display:flex;
  justify-content: space-between;
  color:#9fb2d1;
  font-size: 12px;
  font-weight: 800;
  margin-top: 6px;
}

.kpis{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 12px;
}
@media (max-width: 520px){
  .kpis{ grid-template-columns: 1fr; }
}

.kpi{
  background: #0b0e14;
  border: 1px solid #2a3142;
  border-radius: 14px;
  padding: 12px;
}
.kpiLabel{ color:#9fb2d1; font-size: 12px; font-weight: 900; }
.kpiValBig{ font-size: 18px; font-weight: 900; margin: 4px 0 8px; color:#fff; }

.bar{
  height: 10px;
  border-radius: 999px;
  background: rgba(255,255,255,0.06);
  overflow: hidden;
  border: 1px solid rgba(42,49,66,0.7);
}
.barFill{
  height: 100%;
  background: rgba(73,163,255,0.7);
}

.actions{
  display:flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items:center;
  margin-top: 12px;
}
.msAuto{ margin-left: auto; }

.btn{
  border: 1px solid #2a3142;
  background: #10131a;
  color: #eaf2ff;
  padding: 10px 12px;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 900;
}
.btn.primary{
  background: rgba(73,163,255,0.22);
  border-color: rgba(73,163,255,0.7);
}

.toggle{
  display:flex;
  align-items:center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 14px;
  border: 1px solid #2a3142;
  background: #10131a;
  color: #eaf2ff;
  font-weight: 800;
  font-size: 13px;
}
.toggle input{ accent-color: var(--brand); }

.statusBox{
  margin-top: 12px;
  border-radius: 14px;
  padding: 12px;
  border: 1px solid #2a3142;
  background: rgba(255,255,255,0.04);
}
.statusTitle{ font-weight: 900; color:#fff; margin-bottom: 4px; }
.okBox{ border-color: rgba(58,220,148,0.65); background: rgba(58,220,148,0.08); }
.badBox{ border-color: rgba(255,106,106,0.65); background: rgba(255,106,106,0.08); }
.warnBox{ border-color: rgba(255,197,66,0.65); background: rgba(255,197,66,0.08); }

.solBox{
  margin-top: 12px;
  border-radius: 14px;
  padding: 12px;
  border: 1px solid rgba(73,163,255,0.35);
  background: rgba(73,163,255,0.08);
}
.solTitle{ font-weight: 900; color:#fff; margin-bottom: 6px; }

/* Diagramm */
.diagramWrap{
  position: relative;
  background: #10131a;
  border: 1px solid #2a3142;
  border-radius: 14px;
  padding: 12px;
  overflow: hidden;
}
.diag{ width: 100%; height: 210px; display: block; }
.axis{ stroke: rgba(220, 230, 255, 0.45); stroke-width: 1.8; }
.curve{ fill: none; stroke: rgba(73,163,255,0.95); stroke-width: 2.6; stroke-linecap: round; }
.dot{ fill: #ffffff; stroke: rgba(73,163,255,0.95); stroke-width: 1.8; }
.targetLine{ stroke: rgba(255,197,66,0.8); stroke-width: 1.6; stroke-dasharray: 3 2; }
.targetText{ fill: rgba(255,197,66,0.95); font-size: 4px; font-weight: 900; }

.axisLabel{
  position: absolute;
  font-size: 12px;
  color: #9fb2d1;
  font-weight: 900;
}
.axisLabel.y{ left: 12px; top: 10px; }
.axisLabel.x{ right: 12px; bottom: 10px; }

/* Subcard / Quiz */
.subcard{
  background: #10131a;
  border: 1px solid #2a3142;
  border-radius: 16px;
  padding: 14px;
  margin-top: 14px;
}
.subTitle{
  color: #fff;
  font-weight: 900;
  margin-bottom: 6px;
}
.quiz{ margin-top: 10px; display:grid; gap: 10px; }
.opt{
  display:flex;
  gap: 10px;
  align-items:flex-start;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(42,49,66,0.7);
  background: rgba(255,255,255,0.03);
  color:#eaf2ff;
  font-weight: 800;
  cursor: pointer;
}
.opt input{ margin-top: 2px; accent-color: var(--brand); }
/* Badge/Chip "Zielkonflikt" – lesbar im Dark Theme */
.chip,
.badge,
.kpiBadge,
.zielBadge {              /* nimm die Klasse, die du wirklich nutzt */
  display: inline-flex;
  align-items: center;
  gap: 8px;

  padding: 8px 12px;
  border-radius: 999px;

  /* dark-glass + brand outline */
  background: rgba(73, 163, 255, 0.18);
  border: 1px solid rgba(73, 163, 255, 0.55);

  /* wichtig: Text hell! */
  color: #f1f5ff;
  font-weight: 900;

  /* kleine Lesbarkeits-Boosts */
  text-shadow: 0 1px 0 rgba(0,0,0,0.35);
}

.chip:hover,
.badge:hover,
.kpiBadge:hover,
.zielBadge:hover {
  background: rgba(73, 163, 255, 0.26);
  border-color: rgba(73, 163, 255, 0.75);
}

.chip:focus-visible,
.badge:focus-visible,
.kpiBadge:focus-visible,
.zielBadge:focus-visible {
  outline: 2px solid rgba(73, 163, 255, 0.25);
  outline-offset: 2px;
}

</style>
