const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const uuid = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const pubsub = new PubSub()

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'


mongoose.set('useFindAndModify', false)

const MONGODB_URI = ''

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })



const typeDefs = gql`
  type Author {
    name: String
    born: Int
    bookCount: Int
    id: ID
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]
    id: ID!
  }
  
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    me: User
    allAuthors: [Author!]
    allBooks(
      author: String
      genre: String
     ): [Book!]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
      ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: () => Author.find({}),
    allBooks: (root, args) => {
      console.log('haetaan allBooks')
      console.log(args)
      if (args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate('author')
      } else {
        return Book.find({}).populate('author')
      }
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    bookCount: async (root) => {
      const books = await Book.find({ author: root.id })
      return books.length
    },
    id: (root) => root.id
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      console.log(args)
      let author = await Author.findOne({ name: args.author })
      console.log('author:', author)
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
          console.log('author saved')
        } catch (error) {
          console.log(error)
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      author = await Author.findOne({ name: args.author })
      console.log(author)
      const newBook = new Book({ ...args })
      console.log(author._id)
      newBook.author = author._id
      console.log(newBook)
      try {
        await newBook.save()
      } catch (error) {
        console.log(error)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      pubsub.publish('BOOK_ADDED',{bookAdded: newBook})
      return newBook
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      console.log(args)
      const author = await Author.findOne({ name: args.name })
      console.log(author)
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      console.log(author)

      try {
        await author.save()
      } catch (error) {
        console.log(error)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})