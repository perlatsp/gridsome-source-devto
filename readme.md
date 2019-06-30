# @perlatsp/gridsome-source-devto

> Gridsome plugin to retrieve posts from http://dev.to. This package is under development and
API might change before v1 is released.

## Install
 
 ```bash
 yarn add @perlatsp/gridsome-source-devto
 ```
or 
```bash
npm install @perlatsp/gridsome-source-devto
```

## Usage
- Get an API Key from https://dev.to/settings/account
- Add the plugin config inside `gridsome.config.js` plugins array.

<details open><summary><code>gridsome.config.js</code></summary>

```js
module.exports = {
  plugins: [
    ...other gridsome plugins
   {
      use: '@perlatsp/gridsome-source-devto',
      options: {
        typeName: 'Article',
        username:'DEVTO_USERNAME', //change username
        apiKey: process.env.DEVTO_API_KEY, //get your API key from https://dev.to/settings/account
        route: '/:slug',
      }
    }
  ]
}
```
</details>


## Loop Query
Inside  `<page-query>` add the following query to get all articles from http://dev.to




<details open>
<summary> <code>./src/Pages/Index.vue </code></summary>

```html
<template>
    <Layout>
        <div v-for="{ node } in $page.allArticle.edges" :key="node.id">
            <g-link :to="node.path" class="single-post-link"> {{node.title}}</g-link>
        </div> 
    </Layout>
</template>

<page-query>
  query Home($page: Int) {
    allArticle {
      edges {
        node {
        id
        title
        published_at
        description
        tag_list
        canonical_url
        cover_image
        }
      }
    }
  }
</page-query>

<script>
  export default {
    metaInfo: {
      title: 'Welcome to my blog :)'
    }
  }
</script>
<style lang="scss" scoped>
   
</style>

```

</details>

## Single Article

Normally, you need to create a `[typeName].vue` inside `./src/templates` of your gridsome project.
and then add the query for the post details. 

 <details open>
 <summary><code>./src/templates/Article.vue</code></summary>

```vue
<template>
  <Layout>
     {{$page.article}}
  </Layout>
</template>

<page-query>
query Post($path: String!) {
    article(path: $path) {
       id
        title
        published_at
        description
        tag_list
        canonical_url
        cover_image
    }
}
</page-query>

<script>
  export default {

    data(){
      return {
        headings:NodeList
      } 
    },
    metaInfo() { 
      return {
        title: this.$page.article.title
      }
    },
  }
</script>

<style lang="scss" scoped>
  

</style>
```

 </details>


## TODO
- [x] Get posts
- [ ] Create pagination
- [ ] Refactor
- [ ] ADD NEW FEATURE HERE 


Feel free to use this plugin.

