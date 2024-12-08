const express = require('express')
const app = express()
const port = 3001

app.get('/home', (req, res) => {
  res.send('Hello World 1233 test!')
})                      

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})      