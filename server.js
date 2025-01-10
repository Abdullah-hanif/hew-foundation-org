const express = require('express')
const path = require('path')
const compression = require('compression')

const app = express()
const PORT = process.env.PORT || 4000

// Enable gzip compression
app.use(compression())

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')))

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 