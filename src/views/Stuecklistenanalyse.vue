<template>
  <div class="page">
    <h1 class="title">Stücklistenanalyse</h1>

    <!-- ===== Kontext (gleiches Layout wie ABC/XYZ) ===== -->
    <div class="card">
      <h2 class="h2">Überblick</h2>
      <p class="muted">
        In dieser Einheit übst du die Ableitung von <b>Sekundärbedarf</b> aus einem gegebenen <b>Primärbedarf</b>
        mithilfe von <b>Baukastenstücklisten</b>, <b>Mengenstückliste</b> und <b>Strukturstückliste für Dispositionsstufen</b>.
      </p>

      <div class="twoCol">
        <!-- linke Box -->
        <div class="hintCard">
          <div class="hintTitle">Begriffe </div>
          <ul class="list">
            <li><b>Primärbedarf:</b> Bedarf an Endprodukt (hier: Material X)</li>
            <li><b>Sekundärbedarf:</b> Bedarf an Baugruppen/Teilen, der aus dem Primärbedarf abgeleitet wird</li>
            <li><b>Mengenstückliste:</b> unstrukturierte Stückliste, die alle Bau- und Einzelteile mit ihren Mengen enthält</li>
            <li><b>Baukastenstückliste:</b> wie Mengenstückliste, aber nur für die <b>erste Fertigungsstufe</b> (direkte Komponenten)</li>
            <li><b>Strukturstückliste für Dispositionsstufen:</b> gleiche Teile werden in die jeweils unterste Stufe gezogen, um die Disposition zu erleichtern</li>
          </ul>

        </div>

        <!-- rechte Box (Diagramm) -->
        <div class="hintCard">
          <div class="hintTitle">Stückliste</div>

          <div class="gozintoMeta">
            <span class="gozintoBadge">Primärbedarf X</span>
            <span class="gozintoVal">{{ primaryDemand }} Stück</span>
          </div>

          <div class="gozintoWrap">
            <!-- Inline SVG Diagramm -->
            <svg class="gozintoSvg" viewBox="0 0 900 420" preserveAspectRatio="xMidYMid meet">
              <g class="gozLink">
                <line x1="450" y1="80" x2="240" y2="155" />
                <line x1="450" y1="80" x2="450" y2="155" />
                <line x1="450" y1="80" x2="660" y2="155" />
                <line x1="240" y1="195" x2="150" y2="270" />
                <line x1="240" y1="195" x2="330" y2="270" />
                <line x1="150" y1="310" x2="90" y2="385" />
                <line x1="150" y1="310" x2="210" y2="385" />
                <line x1="660" y1="195" x2="600" y2="270" />
                <line x1="660" y1="195" x2="720" y2="270" />
              </g>

              <g class="gozEdgeText">
                <text x="305" y="125">2</text>
                <text x="444" y="125">5</text>
                <text x="598" y="125">3</text>
                <text x="185" y="238">1</text>
                <text x="285" y="238">2</text>
                <text x="112" y="335">5</text>
                <text x="190" y="335">3</text>
                <text x="622" y="238">5</text>
                <text x="704" y="238">3</text>
              </g>

              <g class="gozNode">
                <rect x="390" y="20" width="120" height="60" rx="8" />
                <text x="450" y="55" text-anchor="middle">
                  Material <tspan x="450" dy="18">X</tspan>
                </text>

                <rect x="180" y="135" width="120" height="60" rx="8" />
                <text x="240" y="170" text-anchor="middle">
                  Bauteil <tspan x="240" dy="18">A</tspan>
                </text>

                <rect x="390" y="135" width="120" height="60" rx="8" />
                <text x="450" y="170" text-anchor="middle">
                  Teil <tspan x="450" dy="18">c</tspan>
                </text>

                <rect x="600" y="135" width="120" height="60" rx="8" />
                <text x="660" y="170" text-anchor="middle">
                  Bauteil <tspan x="660" dy="18">B</tspan>
                </text>

                <rect x="90" y="250" width="120" height="60" rx="8" />
                <text x="150" y="285" text-anchor="middle">
                  Bauteil <tspan x="150" dy="18">B</tspan>
                </text>

                <rect x="270" y="250" width="120" height="60" rx="8" />
                <text x="330" y="285" text-anchor="middle">
                  Teil <tspan x="330" dy="18">c</tspan>
                </text>

                <rect x="30" y="345" width="120" height="60" rx="8" />
                <text x="90" y="380" text-anchor="middle">
                  Teil <tspan x="90" dy="18">a</tspan>
                </text>

                <rect x="150" y="345" width="120" height="60" rx="8" />
                <text x="210" y="380" text-anchor="middle">
                  Teil <tspan x="210" dy="18">b</tspan>
                </text>

                <rect x="540" y="250" width="120" height="60" rx="8" />
                <text x="600" y="285" text-anchor="middle">
                  Teil <tspan x="600" dy="18">a</tspan>
                </text>

                <rect x="690" y="250" width="120" height="60" rx="8" />
                <text x="750" y="285" text-anchor="middle">
                  Teil <tspan x="750" dy="18">b</tspan>
                </text>
              </g>
            </svg>
          </div>

        </div>
      </div>
    </div>

    <!-- ===== Tabs (Mengenstückliste links) ===== -->
    <div class="tabsRow">
      <button class="btn" :class="{ primary: activeTab==='mengen' }" @click="activeTab='mengen'">
        Mengenstückliste
      </button>

      <button class="btn" :class="{ primary: activeTab==='baukasten' }" @click="activeTab='baukasten'">
        Baukastenstückliste
      </button>

      <button class="btn" :class="{ primary: activeTab==='struktur' }" @click="activeTab='struktur'">
        Strukturstückliste für Dispositionsstufen
      </button>
    </div>

    <!-- ===== Aufgabe-Card ===== -->
    <section class="section">
      <h2 class="sectionTitle" v-if="activeTab==='mengen'">Aufgabe 1: Mengenstückliste ableiten</h2>
      <h2 class="sectionTitle" v-else-if="activeTab==='baukasten'">Aufgabe 2: Baukastenstücklisten erstellen</h2>
      <h2 class="sectionTitle" v-else>Aufgabe 3: Strukturstückliste nach Dispositionsstufen</h2>

      <div class="card">
        <!-- Mengenstückliste -->
        <p class="muted" v-if="activeTab==='mengen'">
          Eine <b>Mengenstückliste</b> ist eine <b>unstrukturierte Stückliste</b>:
          Sie enthält für das jeweilige Produkt <b>alle Bau- und Einzelteile</b> mit ihren <b>Gesamtmengen</b>.
          Du leitest also aus dem gegebenen <b>Primärbedarf</b> den <b>aggregierten Sekundärbedarf</b> ab (über alle Ebenen).
        </p>

        <!-- Baukastenstückliste -->
        <p class="muted" v-else-if="activeTab==='baukasten'">
          Eine <b>Baukastenstückliste</b> betrachtet nur die erste Fertigungsstufe:
          Sie zeigt die <b>direkten Komponenten</b> eines Endprodukts oder Bauteils ohne Aggregation über weitere Ebenen.
          Trage daher nur die <b>direkten Stücklistenkoeffizienten</b> (Menge pro Einheit) ein.
        </p>

        <!-- Strukturstückliste für Dispositionsstufen -->
        <p class="muted" v-else>
          In der <b>Strukturstückliste für Dispositionsstufen</b> wird die Struktur so aufbereitet,
          dass <b>gleich verwendete Teile</b> in die <b>jeweils unterste Stufe</b> „gezogen“ werden, um die Disposition zu erleichtern.
          <br />
          <b>Dispositionsstufe</b> bedeutet: ein Bauteil/Einzelteil wird im Fertigungsablauf <b>erstmals</b> benötigt.
          (Merke: Vorteil = geringere Beschaffungskosten; Nachteil = Kapitalbindung & Lagerkosten.)
        </p>

        <!-- Hier kommt DEIN bestehender Aufgaben-Content rein -->
        <!-- Du musst unten nur die Wrapper-Klassen beibehalten -->
        <div class="slotArea">
          <!-- =========================
               TAB 1: Baukastenstückliste
               ========================= -->
          <div v-if="activeTab === 'baukasten'">
            <div class="grid3">
              <!-- Material X -->
              <div class="subcard">
                <div class="subTitle">Baukastenstückliste: Material X</div>
                <div class="tableWrap">
                  <table class="tbl miniTbl">
                    <thead>
                    <tr>
                      <th>Komponente</th>
                      <th class="center">Menge</th>
                      <th class="center">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Bauteil A</td>
                      <td class="center">
                        <input class="inp sm" v-model="bauUser.XA" :class="bauRes ? stateCls(bauRes.XA) : ''" />
                      </td>
                      <td class="center">{{ bauRes ? badge(bauRes.XA) : "—" }}</td>
                    </tr>
                    <tr>
                      <td>Teil c</td>
                      <td class="center">
                        <input class="inp sm" v-model="bauUser.Xc" :class="bauRes ? stateCls(bauRes.Xc) : ''" />
                      </td>
                      <td class="center">{{ bauRes ? badge(bauRes.Xc) : "—" }}</td>
                    </tr>
                    <tr>
                      <td>Bauteil B</td>
                      <td class="center">
                        <input class="inp sm" v-model="bauUser.XB" :class="bauRes ? stateCls(bauRes.XB) : ''" />
                      </td>
                      <td class="center">{{ bauRes ? badge(bauRes.XB) : "—" }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Bauteil A -->
              <div class="subcard">
                <div class="subTitle">Baukastenstückliste: Bauteil A</div>
                <div class="tableWrap">
                  <table class="tbl miniTbl">
                    <thead>
                    <tr>
                      <th>Komponente</th>
                      <th class="center">Menge</th>
                      <th class="center">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Bauteil B</td>
                      <td class="center">
                        <input class="inp sm" v-model="bauUser.AB" :class="bauRes ? stateCls(bauRes.AB) : ''" />
                      </td>
                      <td class="center">{{ bauRes ? badge(bauRes.AB) : "—" }}</td>
                    </tr>
                    <tr>
                      <td>Teil c</td>
                      <td class="center">
                        <input class="inp sm" v-model="bauUser.Ac" :class="bauRes ? stateCls(bauRes.Ac) : ''" />
                      </td>
                      <td class="center">{{ bauRes ? badge(bauRes.Ac) : "—" }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Bauteil B -->
              <div class="subcard">
                <div class="subTitle">Baukastenstückliste: Bauteil B</div>
                <div class="tableWrap">
                  <table class="tbl miniTbl">
                    <thead>
                    <tr>
                      <th>Komponente</th>
                      <th class="center">Menge</th>
                      <th class="center">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Teil a</td>
                      <td class="center">
                        <input class="inp sm" v-model="bauUser.Ba" :class="bauRes ? stateCls(bauRes.Ba) : ''" />
                      </td>
                      <td class="center">{{ bauRes ? badge(bauRes.Ba) : "—" }}</td>
                    </tr>
                    <tr>
                      <td>Teil b</td>
                      <td class="center">
                        <input class="inp sm" v-model="bauUser.Bb" :class="bauRes ? stateCls(bauRes.Bb) : ''" />
                      </td>
                      <td class="center">{{ bauRes ? badge(bauRes.Bb) : "—" }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="smallMuted" style="margin-top:10px;">
              Merksatz: Baukastenstückliste = direkte Komponenten je Baugruppe (keine Aggregation über Ebenen).
            </div>
          </div>

          <!-- =========================
               TAB 2: Mengenstückliste
               ========================= -->
          <div v-else-if="activeTab === 'mengen'">
            <div class="actions" style="margin-bottom:10px;">
              <button class="btn" @click="newTask">Neue Aufgabe</button>

              <label class="toggle">
                <input type="checkbox" v-model="showSol" />
                Lösung anzeigen
              </label>

              <div class="msAuto kpiLine">
                <span class="kpiBadge">Primärbedarf X</span>
                <span class="kpiVal">{{ primaryDemand }} Stück</span>
              </div>
            </div>

            <div class="tableWrap">
              <table class="tbl">
                <thead>
                <tr>
                  <th>Position</th>
                  <th class="center">
                    <span class="thShift">Dein Ergebnis</span>
                  </th>
                  <th class="center">Status</th>
                  <th class="center" v-if="showSol">Lösung</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="r in mengenRows" :key="r.key">
                  <td><b>{{ r.label }}</b></td>
                  <td class="center resultCol">
                    <input
                        class="inp sm"
                        v-model="mengenUser[r.key]"
                        :class="mengenRes ? stateCls(mengenRes[r.key]) : ''"
                    />
                  </td>
                  <td class="center">{{ mengenRes ? badge(mengenRes[r.key]) : "—" }}</td>
                  <td class="center" v-if="showSol"><b>{{ demand[r.key] }}</b></td>
                </tr>
                </tbody>
              </table>
            </div>

            <div class="smallMuted" style="margin-top:10px;">
              Tipp: Gesamtnachfrage je Teil = Summe über alle Pfade in der Struktur (Aggregation über Ebenen).
            </div>
          </div>

          <!-- =========================
               TAB 3: Dispositionsstufen
               ========================= -->
          <div v-else>
            <div class="dispoGrid">
              <!-- Levels -->
              <div class="levels">
                <div
                    class="levelCard"
                    v-for="lvl in [0,1,2,3]"
                    :key="lvl"
                    @click="placeToLevel(lvl)"
                >
                  <div class="levelHead">
                    <div class="levelTitle">Dispositionsstufe {{ lvl }}</div>
                    <div class="levelMeta">
                      {{ dispo[lvl].length }} / {{ target[lvl].length }}
                      <span v-if="dispoRes" style="margin-left:8px;">{{ dispoRes[lvl] ? "✅" : "❌" }}</span>
                    </div>
                  </div>

                  <div class="levelBody">
                    <div v-if="dispo[lvl].length === 0" class="empty muted">Hier ablegen…</div>

                    <div class="chips">
                      <div class="chip" v-for="id in dispo[lvl]" :key="id">
                        {{ labelOf(id) }}
                        <button class="chipX" @click.stop="removeFromLevel(lvl, id)">×</button>
                      </div>
                    </div>
                  </div>

                  <div class="smallMuted" style="margin-top:10px;">
                    Klick auf Karte rechts → dann hier klicken zum Ablegen.
                  </div>
                </div>
              </div>

              <!-- Pool -->
              <aside class="pool">
                <div class="poolHead">
                  <div class="subTitle">Karten</div>
                  <div class="levelMeta">{{ pool.length }} verfügbar</div>
                </div>

                <div class="smallMuted" style="margin-bottom:10px;">
                  Ausgewählt: <b>{{ selectedLabel }}</b>
                </div>

                <div class="poolList">
                  <button
                      v-for="c in pool"
                      :key="c.id"
                      class="poolBtn"
                      :class="{ selected: selected === c.id }"
                      @click="selected = c.id"
                  >
                    {{ c.label }}
                  </button>
                </div>

                <div class="smallMuted" style="margin-top:10px;">
                  Ziel: Teile/Baugruppen den richtigen Dispositionsstufen zuordnen (0–3).
                </div>
              </aside>
            </div>
          </div>
        </div>


        <div class="btnRow">
          <button class="btn primary" @click="onCheck">Prüfen</button>
          <button class="btn" @click="onReset">Zurücksetzen</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";

/* ===== Layout / Tabs ===== */
const activeTab = ref("mengen"); // war: tab

/* ===== Aufgabe: Primärbedarf ist gegeben (nicht vom User) ===== */
const primaryDemand = ref(20);

function newTask() {
  const candidates = [5, 8, 10, 12, 15, 20, 25, 30];
  primaryDemand.value = candidates[Math.floor(Math.random() * candidates.length)];
  resetBau();
  resetMengen();
  resetDispo();
}

/* ===== BOM (Gozinto-Koeffizienten) ===== */
const bom = {
  X: { A: 2, c: 5, B: 3 },
  A: { B: 1, c: 2 },
  B: { a: 5, b: 3 }
};

/* ===== Mengenstückliste (aggregiert) ===== */
const demand = computed(() => {
  const X = primaryDemand.value;

  const A = bom.X.A * X;                 // 2X
  const B = bom.X.B * X + bom.A.B * A;   // 3X + 1A
  const c = bom.X.c * X + bom.A.c * A;   // 5X + 2A
  const a = bom.B.a * B;                 // 5B
  const b = bom.B.b * B;                 // 3B

  return { X, A, B, c, a, b };
});

/* ===== Helper ===== */
function parseIntSafe(v) {
  const n = Number(String(v ?? "").replace(",", "."));
  if (!Number.isFinite(n)) return null;
  return Math.floor(n);
}
function stateCls(ok) {
  if (ok === true) return "okField";
  if (ok === false) return "badField";
  return "";
}
function allOk(res) {
  if (!res) return false;
  return Object.values(res).every(Boolean);
}
function badge(ok) {
  if (ok === true) return "✅";
  if (ok === false) return "❌";
  return "—";
}

/* =========================
   TAB 1: Baukastenstückliste
   ========================= */
const bauCorrect = { XA: 2, Xc: 5, XB: 3, AB: 1, Ac: 2, Ba: 5, Bb: 3 };
const bauUser = reactive({ XA: "", Xc: "", XB: "", AB: "", Ac: "", Ba: "", Bb: "" });
const bauRes = ref(null);

function checkBau() {
  const res = {};
  for (const k of Object.keys(bauCorrect)) {
    res[k] = parseIntSafe(bauUser[k]) === bauCorrect[k];
  }
  bauRes.value = res;
}
function resetBau() {
  for (const k of Object.keys(bauUser)) bauUser[k] = "";
  bauRes.value = null;
}

/* =========================
   TAB 2: Mengenstückliste
   ========================= */
const mengenRows = [
  { key: "A", label: "Bauteil A" },
  { key: "B", label: "Bauteil B" },
  { key: "c", label: "Teil c" },
  { key: "a", label: "Teil a" },
  { key: "b", label: "Teil b" }
];

const mengenUser = reactive({ A: "", B: "", c: "", a: "", b: "" });
const mengenRes = ref(null);
const showSol = ref(false);

function checkMengen() {
  const corr = demand.value;
  mengenRes.value = {
    A: parseIntSafe(mengenUser.A) === corr.A,
    B: parseIntSafe(mengenUser.B) === corr.B,
    c: parseIntSafe(mengenUser.c) === corr.c,
    a: parseIntSafe(mengenUser.a) === corr.a,
    b: parseIntSafe(mengenUser.b) === corr.b
  };
}
function resetMengen() {
  mengenUser.A = "";
  mengenUser.B = "";
  mengenUser.c = "";
  mengenUser.a = "";
  mengenUser.b = "";
  mengenRes.value = null;
  showSol.value = false;
}

/* =========================
   TAB 3: Dispositionsstufen (4)
   ========================= */
const cards = [
  { id: "X", label: "Material X" },
  { id: "A", label: "Bauteil A" },
  { id: "B", label: "Bauteil B" },
  { id: "c", label: "Teil c" },
  { id: "a", label: "Teil a" },
  { id: "b", label: "Teil b" }
];

const target = {
  0: ["X"],
  1: ["A"],
  2: ["B", "c"],
  3: ["a", "b"]
};

const dispo = reactive({ 0: [], 1: [], 2: [], 3: [] });
const selected = ref("X");
const selectedLabel = computed(() => cards.find(x => x.id === selected.value)?.label || "—");

const pool = computed(() => {
  const used = new Set([...dispo[0], ...dispo[1], ...dispo[2], ...dispo[3]]);
  return cards.filter(c => !used.has(c.id));
});

function labelOf(id) {
  return cards.find(c => c.id === id)?.label || id;
}

function removeFromLevel(lvl, id) {
  dispo[lvl] = dispo[lvl].filter(x => x !== id);
  dispoRes.value = null;
}

function placeToLevel(lvl) {
  const id = selected.value;
  if (!id) return;

  for (const L of [0, 1, 2, 3]) dispo[L] = dispo[L].filter(x => x !== id);
  dispo[lvl] = [...dispo[lvl], id];

  if (pool.value.length > 0) selected.value = pool.value[0].id;
  dispoRes.value = null;
}

function sameSet(a, b) {
  const A = new Set(a), B = new Set(b);
  if (A.size !== B.size) return false;
  for (const x of A) if (!B.has(x)) return false;
  return true;
}

const dispoRes = ref(null);
function checkDispo() {
  dispoRes.value = {
    0: sameSet(dispo[0], target[0]),
    1: sameSet(dispo[1], target[1]),
    2: sameSet(dispo[2], target[2]),
    3: sameSet(dispo[3], target[3])
  };
}
function resetDispo() {
  dispo[0] = [];
  dispo[1] = [];
  dispo[2] = [];
  dispo[3] = [];
  selected.value = "X";
  dispoRes.value = null;
}
function dispoOk(lvl) {
  return dispoRes.value?.[lvl] === true;
}

/* =========================
   ✅ B) Wrapper für dein Template (A)
   Die Buttons "Prüfen" / "Zurücksetzen" rufen diese Funktionen auf
   ========================= */
function onCheck() {
  if (activeTab.value === "baukasten") checkBau();
  else if (activeTab.value === "mengen") checkMengen();
  else checkDispo();
}

function onReset() {
  if (activeTab.value === "baukasten") resetBau();
  else if (activeTab.value === "mengen") resetMengen();
  else resetDispo();
}

</script>



<style scoped>
/* ===== Style wie ABC/XYZ (dark, clean, blau #49a3ff) ===== */
:root { --brand: #49a3ff; }

.page{
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 18px 48px;
  color: #f1f5ff;
}

.hero{
  padding: 22px 18px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(20,23,28,0.92), rgba(12,14,18,0.92));
  border: 1px solid #222733;
  box-shadow: 0 10px 26px rgba(0,0,0,0.25);
  margin-bottom: 14px;
}

.h1{
  margin: 0 0 6px;
  font-size: 42px;
  letter-spacing: 0.2px;
  color: var(--brand);
  font-weight: 900;
}

.h2{
  margin: 0 0 10px;
  font-size: 20px;
  color: #fff;
  font-weight: 800;
}

.muted{
  color: #d9e2f2;
  line-height: 1.55;
}

.mini{ font-size: 13px; }
.small{ font-size: 12px; }

.card{
  background: #14171c;
  border: 1px solid #222733;
  border-radius: 18px;
  padding: 16px 16px 14px;
  box-shadow: 0 10px 26px rgba(0,0,0,0.22);
  margin-bottom: 14px;
}

/* Infoboxen wie ABC/XYZ */
.matrixTop{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  align-items: stretch;
}
@media (max-width: 980px){
  .matrixTop{ grid-template-columns: 1fr; }
}
.infoBox, .hintCard{
  background: #10131a;
  border: 1px solid #2a3142;
  border-radius: 16px;
  padding: 16px;
  height: 100%;
}
.infoTitle, .hintTitle{
  color: #fff;
  font-weight: 900;
  margin-bottom: 10px;
}
.infoBox ul{
  margin: 0 0 0 18px;
  padding: 0;
}
.infoBox li{
  color: #f2f6ff;
  line-height: 1.65;
}

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

/* Tabs */
.tabs{
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 10px 0 14px;
}
.tab{
  border: 1px solid #2a3142;
  background: #10131a;
  color: #eaf2ff;
  padding: 10px 12px;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 800;
}
.tab.active{
  border-color: rgba(73,163,255,0.8);
  outline: 2px solid rgba(73,163,255,0.16);
}

/* Subcards */
.grid3{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 10px;
}
@media (max-width: 1100px){
  .grid3{ grid-template-columns: 1fr; }
}
.subcard{
  background: #10131a;
  border: 1px solid #2a3142;
  border-radius: 16px;
  padding: 14px;
}
.subTitle{
  color: #fff;
  font-weight: 900;
  margin-bottom: 8px;
}

/* Table */
.tableWrap{ overflow:auto; border-radius: 14px; border: 1px solid #2a3142; }
.tbl{
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
  background: #0b0e14;
}
.tbl th{
  text-align: left;
  padding: 12px 12px;
  color: #fff;
  background: rgba(73,163,255,0.18);
  border-bottom: 1px solid #2a3142;
  font-weight: 900;
}
.tbl td{
  padding: 12px 12px;
  border-bottom: 1px solid rgba(42,49,66,0.7);
  color: #e6eeff;
}
.tbl tr:hover td{ background: rgba(255,255,255,0.03); }

.right{ text-align:right; }
.center{ text-align:center; }

.miniTbl{ min-width: 0; }
.miniTbl .inp.sm{ max-width: 120px; }

/* Inputs */
.inp{
  width: 100%;
  background: #0b0e14;
  border: 1px solid #2a3142;
  border-radius: 12px;
  padding: 10px 12px;
  color: #fff;
  outline: none;
}
.inp.sm{ padding: 8px 10px; border-radius: 10px; max-width: 160px; margin-left:auto; }

.okField{ border-color: rgba(58,220,148,0.75) !important; }
.badField{ border-color: rgba(255,106,106,0.75) !important; }

/* Buttons */
.actions{
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
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
.btn.ghost{
  background: transparent;
}
.btn.sm{
  padding: 7px 10px;
  border-radius: 12px;
}

/* Toggle */
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
}
.toggle input{ accent-color: var(--brand); }

/* Dispo (wie ABC/XYZ style) */
.infoRow{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin: 10px 0 14px;
}
@media (max-width: 980px){
  .infoRow{ grid-template-columns: 1fr; }
}
.hintBox{
  background: #10131a;
  border: 1px solid #2a3142;
  border-radius: 16px;
  padding: 14px;
}
.mutedList{ margin: 6px 0 0 18px; }
.mutedList li{ color:#f2f6ff; line-height: 1.65; }

.dispoGrid{
  display:grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 14px;
  align-items: stretch;
}
@media (max-width: 1100px){
  .dispoGrid{ grid-template-columns: 1fr; }
}

.levels{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
@media (max-width: 980px){
  .levels{ grid-template-columns: 1fr; }
}

.levelCard{
  background: #10131a;
  border: 1px solid #2a3142;
  border-radius: 16px;
  padding: 12px;
  cursor: pointer;
  min-height: 170px;
  display:flex;
  flex-direction: column;
}

.levelHead{
  display:flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid rgba(42,49,66,0.7);
  padding-bottom: 8px;
  margin-bottom: 10px;
}
.levelTitle{ color:#fff; font-weight: 900; }
.levelMeta{ color:#9fb2d1; font-size: 12px; font-weight: 800; }

.levelBody{ flex: 1; }
.empty{ font-size: 13px; opacity: 0.9; }

.chips{ display:flex; flex-wrap: wrap; gap: 8px; }
.chip{
  display:flex;
  gap: 8px;
  align-items:center;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid #2a3142;
  background: rgba(255,255,255,0.06);
  color:#fff;
  font-weight: 900;
  font-size: 12px;
}
.chipX{
  border: none;
  background: transparent;
  color: rgba(255,255,255,0.85);
  cursor: pointer;
  font-weight: 900;
}

.pool{
  background: #10131a;
  border: 1px solid #2a3142;
  border-radius: 16px;
  padding: 12px;
  display:flex;
  flex-direction: column;
  min-height: 360px;
}
.poolHead{
  display:flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid rgba(42,49,66,0.7);
  padding-bottom: 8px;
  margin-bottom: 10px;
}
.poolList{
  display:grid;
  gap: 8px;
  overflow:auto;
  padding-right: 4px;
  flex: 1;
}
.poolBtn{
  text-align:left;
  border: 1px solid #2a3142;
  background: #0b0e14;
  color:#fff;
  padding: 10px 12px;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 900;
}
.poolBtn.selected{
  border-color: rgba(73,163,255,0.85);
  outline: 2px solid rgba(73,163,255,0.16);
}

/* ===== Gozinto Diagram (passt optisch zu ABC/XYZ) ===== */
.gozintoMeta {
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 6px 0 10px;
}

.gozintoBadge {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(73, 163, 255, 0.7);
  background: rgba(73, 163, 255, 0.14);
  font-weight: 900;
  color: #f2f6ff;
  font-size: 12px;
}

.gozintoVal {
  font-weight: 900;
  color: #ffffff;
}

.gozintoWrap {
  background: #10131a;
  border: 1px solid #2a3142;
  border-radius: 14px;
  padding: 12px;
  overflow: hidden;
}

.gozintoSvg {
  width: 100%;
  height: auto;
  display: block;
}

.gozLink line {
  stroke: rgba(220, 230, 255, 0.55);
  stroke-width: 2;
}

.gozEdgeText text {
  fill: #ffffff;
  font-weight: 900;
  font-size: 18px;
}

.gozNode rect {
  fill: #c8c8c8;
  stroke: #2a3142;
  stroke-width: 2;
}

.gozNode text {
  fill: #000;
  font-weight: 900;
  font-size: 18px;
}

.gozintoNote {
  margin-top: 10px;
  color: #d9e2f2;
  font-size: 12px;
}
.page {
  padding: 24px;
  color: #f1f5ff;
  background: #0f1115;
  min-height: 100vh;
}

.title {
  font-size: 34px;
  margin: 0 0 14px 0;
  color: #49a3ff;
}

.card {
  background: #171a20;
  border: 1px solid #222733;
  border-radius: 14px;
  padding: 18px;
  margin-bottom: 18px;
}

.h2 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 900;
  color: #fff;
}

.muted {
  color: #d9e2f2;
  line-height: 1.5;
}

.smallMuted {
  margin-top: 10px;
  font-size: 12px;
  color: #9fb2d1;
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

/* ===== 2 Spalten Boxen wie ABC/XYZ ===== */
.twoCol {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 12px;
}

@media (max-width: 980px) {
  .twoCol {
    grid-template-columns: 1fr;
  }
}

.hintCard {
  background: #14171c;
  border: 1px solid #222733;
  border-radius: 14px;
  padding: 14px;
}

.hintTitle {
  font-weight: 900;
  margin-bottom: 8px;
  color: #fff;
}

.list {
  margin: 0 0 0 18px;
  color: #f2f6ff;
}

.list li {
  margin: 6px 0;
}

/* ===== Tabs Row ===== */
.tabsRow {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 8px 0 14px;
}

/* ===== Diagramm ===== */
.gozintoMeta {
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 6px 0 10px;
}

.gozintoBadge {
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(73, 163, 255, 0.7);
  background: rgba(73, 163, 255, 0.14);
  font-weight: 900;
  color: #f2f6ff;
  font-size: 12px;
}

.gozintoVal {
  font-weight: 900;
  color: #fff;
}

.gozintoWrap {
  background: #10131a;
  border: 1px solid #2a3142;
  border-radius: 14px;
  padding: 12px;
  overflow: hidden;
}

.gozintoSvg {
  width: 100%;
  height: auto;
  display: block;
}

.gozLink line {
  stroke: rgba(220, 230, 255, 0.55);
  stroke-width: 2;
}

.gozEdgeText text {
  fill: #ffffff;
  font-weight: 900;
  font-size: 18px;
}

.gozNode rect {
  fill: #c8c8c8;
  stroke: #2a3142;
  stroke-width: 2;
}

.gozNode text {
  fill: #000;
  font-weight: 900;
  font-size: 18px;
}

/* Platzhalter für deinen bestehenden Aufgaben-Content */
.slotArea {
  margin-top: 12px;
}
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
/* Ganze Ergebnis-Spalte (Header + Inputs) leicht nach rechts */
.resultCol {
  padding-left: 500px !important; /* teste z.B. 24px–48px */
}
.thShift{
  display: inline-block;
  transform: translateX(600px); /* z.B. 8–20px testen */
  font-weight: inherit;   /* <- übernimmt wieder das Fett vom <th> */

}

</style>
