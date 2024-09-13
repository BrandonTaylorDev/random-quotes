import mongoose from 'mongoose'

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  try {
    await mongoose.connect(`mongodb+srv://${config.private.database.user}:${config.private.database.pass}@monolith.ca8gy.mongodb.net/random-quotes?retryWrites=true&w=majority&appName=RandomQuotes`)
  } catch (err) {
    throw err
  }
})
