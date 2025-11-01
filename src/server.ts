import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { initializeGenkit, simpleSuggestionsFlow } from './genkit/index';
import { GroceryItem } from './app/models/grocery.types';

// Load environment variables
dotenv.config();

// Initialize Genkit
initializeGenkit();

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Enable CORS
app.use(cors());
app.use(express.json());

// 🎯 AI-Powered Smart Suggestions Endpoint
app.post('/api/smart-suggestions', async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid items array' });
    }

    const itemNames = (items as GroceryItem[]).map((item) => item.name);

    const result = await simpleSuggestionsFlow({ items: itemNames });

    const suggestions = result.suggestions.map((suggestion) => ({
      item: {
        id: Math.random().toString(36).substring(2),
        name: suggestion.name,
        category: suggestion.category,
        quantity: suggestion.quantity,
        unit: suggestion.unit || 'pcs',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      reason: suggestion.reason,
      priority: suggestion.priority,
    }));

    return res.json(suggestions);
  } catch (error) {
    console.error('Error generating AI suggestions:', error);

    return res.status(500).json({
      error: 'AI suggestions unavailable',
      message: 'Unable to generate smart suggestions at the moment',
    });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);