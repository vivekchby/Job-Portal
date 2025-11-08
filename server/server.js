import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import './config/instrument.js'
import { Webhook } from 'svix'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js'

//Initalize Express
const app = express()

// Connect to Database
await connectDB()

//MiddleWares
app.use(cors())
// NOTE: express.json() is NOT here

//Routes
app.get('/', (req, res) => res.send('API working'))

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// 1. WEBHOOK ROUTE
// Use express.raw() to get the raw body as a buffer
// This MUST be defined *before* app.use(express.json())
app.post('/webhooks', express.raw({ type: 'application/json' }), clerkWebhooks)

// 2. JSON PARSER
// Now, use the JSON parser for all *other* routes
app.use(express.json())

// 3. OTHER API ROUTES
// Any other routes that depend on req.body being JSON
// should be defined *after* app.use(express.json())
// (e.g., app.post('/api/jobs', ...))


//Port
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})