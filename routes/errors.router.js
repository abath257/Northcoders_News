const errorsRouter = require('express').Router()

app.get("/api/*", handleRootPathErrors);
app.use(handleCustomErrors);
app.use(handlePSQLErrors);