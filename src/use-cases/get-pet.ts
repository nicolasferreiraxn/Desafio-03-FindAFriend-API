import { Pet } from '@prisma/client'
import { IPetsRepository } from '@/repositories/i-pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface GetPetUseCaseRequest {
  pet_id: string
}

interface GetPetUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    pet_id,
  }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(pet_id)

    if (!pet) {
      console.log('pet not found')
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
