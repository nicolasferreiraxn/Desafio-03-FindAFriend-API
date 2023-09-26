import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetUseCase } from './fetch-cities-pets'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: FetchPetUseCase

describe('Fetch Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()

    sut = new FetchPetUseCase(petsRepository, orgsRepository)
  })

  it('should be possible to find pets in the city of the state', async () => {
    const org = await orgsRepository.create({
      name: 'Petdreams',
      city: 'Assis',
      contact: '18945781299',
      email: 'petdreams@mail.com',
      password_hash: await hash('123456', 6),
      state: 'SP',
      street: 'Rua bertoncini, 455',
      zip: '12345-000',
    })

    await petsRepository.create({
      name: 'Bolinha',
      age: 'BABY',
      breed: 'DOG',
      description: 'Cachorro muito brincalhão',
      level_cuddly: 1,
      level_energy: 1,
      level_stature: 1,
      species: 'Poodle',
      org_id: org.id,
    })

    const { pets } = await sut.execute({
      page: 1,
      query: {
        city: 'Assis',
        state: 'SP',
        search: {
          age: 'BABY',
          breed: 'DOG',
          level_energy: 1,
          level_cuddly: 1,
          level_stature: 1,
          species: 'Poodle',
        },
      },
    })

    expect(pets).toHaveLength(1)
  })

  it('should be possible to find pets by species', async () => {
    const org = await orgsRepository.create({
      name: 'Petdreams',
      city: 'Assis',
      contact: '18945781299',
      email: 'petdreams@mail.com',
      password_hash: await hash('123456', 6),
      state: 'SP',
      street: 'Rua bertoncini, 455',
      zip: '12345-000',
    })

    await petsRepository.create({
      name: 'Bolinha',
      age: 'BABY',
      breed: 'DOG',
      description: 'Cachorro muito brincalhão',
      level_cuddly: 1,
      level_energy: 1,
      level_stature: 1,
      species: 'Poodle',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Jordan',
      age: 'BABY',
      breed: 'DOG',
      description: 'Cachorro muito brincalhão',
      level_cuddly: 1,
      level_energy: 1,
      level_stature: 1,
      species: 'Border Collie',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Apolo',
      age: 'BABY',
      breed: 'DOG',
      description: 'Cachorro muito brincalhão',
      level_cuddly: 1,
      level_energy: 1,
      level_stature: 1,
      species: 'Pitbull',
      org_id: org.id,
    })

    const { pets } = await sut.execute({
      page: 1,
      query: {
        city: 'Assis',
        state: 'SP',
        search: {
          age: 'BABY',
          breed: 'DOG',
          level_energy: 1,
          level_cuddly: 1,
          level_stature: 1,
          species: 'Pitbull',
        },
      },
    })

    expect(pets).toHaveLength(1)
  })

  it('should be possible to find pets by stature', async () => {
    const org = await orgsRepository.create({
      name: 'Petdreams',
      city: 'Assis',
      contact: '18945781299',
      email: 'petdreams@mail.com',
      password_hash: await hash('123456', 6),
      state: 'SP',
      street: 'Rua bertoncini, 455',
      zip: '12345-000',
    })

    await petsRepository.create({
      name: 'Bolinha',
      age: 'BABY',
      breed: 'DOG',
      description: 'Cachorro muito brincalhão',
      level_cuddly: 1,
      level_energy: 1,
      level_stature: 1,
      species: 'Poodle',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Jordan',
      age: 'BABY',
      breed: 'DOG',
      description: 'Cachorro muito brincalhão',
      level_cuddly: 1,
      level_energy: 1,
      level_stature: 1,
      species: 'Border Collie',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Apolo',
      age: 'BABY',
      breed: 'DOG',
      description: 'Cachorro muito brincalhão',
      level_cuddly: 1,
      level_energy: 1,
      level_stature: 2,
      species: 'Pitbull',
      org_id: org.id,
    })

    const { pets } = await sut.execute({
      page: 1,
      query: {
        city: 'Assis',
        state: 'SP',
        search: {
          age: 'BABY',
          breed: 'DOG',
          level_energy: 1,
          level_cuddly: 1,
          level_stature: 2,
          species: 'Pitbull',
        },
      },
    })

    expect(pets).toHaveLength(1)
  })

  it('should be possible not to find a pet', async () => {
    const org = await orgsRepository.create({
      name: 'Petdreams',
      city: 'Assis',
      contact: '18945781299',
      email: 'petdreams@mail.com',
      password_hash: await hash('123456', 6),
      state: 'SP',
      street: 'Rua bertoncini, 455',
      zip: '12345-000',
    })

    await petsRepository.create({
      name: 'Bolinha',
      age: 'BABY',
      breed: 'DOG',
      description: 'Cachorro muito brincalhão',
      level_cuddly: 1,
      level_energy: 1,
      level_stature: 1,
      species: 'Poodle',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Jordan',
      age: 'BABY',
      breed: 'DOG',
      description: 'Cachorro muito brincalhão',
      level_cuddly: 1,
      level_energy: 1,
      level_stature: 1,
      species: 'Border Collie',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Apolo',
      age: 'BABY',
      breed: 'DOG',
      description: 'Cachorro muito brincalhão',
      level_cuddly: 1,
      level_energy: 1,
      level_stature: 2,
      species: 'Pitbull',
      org_id: org.id,
    })

    const { pets } = await sut.execute({
      page: 1,
      query: {
        city: 'Assis',
        state: 'SP',
        search: {
          age: 'BABY',
          breed: 'DOG',
          level_energy: 1,
          level_cuddly: 1,
          level_stature: 1,
          species: 'Sem raça definida',
        },
      },
    })

    expect(pets).toHaveLength(0)
  })

  it('should be possible to view all pets without a search key', async () => {
    const org = await orgsRepository.create({
      name: 'Petdreams',
      city: 'Assis',
      contact: '18945781299',
      email: 'petdreams@mail.com',
      password_hash: await hash('123456', 6),
      state: 'SP',
      street: 'Rua bertoncini, 455',
      zip: '12345-000',
    })

    await petsRepository.create({
      name: 'Bolinha',
      age: 'BABY',
      breed: 'DOG',
      description: 'Cachorro muito brincalhão',
      level_cuddly: 1,
      level_energy: 4,
      level_stature: 1,
      species: 'Poodle',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Jordan',
      age: 'BABY',
      breed: 'DOG',
      description: 'Cachorro muito brincalhão',
      level_cuddly: 3,
      level_energy: 1,
      level_stature: 2,
      species: 'Border Collie',
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Apolo',
      age: 'BABY',
      breed: 'DOG',
      description: 'Cachorro muito brincalhão',
      level_cuddly: 1,
      level_energy: 1,
      level_stature: 4,
      species: 'Pitbull',
      org_id: org.id,
    })

    const { pets } = await sut.execute({
      page: 1,
      query: {
        city: 'Assis',
        state: 'SP',
        search: {},
      },
    })

    expect(pets).toHaveLength(3)
  })
})
