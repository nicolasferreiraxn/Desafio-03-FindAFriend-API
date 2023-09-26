import { Pet, Prisma } from '@prisma/client'

export interface Requisites {
  description: string
}

export interface Photos {
  url: string
}

export interface SearchQuery {
  search: {
    age?: string
    breed?: 'DOG' | 'CAT'
    level_energy?: number
    level_cuddly?: number
    level_stature?: number
    species?: string
  }
}

export interface IPetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  addRequisites(petId: string, requisites: Requisites[]): Promise<void>
  addPhotos(petId: string, photos: Photos[]): Promise<void>
  findBySearchQuery(query: SearchQuery): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
