exports.home = (req, res) => {
  res.send('DevOps Practice App Running 🚀');
};

exports.health = (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date()
  });
};

exports.sum = (req, res) => {
  const { a, b } = req.body;

  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({
      error: 'Inputs must be numbers'
    });
  }

  res.json({
    result: a + b
  });
};