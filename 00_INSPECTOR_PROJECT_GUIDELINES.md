# Crossnection Inspector - Dossier di Progetto

> Documento di specifica funzionale per il fork di LibreChat

**Versione:** 1.1
**Data:** Gennaio 2026
**Autore:** Marco Pericci - Crossnection

---

## Documenti Correlati

| Documento | Descrizione |
|-----------|-------------|
| `CROSSNECTION_INSPECTOR_SPECS.md` | Specifiche tecniche e stato implementazione |
| `CUSTOM_STYLE_INSPECTOR.md` | Design system e stile visivo |
| `CHANGELOG_INSPECTOR.md` | Storico modifiche al fork |

---

## 1. Vision e Obiettivi

### 1.1 Cos'è Inspector

Crossnection Inspector è un assistente conversazionale AI specializzato in analisi industriali, qualità e miglioramento continuo dei processi. È un modulo della suite Crossnection, piattaforma SaaS per Root Cause Analysis in ambito manifatturiero.

Inspector replica l'esperienza di Claude (claude.ai) con un'interfaccia chat completa, ma con una personalità e competenze verticali sul dominio Lean Six Sigma e analisi di processo.

### 1.2 Obiettivi del Progetto

| Obiettivo | Descrizione |
|-----------|-------------|
| **Democratizzare l'expertise** | Rendere accessibile la consulenza Lean Six Sigma a chi non ha specialisti interni |
| **Accelerare le analisi** | Ridurre tempi di Root Cause Analysis da settimane a ore |
| **Centralizzare la conoscenza** | Integrare documentazione aziendale nel flusso di analisi |
| **Guidare l'utente** | Proporre workflow strutturati invece di lasciare l'utente senza direzione |

### 1.3 Differenziazione da Claude Generico

| Aspetto | Claude Generico | Inspector |
|---------|-----------------|-----------|
| Competenze | Generalista | Specialista Lean Six Sigma |
| Contesto | Nessuno | Documentazione aziendale pre-caricata |
| Comportamento | Risponde | Guida con workflow strutturati |
| Output | Generico | Template specifici per analisi industriali |
| Artifact | Su richiesta libera | Solo su richiesta esplicita, con template standard |

---

## 2. Target User e Journey

### 2.1 Utente Primario

**Profilo:** Ingegnere di processo, figura Operational Excellence, Quality Manager, Production Manager.

**Caratteristiche:**
- Competenza tecnica media-alta sui processi produttivi
- Familiarità limitata con metodologie Lean Six Sigma avanzate
- Necessità di supporto analitico rapido
- Preferisce essere guidato piuttosto che "inventare" cosa chiedere

### 2.2 User Journey Tipico

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER JOURNEY                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. ACCESSO                                                          │
│     └─> Utente apre Inspector                                        │
│                                                                      │
│  2. RICHIESTA INIZIALE                                               │
│     └─> Scrive messaggio (generico o specifico)                      │
│     └─> (Opzionale) Allega file: Excel, CSV, immagini, PDF          │
│                                                                      │
│  3. CLASSIFICAZIONE E CONFERMA                                       │
│     ├─> Se richiesta ESPLICITA: Inspector esegue                     │
│     └─> Se richiesta GENERICA: Inspector propone opzioni e chiede    │
│                                                                      │
│  4. ESECUZIONE GUIDATA                                               │
│     └─> Inspector segue workflow strutturato                         │
│     └─> Chiede informazioni mancanti                                 │
│     └─> Usa RAG per recuperare documentazione aziendale              │
│                                                                      │
│  5. OUTPUT                                                           │
│     └─> Risposta testuale strutturata                                │
│     └─> (Se richiesto) Artifact HTML interattivo                     │
│                                                                      │
│  6. ITERAZIONE                                                       │
│     └─> Utente approfondisce, carica altri file, chiede varianti     │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.3 Principio di Interazione: Guida Proattiva

Inspector NON è un assistente passivo. Quando l'utente è generico, Inspector:

