# Kanban užduočių lenta

Asmeninio naudojimo Kanban tipo užduočių valdymo programa. Užduotis galima kurti, trinti ir tempti pele tarp trijų stulpelių (Reikia padaryti, Vykdoma, Atlikta). Pakeitimai išsaugomi duomenų bazėje.

Baigiamasis darbas — Vilnius Coding School, JavaScript mokymai.

## Demonstracija

[Gyva versija](ČIA_ĮRAŠYK_VERCEL_NUORODĄ)

![Ekrano nuotrauka](./screenshot.png)

## Technologijos

**Frontend:** React, Vite, Axios, HTML Drag & Drop API, CSS
**Backend:** Node.js, Express, MongoDB (Mongoose), CORS, dotenv

## Paleidimas

Backend:

```bash
cd backend
npm install
```

Sukurk `.env` failą `backend` aplanke:

```
MONGO_URI=tavo_connection_string
PORT=5000
```

```bash
node server.js
```

Frontend (naujame terminale):

```bash
cd frontend
npm install
npm run dev
```

Naršyklėje: `http://localhost:5173`

## API

| Metodas | Adresas | Aprašymas |
|---------|---------|-----------|
| GET | /api/tasks | Gauti visas užduotis |
| POST | /api/tasks | Sukurti užduotį |
| PUT | /api/tasks/:id | Atnaujinti būseną |
| DELETE | /api/tasks/:id | Ištrinti užduotį |

## Autorius

Vardas Pavardė
