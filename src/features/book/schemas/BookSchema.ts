import { z } from 'zod'

export const BookSchema = z.object({
  purchasedAt: z.date(),
  price: z.number(),
  comment: z.string().optional()
})

export const BookNewSchema = z.object({
  purchasedAt: z.date(),
  price: z.number(),
  comment: z.string().optional(),
  book: z.object({
    title: z.string(),
    author: z.string().optional(),
    isbn: z.string().optional(),
    description: z.string().optional(),
    publisher: z.string().optional(),
    publicationYear: z.number().optional(),
    thumbnailLink: z.string().optional()
  })
})
