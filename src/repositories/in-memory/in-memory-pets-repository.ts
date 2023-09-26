import {
  IPetsRepository,
  Photos,
  Requisites,
  SearchQuery,
} from '@/repositories/i-pets-repository'
import { Pet, Requisite, Prisma, Photo } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements IPetsRepository {
  public pets: Pet[] = []
  public requisites: Requisite[] = []
  public photos: Photo[] = []

  async create({
    name = '',
    age = '',
    breed = 'DOG',
    description = '',
    level_cuddly = 0,
    level_energy = 0,
    level_stature = 0,
    species = '',
    org_id,
  }: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name,
      description,
      species,
      breed,
      age,
      level_energy,
      level_cuddly,
      level_stature,
      org_id,
    }

    this.pets.push(pet)

    return pet
  }

  async addRequisites(petId: string, requisite: Requisites[]) {
    const requisites = requisite.map((item) => ({
      id: randomUUID(),
      description: item.description,
      pet_id: petId,
    }))

    this.requisites.push(...requisites)
  }

  async addPhotos(petId: string, photo: Photos[]): Promise<void> {
    const photos = photo.map((item) => ({
      id: randomUUID(),
      url: item.url,
      pet_id: petId,
    }))

    this.photos.push(...photos)
  }

  async findBySearchQuery(query: SearchQuery) {
    const pets = this.pets.filter((item) => {
      if (query.search.breed && item.breed !== query.search.breed) {
        return false
      }

      if (query.search.age && item.age !== query.search.age) {
        return false
      }

      if (
        query.search.level_cuddly &&
        item.level_cuddly !== query.search.level_cuddly
      ) {
        return false
      }

      if (
        query.search.level_energy &&
        item.level_energy !== query.search.level_energy
      ) {
        return false
      }

      if (
        query.search.level_stature &&
        item.level_stature !== query.search.level_stature
      ) {
        return false
      }

      if (query.search.species && item.species !== query.search.species) {
        return false
      }

      return true
    })

    return pets
  }

  async findById(id: string) {
    const pet = this.pets.find((item) => item.id === id)

    return pet || null
  }
}
