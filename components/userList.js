import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'urql'

const queryUsers = gql`
  query {
    User {
      id
      givenName
      familyName
      username
    }
  }
`

const UserList = () => {
  const [result] = useQuery({ 
    query: queryUsers
  })
  
  if (result.fetching || !result.data) {
    return null
  }
  if (result.error) {
    return null
  }

  return (
    <div className="user-list">
      {result.data.User.map(user => (
        <p key={user.id}>{user.givenName} {user.familyName}</p>
      ))}
    </div>
  )
}

export default UserList