import { Org, Prisma } from '@prisma/client'

export interface IOrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findByEmail(email: string): Promise<Org | null>
  findById(id: string): Promise<Org | null>
  findByStateCity({
    state,
    city,
  }: {
    state: string
    city: string
  }): Promise<Org[]>
}
