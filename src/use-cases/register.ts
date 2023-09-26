import { IOrgsRepository } from '@/repositories/i-orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/orgazination-already-exists'

interface RegisterUseCaseRequest {
  email: string
  password: string
  name: string
  contact: string
  street: string
  city: string
  state: string
  zip: string
}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(private orgsRepository: IOrgsRepository) {}

  async execute({
    email,
    password,
    name,
    contact,
    street,
    city,
    state,
    zip,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const findOrg = await this.orgsRepository.findByEmail(email)

    if (findOrg) {
      throw new OrganizationAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      email,
      password_hash,
      contact,
      name,
      city,
      state,
      street,
      zip,
    })

    return {
      org,
    }
  }
}
