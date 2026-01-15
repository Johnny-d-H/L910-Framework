function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}

function jsonHeaders(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
}

function errorBoundary(req, res, next) {
  try {
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { logger, jsonHeaders, errorBoundary };
