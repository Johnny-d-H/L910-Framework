const { readJSON, writeJSON } = require("./utils");

function sendEntityNotFound(res, name = "Entity") {
  return res.status(404).json({ error: `${name} not found` });
}
function registerRoutes(app) {
  app.get("/movies", (req, res) => res.json(readJSON("movies.json")));

  app.get("/movies/:id", (req, res) => {
    const data = readJSON("movies.json");
    const entity = data.movies.find(m => m.id === req.params.id);
    if (!entity) return sendEntityNotFound(res, "Movie");
    res.json(entity);
  });

  app.post("/movies", (req, res) => {
    const data = readJSON("movies.json");
    const newMovie = {
      id: `m-${Date.now()}`,
      title: req.body.title ?? "Без названия",
      duration: Number(req.body.duration ?? 120),
      isAvailable: Boolean(req.body.isAvailable ?? true),
      genres: Array.isArray(req.body.genres) ? req.body.genres : ["unknown"],
      releaseDate: req.body.releaseDate ?? new Date().toISOString().slice(0, 10)
    };
    data.movies.push(newMovie);
    writeJSON("movies.json", data);
    res.status(201).json(newMovie);
  });

  app.put("/movies/:id", (req, res) => {
    const data = readJSON("movies.json");
    const idx = data.movies.findIndex(m => m.id === req.params.id);
    if (idx === -1) return sendEntityNotFound(res, "Movie");
    const updated = {
      id: req.params.id,
      title: String(req.body.title),
      duration: Number(req.body.duration),
      isAvailable: Boolean(req.body.isAvailable),
      genres: Array.isArray(req.body.genres) ? req.body.genres : [],
      releaseDate: String(req.body.releaseDate)
    };
    data.movies[idx] = updated;
    writeJSON("movies.json", data);
    res.json(updated);
  });

  app.patch("/movies/:id", (req, res) => {
    const data = readJSON("movies.json");
    const entity = data.movies.find(m => m.id === req.params.id);
    if (!entity) return sendEntityNotFound(res, "Movie");
    Object.assign(entity, req.body);
    writeJSON("movies.json", data);
    res.json(entity);
  });

  app.delete("/movies/:id", (req, res) => {
    const data = readJSON("movies.json");
    const idx = data.movies.findIndex(m => m.id === req.params.id);
    if (idx === -1) return sendEntityNotFound(res, "Movie");
    const removed = data.movies.splice(idx, 1)[0];
    writeJSON("movies.json", data);
    res.json(removed);
  });

  app.get("/sessions", (req, res) => res.json(readJSON("sessions.json")));

  app.get("/sessions/:id", (req, res) => {
    const data = readJSON("sessions.json");
    const entity = data.sessions.find(s => s.id === req.params.id);
    if (!entity) return sendEntityNotFound(res, "Session");
    res.json(entity);
  });

  app.post("/sessions", (req, res) => {
    const data = readJSON("sessions.json");
    const newSess = {
      id: `s-${Date.now()}`,
      movieId: String(req.body.movieId ?? "m-unknown"),
      hall: Number(req.body.hall ?? 1),
      price: Number(req.body.price ?? 10),
      is3D: Boolean(req.body.is3D ?? false),
      startTime: req.body.startTime ?? new Date(Date.now() + 3600000).toISOString()
    };
    data.sessions.push(newSess);
    writeJSON("sessions.json", data);
    res.status(201).json(newSess);
  });

  app.put("/sessions/:id", (req, res) => {
    const data = readJSON("sessions.json");
    const idx = data.sessions.findIndex(s => s.id === req.params.id);
    if (idx === -1) return sendEntityNotFound(res, "Session");
    const upd = {
      id: req.params.id,
      movieId: String(req.body.movieId),
      hall: Number(req.body.hall),
      price: Number(req.body.price),
      is3D: Boolean(req.body.is3D),
      startTime: String(req.body.startTime)
    };
    data.sessions[idx] = upd;
    writeJSON("sessions.json", data);
    res.json(upd);
  });

  app.patch("/sessions/:id", (req, res) => {
    const data = readJSON("sessions.json");
    const entity = data.sessions.find(s => s.id === req.params.id);
    if (!entity) return sendEntityNotFound(res, "Session");
    Object.assign(entity, req.body);
    writeJSON("sessions.json", data);
    res.json(entity);
  });

  app.delete("/sessions/:id", (req, res) => {
    const data = readJSON("sessions.json");
    const idx = data.sessions.findIndex(s => s.id === req.params.id);
    if (idx === -1) return sendEntityNotFound(res, "Session");
    const removed = data.sessions.splice(idx, 1)[0];
    writeJSON("sessions.json", data);
    res.json(removed);
  });

  app.get("/patterns", (req, res) => res.json(readJSON("patterns.json")));

  app.get("/patterns/:id", (req, res) => {
    const data = readJSON("patterns.json");
    const entity = data.patterns.find(p => p.id === req.params.id);
    if (!entity) return sendEntityNotFound(res, "Pattern");
    res.json(entity);
  });

  app.post("/patterns", (req, res) => {
    const data = readJSON("patterns.json");
    const newPattern = {
      id: `p-${Date.now()}`,
      name: req.body.name ?? "Без названия",
      category: req.body.category ?? "Unknown",
      isPopular: Boolean(req.body.isPopular ?? false),
      createdAt: req.body.createdAt ?? new Date().toISOString().slice(0, 10),
      tags: Array.isArray(req.body.tags) ? req.body.tags : []
    };
    data.patterns.push(newPattern);
    writeJSON("patterns.json", data);
    res.status(201).json(newPattern);
  });

  app.put("/patterns/:id", (req, res) => {
    const data = readJSON("patterns.json");
    const idx = data.patterns.findIndex(p => p.id === req.params.id);
    if (idx === -1) return sendEntityNotFound(res, "Pattern");
    const updated = {
      id: req.params.id,
      name: String(req.body.name),
      category: String(req.body.category),
      isPopular: Boolean(req.body.isPopular),
      createdAt: String(req.body.createdAt),
      tags: Array.isArray(req.body.tags) ? req.body.tags : []
    };
    data.patterns[idx] = updated;
    writeJSON("patterns.json", data);
    res.json(updated);
  });

  app.patch("/patterns/:id", (req, res) => {
    const data = readJSON("patterns.json");
    const entity = data.patterns.find(p => p.id === req.params.id);
    if (!entity) return sendEntityNotFound(res, "Pattern");
    Object.assign(entity, req.body);
    writeJSON("patterns.json", data);
    res.json(entity);
  });

  app.delete("/patterns/:id", (req, res) => {
    const data = readJSON("patterns.json");
    const idx = data.patterns.findIndex(p => p.id === req.params.id);
    if (idx === -1) return sendEntityNotFound(res, "Pattern");
    const removed = data.patterns.splice(idx, 1)[0];
    writeJSON("patterns.json", data);
    res.json(removed);
  });

app.get("/implementations", (req, res) => res.json(readJSON("implementations.json")));

app.get("/implementations/:id", (req, res) => {
  const data = readJSON("implementations.json");
  const entity = data.implementations.find(i => i.id === req.params.id);
  if (!entity) return sendEntityNotFound(res, "Implementation");
  res.json(entity);
});

app.post("/implementations", (req, res) => {
  const data = readJSON("implementations.json");
  const newImpl = {
    id: `i-${Date.now()}`,
    patternId: String(req.body.patternId ?? "p-unknown"),
    language: req.body.language ?? "Unknown",
    author: req.body.author ?? "Anonymous",
    isAsync: Boolean(req.body.isAsync ?? false),
    createdAt: req.body.createdAt ?? new Date().toISOString().slice(0, 10),
    examples: Array.isArray(req.body.examples) ? req.body.examples : []
  };
  data.implementations.push(newImpl);
  writeJSON("implementations.json", data);
  res.status(201).json(newImpl);
});

app.put("/implementations/:id", (req, res) => {
  const data = readJSON("implementations.json");
  const idx = data.implementations.findIndex(i => i.id === req.params.id);
  if (idx === -1) return sendEntityNotFound(res, "Implementation");
  const upd = {
    id: req.params.id,
    patternId: String(req.body.patternId),
    language: String(req.body.language),
    author: String(req.body.author),
    isAsync: Boolean(req.body.isAsync),
    createdAt: String(req.body.createdAt),
    examples: Array.isArray(req.body.examples) ? req.body.examples : []
  };
  data.implementations[idx] = upd;
  writeJSON("implementations.json", data);
  res.json(upd);
});

app.patch("/implementations/:id", (req, res) => {
  const data = readJSON("implementations.json");
  const entity = data.implementations.find(i => i.id === req.params.id);
  if (!entity) return sendEntityNotFound(res, "Implementation");
  Object.assign(entity, req.body);
  writeJSON("implementations.json", data);
  res.json(entity);
});

    app.delete("/implementations/:id", (req, res) => {
    const data = readJSON("implementations.json");
    const idx = data.implementations.findIndex(i => i.id === req.params.id);
    if (idx === -1) return sendEntityNotFound(res, "Implementation");
    const removed = data.implementations.splice(idx, 1)[0];
    writeJSON("implementations.json", data);
    res.json(removed);
  });

  app.get("/halls", (req, res) => res.json(readJSON("halls.json")));
  app.get("/halls/:id", (req, res) => {
    const data = readJSON("halls.json");
    const entity = data.halls.find(h => h.id === req.params.id);
    if (!entity) return sendEntityNotFound(res, "Hall");
    res.json(entity);
  });
  app.post("/halls", (req, res) => {
    const data = readJSON("halls.json");
    const newHall = {
      id: `h-${Date.now()}`,
      name: req.body.name ?? "Без названия",
      capacity: Number(req.body.capacity ?? 100),
      isAvailable: Boolean(req.body.isAvailable ?? true),
      features: Array.isArray(req.body.features) ? req.body.features : [],
      createdAt: req.body.createdAt ?? new Date().toISOString().slice(0, 10)
    };
    data.halls.push(newHall);
    writeJSON("halls.json", data);
    res.status(201).json(newHall);
  });
  app.get("/staff", (req, res) => res.json(readJSON("staff.json")));
  app.get("/staff/:id", (req, res) => {
    const data = readJSON("staff.json");
    const entity = data.staff.find(s => s.id === req.params.id);
    if (!entity) return sendEntityNotFound(res, "Staff");
    res.json(entity);
  });
  app.post("/staff", (req, res) => {
    const data = readJSON("staff.json");
    const newStaff = {
      id: `st-${Date.now()}`,
      name: req.body.name ?? "Без имени",
      role: req.body.role ?? "Unknown",
      salary: Number(req.body.salary ?? 0),
      isActive: Boolean(req.body.isActive ?? true),
      hiredAt: req.body.hiredAt ?? new Date().toISOString().slice(0, 10),
      skills: Array.isArray(req.body.skills) ? req.body.skills : []
    };
    data.staff.push(newStaff);
    writeJSON("staff.json", data);
    res.status(201).json(newStaff);
  });
  app.get("/machines", (req, res) => res.json(readJSON("machines.json")));

app.get("/machines/:id", (req, res) => {
  const data = readJSON("machines.json");
  const entity = data.machines.find(m => m.id === req.params.id);
  if (!entity) return sendEntityNotFound(res, "Machine");
  res.json(entity);
});

app.post("/machines", (req, res) => {
  const data = readJSON("machines.json");
  const newMachine = {
    id: `mc-${Date.now()}`,
    name: req.body.name ?? "Без названия",
    type: req.body.type ?? "Unknown",
    isActive: Boolean(req.body.isActive ?? true),
    capacity: Number(req.body.capacity ?? 100),
    installedAt: req.body.installedAt ?? new Date().toISOString().slice(0, 10),
    features: Array.isArray(req.body.features) ? req.body.features : []
  };
  data.machines.push(newMachine);
  writeJSON("machines.json", data);
  res.status(201).json(newMachine);
});

app.put("/machines/:id", (req, res) => {
  const data = readJSON("machines.json");
  const idx = data.machines.findIndex(m => m.id === req.params.id);
  if (idx === -1) return sendEntityNotFound(res, "Machine");
  const updated = {
    id: req.params.id,
    name: String(req.body.name),
    type: String(req.body.type),
    isActive: Boolean(req.body.isActive),
    capacity: Number(req.body.capacity),
    installedAt: String(req.body.installedAt),
    features: Array.isArray(req.body.features) ? req.body.features : []
  };
  data.machines[idx] = updated;
  writeJSON("machines.json", data);
  res.json(updated);
});

app.patch("/machines/:id", (req, res) => {
  const data = readJSON("machines.json");
  const entity = data.machines.find(m => m.id === req.params.id);
  if (!entity) return sendEntityNotFound(res, "Machine");
  Object.assign(entity, req.body);
  writeJSON("machines.json", data);
  res.json(entity);
});

app.delete("/machines/:id", (req, res) => {
  const data = readJSON("machines.json");
  const idx = data.machines.findIndex(m => m.id === req.params.id);
  if (idx === -1) return sendEntityNotFound(res, "Machine");
  const removed = data.machines.splice(idx, 1)[0];
  writeJSON("machines.json", data);
  res.json(removed);
});

  
app.get("/workers", (req, res) => res.json(readJSON("workers.json")));

app.get("/workers/:id", (req, res) => {
  const data = readJSON("workers.json");
  const entity = data.workers.find(w => w.id === req.params.id);
  if (!entity) return sendEntityNotFound(res, "Worker");
  res.json(entity);
});

app.post("/workers", (req, res) => {
  const data = readJSON("workers.json");
  const newWorker = {
    id: `wr-${Date.now()}`,
    name: req.body.name ?? "Без имени",
    role: req.body.role ?? "Unknown",
    salary: Number(req.body.salary ?? 0),
    isEmployed: Boolean(req.body.isEmployed ?? true),
    hiredAt: req.body.hiredAt ?? new Date().toISOString().slice(0, 10),
    skills: Array.isArray(req.body.skills) ? req.body.skills : []
  };
  data.workers.push(newWorker);
  writeJSON("workers.json", data);
  res.status(201).json(newWorker);
});

app.put("/workers/:id", (req, res) => {
  const data = readJSON("workers.json");
  const idx = data.workers.findIndex(w => w.id === req.params.id);
  if (idx === -1) return sendEntityNotFound(res, "Worker");
  const updated = {
    id: req.params.id,
    name: String(req.body.name),
    role: String(req.body.role),
    salary: Number(req.body.salary),
    isEmployed: Boolean(req.body.isEmployed),
    hiredAt: String(req.body.hiredAt),
    skills: Array.isArray(req.body.skills) ? req.body.skills : []
  };
  data.workers[idx] = updated;
  writeJSON("workers.json", data);
  res.json(updated);
});

app.patch("/workers/:id", (req, res) => {
  const data = readJSON("workers.json");
  const entity = data.workers.find(w => w.id === req.params.id);
  if (!entity) return sendEntityNotFound(res, "Worker");
  Object.assign(entity, req.body);
  writeJSON("workers.json", data);
  res.json(entity);
});

app.delete("/workers/:id", (req, res) => {
  const data = readJSON("workers.json");
  const idx = data.workers.findIndex(w => w.id === req.params.id);
  if (idx === -1) return sendEntityNotFound(res, "Worker");
  const removed = data.workers.splice(idx, 1)[0];
  writeJSON("workers.json", data);
  res.json(removed);
});
} 

module.exports = { registerRoutes };