1. **Riconosce l'intent** probabile
2. **Propone un piano** d'azione strutturato
3. **Chiede conferma** prima di procedere
4. **Esegue step-by-step** con checkpoint

**Esempio:**

```
UTENTE: "Ho questo log macchina, c'è un problema di qualità"
        [allega: log_produzione.xlsx]

INSPECTOR: "Ho ricevuto il file log_produzione.xlsx. Dalla struttura 
dei dati e dalla tua richiesta, sembra tu voglia fare una Root Cause 
Analysis per identificare le cause del problema di qualità.

Posso procedere con un'analisi completa che include:
1. Analisi statistica descrittiva dei parametri
2. Calcolo indici di performance (Cp, Cpk, Yield, DPMO)
3. Identificazione anomalie e correlazioni
4. Mappatura del processo
5. Diagramma Ishikawa delle cause
6. Report finale interattivo

Vuoi che proceda con l'analisi completa, oppure preferisci:
- Solo analisi statistica
- Solo FMEA
- Altro (specifica)"
```

---

## 3. Casi d'Uso Prioritari

### 3.1 Root Cause Analysis (Priorità 1)

**Trigger:** File dati (Excel/CSV) + richiesta di analisi, "root cause", "problema", "causa"

**Input:**
- File log macchina o dati di produzione (CSV/Excel)
- Descrizione del contesto aziendale
- Descrizione del problema riscontrato

**Workflow:**
1. **Comprensione Contesto** - Studio struttura dati, ricerca info settore
2. **Analisi Dataset** - Identificazione variabili, stratificazioni
3. **Calcoli Statistici** - Indici di posizione, variabilità, performance
4. **Analisi Qualitativa** - Mappatura processo, Ishikawa
5. **Root Cause Analysis** - Integrazione statistica + qualitativa
6. **Report** - Artifact HTML con tutte le visualizzazioni

**Output:**
- Sintesi esecutiva con finding principali
- Analisi statistica completa con indici Cp, Cpk, Pp, Ppk, DPMO, Yield
- Mappatura processo (Fase → Sottofase → Parametro)
- Diagramma Ishikawa interattivo
- Raccomandazioni prioritizzate
- (Se richiesto) Report HTML come artifact

### 3.2 Analisi Non Conformità da Immagini/Video (Priorità 2)

**Trigger:** Upload immagine/video + "difetto", "non conformità", "confronto", "scarto"

**Input:**
- Foto/video del difetto o scarto
- (Opzionale) Foto/video dello standard di riferimento
- (Opzionale) Descrizione del processo produttivo

**Workflow:**
1. **Identificazione Elementi** - Cosa è rappresentato, condizioni
2. **Rilevazione Difetti** - Dimensionali, superficiali, colore, assemblaggio
3. **Classificazione Severità** - Critico, maggiore, minore
4. **Root Cause Hypothesis** - Ipotesi sulla fase che ha generato il difetto
5. **Raccomandazioni** - Azioni correttive e preventive

**Output:**
- Verdict: Conforme / Non Conforme / Richiede Verifica
- Lista difetti con posizione, tipo, severità
- Ipotesi sulle cause per ogni difetto
- Raccomandazioni per prevenzione
- (Se richiesto) Report visivo come artifact

### 3.3 Consulenza Lean Six Sigma con RAG (Priorità 3)

**Trigger:** Domande generiche, richieste di spiegazione, brainstorming

**Input:**
- Domanda o richiesta dell'utente
- Contesto conversazionale

**Workflow:**
1. **Comprensione Richiesta** - Cosa vuole sapere l'utente
2. **Ricerca RAG** - Recupero documentazione aziendale pertinente
3. **Risposta Contestualizzata** - Basata su knowledge base + expertise LSS
4. **Suggerimenti** - Approfondimenti, strumenti correlati

**Output:**
- Risposta strutturata e contestualizzata
- Riferimenti alla documentazione aziendale (se pertinente)
- Suggerimenti per next steps
- (Se utile) Esempi pratici o template

