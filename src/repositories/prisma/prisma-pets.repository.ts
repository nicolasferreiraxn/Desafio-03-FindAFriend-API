import { Prisma } from '@prisma/client'
import {
  IPetsRepository,
  Photos,
  Requisites,
  SearchQuery,
} from '../i-pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements IPetsRepository {
  async create({
    org_id,
    name,
    age,
    breed,
    description,
    level_cuddly,
    level_energy,
    level_stature,
    species,
  }: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data: {
        org_id,
        name,
        age,
        breed,
        description,
        level_cuddly,
        level_energy,
        level_stature,
        species,
      },
    })

    return pet
  }

  async addRequisites(petId: string, requisites: Requisites[]) {
    const requisitesData = requisites.map((item) => ({
      description: item.description,
      pet_id: petId,
    }))

    await prisma.requisite.createMany({
      data: requisitesData,
    })
  }

  async addPhotos(petId: string, photos: Photos[]) {
    const photosData = photos.map((item) => ({
      url: item.url,
      pet_id: petId,
    }))

    await prisma.photo.createMany({
      data: photosData,
    })
  }

  async findBySearchQuery(query: SearchQuery) {
    const pets = await prisma.pet.findMany({
      where: {
        AND: [
          query.search.age ? { age: query.search.age } : {},
          query.search.breed ? { breed: query.search.breed } : {},
          query.search.level_energy
            ? { level_energy: query.search.level_energy }
            : {},
          query.search.level_cuddly
            ? { level_cuddly: query.search.level_cuddly }
            : {},
          query.search.level_stature
            ? { level_stature: query.search.level_stature }
            : {},
          query.search.species ? { species: query.search.species } : {},
        ],
      },
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }
}
