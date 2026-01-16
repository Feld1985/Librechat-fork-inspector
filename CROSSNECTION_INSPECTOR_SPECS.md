# Crossnection Inspector - Specifiche Tecniche

> Fork di LibreChat per Root Cause Analysis industriale

**Versione:** 2.0
**Ultimo aggiornamento:** Gennaio 2026
**Repository:** github.com/Feld1985/Librechat-fork-inspector

---

## 1. Panoramica Progetto

**Crossnection Inspector** è un fork di LibreChat trasformato in tool specializzato per Root Cause Analysis nell'industria manifatturiera. Offre un'interfaccia chat AI con competenze verticali su Lean Six Sigma, analisi dati e quality management.

### 1.1 Obiettivi
1. Branding completo Crossnection (logo, colori, testi)
2. Rimozione elementi UI non necessari
3. System prompt specializzati per RCA industriale
4. 4 modalità operative pre-configurate

### 1.2 Stack Tecnologico
- **Frontend:** React (client/)
- **Backend:** Node.js (api/)
- **Database:** MongoDB
- **LLM:** Claude Sonnet 4 (claude-sonnet-4-20250514)
- **Deploy:** Docker su Hetzner (135.181.45.85)
- **Dominio:** inspector.marcopericci.com

---

## 2. Stato Implementazione

### 2.1 Checklist Completa

#### Funzionalità Core
| Feature | Stato | Note |
|---------|-------|------|
| Artifacts rendering | ✅ Completato | Sintassi `:::artifact{...}` via ModelSpec |
| File upload CSV/Excel | ✅ Completato | Parsing text per Anthropic endpoint |
| Code Execution | ✅ Completato | Tool `code_execution_20250825` abilitato |
| 4 ModelSpecs | ✅ Configurato | RCA, Immagini, FMEA, Consulenza |
| System prompt | ✅ Applicato | Via `promptPrefix` in ModelSpec |

#### Branding
| Elemento | Stato | Note |
|----------|-------|------|
| APP_TITLE | ✅ Completato | "Crossnection Inspector" |
| CUSTOM_FOOTER | ✅ Completato | "Powered by Crossnection Inspector" |
| PWA Manifest | ✅ Completato | name, short_name aggiornati |
| Colori CSS | ✅ Completato | Primary #009EE3, Secondary #00496C |
| Font | ✅ Completato | Poppins (headings), Open Sans (body) |
| Logo/Favicon | ⏳ Pendente | Richiede asset grafici dall'utente |

#### UI Hiding (via librechat.yaml)
| Elemento | Stato | Config |
|----------|-------|--------|
| Endpoints Menu | ✅ Nascosto | `endpointsMenu: false` |
| Model Select | ✅ Nascosto | `modelSelect: false` |
| Parameters Panel | ✅ Nascosto | `parameters: false` |
| Side Panel | ✅ Nascosto | `sidePanel: false` |
| Presets | ✅ Nascosto | `presets: false` |
| Prompts | ✅ Nascosto | `prompts: false` |
| Bookmarks | ✅ Nascosto | `bookmarks: false` |
| Multi Convo | ✅ Nascosto | `multiConvo: false` |
| Agents | ✅ Nascosto | `agents: false` |
| Temporary Chat | ⏳ Pendente | Aggiungere `temporaryChat: false` |
| Web Search | ⏳ Pendente | Aggiungere `webSearch: false` |

#### Deploy
| Fase | Stato | Note |
|------|-------|------|
| Build Docker | ✅ Completato | `docker compose build` |
| Deploy server | ✅ Completato | /opt/crossnection-inspector |
| Caddy reverse proxy | ✅ Configurato | HTTPS automatico |

---

## 3. Modifiche al Codice

### 3.1 File Modificati

#### api/models/Agent.js
**Modifica:** Supporto artifacts da ModelSpec per ephemeral agents

```javascript
// Linee 180-185: Fallback per leggere artifacts da modelSpec.preset
if (ephemeralAgent?.artifacts != null && ephemeralAgent.artifacts) {
  result.artifacts = ephemeralAgent.artifacts;
} else if (modelSpec?.preset?.artifacts != null && modelSpec.preset.artifacts !== '') {
  result.artifacts = modelSpec.preset.artifacts;
}
```

#### packages/api/src/endpoints/anthropic/helpers.ts
**Modifica:** Supporto header Code Execution

```typescript
// Funzione getClaudeHeaders aggiornata con parametri:
// - enableCodeExecution: aggiunge 'code-execution-2025-08-25'
// - enableFilesApi: aggiunge 'files-api-2025-04-14'
```

#### packages/api/src/endpoints/anthropic/llm.ts
**Modifica:** Tool Code Execution

```typescript
// Aggiunto 'code_execution' a knownAnthropicParams
// Gestione tool code_execution_20250825 quando abilitato
if (enableCodeExecution) {
  tools.push({
    type: 'code_execution_20250825',
    name: 'code_execution',
  });
}
```

#### api/server/services/Files/process.js
**Modifica:** Parsing CSV/Excel per Anthropic endpoint

```javascript
// In processFileUpload e processAgentFileUpload:
// Aggiunta logica per parsare file text (CSV, Excel) quando endpoint è Anthropic
const isAnthropicEndpoint = metadata.endpoint === EModelEndpoint.anthropic;
if (shouldParseAsText) {
  const { text, bytes: textBytes } = await parseText({ req, file, file_id });
  // ... salvataggio con source: FileSources.text
}
```