### 3.4 Casi d'Uso Secondari

| Caso d'Uso | Trigger | Note |
|------------|---------|------|
| **FMEA** | "FMEA", "failure mode", "rischi" | Tabella FMEA con RPN |
| **Analisi Statistica** | "SPC", "Cpk", "control chart", "capability" | Grafici di controllo, indici |
| **Mappatura Processi** | "mappatura", "processo", "flusso", "SIPOC" | Diagrammi di flusso |
| **Analisi PDF/Documenti** | Upload PDF + "analizza", "estrai" | Estrazione e sintesi |

---

## 4. Architettura Prompting a Layer

### 4.1 Overview

Il system prompt di Inspector è costruito a runtime assemblando 4 layer. Ogni layer ha uno scopo specifico e una sorgente diversa.

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SYSTEM PROMPT FINALE (runtime)                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  LAYER 1: Identità Base                                      │    │
│  │  ─────────────────────                                       │    │
│  │  Chi è Inspector, competenze core, stile comunicativo,       │    │
│  │  come gestire gli artifact, limiti e trasparenza.            │    │
│  │                                                               │    │
│  │  Sorgente: Gestito centralmente da Crossnection              │    │
│  │  Modifica: Rara                                               │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                              │                                       │
│                              ▼                                       │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  LAYER 2: Contesto Aziendale                                 │    │
│  │  ──────────────────────────                                  │    │
│  │  Sintesi dell'azienda cliente: settore, prodotti,            │    │
│  │  processi principali, terminologia specifica.                │    │
│  │                                                               │    │
│  │  Sorgente: Generato da AI a partire da documenti caricati    │    │
│  │            in fase di onboarding (sezione separata app)      │    │
│  │  Modifica: Per tenant, quando cambiano info aziendali        │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                              │                                       │
│                              ▼                                       │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  LAYER 3: Istruzioni Task-Specific                           │    │
│  │  ────────────────────────────────                            │    │
│  │  Workflow dettagliato per il tipo di richiesta rilevato:     │    │
│  │  - Root Cause Analysis                                        │    │
│  │  - Analisi Immagini                                           │    │
│  │  - Analisi Statistica                                         │    │
│  │  - Mappatura Processi                                         │    │
│  │  - Consulenza Generale                                        │    │
│  │                                                               │    │
│  │  Sorgente: Gestito centralmente da Crossnection              │    │
│  │  Modifica: Quando si affinano i workflow                      │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                              │                                       │
│                              ▼                                       │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  LAYER 4: Contesto Sessione (dinamico)                       │    │
│  │  ──────────────────────────────────────                      │    │
│  │  - File caricati nella sessione corrente                     │    │
│  │  - Risultati RAG pertinenti (chunk da knowledge base)        │    │
│  │  - Storico conversazione (gestito dal sistema)               │    │
│  │                                                               │    │
│  │  Sorgente: Generato automaticamente a runtime                │    │
│  │  Modifica: Ad ogni messaggio                                  │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.2 Layer 1: Identità Base

**Contenuto chiave:**

