import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Link from './Link'

/* class LinkList extends Component {
  render() {
    const linksToRender = [
      {
        id: '1',
        description: 'Prisma turns your database into a GraphQL API 😎',
        url: 'https://www.prismagraphql.com',
      },
      {
        id: '2',
        description: 'The best GraphQL client',
        url: 'https://www.apollographql.com/docs/react/',
      },
    ]

    return (
      <div>
        {linksToRender.map(link => (
          <Link key={link.id} link={link} />
        ))}
      </div>
    )
  }
}

export default LinkList */

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        url
        description
      }
    }
  }
`

const LinkList = () => {
  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data }) => {
        if (error) return <div>Error</div>
        if (loading) return <div>Fetching Data</div>
        const linksToBeRendered = data.feed.links
        return (
          <div>
            {linksToBeRendered.map(link => (
              <Link key={link.id} link={link} />
            ))}
          </div>
        )
      }}
    </Query>
  )
}

export default LinkList
