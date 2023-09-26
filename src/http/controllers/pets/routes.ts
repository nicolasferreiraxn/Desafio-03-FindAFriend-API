import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { search } from './search'
import { pet } from './pet'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/pets', create)
  app.post('/pets/search', search)

  app.get('/pets/:id', pet)
}
