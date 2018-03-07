<template lang="html">
  <div>
    <pre>{{$auth.user}}</pre>
    <div>feed {{feed}}</div>
    <button @click="$auth.logout()">Logout</button>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      id
      text
      title
      isPublished
    }
  }
`

export default {
  data () {
    return {
      feed: []
    }
  },
  apollo: {
    feed: {
      query: FEED_QUERY
    }
  },
  mounted () {
    // console.log('this apollo auth', this)
  }
}
</script>

<style lang="css" scoped>

.btn-primary {
  background: #468f65;
  border: 1px solid #468f65;
}
.card {
  text-decoration: none;
  color: #000;
}
</style>
