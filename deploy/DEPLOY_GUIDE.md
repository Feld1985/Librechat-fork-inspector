# Guida Deploy - Crossnection Inspector

## Prerequisiti sul Server Hetzner

- Docker e Docker Compose installati
- Caddy installato (per HTTPS automatico)
- Git installato

---

## Step 1: Configura DNS su Siteground

1. Accedi al pannello Siteground
2. Vai su **DNS Zone Editor**
3. Aggiungi un record **A**:
   - **Name**: `inspector-fork`
   - **Type**: A
   - **Value**: `135.181.45.85` (IP del tuo server Hetzner)
   - **TTL**: 3600

Attendi 5-15 minuti per la propagazione DNS.

---

## Step 2: Prepara il Server

Connettiti al server:
```bash
ssh root@135.181.45.85
```

Crea la directory del progetto:
```bash
mkdir -p /opt/crossnection-inspector
cd /opt/crossnection-inspector
```

Clona il repository (o trasferisci i file):
```bash
git clone https://github.com/TUO-USERNAME/librechat-fork-inspector.git .
# Oppure usa rsync/scp per trasferire i file
```

---

## Step 3: Configura Environment

Copia e modifica il file .env:
```bash
cp .env.production .env
nano .env
```

**IMPORTANTE - Genera chiavi sicure:**
```bash
# Genera CREDS_KEY (32 caratteri hex)
openssl rand -hex 32

# Genera CREDS_IV (16 caratteri hex)
openssl rand -hex 16

# Genera JWT_SECRET
openssl rand -hex 32

# Genera JWT_REFRESH_SECRET
openssl rand -hex 32
```

**Modifica questi valori nel .env:**
- `ANTHROPIC_API_KEY` → La tua API key Anthropic
- `CREDS_KEY` → Chiave generata
- `CREDS_IV` → IV generato
- `JWT_SECRET` → Secret generato
- `JWT_REFRESH_SECRET` → Refresh secret generato

---

## Step 4: Configura Caddy

Copia la configurazione Caddy:
```bash
sudo cp deploy/Caddyfile /etc/caddy/Caddyfile
```

Oppure aggiungi al Caddyfile esistente:
```bash
sudo nano /etc/caddy/Caddyfile
```

Aggiungi:
```
inspector-fork.marcopericci.com {
    reverse_proxy localhost:3080
    encode gzip
}
```

Ricarica Caddy:
```bash
sudo systemctl reload caddy
```

---

## Step 5: Build e Avvia

Build dell'immagine Docker:
```bash
docker compose build
```

Avvia i container:
```bash
docker compose up -d
```

Verifica che siano in esecuzione:
```bash
docker compose ps
docker compose logs -f api
```

---

## Step 6: Crea Utente Admin

Una volta avviato, crea il primo utente admin:
```bash
docker compose exec api npm run create-user -- \
  --email admin@crossnection.com \
  --password TuaPasswordSicura \
  --name "Admin" \
  --role ADMIN
```

---

## Verifica Finale

1. Apri https://inspector-fork.marcopericci.com
2. Dovresti vedere la pagina di login di Crossnection Inspector
3. Accedi con le credenziali admin create
4. Verifica che i 4 ModelSpecs siano visibili nel dropdown

---

## Comandi Utili

```bash
# Visualizza log in tempo reale
docker compose logs -f

# Riavvia i servizi
docker compose restart

# Ferma tutto
docker compose down

# Aggiorna dopo modifiche al codice
git pull
docker compose build
docker compose up -d

# Backup database MongoDB
docker compose exec mongodb mongodump --out /data/db/backup
docker cp inspector-mongodb:/data/db/backup ./backup
```

---

## Troubleshooting

### Il sito non si carica
```bash
# Verifica che i container siano attivi
docker compose ps

# Controlla i log
docker compose logs api

# Verifica che Caddy sia attivo
sudo systemctl status caddy
```

### Errore di connessione MongoDB
```bash
# Verifica che MongoDB sia avviato
docker compose logs mongodb

# Riavvia MongoDB
docker compose restart mongodb
```

### Certificato SSL non funziona
```bash
# Verifica la configurazione Caddy
sudo caddy validate --config /etc/caddy/Caddyfile

# Controlla i log di Caddy
sudo journalctl -u caddy -f
```

---

## Struttura File sul Server

```
/opt/crossnection-inspector/
├── .env                    # Config produzione (con le tue chiavi)
├── librechat.yaml          # Config ModelSpecs e UI
├── docker-compose.yml      # Config Docker base
├── docker-compose.override.yml  # Override per produzione
├── config/
│   └── prompts/            # File system prompt
├── uploads/                # File caricati dagli utenti
├── logs/                   # Log applicazione
└── images/                 # Immagini generate
```
