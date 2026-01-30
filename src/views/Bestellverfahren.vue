<template>
  <div class="page">
    <h1 class="title">Bestellverfahren (Vorratsbeschaffung)</h1>

    <!-- ===== Kontext / Begriffe (im Stil der anderen Pages) ===== -->
    <div class="card">
      <h2 class="h2">Überblick</h2>
      <p class="muted">
        In dieser Einheit geht es um <b>Vorratsbeschaffung</b> und die dazugehörigen <b>Bestellverfahren</b>:
        <b>Bereitstellverfahren</b>, <b>Meldebestandsverfahren</b> und <b>Zykluszeitverfahren</b>.
      </p>

      <div class="twoCol">
        <div class="hintCard">
          <div class="hintTitle">Beschaffungsmethoden</div>
          <ul class="list">
            <li><b>Einzelfallbeschaffung:</b> Beschaffung wird bei konkret bestehendem Bedarf angestoßen.</li>
            <li><b>Vorratsbeschaffung:</b> Es wird ein Vorrat angelegt, damit jederzeit Bestand zur Deckung des Bedarfs vorhanden ist.</li>
            <li><b>(produktions-)synchrone Beschaffung:</b> Material trifft zum Zeitpunkt des Bedarfs ein (z.B. JIT/JIS), kein Vorrat nötig.</li>
          </ul>
        </div>

        <div class="hintCard">
          <div class="hintTitle">Bestellverfahren der Vorratsbeschaffung</div>
          <ul class="list">
            <li><b>Bereitstellverfahren</b> → Auslöser: <b>Verbrauch</b></li>
            <li><b>Meldebestandsverfahren</b> → Auslöser: <b>Bestand</b></li>
            <li><b>Zykluszeitverfahren</b> → Auslöser: <b>Zeitpunkt</b></li>
          </ul>
          <div class="smallMuted">
            Merksatz: Es geht immer darum, <b>wodurch</b> eine Bestellung ausgelöst wird.
          </div>
        </div>
      </div>
    </div>

    <!-- ===== Quiz 1 ===== -->
    <section class="section">
      <h2 class="sectionTitle">Quiz 1: Auslösendes Moment</h2>

      <div class="card">
        <p class="muted">
          Ordne das <b>auslösende Moment</b> der Bestellung zu (Verbrauch / Bestand / Zeitpunkt).
        </p>

        <div class="grid3">
          <div class="subcard">
            <div class="subTitle">Bereitstellverfahren</div>
            <select v-model="match.bereitstell" class="inp" :class="selectCls('bereitstell')">
              <option value="">Bitte wählen…</option>
              <option value="verbrauch">Verbrauch</option>
              <option value="bestand">Bestand</option>
              <option value="zeitpunkt">Zeitpunkt</option>
            </select>
            <div v-if="checked1" class="mini" :class="fbCls('bereitstell')">{{ fbText('bereitstell') }}</div>
          </div>

          <div class="subcard">
            <div class="subTitle">Meldebestandsverfahren</div>
            <select v-model="match.meldebestand" class="inp" :class="selectCls('meldebestand')">
              <option value="">Bitte wählen…</option>
              <option value="verbrauch">Verbrauch</option>
              <option value="bestand">Bestand</option>
              <option value="zeitpunkt">Zeitpunkt</option>
            </select>
            <div v-if="checked1" class="mini" :class="fbCls('meldebestand')">{{ fbText('meldebestand') }}</div>
          </div>

          <div class="subcard">
            <div class="subTitle">Zykluszeitverfahren</div>
            <select v-model="match.zyklus" class="inp" :class="selectCls('zyklus')">
              <option value="">Bitte wählen…</option>
              <option value="verbrauch">Verbrauch</option>
              <option value="bestand">Bestand</option>
              <option value="zeitpunkt">Zeitpunkt</option>
            </select>
            <div v-if="checked1" class="mini" :class="fbCls('zyklus')">{{ fbText('zyklus') }}</div>
          </div>
        </div>

        <div class="btnRow">
          <button class="btn primary" @click="checkMatch">Prüfen</button>
          <button class="btn" @click="resetMatch">Zurücksetzen</button>

          <label class="toggle msAuto">
            <input type="checkbox" v-model="showSolution1" />
            Lösung
          </label>
        </div>

        <Transition name="fade">
          <div v-if="showSolution1" class="solutionCard">
            <div class="hintTitle">Lösung</div>
            <div class="muted">
              Bereitstellverfahren → <b>Verbrauch</b><br />
              Meldebestandsverfahren → <b>Bestand</b><br />
              Zykluszeitverfahren → <b>Zeitpunkt</b>
            </div>
          </div>
        </Transition>
      </div>
    </section>

    <!-- ===== Teil 2 (wie PNG) ===== -->
    <section class="section">
      <h2 class="sectionTitle">Teil 2: Bestellzeitpunkt (Meldebestand)</h2>

      <div class="card">
        <p class="muted">
          Berechnen Sie den <b>Bestellzeitpunkt</b>, falls das Unternehmen das <b>Bestellpunktverfahren</b> anwendet.
        </p>

        <div class="twoCol">
          <div class="hintCard">
            <div class="hintTitle">Gegeben</div>
            <ul class="list">
              <li><b>Jährlicher Bedarf:</b> 12.000 Einheiten</li>
              <li><b>Arbeitstage pro Jahr:</b> 240 Tage</li>
              <li><b>Lieferzeit:</b> 2 Wochen (= 10 Arbeitstage)</li>
              <li><b>Sicherheitsbestand:</b> 200 Einheiten</li>
            </ul>
          </div>

          <div class="hintCard">
            <div class="hintTitle">Hinweis / Formel</div>
            <div class="formulaBox">
              Meldebestand = (Tagesbedarf × Lieferzeit in Tagen) + Sicherheitsbestand
            </div>
            <div class="smallMuted" style="margin-top: 10px;">
              Tagesbedarf = Jahresbedarf / Arbeitstage pro Jahr
            </div>
          </div>
        </div>

        <div class="tableWrap" style="margin-top: 12px;">
          <table class="tbl miniTbl">
            <thead>
            <tr>
              <th>Gesucht</th>
              <th class="center">Deine Eingabe</th>
              <th class="center">Status</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><b>Tagesbedarf</b> (Einheiten/Tag)</td>
              <td class="center">
                <input
                    class="inp sm"
                    inputmode="numeric"
                    v-model="teil2User.tagesbedarf"
                    :class="stateCls(teil2Res?.tagesbedarf)"
                />
              </td>
              <td class="center">{{ badge(teil2Res?.tagesbedarf) }}</td>
            </tr>

            <tr>
              <td><b>Meldebestand</b> / Bestellzeitpunkt (Einheiten)</td>
              <td class="center">
                <input
                    class="inp sm"
                    inputmode="numeric"
                    v-model="teil2User.meldebestand"
                    :class="stateCls(teil2Res?.meldebestand)"
                />
              </td>
              <td class="center">{{ badge(teil2Res?.meldebestand) }}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="btnRow">
          <button class="btn primary" @click="checkTeil2">Prüfen</button>
          <button class="btn" @click="resetTeil2">Zurücksetzen</button>

          <label class="toggle msAuto">
            <input type="checkbox" v-model="showSolution2" />
            Lösung anzeigen
          </label>
        </div>

        <Transition name="fade">
          <div v-if="showSolution2" class="solutionCard">
            <div class="hintTitle">Lösung Teil 2: Bestellzeitpunkt (Meldebestand)</div>

            <div class="muted" style="margin-top: 6px;">
              <b>Schritt 1:</b> Tagesbedarf = 12.000 / 240 = <b>50</b> Einheiten pro Tag<br />
              <b>Schritt 2:</b> Meldebestand = (50 × 10) + 200 = <b>700</b> Einheiten
            </div>

            <div class="resultLine">
              <b>Ergebnis:</b> Sobald der Lagerbestand auf <b>700 Einheiten</b> sinkt, muss eine Bestellung ausgelöst werden.
            </div>
          </div>
        </Transition>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

