# Crossnection Inspector - Specifiche di Customizzazione

## Panoramica Progetto

Questo è un fork di LibreChat che deve essere trasformato in **Crossnection Inspector**, un tool di Root Cause Analysis per l'industria manifatturiera. Il prodotto finale sarà una chat AI specializzata per ingegneri di processo e figure Operational Excellence.

---

## Obiettivo Principale

Trasformare LibreChat in un prodotto white-label brandizzato "Crossnection Inspector" con:
1. Branding completo Crossnection (logo, colori, testi)
2. Rimozione di elementi UI non necessari
3. System prompt specializzati per RCA industriale
4. 4 modalità operative pre-configurate

---

## FASE 1: Analisi Codebase

Prima di fare modifiche, analizza e mappami:

### 1.1 Struttura Generale
- Identifica la struttura delle cartelle principali
- Dove si trova il frontend React (`client/`)
- Dove si trova il backend Node.js (`api/`)
- File di configurazione principali

### 1.2 Componenti UI Chiave
Trova i file che gestiscono:
- Logo dell'applicazione (header, sidebar, favicon)
- Messaggio di benvenuto / landing page
- Selettore endpoint/modelli
- Sidebar destra (parametri, settings)
- Icona "Temporary Chat" (chat effimere)
- Footer con "LibreChat" e versione
- Titolo della pagina / tab browser

### 1.3 Sistema di Configurazione
- Come funziona `librechat.yaml`
- Dove vengono letti i modelSpecs
- Come vengono applicati i system prompt (promptPrefix)
- Dove si gestisce il greeting message

### 1.4 Artifacts
- Come viene renderizzato un artifact HTML
- Dove si trova il componente Artifact viewer
- Come viene estratto il codice HTML dalla risposta

---

## FASE 2: Modifiche Branding

### 2.1 Logo
- **File logo principale:** Sostituire con logo Crossnection (PNG/SVG fornito)
- **Favicon:** Sostituire favicon 16x16 e 32x32
- **Logo in header:** Rimuovere o sostituire
- **Colori brand:** 
  - Primario: `#0ea5e9` (azzurro Crossnection)
  - Secondario: `#000000` (nero)
  - Accent: `#00a6ed`

### 2.2 Testi da Modificare
- Titolo app: "LibreChat" → "Crossnection Inspector"
- Meta title: "Crossnection Inspector - Root Cause Analysis Tool"
- Footer: Rimuovere "LibreChat vX.X.X" → "Crossnection Inspector"
- Qualsiasi riferimento a "LibreChat" nei testi UI

### 2.3 File da Modificare (probabili)
- `client/public/index.html` - titolo, meta tags
- `client/src/components/` - componenti header, footer, sidebar
- `client/public/assets/` - immagini, favicon
- `.env.example` - APP_TITLE

---

## FASE 3: Rimozione Elementi UI

### 3.1 Elementi da NASCONDERE/RIMUOVERE
- [ ] Icona "Temporary Chat" (in alto a destra, icona fumetto tratteggiato)
- [ ] Selettore Endpoint (se non serve)
- [ ] Sidebar destra con parametri (temperature, etc.)
- [ ] Menu "Presets"
- [ ] Menu "Prompts" 
- [ ] Menu "Bookmarks"
- [ ] Pulsante "Multi Conversation"
- [ ] Agent Builder / Marketplace
- [ ] Pulsante Web Search
- [ ] Pulsante File Search (RAG)
- [ ] Footer con versione LibreChat

### 3.2 Elementi da MANTENERE
- [x] Chat principale
- [x] Upload file (clip/attachment)
- [x] Rendering Artifacts
- [x] Lista conversazioni (sidebar sinistra)
- [x] Selettore ModelSpecs (i 4 modi: RCA, Immagini, FMEA, Consulenza)
- [x] Nuovo chat button
- [x] Logout / User menu

---

## FASE 4: Configurazione ModelSpecs

### 4.1 I 4 Modi Operativi

Devono apparire come selettore in alto nella chat:

#### Modo 1: 🔍 Root Cause Analysis (DEFAULT)
```yaml
name: "inspector-rca"
label: "🔍 Root Cause Analysis"
description: "Analisi completa di dataset con calcoli statistici, Ishikawa e report finale"
model: "claude-sonnet-4-20250514"
```

**System Prompt:**
```
# IDENTITÀ
Sei Crossnection Inspector, un esperto Lean Six Sigma e Data Analyst specializzato in Root Cause Analysis per l'industria manifatturiera.

# COMPETENZE
- Analisi statistica avanzata (SPC, capability analysis, test ipotesi)
- Metodologie: DMAIC, 8D, A3, Ishikawa, 5 Why, FMEA
- Calcolo indici: Cp, Cpk, Pp, Ppk, DPMO, Yield, Process Sigma
- Interpretazione dati di processo e log macchina

# WORKFLOW PER ANALISI DATI
Quando ricevi un dataset, segui SEMPRE questa struttura:

## Fase 1: Comprensione del Contesto
- Studia la struttura del file
- Identifica le variabili (numeriche vs categoriche)

## Fase 2: Analisi Dataset
- Descrivi campi e tipologia
- Identifica variabili di stratificazione
- Segnala anomalie nei dati

## Fase 3: Calcoli Statistici
- Indici di posizione (media, mediana, moda)
- Indici di variabilità (dev.std, range, IQR)
- Indici di capability: Cp, Cpk, Pp, Ppk
- DPMO e Yield
- Correlazioni significative

## Fase 4: Analisi Qualitativa
- Proponi mappatura processo
- Diagramma Ishikawa (6M)
- 5 Why analysis

## Fase 5: Root Cause Analysis
- Integra evidenze statistiche con analisi qualitativa
- Identifica cause radice prioritarie

## Fase 6: Report Finale
- Crea un artifact HTML professionale con tutti i risultati

# STILE
- Ragiona passo dopo passo
- Non inventare dati non presenti
```

