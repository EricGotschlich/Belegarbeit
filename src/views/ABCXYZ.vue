<template>
  <div class="page">
    <h1 class="title">ABC-/XYZ-Analyse</h1>

    <!-- ===================== -->
    <!-- ABC CONTEXT -->
    <!-- ===================== -->
    <div class="card">
      <h2 class="h2">ABC-Analyse: </h2>
      <p class="muted">
        Die ABC-Analyse klassifiziert Artikel nach ihrem <b>wertmäßigen Anteil am Gesamtwert</b>.
        Grundlage ist der <b>Jahresverbrauchswert</b> (Jahresverbrauch × Preis pro Stück).
        Damit lässt sich der Steuerungsaufwand auf die wichtigsten Artikel fokussieren (A vor B vor C).
      </p>

      <div class="bullets">
        <ul>
          <li><b>Schritt 1:</b> Jahresverbrauchswert je Artikel berechnen</li>
          <li><b>Schritt 2:</b> Anteil am Gesamtwert (%) berechnen</li>
          <li><b>Schritt 3:</b> kumulieren und in <b>A / B / C</b> einteilen</li>
        </ul>
        <br />
        <div class="abcLimits">
          <div class="abcLimitsTitle">Typische ABC-Anteile:</div>
          <ul class="abcLimitsList">
            <li>
              <b>A-Artikel</b> = Objekte, die einen <b>hohen Anteil</b> zum Gesamtwert beitragen
              <span class="abcPct">(75% – 80%)</span>
            </li>
            <li>
              <b>B-Artikel</b> = Objekte, die einen <b>mittleren Anteil</b> zum Gesamtwert beitragen
              <span class="abcPct">(15% – 20%)</span>
            </li>
            <li>
              <b>C-Artikel</b> = Objekte, die einen <b>niedrigen Anteil</b> zum Gesamtwert beitragen
              <span class="abcPct">(5% bis maximal 10%)</span>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- ===================== -->
    <!-- ABC ÜBUNG: wie PNG (Spalten) + interaktiv -->
    <!-- ===================== -->
    <section class="section">
      <h2 class="sectionTitle">ABC-Übung: Jahresverbrauchswerte & Anteile berechnen</h2>

      <div class="tableWrap">
        <table class="tbl">
          <thead>
          <tr>
            <th>Artikel</th>
            <th class="num">Jahresverbrauch (Stück)</th>
            <th class="num">Preis pro Stück (€)</th>
            <th class="num">Jahresverbrauchswert (€)</th>
            <th class="num">Anteil am Gesamtwert (%)</th>
            <th class="num">Kumuliert (%)</th>
            <th class="num">ABC-Klasse</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="r in abcRows" :key="r.id">
            <td class="pname">{{ r.artikel }}</td>
            <td class="num">{{ fmtInt(r.jahresverbrauch) }}</td>
            <td class="num">{{ fmtMoney(r.preis) }}</td>

            <td class="num">
              <input
                  class="inp"
                  :class="abcCellClass(r.id, 'wert')"
                  v-model="abcAnswers[r.id].wert"
                  placeholder=""
              />
              <div v-if="abcChecked" class="hint">{{ fmtMoney(abcExpected[r.id].wert) }}</div>
            </td>

            <td class="num">
              <input
                  class="inp"
                  :class="abcCellClass(r.id, 'anteil')"
                  v-model="abcAnswers[r.id].anteil"
                  placeholder=""
              />
              <div v-if="abcChecked" class="hint">{{ fmtPct(abcExpected[r.id].anteil) }}</div>
            </td>

            <td class="num">
              <input
                  class="inp"
                  :class="abcCellClass(r.id, 'kum')"
                  v-model="abcAnswers[r.id].kum"
                  placeholder=""
              />
              <div v-if="abcChecked" class="hint">{{ fmtPct(abcExpected[r.id].kum) }}</div>
            </td>

            <td class="num">
              <input
                  class="inp"
                  :class="abcCellClass(r.id, 'klasse')"
                  v-model="abcAnswers[r.id].klasse"
                  placeholder="A/B/C"
              />
              <div v-if="abcChecked" class="hint">{{ abcExpected[r.id].klasse }}</div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="btnRow">
        <button class="btn primary" @click="checkABC">Prüfen</button>
        <button class="btn" @click="resetABC">Zurücksetzen</button>
        <div v-if="abcChecked" class="score">{{ abcScoreText }}</div>
      </div>


    </section>

    <hr class="sep" />

    <!-- ===================== -->
    <!-- XYZ CONTEXT + TABLE -->
    <!-- ===================== -->
    <section class="section">
      <h2 class="sectionTitle">XYZ-Analyse</h2>

      <div class="card">
        <h2 class="h2">Warum XYZ?</h2>
        <p class="muted">
          Die XYZ-Analyse betrachtet nicht den Wertanteil, sondern den <b>Verbrauchswert</b>.
          Ziel ist zu erkennen, ob der Bedarf <b>konstant (X)</b>, <b>schwankend (Y)</b> oder <b>sporadisch (Z)</b> ist.
          Dafür wird der <b>Variationskoeffizient</b> genutzt:
        </p>

        <div class="formulaBox">
          <div class="formula">
            Variationskoeffizient (VK) = <b>Standardabweichung / Mittelwert</b>
          </div>
        </div>

        <div class="bullets">
          <ul>
            <li><b>X:</b> 0 ≤ VK ≤ 0,49 (stabil / gut planbar)</li>
            <li><b>Y:</b> 0,50 ≤ VK ≤ 0,99 (mittlere Schwankung)</li>
            <li><b>Z:</b> VK ≥ 1 (stark unregelmäßig)</li>
          </ul>
        </div>

        <div class="subTitle">Schritt 1: VK berechnen & Schritt 2: X/Y/Z zuordnen</div>

        <div class="tableWrap">
          <table class="tbl">
            <thead>
            <tr>
              <th class="num">Artikel</th>
              <th class="num">Mittelwert</th>
              <th class="num">Standardabweichung</th>
              <th class="num yellowHead">Variationskoeffizient (VK)</th>
              <th class="num yellowHead">Klasse (X/Y/Z)</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="r in xyzRows" :key="r.id">
              <td class="num pname">{{ r.artikel }}</td>
              <td class="num">{{ fmtDE(r.mean, 1) }}</td>
              <td class="num">{{ fmtDE(r.sd, 1) }}</td>

              <td class="num yellowCell">
                <input
                    class="inp"
                    :class="xyzCellClass(r.id, 'vk')"
                    v-model="xyzAnswers[r.id].vk"
                />
                <div v-if="xyzChecked" class="hint">{{ fmtDE(xyzExpected[r.id].vk, 2) }}</div>
              </td>

              <td class="num yellowCell">
                <input
                    class="inp"
                    :class="xyzCellClass(r.id, 'klasse')"
                    v-model="xyzAnswers[r.id].klasse"
                    placeholder="X / Y / Z"
                />
                <div v-if="xyzChecked" class="hint">{{ xyzExpected[r.id].klasse }}</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="btnRow">
          <button class="btn primary" @click="checkXYZ">Prüfen</button>
          <button class="btn" @click="resetXYZ">Zurücksetzen</button>
          <div v-if="xyzChecked" class="score">{{ xyzScoreText }}</div>
        </div>
      </div>
    </section>

    <hr class="sep" />

    <!-- ===================== -->
    <!-- ABC-XYZ MATRIX -->
    <!-- ===================== -->
    <section class="matrixSection">
      <div class="matrixTop">
        <div class="infoBox">
          <div class="infoTitle">Anleitung:</div>
          <ol>
            <li>Karte rechts anklicken.</li>
            <li>Feld in der Matrix auswählen.</li>
            <li>Mit „Überprüfen“ Lösung testen.</li>
          </ol>
        </div>

        <div class="hintCard">
          <div class="hintTitle">Hinweis:</div>
          <ul>
            <li><b>A/B/C</b> = Wertanteil (hoch/mittel/gering)</li>
            <li><b>X/Y/Z</b> = Verbrauchsverhalten (konstant/schwankend/sporadisch)</li>
            <li>Kombination hilft bei der Priorisierung der Disposition.</li>
          </ul>
        </div>
      </div>

      <div class="matrixGrid">
        <div class="matrixPanel">
          <table class="matrix">
            <thead>
            <tr>
              <th></th>
              <th>X</th>
              <th>Y</th>
              <th>Z</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="row in ['A','B','C']" :key="row">
              <th class="rowHead">{{ row }}</th>
              <td v-for="col in ['X','Y','Z']" :key="row+col" class="cell" @click="placeCard(row, col)">
                <div v-if="matrix[row][col]" class="placed">
                  {{ matrix[row][col].text }}
                  <button class="mini" @click.stop="removeCard(row, col)">×</button>
                </div>
                <div v-else class="placeholder"></div>
              </td>
            </tr>
            </tbody>
          </table>

          <div class="matrixActions">
            <button class="btn primary" @click="checkMatrix">Überprüfen</button>
            <button class="btn" @click="resetMatrix">Zurücksetzen</button>
            <div v-if="matrixChecked" class="score">{{ matrixScoreText }}</div>
          </div>
        </div>

        <aside class="cardsPanel">
          <div class="cardsHeader">
            <div class="cardsTitle">Karten</div>
            <div class="cardsMeta">{{ availableCards.length }} verfügbar</div>
          </div>

          <div class="cards">
            <button
                v-for="c in availableCards"
                :key="c.id"
                class="cardBtn"
                :class="{ selected: selectedCardId === c.id }"
                @click="selectCard(c.id)"
            >
              {{ c.text }}
            </button>
          </div>

          <div class="cardsFooter">
            <span class="smallMuted">Tipp: zuerst Karte wählen, dann Feld anklicken.</span>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";