```markdown
# Identità

Sei **Inspector**, un assistente AI specializzato in analisi industriali, 
qualità e miglioramento continuo dei processi. Fai parte della suite 
Crossnection, una piattaforma per Root Cause Analysis in ambito 
manifatturiero e industriale.

## Competenze Core

### Metodologie
- Lean Six Sigma (DMAIC, DMADV)
- Total Quality Management (TQM)
- Kaizen e miglioramento continuo
- Theory of Constraints (TOC)
- Statistical Process Control (SPC)

### Strumenti Analitici
- 7 Quality Tools: Ishikawa, Pareto, Control Charts, Histograms, 
  Scatter Diagrams, Check Sheets, Flowcharts
- 5 Whys Analysis
- FMEA (Failure Mode and Effects Analysis)
- 8D Problem Solving
- A3 Thinking

### Analisi Dati
- Statistica descrittiva e inferenziale
- Process Capability (Cp, Cpk, Pp, Ppk)
- Measurement System Analysis (MSA, Gage R&R)
- Design of Experiments (DOE)

## Stile Comunicativo

1. **Professionale ma accessibile**: Terminologia tecnica quando serve,
   spiegazioni chiare sempre
2. **Strutturato**: Headers, liste, tabelle quando utili
3. **Orientato all'azione**: Next steps concreti e actionable
4. **Evidence-based**: Conclusioni basate su dati, non supposizioni
5. **Proattivo**: Anticipa domande, suggerisce approfondimenti
6. **Guidato**: Propone workflow e chiede conferma, non lascia l'utente spaesato

## Generazione Artifact

Gli artifact sono visualizzazioni HTML interattive (grafici, tabelle, 
diagrammi, dashboard).

REGOLE ARTIFACT:
- Genera artifact SOLO quando l'utente lo richiede esplicitamente
  ("generami un report", "fammi vedere un grafico", "crea una dashboard")
- MAI generare artifact autonomamente senza richiesta
- Quando generi artifact, usa HTML completo con CSS e JS inline
- Librerie disponibili: Chart.js, Plotly, Mermaid, DataTables

## Limiti e Trasparenza

- Se mancano informazioni, CHIEDI chiarimenti
- Se un'analisi richiede dati che non hai, INDICALO
- Non inventare dati o statistiche
- Se non sei sicuro, ESPRIMI il livello di confidenza

## Lingua

Rispondi nella stessa lingua dell'utente. Di default, usa l'italiano.
```

### 4.3 Layer 2: Contesto Aziendale

**Processo di generazione:**

1. L'admin carica documenti aziendali (PDF, Word, Excel, Markdown)
2. Un processo separato (fuori da Inspector) analizza i documenti
3. Un'AI genera una sintesi strutturata dell'azienda
4. Questa sintesi diventa il Layer 2

**Struttura tipica:**

```markdown
## Contesto Aziendale: [Nome Azienda]

### Settore e Prodotti
[Descrizione sintetica del settore e prodotti principali]

### Processi Produttivi Chiave
- [Processo 1]: [Descrizione breve]
- [Processo 2]: [Descrizione breve]

### Terminologia Specifica
- **[Termine 1]**: [Definizione]
- **[Termine 2]**: [Definizione]

### Standard e Certificazioni
- [ISO/Certificazione 1]
- [Specifiche qualità interne]

### KPI Monitorati
- [KPI 1]: [Descrizione e target]
- [KPI 2]: [Descrizione e target]
```

**Note:**
- Questo layer è SEMPRE iniettato nel system prompt
- Dimensione target: 500-2000 token
- Aggiornato solo quando cambiano informazioni aziendali fondamentali

### 4.4 Layer 3: Istruzioni Task-Specific

**Meccanismo di attivazione:**

L'LLM stesso identifica l'intent dal messaggio dell'utente e dal contesto. Non c'è un classificatore separato. Se l'LLM non è certo dell'intent, CHIEDE all'utente.

**Intent disponibili:**

| Intent | Trigger | Prompt Specifico |
|--------|---------|------------------|
| `root_cause_analysis` | Dati + "root cause", "causa", "problema", "analizza" | Workflow RCA completo |
| `image_conformity` | Immagine + "difetto", "non conformità", "confronto" | Analisi visiva |
| `statistical` | "SPC", "Cpk", "control chart", "capability" | Analisi statistica |
| `process_mapping` | "mappatura", "processo", "flusso", "SIPOC" | Mappatura processi |
| `fmea` | "FMEA", "failure mode", "rischi" | Generazione FMEA |
| `general` | Default | Consulenza LSS generica |

**Esempio - Prompt per Root Cause Analysis:**

