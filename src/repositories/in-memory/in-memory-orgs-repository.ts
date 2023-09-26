import { Org, Prisma } from '@prisma/client'
import { IOrgsRepository } from '../i-orgs-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements IOrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      email: data.email,
      password_hash: data.password_hash,
      contact: data.contact,
      name: data.name,
      city: data.city,
      state: data.state,
      street: data.street,
      zip: data.zip,
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByStateCity({ state, city }: { state: string; city: string }) {
    const orgs = this.items.filter(
      (item) => item.state === state && item.city === city,
    )

    return orgs
  }
}
