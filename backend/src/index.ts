// import express from 'express';
// import cors, { CorsOptions } from "cors";
// import dotenv from 'dotenv';

// // Import all routes
// import authRoutes from './api/auth/auth.routes.js';
// import adminRoutes from './api/admin/admin.routes.js';
// import parentRoutes from './api/parent/parent.routes.js';
// import therapistRoutes from './api/therapist/therapist.routes.js';
// import bookingRoutes from './api/booking/booking.routes.js';
// import slotRoutes from './api/slots/slots.routes.js';
// import feedbackRoutes from './api/feedback/feedback.routes.js';
// import demoRoutes from './api/demo/demo.routes.js';
// import prisma from './utils/prisma.js';

// // Load environment variables
// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;
// const corsOptions: CorsOptions = {
//   origin: (origin, callback) => {
//     console.log('[CORS] Request origin:', origin ?? 'none');
//     callback(null, true); // Reflect the request origin (dynamic allow list)
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
//   allowedHeaders: [
//     'Content-Type', 
//     'Authorization', 
//     'X-Requested-With',
//     'Accept',
//     'Origin',
//     'Access-Control-Request-Method',
//     'Access-Control-Request-Headers'
//   ],
//   exposedHeaders: ['Content-Range', 'X-Content-Range'],
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };

// // Apply CORS FIRST - before any other middleware
// app.use(cors(corsOptions));

// // Manually set CORS headers for every response (fallback for proxies/CDN)
// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (origin) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD'
//   );
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Content-Type, Authorization, X-Requested-With, Accept, Origin, Access-Control-Request-Method, Access-Control-Request-Headers'
//   );

//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(204);
//   }

//   next();
// });

// // Parse JSON bodies
// app.use(express.json());

// // Basic request logger (path, method, status) - AFTER CORS
// app.use((req, res, next) => {
//   const started = Date.now();
//   // eslint-disable-next-line no-console
//   console.log('[REQ]', req.method, req.originalUrl, 'Origin:', req.headers.origin || 'none');
//   res.on('finish', () => {
//     const ms = Date.now() - started;
//     // eslint-disable-next-line no-console
//     console.log('[RES]', req.method, req.originalUrl, res.statusCode, ms + 'ms');
//   });
//   next();
// });

// // API Routes
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/admin', adminRoutes);
// app.use('/api/v1/parents', parentRoutes);
// app.use('/api/v1/therapists', therapistRoutes);
// app.use('/api/v1/bookings', bookingRoutes);
// app.use('/api/v1/slots', slotRoutes);
// app.use('/api/v1/feedback', feedbackRoutes);
// app.use('/api/v1/demo', demoRoutes);

// // Health endpoint for connectivity checks
// app.get('/api/v1/health', (_req, res) => {
//   res.status(200).json({ status: 'ok' });
// });


// const startServer = async () => {
//   try {
//     // Connect to database with retry logic
//     let retries = 5;
//     while (retries > 0) {
//       try {
//         await prisma.$connect();
//         console.log('✓ Connected to database');
//         break;
//       } catch (error: any) {
//         retries--;
//         if (retries === 0) {
//           throw error;
//         }
//         console.warn(`Database connection failed, retrying... (${5 - retries}/5)`);
//         await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
//       }
//     }
    
//     app.listen(PORT, () => {
//       console.log(`✓ Server is running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error('✗ Failed to start server:', error);
//     process.exit(1);
//   }
// };