/* ===== Helpers (wie in deinen anderen Pages) ===== */
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
function badge(ok) {
  if (ok === true) return "✅";
  if (ok === false) return "❌";
  return "—";
}

/* =========================
   QUIZ 1: Auslösendes Moment
   ========================= */
const correct = {
  bereitstell: "verbrauch",
  meldebestand: "bestand",
  zyklus: "zeitpunkt"
};

const match = reactive({
  bereitstell: "",
  meldebestand: "",
  zyklus: ""
});

const checked1 = ref(false);
const showSolution1 = ref(false);

function resetMatch() {
  match.bereitstell = "";
  match.meldebestand = "";
  match.zyklus = "";
  checked1.value = false;
  showSolution1.value = false;
}
function checkMatch() {
  checked1.value = true;
}
function isCorrect(key) {
  return match[key] && match[key] === correct[key];
}
function selectCls(key) {
  if (!checked1.value) return "";
  return isCorrect(key) ? "okField" : "badField";
}
function fbCls(key) {
  if (!checked1.value) return "smallMuted";
  return isCorrect(key) ? "fbOk" : "fbBad";
}
function fbText(key) {
  if (!match[key]) return "Bitte auswählen.";
  return isCorrect(key) ? "Richtig!" : "Falsch.";
}

/* =========================
   TEIL 2: Bestellzeitpunkt
   (wie in deinen PNGs)
   ========================= */
