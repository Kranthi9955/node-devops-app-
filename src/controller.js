exports.home = (req, res) => {
  res.status(200).json({
    message: '🚀 DevOps Practice App Running',
    service: 'Node DevOps App',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
};

// Health check (used in Docker/K8s)
exports.health = (req, res) => {
  res.status(200).json({
    status: 'UP',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
};

// Sum API (improved)
exports.sum = (req, res) => {
  try {
    const { a, b } = req.body;

    // Validation
    if (a === undefined || b === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Both "a" and "b" are required'
      });
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
      return res.status(400).json({
        success: false,
        error: 'Inputs must be numbers'
      });
    }

    const result = a + b;

    // Logging (important for DevOps)
    console.log(`SUM API called → ${a} + ${b} = ${result}`);

    res.status(200).json({
      success: true,
      operation: 'addition',
      inputs: { a, b },
      result
    });

  } catch (err) {
    console.error('Error in sum API:', err);

    res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
};
