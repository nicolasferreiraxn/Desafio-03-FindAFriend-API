import { makeFetchCitiesPetsUseCase } from '@/use-cases/factories/make-fetch-cities-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetBodySchema = z.object({
    page: z.number(),
    query: z.object({
      city: z.string(),
      state: z.string(),
      search: z.object({
        age: z.string().optional(),
        breed: z.enum(['DOG', 'CAT']).optional().default('DOG'),
        level_energy: z.number().optional(),
        level_cuddly: z.number().optional(),
        level_stature: z.number().optional(),
        species: z.string().optional(),
      }),
    }),
  })

  const params = fetchPetBodySchema.parse(request.body)

  const fetchPetCitiesStateUseCase = makeFetchCitiesPetsUseCase()

  const { pets } = await fetchPetCitiesStateUseCase.execute({
    ...params,
  })

  return reply.status(200).send({
    pets,
  })
}
