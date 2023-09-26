import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository'
import { FetchPetUseCase } from '../fetch-cities-pets'

export function makeFetchCitiesPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const useCase = new FetchPetUseCase(petsRepository, orgsRepository)

  return useCase
}
