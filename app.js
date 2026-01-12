const { createApp } = require("./framework")
const { logger, jsonHeaders, errorBoundary } = require("./middleware")
const { registerRoutes } = require("./router")

const app = createApp()
app.use(errorBoundary)
app.use(logger)
app.use(jsonHeaders)

registerRoutes(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
