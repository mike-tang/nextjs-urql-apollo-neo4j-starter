export const typeDefs = `

  type User {
    id: ID!
    givenName: String
    familyName: String
    username: String
  }

  type Query {
    usersBySubstring(substring: String): [User]
      @cypher(
        statement: "MATCH (u:User) WHERE u.name CONTAINS $substring RETURN u"
      )
  }

`