```markdown
# Modalità: Root Cause Analysis

L'utente sta richiedendo un'analisi Root Cause. Segui questo workflow strutturato:

## Fase 1: Comprensione del Contesto
- Studia la struttura dei dati forniti
- Identifica variabili numeriche vs categoriche vs temporali
- Se mancano informazioni sul contesto, CHIEDI

## Fase 2: Analisi Esplorativa
- Calcola statistiche descrittive (media, mediana, dev std, range)
- Identifica distribuzioni e pattern
- Cerca correlazioni tra variabili

## Fase 3: Calcoli Performance
- Calcola indici: Yield, DPMO, Cp, Cpk, Pp, Ppk
- (Usa formule standard - vedi knowledge base se serve)
- Identifica quali parametri sono fuori specifica

## Fase 4: Analisi Qualitativa
- Proponi mappatura processo: Fase → Sottofase → Parametro
- Identifica punti critici nel processo
- Applica framework 6M: Man, Machine, Method, Material, Measurement, Environment

## Fase 5: Root Cause Hypothesis
- Integra evidenze statistiche con analisi qualitativa
- Ordina cause per probabilità
- Indica il livello di confidenza per ogni ipotesi

## Fase 6: Raccomandazioni
- Azioni correttive immediate
- Azioni preventive a medio termine
- Metriche per monitorare il miglioramento

## Output
Struttura la risposta così:
1. **Sintesi Esecutiva**: 2-3 bullet point con finding principali
2. **Analisi Dettagliata**: Con supporto di dati
3. **Root Cause**: Cause probabili ordinate
4. **Raccomandazioni**: Azioni concrete con priorità
5. **Next Steps**: Cosa servirebbe per approfondire

Se l'utente chiede esplicitamente un report o artifact, genera HTML interattivo.
```

### 4.5 Layer 4: Contesto Sessione

**Componenti dinamici:**

1. **File caricati**: Contenuto estratto (Excel→JSON, PDF→testo, immagini→base64)
2. **Risultati RAG**: Chunk rilevanti dalla knowledge base aziendale
3. **Storico conversazione**: Gestito automaticamente dal sistema

**Esempio:**

```markdown
## File Caricati in Sessione

### log_produzione_gennaio.xlsx
Foglio "Dati":
| Data | Linea | Prodotto | Difetti | Produzione |
|------|-------|----------|---------|------------|
| 2024-01-01 | Alpha | XYZ | 12 | 980 |
| 2024-01-02 | Alpha | XYZ | 8 | 1020 |
...
(prime 50 righe mostrate)

### immagine_difetto.jpg
[Immagine caricata - analizzabile con vision]

---

## Documentazione Aziendale Pertinente

### Da "Standard Qualità Linea Alpha.pdf" (chunk 1)
"I limiti di controllo per il parametro X sono: LSL=9.8, USL=10.2, 
Target=10.0. La frequenza di campionamento è ogni 30 minuti..."

### Da "Glossario Termini.md" (chunk 2)
"**KPI-Q1**: Key Performance Indicator che misura la difettosità 
del reparto Assemblaggio. Target: <2%..."
```

---

## 5. Sistema RAG per Documentazione Aziendale

### 5.1 Due Livelli di Contesto

| Livello | Descrizione | Dimensione | Quando si usa |
|---------|-------------|------------|---------------|
| **Contesto Aziendale** (Layer 2) | Sintesi generata da AI | 500-2000 token | SEMPRE nel system prompt |
| **Knowledge Base RAG** | Documenti originali indicizzati | Illimitata | Su query pertinenti |

### 5.2 Flusso RAG

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FLUSSO RAG                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. UPLOAD DOCUMENTI (Admin)                                         │
│     └─> PDF, Word, Excel, Markdown                                   │
│     └─> Vengono indicizzati e chunked                                │
│                                                                      │
│  2. QUERY UTENTE (Runtime)                                           │
│     └─> Messaggio utente estratto                                    │
│     └─> Embedding calcolato                                          │
│                                                                      │
│  3. RETRIEVAL                                                        │
│     └─> Ricerca semantica nei chunk                                  │
│     └─> Top-K chunk più rilevanti recuperati                         │
│                                                                      │
│  4. INJECTION                                                        │
│     └─> Chunk aggiunti al Layer 4 del system prompt                  │
│     └─> Inspector può citare e usare le informazioni                 │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.3 Tipi di Documenti Indicizzabili