/* ========= Helpers ========= */
function fmtMoney(n) {
  return Number(n).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtPct(n) {
  return Number(n).toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
function fmtDE(n, digits = 1) {
  return Number(n).toLocaleString("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}
function fmtInt(n) {
  return Number(n).toLocaleString("de-DE");
}
function parseDE(x) {
  if (x == null) return NaN;
  const s = String(x).trim().replace(/\./g, "").replace(",", ".");
  return Number(s);
}
function almostEqual(a, b, tol = 0.25) {
  return Math.abs(a - b) <= tol;
}
function normalizeClass(s) {
  return String(s || "").trim().toUpperCase();
}

/* =========================
   ABC - Daten (andere Produkte + andere Werte)
   Reihenfolge orientiert an PNG: nach Jahresverbrauchswert absteigend
   ========================= */
const abcRows = [
  { id: "steuerg", artikel: "Steuergerät (ECU)", jahresverbrauch: 1200, preis: 420.0 },   // 504k
  { id: "servo", artikel: "Servo-Motor", jahresverbrauch: 800, preis: 550.0 },           // 440k
  { id: "sensor", artikel: "Industriesensor", jahresverbrauch: 5000, preis: 60.0 },      // 300k
  { id: "lager", artikel: "Kugellager", jahresverbrauch: 30000, preis: 6.0 },            // 180k
  { id: "schraube", artikel: "Schraube M6", jahresverbrauch: 90000, preis: 1.5 },        // 135k
];

const abcExpected = reactive({});
const abcAnswers = reactive({});
const abcChecked = ref(false);
const abcState = reactive({}); // { id: { wert:true/false, ... } }

function buildABCExpected() {
  const values = {};
  let sum = 0;

  for (const r of abcRows) {
    const v = r.jahresverbrauch * r.preis; // Jahresverbrauchswert
    values[r.id] = v;
    sum += v;
  }

  let cum = 0;
  for (const r of abcRows) {
    const wert = values[r.id];
    const anteil = (wert / sum) * 100;
    cum += anteil;

    // Klassengrenzen für die Übung
    let klasse = "C";
    if (cum <= 80) klasse = "A";
    else if (cum <= 95) klasse = "B";

    abcExpected[r.id] = { wert, anteil, kum: cum, klasse };
  }
}

function initABC() {
  for (const r of abcRows) {
    abcAnswers[r.id] = { wert: "", anteil: "", kum: "", klasse: "" };
    abcState[r.id] = { wert: null, anteil: null, kum: null, klasse: null };
  }
}

buildABCExpected();
initABC();

function checkABC() {
  abcChecked.value = true;

  for (const r of abcRows) {
    const e = abcExpected[r.id];
    const a = abcAnswers[r.id];

    const wertIn = parseDE(a.wert);
    const anteilIn = parseDE(a.anteil);
    const kumIn = parseDE(a.kum);
    const klasseIn = normalizeClass(a.klasse);

    abcState[r.id].wert = Number.isFinite(wertIn) && almostEqual(wertIn, e.wert, 5);       // € Toleranz
    abcState[r.id].anteil = Number.isFinite(anteilIn) && almostEqual(anteilIn, e.anteil, 0.3);
    abcState[r.id].kum = Number.isFinite(kumIn) && almostEqual(kumIn, e.kum, 0.5);
    abcState[r.id].klasse = klasseIn === e.klasse;
  }
}

function resetABC() {
  abcChecked.value = false;
  initABC();
}

function abcCellClass(rowId, field) {
  if (!abcChecked.value) return "";
  const ok = abcState[rowId][field];
  if (ok === true) return "ok";
  if (ok === false) return "bad";
  return "";
}

const abcScoreText = computed(() => {
  if (!abcChecked.value) return "";
  let ok = 0;
  let total = 0;
  for (const r of abcRows) {
    for (const f of ["wert", "anteil", "kum", "klasse"]) {
      total++;
      if (abcState[r.id][f] === true) ok++;
    }
  }
  return `Punkte: ${ok} / ${total}`;
});

/* =========================
   XYZ - andere Werte + Kontext
   ========================= */
const xyzRows = [
  { id: "A", artikel: "Artikel A", mean: 1200.0, sd: 180.0 },   // VK 0.15 -> X
  { id: "B", artikel: "Artikel B", mean: 800.0, sd: 520.0 },    // VK 0.65 -> Y
  { id: "C", artikel: "Artikel C", mean: 500.0, sd: 620.0 },    // VK 1.24 -> Z
  { id: "D", artikel: "Artikel D", mean: 1500.0, sd: 300.0 },   // VK 0.20 -> X
  { id: "E", artikel: "Artikel E", mean: 950.0, sd: 920.0 },    // VK 0.97 -> Y
];

const xyzExpected = reactive({});
const xyzAnswers = reactive({});
const xyzChecked = ref(false);
const xyzState = reactive({}); // { id: { vk:true/false, klasse:true/false } }

function classifyXYZ(vk) {
  if (vk >= 1) return "Z";
  if (vk >= 0.5) return "Y";
  return "X";
}

function buildXYZExpected() {
  for (const r of xyzRows) {
    const vk = r.sd / r.mean;
    xyzExpected[r.id] = { vk, klasse: classifyXYZ(vk) };
  }
}

function initXYZ() {
  for (const r of xyzRows) {
    xyzAnswers[r.id] = { vk: "", klasse: "" };
    xyzState[r.id] = { vk: null, klasse: null };
  }
}

buildXYZExpected();
initXYZ();

function checkXYZ() {
  xyzChecked.value = true;
  for (const r of xyzRows) {
    const e = xyzExpected[r.id];
    const a = xyzAnswers[r.id];

    const vkIn = parseDE(a.vk);
    const klasseIn = normalizeClass(a.klasse);

    // toleranter Vergleich: viele runden auf 2 Dezimalen
    xyzState[r.id].vk = Number.isFinite(vkIn) && almostEqual(vkIn, e.vk, 0.02);
    xyzState[r.id].klasse = klasseIn === e.klasse;
  }
}

function resetXYZ() {
  xyzChecked.value = false;
  initXYZ();
}

function xyzCellClass(rowId, field) {
  if (!xyzChecked.value) return "";
  const ok = xyzState[rowId][field];
  if (ok === true) return "ok";
  if (ok === false) return "bad";
  return "";
}

const xyzScoreText = computed(() => {
  if (!xyzChecked.value) return "";
  let ok = 0;
  let total = 0;
  for (const r of xyzRows) {
    total += 2;
    if (xyzState[r.id].vk === true) ok++;
    if (xyzState[r.id].klasse === true) ok++;
  }
  return `Punkte: ${ok} / ${total}`;
});

/* =========================
   ABC-XYZ Matrix
   ========================= */
const correctTextByCell = {
  AX: "Hoher Wertanteil, konstanter Verbrauch",
  AY: "Hoher Wertanteil, schwankender Verbrauch",
  AZ: "Hoher Wertanteil, sporadischer Verbrauch",
  BX: "Mittlerer Wertanteil, konstanter Verbrauch",
  BY: "Mittlerer Wertanteil, schwankender Verbrauch",
  BZ: "Mittlerer Wertanteil, sporadischer Verbrauch",
  CX: "Geringer Wertanteil, konstanter Verbrauch",
  CY: "Geringer Wertanteil, schwankender Verbrauch",
  CZ: "Geringer Wertanteil, sporadischer Verbrauch",
};

const allCards = Object.entries(correctTextByCell).map(([cell, text]) => ({ id: cell, text }));

const matrix = reactive({
  A: { X: null, Y: null, Z: null },
  B: { X: null, Y: null, Z: null },
  C: { X: null, Y: null, Z: null },
});

const selectedCardId = ref(null);
const matrixChecked = ref(false);
const matrixCorrect = ref(0);

const availableCards = computed(() => {
  const placedIds = new Set();
  for (const r of ["A", "B", "C"]) {
    for (const c of ["X", "Y", "Z"]) {
      if (matrix[r][c]?.id) placedIds.add(matrix[r][c].id);
    }
  }
  return allCards.filter((c) => !placedIds.has(c.id));
});

function cardById(id) {
  return allCards.find((c) => c.id === id) || null;
}
function selectCard(id) {
  selectedCardId.value = id;
}
function placeCard(row, col) {
  if (!selectedCardId.value) return;
  const card = cardById(selectedCardId.value);
  if (!card) return;
  matrix[row][col] = card;
  selectedCardId.value = null;
  matrixChecked.value = false;
}
function removeCard(row, col) {
  matrix[row][col] = null;
  matrixChecked.value = false;
}
function resetMatrix() {
  for (const r of ["A", "B", "C"]) {
    for (const c of ["X", "Y", "Z"]) matrix[r][c] = null;
  }
  selectedCardId.value = null;
  matrixChecked.value = false;
  matrixCorrect.value = 0;
}
function checkMatrix() {
  let ok = 0;
  for (const r of ["A", "B", "C"]) {
    for (const c of ["X", "Y", "Z"]) {
      const placed = matrix[r][c];
      const key = `${r}${c}`;
      if (placed && placed.text === correctTextByCell[key]) ok++;
    }
  }
  matrixCorrect.value = ok;
  matrixChecked.value = true;
}
const matrixScoreText = computed(() => (matrixChecked.value ? `Richtig: ${matrixCorrect.value} / 9` : ""));
</script>

<style scoped>
.page {
  padding: 24px;
  color: #e8e8e8;
  background: #0f1115;
  min-height: 100vh;
}
.title {
  font-size: 34px;
  margin: 0 0 14px 0;
  color: #49a3ff;
}
.h2 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 900;
}
.card {
  background: #171a20;
  border: 1px solid #222733;
  border-radius: 14px;
  padding: 18px;
  margin-bottom: 18px;
}
.muted {
  color: #cfd7e3;
  line-height: 1.5;
}
.smallMuted {
  margin-top: 10px;
  font-size: 12px;
  color: #9fb2d1;
}
.bullets ul {
  margin: 10px 0 0 18px;
}
.section {
  margin-top: 16px;
}
.sectionTitle {
  font-size: 22px;
  margin: 0 0 10px 0;
  border-left: 4px solid #2d86ff;
  padding-left: 12px;
}
.subTitle {
  font-weight: 900;
  margin: 12px 0 8px 0;
}
.formulaBox {
  background: #10131a;
  border: 1px solid #2a3142;
  border-radius: 12px;
  padding: 12px;
  margin: 10px 0 10px;
}
.formula {
  font-weight: 800;
}
.tableWrap {
  overflow-x: auto;
  background: #14171c;
  border: 1px solid #222733;
  border-radius: 12px;
}
.tbl {
  width: 100%;
  border-collapse: collapse;
  min-width: 1060px;
}
.tbl th,
.tbl td {
  border-bottom: 1px solid #232a38;
  padding: 10px;
}
.tbl th {
  background: #131720;
  text-align: left;
  font-weight: 700;
  color: #dfe7f5;
}
.num {
  text-align: center;
  white-space: nowrap;
}
.pname {
  font-weight: 800;
}
.inp {
  width: 160px;
  max-width: 100%;
  padding: 7px 8px;
  border-radius: 6px;
  border: 1px solid #2a3142;
  background: #10131a;
  color: #e8e8e8;
  outline: none;
}
.inp.ok {
  border-color: #2ecc71;
}
.inp.bad {
  border-color: #ff4d4f;
}
.hint {
  margin-top: 4px;
  font-size: 12px;
  color: #9fb2d1;
}
.btnRow {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 12px;
  flex-wrap: wrap;
}
.btn {
  border: 1px solid #2a3142;
  background: #151a24;
  color: #e8e8e8;
  padding: 9px 14px;
  border-radius: 10px;
  cursor: pointer;
}
.btn.primary {
  background: #0f63d8;
  border-color: #0f63d8;
}
.score {
  margin-left: auto;
  color: #cfe0ff;
  font-weight: 800;
}
.sep {
  border: none;
  border-top: 1px solid #232a38;
  margin: 22px 0;
}
.yellowHead {
  background: #6a5a00 !important;
  color: #fff !important;
}
.yellowCell {
  background: rgba(106, 90, 0, 0.25);
}

/* Matrix */
.infoBox {
  background: #0d3b46;
  border: 1px solid #1c5b6a;
  border-radius: 12px;
  padding: 14px;
  margin: 10px 0 12px;
}
.infoTitle {
  font-weight: 800;
  margin-bottom: 6px;
}
.hintCard {
  background: #171a20;
  border: 1px solid #222733;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 14px;
}
.hintTitle {
  font-weight: 800;
  margin-bottom: 6px;
}
.grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 14px;
}
@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
.matrixWrap {
  background: #14171c;
  border: 1px solid #222733;
  border-radius: 12px;
  padding: 12px;
}
.matrix {
  width: 100%;
  border-collapse: collapse;
}
.matrix th,
.matrix td {
  border: 1px solid #232a38;
  padding: 10px;
}
.matrix thead th {
  background: #131720;
}
.rowHead {
  width: 60px;
  text-align: center;
  background: #131720;
}
.cell {
  height: 78px;
  vertical-align: middle;
  cursor: pointer;
  background: #10131a;
}
.placeholder {
  color: #9aa9c2;
  font-size: 13px;
  text-align: center;
}
.placed {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  background: #1b2230;
  border: 1px solid #2a3142;
  border-radius: 10px;
  padding: 10px;
  font-size: 13px;
}
.mini {
  border: none;
  background: #2a3142;
  color: #fff;
  border-radius: 8px;
  padding: 4px 8px;
  cursor: pointer;
}
.cardsWrap {
  background: #14171c;
  border: 1px solid #222733;
  border-radius: 12px;
  padding: 12px;
}
.cardsTitle {
  font-weight: 900;
  margin-bottom: 10px;
}
.cards {
  display: grid;
  gap: 8px;
}
.cardBtn {
  text-align: left;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #2a3142;
  background: #10131a;
  color: #e8e8e8;
  cursor: pointer;
}
.cardBtn.selected {
  border-color: #2d86ff;
  outline: 2px solid rgba(45, 134, 255, 0.25);
}
/* ===== Matrix Layout Refresh ===== */
.matrixSection {
  margin-top: 14px;
}

.matrixTop {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 14px;
}

@media (max-width: 980px) {
  .matrixTop {
    grid-template-columns: 1fr;
  }
}

.matrixGrid {
  display: grid;
  grid-template-columns: 1.25fr 0.95fr;
  gap: 14px;
  align-items: stretch;
}

@media (max-width: 1100px) {
  .matrixGrid {
    grid-template-columns: 1fr;
  }
}

.matrixPanel,
.cardsPanel {
  background: #14171c;
  border: 1px solid #222733;
  border-radius: 14px;
  padding: 12px;
  min-height: 420px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.25);
}

.matrixPanel {
  display: flex;
  flex-direction: column;
}

.matrixPanel .matrix {
  flex: 1;
}

/* Buttons unten sauber */
.matrixActions {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 12px;
}

.matrixActions .score {
  margin-left: auto;
}

/* Kartenpanel: Header + Scroll */
.cardsPanel {
  display: flex;
  flex-direction: column;
}

.cardsHeader {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #232a38;
  margin-bottom: 10px;
}

.cardsTitle {
  font-weight: 900;
  font-size: 16px;
}

.cardsMeta {
  font-size: 12px;
  color: #9fb2d1;
}

/* Kartenliste scrollt, nicht die ganze Seite */
.cardsPanel .cards {
  overflow: auto;
  padding-right: 4px;
  flex: 1;
  display: grid;
  gap: 8px;
}

/* Kartenbuttons kompakter & cleaner */
.cardsPanel .cardBtn {
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #2a3142;
  background: #10131a;
  color: #e8e8e8;
  cursor: pointer;
  transition: transform 120ms ease, border-color 120ms ease;
}
.cardsPanel .cardBtn:hover {
  transform: translateY(-1px);
  border-color: #3a73d9;
}

/* Optional: ausgewählte Karte schöner */
.cardsPanel .cardBtn.selected {
  border-color: #2d86ff;
  outline: 2px solid rgba(45,134,255,0.20);
}

.cardsFooter {
  padding-top: 10px;
  border-top: 1px solid #232a38;
  margin-top: 10px;
}
/* ===== Lesbarkeit fix: Text heller ===== */

/* Standard-Text in Cards/Sections */
.page {
  color: #f1f5ff;              /* generell heller */
}

/* Fließtext / Erklärtexte */
.muted {
  color: #d9e2f2;              /* deutlich heller als vorher */
}

/* Überschriften in Cards */
.h2, .sectionTitle, .subTitle, .hintTitle, .infoTitle {
  color: #ffffff;
}

/* Tabellen: Kopf + Zellen */
.tbl th {
  color: #f3f7ff;
}

.tbl td {
  color: #e6eeff;
}

/* Matrix: Labels + Karten */
.matrix th, .rowHead {
  color: #f3f7ff;
}

.cardsTitle, .cardsMeta, .smallMuted {
  color: #d9e2f2;
}

/* Inputs: Text + Placeholder besser sichtbar */
.inp {
  color: #ffffff;
}

.inp::placeholder {
  color: rgba(255, 255, 255, 0.55);
}

/* Hinweis-/Info-Boxen Text */
.infoBox, .hintCard {
  color: #eaf2ff;
}
/* ===== LISTEN + FORMELTEXTE: deutlich heller ===== */

/* Schritt-Liste (Schritt 1–3) */
.bullets ul,
.bullets li {
  color: #f2f6ff !important;
  opacity: 1 !important;
}

/* Typische ABC-Anteile */
.abcLimitsTitle,
.abcLimitsList,
.abcLimitsList li {
  color: #f2f6ff !important;
  opacity: 1 !important;
}

.abcPct {
  color: rgba(242, 246, 255, 0.85) !important;
}

/* XYZ Formel + X/Y/Z Regeln */
.formulaBox,
.formulaBox .formula,
.formulaBox ul,
.formulaBox li {
  color: #f2f6ff !important;
  opacity: 1 !important;
}

/* Falls deine X/Y/Z Liste nicht in .formulaBox steckt */
.card ul,
.card li {
  color: #f2f6ff;
}

/* Titel "Typische ABC-Anteile" / "Variationskoeffizient" etc. */
.abcLimitsTitle,
.subTitle {
  color: #ffffff !important;
}


</style>
