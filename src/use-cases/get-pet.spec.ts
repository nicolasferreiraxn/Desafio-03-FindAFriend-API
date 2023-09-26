import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetUseCase } from './get-pet'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetUseCase

describe('Get Pet', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()

    sut = new GetPetUseCase(petsRepository)
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

    const pet = await petsRepository.create({
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

    const getPetResponse = await sut.execute({
      pet_id: pet.id,
    })

    expect(getPetResponse.pet.id).toEqual(expect.any(String))
  })
})