#### client/src/style.css
**Modifica:** Branding Crossnection allineato a CUSTOM_STYLE_INSPECTOR.md

```css
/* Font import */
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');

/* Colori brand */
--primary: 201 100% 45%;        /* #009EE3 */
--secondary: 201 100% 21%;      /* #00496C */
--brand-purple: #009EE3;

/* Sidebar variables */
--sidebar-background: 0 0% 98%;
--sidebar-primary: 201 100% 45%;

/* Utility classes */
.blue-brand { background-color: hsl(201, 100%, 45%); color: white; }
.blue-dark { background-color: hsl(201, 100%, 21%); color: white; }

/* Typography */
h1-h6 { font-family: 'Poppins', sans-serif; }
body { font-family: 'Open Sans', sans-serif; }
```

#### client/vite.config.ts
**Modifica:** PWA Manifest

```typescript
manifest: {
  name: 'Crossnection Inspector',
  short_name: 'Inspector',
  // ...
}
```

---

## 4. Configurazione Server

### 4.1 Environment Variables (.env)

```env
APP_TITLE=Crossnection Inspector
CUSTOM_FOOTER=Powered by Crossnection Inspector
ANTHROPIC_API_KEY=sk-ant-...
```

### 4.2 librechat.yaml (da completare)

```yaml
version: 1.2.1

interface:
  endpointsMenu: false
  modelSelect: false
  parameters: false
  sidePanel: false
  presets: false
  prompts: false
  bookmarks: false
  multiConvo: false
  agents: false
  temporaryChat: false    # <-- AGGIUNGERE
  webSearch: false        # <-- AGGIUNGERE

modelSpecs:
  enforce: true
  prioritize: true
  list:
    - name: "inspector-rca"
      label: "🔍 Root Cause Analysis"
      description: "Analisi completa di dataset con calcoli statistici"
      default: true
      preset:
        endpoint: "anthropic"
        model: "claude-sonnet-4-20250514"
        code_execution: true
        artifacts: |
          # GENERAZIONE ARTIFACT
          Quando generi analisi o report, usa la sintassi:
          :::artifact{identifier="report-id" type="text/html" title="Titolo Report"}
          <html>...</html>
          :::
        promptPrefix: |
          # IDENTITÀ
          Sei Crossnection Inspector, un esperto Lean Six Sigma...

    - name: "inspector-image"
      label: "📸 Analisi Immagini"
      # ... config

    - name: "inspector-fmea"
      label: "⚠️ FMEA"
      # ... config

    - name: "inspector-general"
      label: "💬 Consulenza"
      # ... config
```

---

## 5. Comandi Deploy

### Sul PC locale
```bash
git add -A
git commit -m "feat: descrizione modifica"
git push
```

### Sul server Hetzner
```bash
cd /opt/crossnection-inspector
git pull
docker compose build
docker compose up -d
```

### Verifica logs
```bash
docker compose logs -f api
docker compose logs -f client
```

---

## 6. Architettura File

```
Librechat-fork-inspector/
├── api/                          # Backend Node.js
│   ├── models/
│   │   └── Agent.js              # ✏️ Modificato: artifacts da ModelSpec
│   └── server/services/
│       └── Files/
│           └── process.js        # ✏️ Modificato: CSV parsing per Anthropic
│
├── packages/
│   └── api/src/endpoints/
│       └── anthropic/
│           ├── helpers.ts        # ✏️ Modificato: Code Execution headers
│           └── llm.ts            # ✏️ Modificato: Code Execution tool
│
├── client/
│   ├── src/
│   │   └── style.css             # ✏️ Modificato: Branding CSS
│   ├── vite.config.ts            # ✏️ Modificato: PWA manifest
│   └── public/assets/            # ⏳ Pendente: logo, favicon
│
├── CROSSNECTION_INSPECTOR_SPECS.md   # Questo file
├── CUSTOM_STYLE_INSPECTOR.md         # Design system
├── 00_INSPECTOR_PROJECT_GUIDELINES.md # Specifiche funzionali
└── CHANGELOG.md                      # Storico modifiche
```

---

## 7. Troubleshooting

### Artifacts non renderizzano
1. Verificare che `artifacts` sia configurato nel ModelSpec preset
2. Verificare sintassi: `:::artifact{identifier="..." type="text/html" title="..."}`
3. Verificare che Agent.js legga `modelSpec.preset.artifacts`

### Code Execution non funziona
1. Verificare `code_execution: true` nel ModelSpec
2. Verificare headers in helpers.ts includano `code-execution-2025-08-25`
3. Verificare tool in llm.ts sia type `code_execution_20250825`

### CSV non viene parsato
1. Verificare endpoint sia `anthropic`
2. Verificare `fileConfig.text.supportedMimeTypes` includa `text/csv`
3. Verificare logica in `processAgentFileUpload`

---

## 8. Prossimi Step

### Immediati
- [ ] Aggiungere `temporaryChat: false` e `webSearch: false` a librechat.yaml
- [ ] Fornire asset grafici (logo.svg, favicon)

### Futuri
- [ ] Implementare RAG per documentazione aziendale
- [ ] Multi-tenancy per isolamento dati
- [ ] Analytics utilizzo

---

*Documento aggiornato: Gennaio 2026*