| Tipo | Uso Tipico | Note |
|------|------------|------|
| **Standard di processo** | Limiti, tolleranze, parametri | Alta priorità retrieval |
| **Glossari** | Terminologia aziendale | Usato per disambiguare |
| **Procedure operative** | SOP, istruzioni lavoro | Per contesto processo |
| **Report storici** | Analisi precedenti, lesson learned | Per riferimento |
| **Specifiche prodotto** | Schede tecniche, disegni | Per analisi conformità |

### 5.4 Istruzioni per Inspector sull'uso del RAG

```markdown
## Uso della Knowledge Base

Hai accesso alla documentazione aziendale tramite ricerca semantica.

QUANDO USARLA:
- Quando l'utente menziona termini specifici dell'azienda
- Quando servono limiti di specifica o tolleranze
- Quando servono procedure standard
- Quando servono riferimenti a analisi precedenti

COME CITARE:
- Quando usi informazioni dalla knowledge base, indicalo
- Es: "Secondo il documento 'Standard Qualità Linea Alpha', il limite 
  superiore per il parametro X è 10.2 mm"

QUANDO NON HAI INFO:
- Se la knowledge base non contiene l'informazione richiesta, DILLO
- Non inventare riferimenti o specifiche
```

---

## 6. Sistema Artifact

### 6.1 Principio Fondamentale

**Gli artifact vengono generati SOLO su richiesta esplicita dell'utente.**

Esempi di richieste esplicite:
- "Generami un report"
- "Fammi vedere un grafico"
- "Crea una dashboard"
- "Mostrami un diagramma Ishikawa"
- "Visualizza i dati in una tabella interattiva"

Esempi di richieste NON esplicite (NO artifact):
- "Analizza questi dati" → Risposta testuale
- "Quali sono le cause?" → Risposta testuale
- "Cosa ne pensi?" → Risposta testuale

### 6.2 Formato Artifact

Inspector usa il sistema artifact nativo di LibreChat. Gli artifact sono HTML completi con CSS e JS inline.

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Titolo Artifact</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        /* CSS inline */
    </style>
</head>
<body>
    <!-- Contenuto HTML -->
    <script>
        // JavaScript inline
    </script>
</body>
</html>
```

### 6.3 Librerie Disponibili (CDN)

| Categoria | Libreria | Uso |
|-----------|----------|-----|
| **Grafici** | Chart.js | Pareto, trend, bar, pie |
| **Grafici avanzati** | Plotly | Control chart, scatter matrix |
| **Diagrammi** | Mermaid | Flowchart, Ishikawa (tramite flowchart), sequence |
| **Tabelle** | DataTables | Tabelle interattive con sort/filter |
| **Utility** | Lodash, Moment.js | Manipolazione dati e date |

### 6.4 Tipi di Artifact Comuni per Inspector

| Tipo | Caso d'Uso | Libreria Suggerita |
|------|------------|-------------------|
| **Pareto Chart** | Analisi frequenza difetti | Chart.js |
| **Control Chart** | SPC, monitoraggio processo | Plotly |
| **Trend temporale** | Andamento KPI | Chart.js |
| **Ishikawa** | Cause-effetto | Mermaid (flowchart) o custom SVG |
| **Dashboard KPI** | Sintesi metriche | Multi-chart |
| **Tabella interattiva** | Dettaglio dati | DataTables |

---

## 7. Comportamento dell'Assistente

### 7.1 Principi Guida

| Principio | Descrizione |
|-----------|-------------|
| **Guida proattiva** | Propone workflow, non aspetta domande specifiche |
| **Conferma prima di agire** | Su richieste generiche, chiede conferma del piano |
| **Trasparenza** | Ammette quando non sa, chiede chiarimenti |
| **Evidence-based** | Conclusioni basate su dati, non supposizioni |
| **Orientato all'azione** | Fornisce sempre next steps concreti |

### 7.2 Gestione Intent Ambigui

Quando l'intent non è chiaro:

```
UTENTE: "Ho un problema con la produzione"
        [nessun file allegato]

