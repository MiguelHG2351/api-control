const { credentials } = require('./credentials')

const getCatImage = async (catId) => {
  const TOKEN = credentials['cat-api']
  const URL = `https://api.thecatapi.com/v1/images/search?breed_ids=${catId}&limit=4`

  try {
    const request = await fetch(URL, {
      headers: {
        'x-api-key': TOKEN,
      },
    })
    return await request.json()
  }
  catch (error) {
    return { error: 'Error fetching cat image', err: error }
  }
}

const getCats = async (limit=8, page=1) => {
  const TOKEN = credentials['cat-api']
  const URL = `https://api.thecatapi.com/v1/breeds?limit=${limit}&page=${page}`

  const request = await fetch(URL, {
    headers: {
      'x-api-key': TOKEN,
    },
  })

  return await request.json()
}

module.exports = {
    getCatImage,
    getCats
}
