const express = require('express')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/my-cats', (req, res) => {
    res.json([
        {
            name: 'cats'
        }
    ])
})


if (NODE_ENV !== 'production') {
    app.listen(3000, '192.168.1.2',() => {
        console.log('server on port 3000')
    })
} else {
    app.listen(process.env.PORT,() => {
        console.log('server on port 3000')
    })
}
