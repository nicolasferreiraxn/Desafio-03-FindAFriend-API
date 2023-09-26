import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-user'

describe('Search Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pet by id', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Bolinha',
        age: '1',
        breed: 'DOG',
        description: 'Cachorro muito brincalhão',
        level_cuddly: 5,
        level_energy: 5,
        level_stature: 5,
        species: 'Pitbull',
        requisites: [
          {
            description: 'Ambiente com quintal',
          },
          {
            description: 'Não pode ter crianças',
          },
        ],
        photos: [],
      })

    const { body } = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Bolinha',
        age: '1',
        breed: 'DOG',
        description: 'Cachorro muito brincalhão',
        level_cuddly: 5,
        level_energy: 5,
        level_stature: 5,
        species: 'Pitbull',
        requisites: [
          {
            description: 'Ambiente com quintal',
          },
          {
            description: 'Não pode ter crianças',
          },
        ],
        photos: [],
      })

    const response = await request(app.server)
      .get(`/pets/${body.pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Bolinha',
      }),
    )
  })
})
