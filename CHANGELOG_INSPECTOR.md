# Changelog - Crossnection Inspector Fork

Modifiche specifiche al fork di LibreChat per Crossnection Inspector.
Il file `CHANGELOG.md` contiene le modifiche di LibreChat upstream.

---

## [2.0.0] - 2026-01-16

### Branding - Allineamento a CUSTOM_STYLE_INSPECTOR.md

#### CSS (client/src/style.css)
- **Aggiunto** import Google Fonts: Poppins + Open Sans
- **Modificato** `--primary` da grigio a `201 100% 45%` (#009EE3)
- **Modificato** `--secondary` a `201 100% 21%` (#00496C)
- **Modificato** `--brand-purple` a `#009EE3` (3 occorrenze)
- **Aggiunto** variabili sidebar per light e dark mode
- **Aggiunto** dark mode background `222.2 84% 4.9%` (blu scuro)
- **Aggiunto** utility classes `.blue-brand`, `.blue-dark`
- **Aggiunto** regole tipografia: Poppins per headings, Open Sans per body

#### PWA (client/vite.config.ts)
- **Modificato** manifest.name: "LibreChat" → "Crossnection Inspector"
- **Modificato** manifest.short_name: "LibreChat" → "Inspector"

### Cleanup
- **Rimosso** debug logging da `api/models/Agent.js` (3 righe logger.debug)

---

## [1.1.0] - 2026-01-15

### Artifacts per ModelSpec

#### api/models/Agent.js (linee 180-185)
- **Aggiunto** fallback per leggere `artifacts` da `modelSpec.preset.artifacts`
- **Fix** ephemeral agents ora ereditano configurazione artifacts dal ModelSpec

```javascript
if (ephemeralAgent?.artifacts != null && ephemeralAgent.artifacts) {
  result.artifacts = ephemeralAgent.artifacts;
} else if (modelSpec?.preset?.artifacts != null && modelSpec.preset.artifacts !== '') {
  result.artifacts = modelSpec.preset.artifacts;
}
```

---

## [1.0.0] - 2026-01-14

### Code Execution Tool

#### packages/api/src/endpoints/anthropic/helpers.ts
- **Modificato** `getClaudeHeaders()` per supportare parametri opzionali:
  - `enableCodeExecution`: aggiunge header `code-execution-2025-08-25`
  - `enableFilesApi`: aggiunge header `files-api-2025-04-14`

#### packages/api/src/endpoints/anthropic/llm.ts
- **Aggiunto** `'code_execution'` a `knownAnthropicParams`
- **Aggiunto** gestione tool `code_execution_20250825` quando `code_execution: true`
- **Modificato** chiamata a `getClaudeHeaders()` per passare opzioni code execution

### CSV/Excel Parsing per Anthropic

#### api/server/services/Files/process.js
- **Aggiunto** logica in `processFileUpload()` per parsing text files quando endpoint è Anthropic
- **Aggiunto** logica in `processAgentFileUpload()` per parsing text files
- **Fix** file CSV ora vengono parsati e il contenuto text viene passato a Claude

```javascript
const isAnthropicEndpoint = metadata.endpoint === EModelEndpoint.anthropic;
const shouldParseAsText = isAnthropicEndpoint &&
  !file.mimetype.startsWith('image') &&
  fileConfig.checkType(file.mimetype, fileConfig.text?.supportedMimeTypes || []);
```

---

## [0.1.0] - 2026-01-10

### Setup Iniziale

#### Configurazione Base
- Fork di LibreChat
- Configurazione Docker per deploy
- Setup MongoDB
- Configurazione Caddy reverse proxy
- Environment variables per branding:
  - `APP_TITLE=Crossnection Inspector`
  - `CUSTOM_FOOTER=Powered by Crossnection Inspector`

#### librechat.yaml
- Configurazione `interface` per nascondere elementi UI
- Setup iniziale ModelSpecs per i 4 modi operativi
- Endpoint Anthropic con Claude Sonnet 4

---

## File Modificati nel Fork (Riepilogo)

| File | Versione | Tipo Modifica |
|------|----------|---------------|
| `api/models/Agent.js` | 1.1.0 | Artifacts fallback |
| `packages/api/src/endpoints/anthropic/helpers.ts` | 1.0.0 | Code Execution headers |
| `packages/api/src/endpoints/anthropic/llm.ts` | 1.0.0 | Code Execution tool |
| `api/server/services/Files/process.js` | 1.0.0 | CSV parsing |
| `client/src/style.css` | 2.0.0 | Branding CSS |
| `client/vite.config.ts` | 2.0.0 | PWA manifest |

---

## Legenda

- **Aggiunto** - Nuova funzionalità
- **Modificato** - Modifica a funzionalità esistente
- **Fix** - Correzione bug
- **Rimosso** - Funzionalità rimossa

---

*Formato basato su [Keep a Changelog](https://keepachangelog.com/)*
