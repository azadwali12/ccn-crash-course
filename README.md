# CCN Crash Course

## 🍛 FoodShare Pakistan — Business Prototype

**Course:** Fundamentals of Entrepreneurship  
**Concept:** Reduce food waste in Pakistan by connecting surplus food donors (restaurants, caterers,
wedding halls) with low-income families and shelter houses at up to 80% discounted prices.

---

### Problem Statement

Pakistan wastes approximately **36 million tonnes** of food every year — at weddings, restaurants,
hotels, and supermarkets — while **~36% of households** face food insecurity. FoodShare Pakistan
bridges this gap through a two-sided marketplace.

---

### Prototype Pages (Frontend)

Located in `frontend/src/pages/foodshare/`:

| File | Route | Description |
|---|---|---|
| `FoodShareHome.js` | `/foodshare` | Landing page — mission, stats, how-it-works summary |
| `FoodListings.js` | `/foodshare/listings` | Browse available surplus food with category & city filters |
| `HowItWorks.js` | `/foodshare/how-it-works` | Full business model, process flows, and year-1 impact goals |
| `DonorSignup.js` | `/foodshare/donor-signup` | Registration form for restaurants / caterers / event venues |
| `BeneficiarySignup.js` | `/foodshare/beneficiary-signup` | Application form for low-income families, NGOs, shelters |

Import all pages at once:

```js
import { FoodShareHome, FoodListings, HowItWorks, DonorSignup, BeneficiarySignup }
  from './pages/foodshare';
```

---

### API Routes (Backend)

Located in `backend/routes/foodshare.js`. Start the server:

```bash
cd backend
npm install
node server.js         # API listens on http://localhost:4000
```

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/foodshare/listings` | List surplus food (optional `?city=` & `?category=` filters) |
| `POST` | `/api/foodshare/donors` | Register a new food donor |
| `POST` | `/api/foodshare/beneficiaries` | Submit a beneficiary application |
| `GET` | `/health` | Server health check |

**Example — register a donor:**

```bash
curl -X POST http://localhost:4000/api/foodshare/donors \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Al-Noor Restaurant",
    "businessType": "Restaurant",
    "ownerName": "Ahmed Khan",
    "cnic": "42101-1234567-1",
    "email": "ahmed@alnoor.pk",
    "phone": "03001234567",
    "city": "Karachi",
    "address": "Block 5, Gulshan-e-Iqbal"
  }'
```

---

### Business Model Summary

| Item | Detail |
|---|---|
| Revenue | 5–10% platform fee on each food listing |
| Beneficiary price | 70–80% below market (covers logistics only) |
| NGO / Shelter price | Free or near-free (subsidised by donor fees) |
| Logistics | Partnership with local delivery services; hubs at mosques / community centres |
| Quality control | Trained volunteers inspect every batch; cold chain for perishables |

---

### Running the Project

```bash
# Backend
cd backend && npm install && node server.js

# Frontend (assuming a React setup)
cd frontend && npm install && npm start
```
