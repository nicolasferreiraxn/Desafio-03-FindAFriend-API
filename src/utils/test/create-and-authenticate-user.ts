import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      email: 'petland@gmail.com',
      password_hash: await hash('123456', 6),
      name: 'Pet Land',
      contact: '119751298',
      street: 'Rua angelo bertoncini, 455',
      city: 'Assis',
      state: 'SP',
      zip: '02912000',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'petland@gmail.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
