const express = require('express')
const multer = require('multer')
const cors = require('cors')
const upload = multer({ dest: 'uploads/' })

const app = express()

app.options('/upload', cors())

// app.post('/upload', cors(), upload.array('files', 12), (req, res) => {
//   console.log(req.files)
//   res.send(JSON.stringify(req.files.map(file => file.filename)))
// })

app.post('/upload', cors(), upload.single('file'), (req, res) => {
  const object = { id: req.file.filename }
  res.send(JSON.stringify(object))
})

app.get('/preview/:key', cors(), (req, res) => {
  res.sendFile(
    `uploads/${req.params.key}`,
    {
      root: __dirname,
      headers: {
        'Content-Type': 'image/*,video/*',
      },
    },
    error => {
      if (error) {
        res.status(404).send('Not found')
      }
    })
})
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Example app listening on port 3000!')
})