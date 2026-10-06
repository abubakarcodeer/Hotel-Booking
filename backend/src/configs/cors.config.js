
const allowedOrigins = [
  'http://localhost:3033',
  'http://localhost:3034',
  'http://localhost:5173',
  'http://localhost:5500',
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow if no origin (like mobile apps, curl, or same-origin)
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.indexOf(origin) !== -1 ||
                     origin.includes('ngrok-free.app') ||
                     origin.includes('hostingersite.com') ||
                     origin.includes('localhost:');

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS origin'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200
};

module.exports = corsOptions;
