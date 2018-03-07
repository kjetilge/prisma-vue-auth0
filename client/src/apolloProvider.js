import Vue from 'vue'

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import VueApollo from 'vue-apollo'


const url = 'localhost:4000' // or eu1.prisma.sh/username/service-name
const httpLink = new HttpLink({ uri: `http://${url}` }) //add extra s when using https
// ######### localhost does not use https/wss !! ############
const wsLink = new WebSocketLink({
  uri: `ws://${url}`, // add extra s when using wss
  options: {
    reconnect: true
  }
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

// apollo client setup
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: client,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

const provide = () => {return apolloProvider.provide()}

export {
  client,
  provide
}
