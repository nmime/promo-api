# Promo Code API

REST API for promo codes with activation tracking.

## Stack

Node.js, TypeScript, NestJS, Fastify, Prisma, PostgreSQL

## Setup

```bash
git clone https://github.com/nmime/promo-api.git
cd promo-api
docker compose up -d
```

API available at http://localhost:3000

## Endpoints

**POST /promo-codes** - create promo code
```bash
curl -X POST http://localhost:3000/promo-codes -H "Content-Type: application/json" \
  -d '{"code":"SUMMER25","discount":25,"activationLimit":100,"expiresAt":"2027-12-31T23:59:59Z"}'
```

**GET /promo-codes** - list all codes

**GET /promo-codes/:id** - get by ID

**POST /activations** - activate code
```bash
curl -X POST http://localhost:3000/activations -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","code":"SUMMER25"}'
```

## Development

```bash
npm install
cp .env.example .env
docker compose up -d postgres
npx prisma migrate dev
npm run start:dev
```

## Notes

- Email can activate each promo code only once (unique constraint)
- Activation fails if limit reached or code expired
- Transaction isolation prevents race conditions
