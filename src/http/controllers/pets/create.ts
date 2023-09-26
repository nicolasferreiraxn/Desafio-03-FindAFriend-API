import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    age: z.string(),
    breed: z.enum(['DOG', 'CAT']),
    description: z.string(),
    level_cuddly: z.number(),
    level_energy: z.number(),
    level_stature: z.number(),
    species: z.string(),
    photos: z.array(
      z.object({
        url: z.string(),
      }),
    ),
    requisites: z.array(
      z.object({
        description: z.string(),
      }),
    ),
  })

  const bodyCreatePet = createPetBodySchema.parse(request.body)

  const petCreateUseCase = makeCreatePetUseCase()

  const pet = await petCreateUseCase.execute({
    ...bodyCreatePet,
    org_id: request.user.sub,
  })

  return reply.status(200).send(pet)
}
