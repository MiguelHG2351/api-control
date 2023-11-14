const express = require('express')
const cors = require('cors')
const { getCats, getCatImage } = require('./utils/api')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/my-cats', async (req, res) => {
    const cats = await prisma.catUser.findMany()
    
    res.json(cats)
})

app.get('/cats', async (req, res) => {
    console.log(req.query.limit)
    console.log(req.page)
    const cats = await getCats(req.query.limit, req.query.page)
    const catArray = []

    for (const cat of cats) {
        if(cat.name === 'Malayan') continue;
        const catData = {...cat}
        if(!cat.image) {
            let catDataImage = await getCatImage(cat.id)
            catData.image = catDataImage[0]
        }

        catArray.push(catData)
    }

    res.json(catArray)
})

app.post('/add-cat', async (req, res) => {
    const catId = req.body.catId
    const catName = req.body.catName
    const catImage = req.body.catImage
    console.log(catId)
    console.log(catName)
    console.log(catImage)

    try {
        const data = await prisma.catUser.create({
            data: {
                catId: catId,
                catName: catName,
                catImage
            }
        })
    
        res.json([{
            cat: data
        }])
    } catch(err) {
        res.json([{
            error: 'There is a unique constraint violation, a new user cannot be created with this email'
        }])
    }
})

app.post('/add-register', async (req, res) => {
    const name = req.body.name
    const catUserId = req.body.catUserId
    
    const register = await prisma.catRegister.create({
        data: {
            name,
            catUserId
        }
    })

    res.json(register)
})

app.get('/cat-register', async (req, res) => {
    const catId = req.query.catId
    console.log(catId)
    const register = await prisma.catRegister.findMany({
        where: {
            catUserId: catId - 0
        }
    })

    res.json(register)
})

if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, '192.168.1.2',() => {
        console.log('server on port 3000')
    })
} else {
    app.listen(process.env.PORT,() => {
        console.log('server on port 3000')
    })
}
