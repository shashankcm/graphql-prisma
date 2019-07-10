import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Link from './Link'

export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

class LinkList extends React.Component {
  _updateCacheAfterVote = (store, createVote, linkId) => {
    console.log('Called here')
    const data = store.readQuery({ query: FEED_QUERY })

    const votedLink = data.feed.links.find(link => link.id === linkId)
    votedLink.votes = createVote.link.votes

    store.writeQuery({ query: FEED_QUERY, data })
  }
  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (error) return <div>Error</div>
          if (loading) return <div>Fetching Data</div>
          const linksToBeRendered = data.feed.links
          return (
            <div>
              {linksToBeRendered.map((link, index) => (
                <Link
                  key={link.id}
                  link={link}
                  index={index}
                  updateStoreAfterVote={this._updateCacheAfterVote}
                />
              ))}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default LinkList
