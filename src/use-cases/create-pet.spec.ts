import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'
import { ResourceNotFoundError } from './errors/resource-not-found'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()

    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should to create pet', async () => {
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

    const { pet } = await sut.execute({
      name: 'Bolinha',
      age: '1',
      breed: 'DOG',
      description: 'Cachorro muito brincalhão',
      level_cuddly: 5,
      level_energy: 5,
      level_stature: 5,
      species: 'Poodle',
      org_id: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not to create pet if org does not exists', async () => {
    await expect(
      sut.execute({
        name: 'Bolinha',
        age: '1',
        breed: 'DOG',
        description: 'Cachorro muito brincalhão',
        level_cuddly: 5,
        level_energy: 5,
        level_stature: 5,
        species: 'Poodle',
        org_id: 'org-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should to create pet with two photos', async () => {
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

    const { pet } = await sut.execute({
      name: 'Bolinha',
      age: '1',
      breed: 'DOG',
      description: 'Cachorro muito brincalhão',
      level_cuddly: 5,
      level_energy: 5,
      level_stature: 5,
      species: 'Poodle',
      org_id: org.id,
      photos: [
        {
          url: 'https://www.petlove.com.br/images/breeds/193436/profile/original/poodle-p.jpg?1532538271',
        },
        {
          url: 'https://www.petlove.com.br/images/breeds/193436/profile/original/poodle-p.jpg?1532538271',
        },
      ],
    })

    expect(pet.photos).toHaveLength(2)
  })

  it('should to create pet with two requisites', async () => {
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

    const { pet } = await sut.execute({
      name: 'Bolinha',
      age: '1',
      breed: 'DOG',
      description: 'Cachorro muito brincalhão',
      level_cuddly: 5,
      level_energy: 5,
      level_stature: 5,
      species: 'Poodle',
      org_id: org.id,
      requisites: [
        {
          description: 'Ambiente com quintal',
        },
        {
          description: 'Não pode ter crianças',
        },
      ],
    })

    expect(pet.requisites).toHaveLength(2)
  })
})
