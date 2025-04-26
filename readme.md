# Human Chain 🛡️

# API Live URL 
```bash
https://humanchain-mymw7.ondigitalocean.app/api/v1
```

## Features 🌟
- CRUD operations for incidents
- Rate limiting protection
- Error logging system
- Input validation
- MongoDB database integration
- Support for Development and Production environments
- Seeding functionality for initial data

## Prerequisites 🛠️
- **Node.js v22.0.0** or higher (for `--watch` and `--env-file` features)
- **MongoDB**
- **PNPM** package manager

## Installation 📦

### 1. Clone the repository:
```bash
git clone https://github.com/Rishiyaduwanshi/humanChain
```

### 2. Install dependencies:
```bash
pnpm install
```

### 3. Setup environment variables:
Create a `.env.dev` file and add the following:
```plaintext
PORT=4040
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/human-chain
GLOBAL_RATE_LIMIT_MAX=100
PER_IP_RATE_LIMIT_MAX=10
```

### 4. Seed initial data:
If your Node.js version is **v22 or above**, simply run:
```bash
pnpm seed
```

> **Note:**
> If your Node.js version is **below v22**, you won't be able to run `dev`, `seed`, and `pro` scripts directly.
> Instead, manually run this for seeding:
```bash
node seeders/incident.seed.js
```

### 5. Start the development server:
```bash
pnpm dev
```
Or if Node.js version is older:
```bash
node server.js
```

---

## API Endpoints 🚀

**Base URL:** `/api/v1`

| Method | Endpoint           | Description                    |
|--------|--------------------|--------------------------------|
| GET    | `/incidents`        | Fetch all incidents            |
| POST   | `/incidents`        | Create a new incident          |
| GET    | `/incidents/:id`    | Fetch a specific incident      |
| PATCH  | `/incidents/:id`    | Update an existing incident    |
| DELETE | `/incidents/:id`    | Delete an incident             |

### Request Body Format (for POST/PATCH)
```json
{
  "title": "AI System Error",
  "description": "Detailed description of the incident",
  "severity": "Low | Medium | High"
}
```

---

## Development 🔧

Start the development server:
```bash
pnpm dev
```

Start the production server:
```bash
pnpm pro
```

---

## Rate Limiting 🚧

- **Global Rate Limit:** 100 requests per minute
- **Per IP Rate Limit:** 10 requests per minute

---

## Error Logging 📝

- **Error logs:** `logs/error.log`
- **Application logs:** `logs/app.log`

---

## Postman Collection 📮

You can use the **Human Chain API Collection** for testing all the endpoints: [Postman Documentation](https://documenter.getpostman.com/view/33766937/2sB2j1gC5n#109959b4-8830-4635-8aaf-e65369081995)
 

 [![Click here for documentation](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/33766937/2sB2j1gC5n#109959b4-8830-4635-8aaf-e65369081995)

---
