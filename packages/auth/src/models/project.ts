import z from 'zod'

export const projectSchema = z.object({
  __tipename: z.literal('Project').default('Project'),
  id: z.string(),
  ownerId: z.string()
})

export type Project = z.infer<typeof projectSchema>
