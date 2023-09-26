import { OrganizationAlreadyExistsError } from '@/use-cases/errors/orgazination-already-exists'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
    contact: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
  })

  const { email, password, name, contact, street, city, state, zip } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      email,
      password,
      city,
      contact,
      name,
      state,
      street,
      zip,
    })
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }

  return reply.status(201).send()
}
