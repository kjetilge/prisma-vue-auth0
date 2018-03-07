<template>
  <div class="callback">...authenticating</div>
</template>

<script>
import gql from 'graphql-tag'
const AUTHENTICATE = gql`
    mutation authenticate($idToken: String!) {
        authenticate(idToken: $idToken) {
            id
            name
            email
        }
    }
`

export default {
  name: 'callback',
  mounted() {
    this.$auth.handleAuthentication().then((data) => {
      console.log('handleAuthentication callback data', data)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
