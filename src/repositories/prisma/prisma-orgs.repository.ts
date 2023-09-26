import { Prisma } from '@prisma/client'
import { IOrgsRepository } from '../i-orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements IOrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }

  async findByStateCity({ state, city }: { state: string; city: string }) {
    const orgs = await prisma.org.findMany({
      where: {
        state,
        city,
      },
    })

    return orgs
  }
}
