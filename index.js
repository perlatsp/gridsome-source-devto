const axios = require('axios')

module.exports = function(api, options) {
  //check if typename is set
  if (!options.typeName) {
    throw new Error(`Missing typeName option.`)
  }
  //check if apikey is set
  if (options.apiKey.length <= 0 || options.apiKey == '') {
    throw new Error(
      `Please enter the api key you got from dev.to! https://dev.to/settings/account`
    )
  }
  //check if username is set
  if (!options.username) {
    throw new Error(`Missing username option.`)
  }
  //check if route is set
  if (!options.route) {
    throw new Error(`You have not set the route option for the articles.`)
  }

  const devtoURL = `https://dev.to/api/articles?api-key=${options.apiKey}&username=${options.username}`

  api.loadSource(async store => {
    store.addCollection({
      typeName: options.typeName,
      route: options.route
    })
    console.log(`Loading data from https://dev.to/api for ${options.username}`)
    await getArticles(store)
  })

  /**
   * get latest articles from https://dev.to
   * TODO: refactor this function
   */
  const getArticles = async (store, page = 1) => {
    const articles = store.getCollection(options.typeName)
    let response = await axios.get(devtoURL, { params: { page: page } })
    let posts = response.data

    if (posts.length >= 30 && posts.length !== 0) {
      getArticles(store, ++page)
    }

    console.log(
      `Got ${posts.length} ${options.typeName}s from dev.to for ${options.username}`
    )

    for (let post of posts) {
      articles.addNode({ ...post })
    }
  }
}
