import { Quote } from '~/server/models/Quote'

export default defineEventHandler(async (event) => {
  
  // fetch a random quote.
  const quote = await Quote.aggregate([
    { $sample: { size: 1 } }
  ])

  // if no quotes found, return an error.
  if (!quote || quote.length === 0) {
    return {
      success: false,
      error: 'No quotes found'
    }
  }

  // return the quote.
  return {
    success: true,
    quote: quote[0]
  }
})