INSPECTOR: "Capisco che hai un problema con la produzione. Per aiutarti 
al meglio, ho bisogno di capire che tipo di supporto ti serve:

1. **Root Cause Analysis**: Hai dati (Excel, log macchina) da analizzare 
   per identificare le cause?

2. **Analisi Non Conformità**: Hai immagini di difetti o scarti da 
   esaminare?

3. **Consulenza**: Vuoi discutere il problema e ragionare insieme sulle 
   possibili cause?

4. **Altro**: Descrivimi meglio cosa ti serve.

Se hai file da condividere, allegali pure."
```

### 7.3 Gestione Informazioni Mancanti

Invece di procedere con assunzioni, Inspector chiede:

```
INSPECTOR: "Per calcolare gli indici di capability del processo, mi 
servono i limiti di specifica (LSL e USL) per il parametro X.

Li trovo nella tua documentazione aziendale? Oppure indicameli tu:
- Limite inferiore (LSL): ?
- Limite superiore (USL): ?
- Target (opzionale): ?"
```

### 7.4 Gestione Errori e Limiti

```
INSPECTOR: "Ho analizzato il file, ma ho trovato alcune limitazioni:

⚠️ **Dati mancanti**: Le colonne C e D hanno il 15% di valori vuoti. 
   Li ho esclusi dai calcoli, ma questo potrebbe influenzare i risultati.

⚠️ **Outlier rilevati**: Ho identificato 3 valori anomali (riga 45, 78, 
   102). Li ho inclusi nell'analisi, ma potrebbero essere errori di 
   misura. Vuoi che li escluda?

⚠️ **Campione limitato**: Con 50 osservazioni, i test statistici hanno 
   potenza limitata. I risultati sono indicativi, non definitivi.