#### Modo 2: 📸 Analisi Immagini
```yaml
name: "inspector-image"
label: "📸 Analisi Immagini"
description: "Confronto visivo per non conformità e difetti"
model: "claude-sonnet-4-20250514"
```

**System Prompt:**
```
# IDENTITÀ
Sei Crossnection Inspector in modalità Analisi Visiva, specializzato nell'identificazione di non conformità e difetti.

# WORKFLOW

## Se ricevi UNA sola immagine:
1. Descrivi cosa vedi in dettaglio
2. Identifica potenziali anomalie/difetti
3. Ipotizza le possibili cause

## Se ricevi DUE immagini (difetto + standard):
1. Analizza prima lo standard
2. Analizza l'immagine del difetto
3. Evidenzia le differenze
4. Classifica il tipo di non conformità
```

#### Modo 3: ⚠️ FMEA
```yaml
name: "inspector-fmea"
label: "⚠️ FMEA"
description: "Failure Mode and Effects Analysis"
model: "claude-sonnet-4-20250514"
```

**System Prompt:**
```
# IDENTITÀ
Sei Crossnection Inspector in modalità FMEA, specializzato nella Failure Mode and Effects Analysis.

# WORKFLOW FMEA

## Step 1: Definizione Scope
- Identifica il processo/prodotto da analizzare

## Step 2: Identificazione Modi di Guasto
- Failure Mode, Effects, Causes

## Step 3: Valutazione Rischio
- Severità (S), Occorrenza (O), Rilevabilità (D)
- RPN = S × O × D

## Step 4: Azioni Raccomandate
- Prioritizza per RPN (>100 = critico)

# OUTPUT
Genera SEMPRE un artifact HTML con tabella FMEA.
```

#### Modo 4: 💬 Consulenza
```yaml
name: "inspector-general"
label: "💬 Consulenza"
description: "Domande su Lean Six Sigma e quality"
model: "claude-sonnet-4-20250514"
```

**System Prompt:**
```
# IDENTITÀ
Sei Crossnection Inspector in modalità Consulenza, un esperto Lean Six Sigma.

# COMPETENZE
- Metodologie: Lean, Six Sigma, DMAIC, Kaizen, 5S, TPM
- Strumenti: Control Charts, Pareto, Ishikawa, FMEA, MSA, DOE
- Standard: ISO 9001, IATF 16949

# STILE
- Rispondi in modo chiaro e pratico
- Usa esempi concreti
```

---

## FASE 5: Configurazione Default

### 5.1 Endpoint
- Abilitare SOLO Anthropic (Claude)
- Disabilitare: OpenAI, Google, Assistants, Agents, Plugins

### 5.2 Funzionalità
- Artifacts: ABILITATO ✅
- File Upload: ABILITATO ✅
- Code Execution: ABILITATO ✅ (per analisi CSV con Python)
- Web Search: DISABILITATO
- RAG/File Search: DISABILITATO (per ora)

### 5.3 Registrazione
- Permettere registrazione email
- Disabilitare social login

---

## FASE 6: Deploy

### 6.1 Target
- Server Hetzner: 135.181.45.85
- Dominio: inspector.marcopericci.com
- Reverse Proxy: Caddy (già configurato sul server)

### 6.2 Stack
- Docker containerizzato
- MongoDB per persistence
- Porta: 3080 (interna) → 443 (via Caddy)

---

## Assets Forniti

### Logo Crossnection
- Colori: Nero (#000000) + Azzurro (#00a6ed)
- Formato: PNG disponibile, SVG da creare se necessario
- Testo: "CROSS" (nero) + "NECTION" (azzurro)

---

## Note Tecniche

### Attenzione: Parametro Temperature
L'API Claude con "extended thinking" NON supporta il parametro `temperature`. 
Rimuovere `temperature` da tutti i preset/modelSpecs.

### Modello Claude
Usare: `claude-sonnet-4-20250514` (Claude 4 Sonnet)

---

## Checklist Finale

- [ ] Logo sostituito ovunque
- [ ] Favicon aggiornati
- [ ] Titolo app → "Crossnection Inspector"
- [ ] Icona Temporary Chat rimossa
- [ ] Footer LibreChat rimosso/modificato
- [ ] Sidebar destra nascosta di default
- [ ] 4 ModelSpecs configurati e funzionanti
- [ ] System prompt applicati correttamente
- [x] Artifacts funzionanti ✅
- [x] File upload funzionante ✅ (CSV parsing per Anthropic)
- [x] Code Execution funzionante ✅ (analisi Python)
- [x] Build Docker funzionante ✅
- [x] Deploy su server completato ✅

---

## Comandi Utili

### Sviluppo locale
```bash
npm install
npm run frontend:dev  # Frontend React
npm run backend:dev   # Backend Node
```

### Build Docker
```bash
docker build -t Crossnection-inspector .
```

### Test
```bash
npm run test
```
