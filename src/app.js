const express = require('express');
const routes = require('./routes');

const app = express();

// Middleware
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api', routes);

// Health check (important for Docker/K8s)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date(),
  });
});

// Home route (UI)
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Node DevOps App</title>
        <style>
          body {
            font-family: Arial;
            background: #0f172a;
            color: white;
            text-align: center;
            padding-top: 50px;
          }
          h1 {
            color: #38bdf8;
          }
          .card {
            background: #1e293b;
            padding: 20px;
            margin: auto;
            width: 300px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>🚀 Node DevOps App</h1>
          <p>Status: Running</p>
          <p>Environment: ${process.env.NODE_ENV || 'development'}</p>
          <p>Port: ${process.env.PORT || 3000}</p>
        </div>
      </body>
    </html>
  `);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
  });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
