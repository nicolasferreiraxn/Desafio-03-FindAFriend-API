import { Pet } from '@prisma/client'
import { IPetsRepository } from '@/repositories/i-pets-repository'
import { IOrgsRepository } from '@/repositories/i-orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface CreatePetUseCaseRequest {
  name: string
  age: string
  breed: 'DOG' | 'CAT'
  description: string
  level_cuddly: number
  level_energy: number
  level_stature: number
  species: string
  org_id: string
  requisites?: {
    description: string
  }[]
  photos?: {
    url: string
  }[]
}

interface CreatePetUseCaseResponse {
  pet: Pet & {
    photos: {
      url: string
    }[]
    requisites: {
      description: string
    }[]
  }
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: IPetsRepository,
    private orgsRepository: IOrgsRepository,
  ) {}

  async execute({
    name,
    age,
    breed,
    description,
    level_cuddly,
    level_energy,
    level_stature,
    species,
    org_id,
    photos,
    requisites,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      age,
      breed,
      description,
      level_cuddly,
      level_energy,
      level_stature,
      species,
      org_id,
    })

    if (requisites) {
      await this.petsRepository.addRequisites(pet.id, requisites)
    }

    if (photos) {
      await this.petsRepository.addPhotos(pet.id, photos)
    }

    return {
      pet: {
        ...pet,
        photos: photos || [],
        requisites: requisites || [],
      },
    }
  }
}