// startServer();
// index.ts
import express, { Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import prisma from './utils/prisma.js'; // keep .js if ts-node / compiled output expects JS

// Import routes (keep your existing route files)
import authRoutes from './api/auth/auth.routes.js';
import adminRoutes from './api/admin/admin.routes.js';
import parentRoutes from './api/parent/parent.routes.js';
import therapistRoutes from './api/therapist/therapist.routes.js';
import bookingRoutes from './api/booking/booking.routes.js';
import slotRoutes from './api/slots/slots.routes.js';
import feedbackRoutes from './api/feedback/feedback.routes.js';
import demoRoutes from './api/demo/demo.routes.js';

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 5000;

// Trust proxy (important on Render/Vercel)
app.set('trust proxy', 1);

/**
 * ALLOWED_ORIGINS: comma separated list in env, e.g.:
 * ALLOWED_ORIGINS=https://theraabee.vercel.app,https://therabeefinal.onrender.com,http://localhost:3000
 *
 * If not set, it falls back to localhost for dev.
 */
const rawAllowed = process.env.ALLOWED_ORIGINS || 'http://localhost:3000';
const ALLOWED_ORIGINS: string[] = rawAllowed.split(',').map(s => s.trim()).filter(Boolean);

console.log('[CORS] Allowed origins:', ALLOWED_ORIGINS);

/**
 * CORS options with dynamic origin checking.
 * - Allows no-origin requests (server-to-server, curl).
 * - Allows origins in ALLOWED_ORIGINS.
 * - Otherwise rejects and logs blocked origin.
 */
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // origin === undefined for same-origin requests (curl/server-to-server)
    if (!origin) {
      return callback(null, true);
    }
    if (ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    console.warn(`[CORS] Blocked origin: ${origin}`);
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS first
app.use(cors(corsOptions));

// Ensure OPTIONS is handled for all routes (helps with some proxies)
app.options('*', cors(corsOptions));

// Add COOP/COEP headers so popups/iframes used by Google Sign-In can communicate
app.use((req: Request, res: Response, next: NextFunction) => {
  // allow popups to communicate back to opener (useful for OAuth/GSI flows)
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  // avoid cross-origin embedder requirements for now
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  next();
});

// Manual fallback headers (defensive — the cors middleware should already set these)
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With, Accept, Origin, Access-Control-Request-Method, Access-Control-Request-Headers'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Parse JSON bodies
app.use(express.json());

// Simple request logger (after CORS)
app.use((req: Request, res: Response, next: NextFunction) => {
  const started = Date.now();
  console.log('[REQ]', req.method, req.originalUrl, 'Origin:', req.headers.origin || 'none');
  res.on('finish', () => {
    const ms = Date.now() - started;
    console.log('[RES]', req.method, req.originalUrl, res.statusCode, ms + 'ms');
  });
  next();
});

// Mount API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/parents', parentRoutes);
app.use('/api/v1/therapists', therapistRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/slots', slotRoutes);
app.use('/api/v1/feedback', feedbackRoutes);
app.use('/api/v1/demo', demoRoutes);

// Health endpoint
app.get('/api/v1/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// Root quick message
app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('TheraBee API is running.');
});

/**
 * Error handler (catch CORS rejection and other errors)
 * Make sure this is AFTER routes
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    // CORS error produced by corsOptions.origin callback will arrive here
    if (err.message === 'Not allowed by CORS') {
      console.warn('[CORS ERROR]', req.headers.origin);
      return res.status(403).json({ error: 'CORS blocked: origin not allowed' });
    }
    console.error('[SERVER ERROR]', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
  next();
});

// Start server with DB connect retry
const startServer = async (): Promise<void> => {
  try {
    // Connect to DB with retries
    let retries = 5;
    while (retries > 0) {
      try {
        // If prisma type complains, you can `// @ts-ignore` above or adjust import typing
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await prisma.$connect();
        console.log('✓ Connected to database');
        break;
      } catch (dbErr: any) {
        retries--;
        console.warn(`Database connect failed. Retries left: ${retries}. Error: ${dbErr?.message ?? dbErr}`);
        if (retries === 0) {
          throw dbErr;
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    app.listen(PORT, () => {
      const host = process.env.HOSTNAME || `http://localhost:${PORT}`;
      console.log(`✓ Server listening on port ${PORT}`);
      console.log(`  Public host (for logs): ${host}`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
