import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function pet(request: FastifyRequest, reply: FastifyReply) {
  const getPetQuerySchema = z.object({
    id: z.string(),
  })

  const { id } = getPetQuerySchema.parse(request.params)

  const getPetUseCase = makeGetPetUseCase()

  const { pet } = await getPetUseCase.execute({
    pet_id: id,
  })

  return reply.status(200).send({
    pet,
  })
}
