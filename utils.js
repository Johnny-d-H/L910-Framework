const fs = require("fs");

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", chunk => (data += chunk));
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

async function parseBodySafe(req) {
  try {
    req.body = await parseBody(req);
  } catch {
    req.body = {};
  }
}

function enhanceReqRes(req, res) {
  res.status = code => {
    res.statusCode = code;
    return res;
  };
  res.send = payload => {
    if (typeof payload === "object") payload = JSON.stringify(payload);
    res.end(payload);
  };
  res.json = obj => res.end(JSON.stringify(obj));
}

function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = { parseBody, parseBodySafe, enhanceReqRes, readJSON, writeJSON };
