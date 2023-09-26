import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/orgazination-already-exists'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Organization Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should to register', async () => {
    const { org } = await sut.execute({
      name: 'Petdreams',
      city: 'Assis',
      contact: '18945781299',
      email: 'petdreams@mail.com',
      password: '123456',
      state: 'SP',
      street: 'Rua bertoncini, 455',
      zip: '12345-000',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'petdreams@mail.com'

    await sut.execute({
      name: 'Petdreams',
      city: 'Assis',
      contact: '18945781299',
      email,
      password: '123456',
      state: 'SP',
      street: 'Rua bertoncini, 455',
      zip: '12345-000',
    })

    await expect(() =>
      sut.execute({
        name: 'Petdreams',
        city: 'Assis',
        contact: '18945781299',
        email,
        password: '123456',
        state: 'SP',
        street: 'Rua bertoncini, 455',
        zip: '12345-000',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })

  it('should hash organization password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Petdreams',
      city: 'Assis',
      contact: '18945781299',
      email: 'petdreams@mail.com',
      password: '123456',
      state: 'SP',
      street: 'Rua bertoncini, 455',
      zip: '12345-000',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
