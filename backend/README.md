 # Pharmacy Order & Inventory Management System (Backend)

A RESTful backend application for managing pharmacy medicines, inventory, customer orders, and AI-powered medicine recommendations.

##  Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Redis
- Google Gemini AI
- Docker

##  Features
- Add Medicine
- Update Stock
- Get Medicine List (Redis Cache)
- Place Order (Redis Locking)
- Get Order Details
- Low Stock Alerts (Event Driven)
- AI Medicine Recommendation

##  Project Structure
```
backend/
├── src/
├── sql/
├── logs/
├── .env.example
├── package.json
└── README.md
```
##  Installation
```bash
npm install
npm run dev
```
##  Environment Variables
Create a `.env` file and configure:
- PostgreSQL
- Redis
- Gemini API Key
Refer to `.env.example`.

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/medicines` | Add Medicine |
```json
{
  "name": "Paracetamol 650",
  "category": "Painkiller",
  "stock": 100,
  "price": 12.5,
  "low_stock_threshold": 20,
  "description": "Used for fever and pain relief"
}
```

| PATCH | `/api/inventory/stock` | Update Stock |
```json
{
  "medicine_id": 1,
  "quantity": -5,
  "is_delta": true
}
```
| GET | `/api/medicines` | Get Medicine List |
| POST | `/api/orders` | Place Order |
```json
{
  "user_id": "USER001",
  "medicine_list": [
    {
      "medicine_id": 1,
      "quantity": 2
    }
  ]
}
```
| GET | `/api/orders/:order_id` | Get Order Details |
| GET | `/api/inventory/low-stock` | Low Stock Alerts |
| POST | `/api/ai/recommendations` | AI Recommendation |
```json
{
  "symptoms": "fever"
}
```
OR
```json
{
  "medicine_id": 1
}
```
##  Developed For
**Advanced Backend System Design & AI-driven Data Systems**