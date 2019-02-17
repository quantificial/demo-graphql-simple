const { buildSchema } = require('graphql');

exports.schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    author: User!
    title: String!
    body: String!
  }

  type Query {
    hello: String
    users: [User!]!
    posts: [Post!]!
    user(id: ID!): User
  }
`);

class GraphQLUser {
    constructor({ id, name }) {
      this.id = id;
      this.name = name;
    }
  
    posts() {
        return Object.keys(postsById)
            .map(id => new GraphQLPost(postsById[id]))
            .filter(post => post.authorId === this.id);
    }
}
  
class GraphQLPost {
    constructor({ id, authorId, title, body }) {
        this.id = id;
        this.authorId = authorId;
        this.title = title;
        this.body = body;
    }

    author() {
        return new GraphQLUser(usersById[this.authorId]);
    }
}

const usersById = {
    1: {
      id: 1,
      name: 'chentsulin',
    },
  };

  const postsById = {
    18: {
      id: 18,
      authorId: 1,
      title: 'Day 18：GraphQL 入門 Part I - 從 REST 到 GraphQL',
      body: 'Facebook 在 2012 年開始在公司內部使用 GraphQL，而在 2015 年 7 月開源...',
    },
    19: {
      id: 19,
      authorId: 1,
      title: 'Day 19：GraphQL 入門 Part II - 實作 Schema & Type',
      body: '前一篇講了 REST 的一些缺點，還有 GraphQL 如何解決這些問題...',
    },
  };

exports.rootValue = {
  hello: () => 'Hello world!',
  //users: () => Object.keys(usersById).map(id => usersById[id]),
  //posts: () => Object.keys(postsById).map(id => postsById[id]),
  users: () => Object.keys(usersById).map(
    id => new GraphQLUser(usersById[id])
  ),
  posts: () => Object.keys(postsById).map(
    id => new GraphQLPost(postsById[id])
  ),
  user: ({ id }) => usersById[id] ? new GraphQLUser(usersById[id]) : null,
};
