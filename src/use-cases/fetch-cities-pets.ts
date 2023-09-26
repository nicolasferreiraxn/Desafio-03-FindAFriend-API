import { Pet } from '@prisma/client'
import { IPetsRepository } from '@/repositories/i-pets-repository'
import { IOrgsRepository } from '@/repositories/i-orgs-repository'

interface FetchPetUseCaseRequest {
  query: {
    city: string
    state: string
    search: {
      age?: string
      breed?: 'DOG' | 'CAT'
      level_energy?: number
      level_cuddly?: number
      level_stature?: number
      species?: string
    }
  }

  page: number
}

interface FetchPetUseCaseResponse {
  pets: Pet[]
}

export class FetchPetUseCase {
  constructor(
    private petsRepository: IPetsRepository,
    private orgsRepository: IOrgsRepository,
  ) {}

  async execute({
    query,
    page,
  }: FetchPetUseCaseRequest): Promise<FetchPetUseCaseResponse> {
    const orgs = await this.orgsRepository.findByStateCity({
      city: query.city,
      state: query.state,
    })

    const pets = await this.petsRepository.findBySearchQuery(query)

    const petsWithOrg = pets
      .filter((pet) => orgs.some((org) => org.id === pet.org_id))
      .slice((page - 1) * 10, page * 10)

    return {
      pets: petsWithOrg,
    }
  }
}
