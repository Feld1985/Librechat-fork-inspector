# Report di Stile - Progetto Crossnection

## 1. Filosofia di Design

Il progetto adotta un'estetica **professionale, pulita e moderna**, orientata alla chiarezza e alla leggibilità. Il design segue i principi di un sistema basato su **shadcn/ui** (derivato da Radix UI), che garantisce accessibilità, coerenza e modularità dei componenti.

L'approccio visivo privilegia:

- **Minimalismo funzionale**: spazi bianchi generosi, gerarchie visive chiare
- **Consistenza**: variabili CSS centralizzate per colori, spaziature e raggi di curvatura
- **Adattabilità**: supporto nativo per dark mode con transizioni fluide

---

## 2. Palette Colori

### Colori Primari

| Ruolo | Valore HSL | Hex Approssimativo | Utilizzo |
|-------|-----------|-------------------|----------|
| Primary | 201 100% 45% | #009EE3 | Bottoni principali, link attivi, accenti, focus ring |
| Secondary | 201 100% 21% | #00496C | Bottoni secondari, elementi di contrasto |

### Colori di Sfondo e Testo

| Ruolo | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Background | Bianco puro (0 0% 100%) | Blu scuro (222.2 84% 4.9%) |
| Foreground | Quasi nero (222.2 84% 4.9%) | Grigio chiaro (210 40% 98%) |
| Muted | Grigio chiaro (210 40% 96.1%) | Grigio scuro (217.2 32.6% 17.5%) |
| Muted Foreground | Grigio medio (#6E6E6E) | Grigio chiaro (215 20.2% 65.1%) |

### Colori Semantici

| Stato | Colore | Utilizzo |
|-------|--------|----------|
| **Success** | Verde `hsl(142, 76%, 36%)` | Trend positivi, stati completati, badge successo |
| **Warning** | Arancione `hsl(45, 93%, 47%)` | Attenzione, stati in sospeso |
| **Danger/Destructive** | Rosso `hsl(0, 84%, 60%)` | Errori, azioni distruttive, trend negativi |
| **Info** | Blu `hsl(217, 91%, 60%)` | Informazioni, notifiche |

### Sidebar

La sidebar utilizza una palette dedicata per differenziarsi leggermente dal contenuto principale:

- **Background**: Grigio molto chiaro (0 0% 98%)
- **Primary**: Stesso blu brand (201 100% 45%)
- **Accent**: Grigio (240 4.8% 95.9%)

---

## 3. Tipografia

### Font Families

- **Headings**: `'Poppins', sans-serif`
- **Body**: `'Open Sans', sans-serif`

### Gerarchia Tipografica

| Elemento | Font | Peso | Caratteristiche |
|----------|------|------|-----------------|
| H1-H6 | Poppins | Medium (500) | Tracking stretto, linea pulita |
| Body | Open Sans | Regular (400) | Leggibilità ottimale per testi lunghi |
| Labels/Captions | Open Sans | Semibold (600) | Compattezza per UI dense |

### Dimensioni Standard

- **Card Title**: `text-2xl` (1.5rem) con `font-semibold`
- **Card Description**: `text-sm` con `text-muted-foreground`
- **Body Text**: Base (1rem)
- **Small/Captions**: `text-xs` (0.75rem)

---

## 4. Forme e Spaziature

### Border Radius

```css
--radius: 0.5rem (8px);
```

I componenti utilizzano varianti derivate:

- **Large (lg)**: 0.5rem — Card, dialog, modali
- **Medium (md)**: `calc(0.5rem - 2px)` — Input, select
- **Small (sm)**: `calc(0.5rem - 4px)` — Badge, chip

### Badge e Tag

I badge utilizzano sempre `rounded-full` per un aspetto a pillola.

### Ombre

- **Card Standard**: `shadow-sm` — ombra sottile e discreta
- **Popover/Dropdown**: ombra più pronunciata per elevazione
- **Focus Ring**: `ring` con colore primary per accessibilità

### Spaziature Comuni

- **Padding Card Header**: `p-6`
- **Padding Card Content**: `p-6 pt-0`
- **Gap tra elementi**: `gap-2` a `gap-4` (0.5rem - 1rem)
- **Container padding**: `px-4 md:px-6` (responsive)

---

## 5. Componenti UI

### Bottoni

| Variante | Stile |
|----------|-------|
| Default | Sfondo primary, testo bianco |
| Secondary | Sfondo secondary, testo chiaro |
| Destructive | Sfondo rosso, testo bianco |
| Outline | Bordo, sfondo trasparente |
| Ghost | Nessun bordo/sfondo, solo hover |

I bottoni primari utilizzano la classe utility `.blue-brand`:

```css
.blue-brand { @apply bg-primary text-white; }
```

### Card

Le card rappresentano il contenitore principale per raggruppare informazioni:

```
rounded-lg border bg-card text-card-foreground shadow-sm
```

- Bordo sottile con colore `border`
- Sfondo bianco (o scuro in dark mode)
- Ombra minima per leggera elevazione

### Badge/Status Indicator

Varianti semantiche con colori dedicati:

- **Default**: Primary background
- **Success**: Verde (`bg-green-500`)
- **Warning**: Arancione (`bg-orange-500`)
- **Error**: Rosso (`bg-red-500`)
- **Outline**: Solo bordo, senza sfondo

---

## 6. Iconografia

### Libreria

**Lucide React** — Set di icone vettoriali consistenti, stroke-based.

### Dimensioni Standard

| Contesto | Classe | Dimensione |
|----------|--------|-----------|
| Inline in testo | `h-4 w-4` | 16px |
| Sidebar menu | `h-4 w-4` | 16px |
| Header/Hero | `h-5 w-5` | 20px |
| Placeholder grande | `h-12 w-12` | 48px |

### Icone Comuni nel Progetto

- **Navigazione**: Home, Plus, CheckSquare, Settings, PanelLeft
- **Azioni**: Send, Paperclip, Copy, X, Check
- **Stato**: Loader2 (con animazione `animate-spin`), Database
- **Chat/AI**: Bot, History
- **File**: FileText, FileSpreadsheet, Image

---

## 7. Animazioni e Transizioni

### Transizioni Standard

```css
transition-all hover:text-primary
transition-colors
```

### Animazioni Definite

| Nome | Utilizzo |
|------|----------|
| `accordion-down/up` | Apertura/chiusura accordion |
| `animate-spin` | Loading spinner (su Loader2) |

### Hover States

- **Link/Menu**: Cambio colore a `text-primary`
- **Bottoni**: Opacità ridotta (`hover:bg-primary/80`)
- **Card interattive**: Leggera elevazione o bordo highlight

---

## 8. Layout e Grid

### Sistema di Grid

Grid responsive con breakpoint Tailwind:

```html
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
grid-cols-1 md:grid-cols-2 lg:grid-cols-4
```

### Sidebar Collapsible

- **Espansa**: 16rem (256px)
- **Collapsed** (icon only): 3rem (48px)
- **Mobile**: Sheet/drawer a larghezza 18rem

### Container

- `container`: center, padding 2rem, max-width 1400px

---

## 9. Dark Mode

Il progetto supporta pienamente la dark mode attraverso:

- Classe `.dark` sul root element
- Variabili CSS ridefinite per ogni token colore
- Gestione persistente in localStorage via hook `useThemeCustomization`

Le variazioni principali in dark mode:

- Background passa da bianco a blu scuro profondo
- Foreground da nero a grigio chiaro
- Muted backgrounds diventano più scuri con opacità
- I colori semantici (success, warning, danger) mantengono la saturazione ma si adattano con varianti `/30` o `/50`

---

## 10. Visualizzazioni e Grafici

### Librerie Utilizzate

- **Recharts** — per grafici statistici
- **React Flow** — per diagrammi a nodi

### Temi Grafici

I grafici utilizzano le variabili CSS per mantenere coerenza:

```javascript
colors: {
  primary: 'hsl(var(--primary))',
  secondary: 'hsl(var(--secondary))',
  success: 'hsl(142, 76%, 36%)',
  warning: 'hsl(45, 93%, 47%)',
  danger: 'hsl(0, 84%, 60%)'
}
```

### React Flow Custom Styling

- Nodi con font Open Sans 12px
- Handle connessioni con bordo primary
- Edge path con `stroke-width` 1.5px
- Controlli con bordi arrotondati e ombra leggera
- Sfondo con pattern puntinato radiale

---

## 11. Temi di Stato e Performance

Il sistema include configurazioni centralizzate per colorare elementi in base al loro stato:

### Trend Indicators

| Trend | Colore Testo | Background |
|-------|---|---|
| Up (positivo) | `text-green-600` | `bg-green-50` |
| Down (negativo) | `text-red-600` | `bg-red-50` |
| Neutral | `text-gray-600` | `bg-gray-50` |

### Priority Levels

| Priorità | Colore | Icona |
|----------|--------|-------|
| High | Rosso | AlertTriangle |
| Medium | Giallo | AlertCircle |
| Low | Verde | Info |

### Project Status

| Status | Colore |
|--------|--------|
| Active | Verde |
| Pending | Giallo |
| Completed | Blu |
| Overdue | Rosso |

---

## 12. Utility Classes Custom

```css
.blue-brand     → bg-primary text-white
.blue-dark      → bg-secondary text-white
.scrollbar-hide → nasconde scrollbar (cross-browser)
```

---

## Riepilogo Identità Visiva

| Aspetto | Caratteristica |
|---------|---|
| **Tono** | Professionale, affidabile, moderno |
| **Palette** | Blu corporate con accenti semantici |
| **Tipografia** | Poppins per impatto, Open Sans per leggibilità |
| **Forme** | Angoli arrotondati (8px base), bordi sottili |
| **Iconografia** | Lucide React, stile outline consistente |
| **Interattività** | Hover con cambio colore, focus ring accessibile |
| **Responsività** | Mobile-first con breakpoint md/lg |

---

**Documento generato**: Gennaio 2026
