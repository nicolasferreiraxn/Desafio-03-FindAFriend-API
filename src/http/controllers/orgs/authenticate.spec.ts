import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/organizations').send({
      email: 'petland@gmail.com',
      password: '123456',
      name: 'Pet Land',
      contact: '119751298',
      street: 'Rua angelo bertoncini, 455',
      city: 'Assis',
      state: 'SP',
      zip: '02912000',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'petland@gmail.com',
      password: '123456',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