const GIVEN = {
  jahresbedarf: 12000,
  arbeitstage: 240,
  lieferzeitTage: 10, // 2 Wochen = 10 Arbeitstage
  sicherheitsbestand: 200
};

const expectedTagesbedarf = GIVEN.jahresbedarf / GIVEN.arbeitstage; // 50
const expectedMeldebestand = (expectedTagesbedarf * GIVEN.lieferzeitTage) + GIVEN.sicherheitsbestand; // 700

const teil2User = reactive({
  tagesbedarf: "",
  meldebestand: ""
});

const teil2Res = ref(null);
const showSolution2 = ref(false);

function checkTeil2() {
  const t = parseIntSafe(teil2User.tagesbedarf);
  const m = parseIntSafe(teil2User.meldebestand);

  teil2Res.value = {
    tagesbedarf: t === expectedTagesbedarf,
    meldebestand: m === expectedMeldebestand
  };
}

function resetTeil2() {
  teil2User.tagesbedarf = "";
  teil2User.meldebestand = "";
  teil2Res.value = null;
  showSolution2.value = false;
}
</script>

<style scoped>
/* ===== Layout wie Stückliste / ABC-XYZ ===== */
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
  font-weight: 900;
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
  font-weight: 900;
}

.twoCol {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 12px;
}
@media (max-width: 980px) {
  .twoCol { grid-template-columns: 1fr; }
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
.list li { margin: 6px 0; }

.grid3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 12px;
}
@media (max-width: 1100px) {
  .grid3 { grid-template-columns: 1fr; }
}

.subcard {
  background: #10131a;
  border: 1px solid #2a3142;
  border-radius: 16px;
  padding: 14px;
}
.subTitle {
  color: #fff;
  font-weight: 900;
  margin-bottom: 8px;
}

.inp {
  width: 100%;
  background: #0b0e14;
  border: 1px solid #2a3142;
  border-radius: 12px;
  padding: 10px 12px;
  color: #fff;
  outline: none;
}
.inp.sm {
  padding: 8px 10px;
  border-radius: 10px;
  max-width: 160px;
  margin-left: 0;
}

.okField { border-color: rgba(58, 220, 148, 0.75) !important; }
.badField { border-color: rgba(255, 106, 106, 0.75) !important; }

.btnRow {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 12px;
  flex-wrap: wrap;
}
.msAuto { margin-left: auto; }

.btn {
  border: 1px solid #2a3142;
  background: #151a24;
  color: #e8e8e8;
  padding: 9px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 900;
}
.btn.primary {
  background: #0f63d8;
  border-color: #0f63d8;
}

.toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 14px;
  border: 1px solid #2a3142;
  background: #10131a;
  color: #eaf2ff;
  font-weight: 800;
  font-size: 12px;
}
.toggle input { accent-color: #49a3ff; }

.tableWrap { overflow: auto; border-radius: 14px; border: 1px solid #2a3142; }
.tbl {
  width: 100%;
  border-collapse: collapse;
  background: #0b0e14;
  min-width: 620px;
}
.tbl th {
  text-align: left;
  padding: 12px 12px;
  color: #fff;
  background: rgba(73, 163, 255, 0.18);
  border-bottom: 1px solid #2a3142;
  font-weight: 900;
}
.tbl td {
  padding: 12px 12px;
  border-bottom: 1px solid rgba(42, 49, 66, 0.7);
  color: #e6eeff;
}
.right { text-align: right; }
.center { text-align: center; }

.formulaBox {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  background: #0b0e14;
  border: 1px solid #2a3142;
  border-radius: 12px;
  padding: 10px 12px;
  color: #f1f5ff;
  display: inline-block;
}

.solutionCard {
  margin-top: 12px;
  background: rgba(73, 163, 255, 0.10);
  border: 1px solid rgba(73, 163, 255, 0.35);
  border-radius: 14px;
  padding: 14px;
}

.resultLine {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(73, 163, 255, 0.22);
  color: #f1f5ff;
  font-weight: 800;
}

/* Feedback colors */
.fbOk { color: rgba(58, 220, 148, 0.95); font-weight: 900; margin-top: 8px; }
.fbBad { color: rgba(255, 106, 106, 0.95); font-weight: 900; margin-top: 8px; }
.mini { font-size: 12px; }

/* Fade */
.fade-enter-active, .fade-leave-active { transition: opacity 160ms ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* überschreibt center nur für die Input-Zellen */
.tbl td.center{
  text-align: left !important;
  padding-left: 12px;
}

.inp.sm{
  margin: 0 !important;
}

</style>