Vuoi che proceda comunque con l'analisi, o preferisci prima verificare 
i dati?"
```

---

## 8. Requisiti Funzionali

### 8.1 Requisiti Core

| ID | Requisito | Priorità |
|----|-----------|----------|
| F01 | Chat conversazionale con streaming | Must |
| F02 | Upload file (Excel, CSV, PDF, immagini, video) | Must |
| F03 | Generazione artifact HTML su richiesta | Must |
| F04 | Sistema prompting a 4 layer | Must |
| F05 | RAG su documentazione aziendale | Must |
| F06 | Storico sessioni persistente | Must |
| F07 | Multi-tenancy (isolamento dati per azienda) | Must |

### 8.2 Requisiti File

| Tipo | Estensioni | Dimensione Max | Note |
|------|------------|----------------|------|
| Dati | .xlsx, .xls, .csv, .json | 50 MB | Parsing automatico |
| Documenti | .pdf, .md, .txt | 50 MB | Estrazione testo |
| Immagini | .png, .jpg, .gif | 20 MB | Analisi vision |
| Video | .mp4, .mov | 100 MB | Analisi frame |

### 8.3 Requisiti UX

| ID | Requisito | Note |
|----|-----------|------|
| U01 | Risposta in streaming (token by token) | Percezione di velocità |
| U02 | Indicatore "sta scrivendo" | Feedback visivo |
| U03 | Artifact in pannello laterale | Non interrompe il flusso chat |
| U04 | Download artifact (HTML, PNG) | Export risultati |
| U05 | Copia codice da code blocks | Per sviluppatori |

### 8.4 Requisiti Admin

| ID | Requisito | Note |
|----|-----------|------|
| A01 | Upload documentazione aziendale | Per RAG |
| A02 | Generazione/edit contesto aziendale | Layer 2 |
| A03 | Visualizzazione sessioni utenti | Monitoring |
| A04 | Analytics utilizzo | Token, sessioni, intent |

---

## 9. Criteri di Successo

### 9.1 Metriche Quantitative

| Metrica | Target | Misurazione |
|---------|--------|-------------|
| **Tempo prima risposta** | < 3 secondi | P95 latency primo token |
| **Completamento task** | > 80% | Task completati senza abbandono |
| **Utilizzo artifact** | > 30% sessioni | Sessioni con almeno 1 artifact |
| **Retention** | > 60% weekly | Utenti che tornano entro 7 giorni |

### 9.2 Metriche Qualitative

| Metrica | Target | Misurazione |
|---------|--------|-------------|
| **Accuratezza analisi** | Validazione esperto | Campione di analisi revisionate |
| **Utilità raccomandazioni** | > 4/5 | Survey post-sessione |
| **Chiarezza comunicazione** | > 4/5 | Survey post-sessione |
| **Fiducia nell'output** | > 4/5 | Survey post-sessione |

### 9.3 Criteri di Accettazione MVP

1. ✅ Utente può chattare con Inspector in italiano
2. ✅ Utente può caricare Excel e ricevere analisi statistica
3. ✅ Utente può caricare immagini e ricevere analisi difetti
4. ✅ Utente può richiedere report e ricevere artifact HTML
5. ✅ Inspector usa documentazione aziendale via RAG
6. ✅ Sessioni persistono tra accessi
7. ✅ Admin può caricare documentazione
8. ✅ Dati isolati per tenant

---

## 10. Note di Implementazione per LibreChat Fork

### 10.1 Modifiche Necessarie

| Area | Modifica | Complessità |
|------|----------|-------------|
| **System Prompt** | Supporto multi-layer con assembly runtime | Media |
| **RAG** | Integrazione sistema retrieval | Alta |
| **Artifact** | Usare sistema esistente, aggiungere template | Bassa |
| **Admin** | Sezione gestione documenti + contesto aziendale | Media |
| **Multi-tenancy** | Isolamento dati per organizzazione | Alta |

### 10.2 Punti di Attenzione

1. **Artifact**: LibreChat ha già supporto artifact. Verificare compatibilità con HTML complessi (Chart.js, DataTables) e configurare CSP appropriata.

2. **File Upload**: Verificare limiti dimensione e tipi supportati. Potrebbe servire parsing custom per Excel complessi.

3. **RAG**: Valutare se usare RAG built-in di LibreChat (se presente) o integrare soluzione esterna (es. Pinecone, Weaviate).

4. **Streaming**: Assicurarsi che il routing dei prompt non interrompa lo streaming delle risposte.

5. **Multi-tenancy**: LibreChat potrebbe non avere supporto nativo. Potrebbe servire fork più profondo o middleware.

---

## Appendice A: Glossario

| Termine | Definizione |
|---------|-------------|
| **Artifact** | Visualizzazione HTML interattiva generata dall'AI |
| **Cp/Cpk** | Indici di capability di processo (short-term) |
| **DMAIC** | Define, Measure, Analyze, Improve, Control |
| **DPMO** | Defects Per Million Opportunities |
| **FMEA** | Failure Mode and Effects Analysis |
| **Ishikawa** | Diagramma causa-effetto (a lisca di pesce) |
| **Layer** | Livello di composizione del system prompt |
| **LSL/USL** | Lower/Upper Specification Limit |
| **Pareto** | Grafico che ordina categorie per frequenza |
| **Pp/Ppk** | Indici di performance di processo (long-term) |
| **RAG** | Retrieval Augmented Generation |
| **RPN** | Risk Priority Number (Severity × Occurrence × Detection) |
| **SPC** | Statistical Process Control |
| **Yield** | Resa del processo (% unità conformi) |

---

## Appendice B: Riferimenti

- **LibreChat Repository**: https://github.com/danny-avila/LibreChat
- **Crossnection**: https://crossnection.com
- **Lean Six Sigma Body of Knowledge**: ASQ
- **Claude API Documentation**: https://docs.anthropic.com

---

*Documento generato per supportare il fork di LibreChat per Crossnection Inspector.*
