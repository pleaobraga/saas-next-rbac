import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility
} from '@casl/ability'
import z from 'zod'

import { User } from './models/user.js'
import { billingSubject } from './subjects/billing.js'
import { inviteSubject } from './subjects/invite.js'
import { organizationSubject } from './subjects/organization.js'
import { projectSubject } from './subjects/project.js'
import { userSubject } from './subjects/user.js'
import { PERMISSIONS } from './permissions.js'

export * from './models/organization.js'
export * from './models/project.js'
export * from './models/user.js'

const appAbilitiesSchema = z.union([
  userSubject,
  projectSubject,
  billingSubject,
  inviteSubject,
  organizationSubject,
  z.tuple([z.literal('manage'), z.literal('all')])
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilitiesFor(user: User) {
  const builder = new AbilityBuilder<AppAbility>(createAppAbility)

  if (typeof PERMISSIONS[user.role] !== 'function') {
    throw new Error(`No permissions defined for role: ${user.role}`)
  }

  PERMISSIONS[user.role](user, builder)

  const ability = builder.build({
    detectSubjectType: (item) => item.__tipename
  })

  return ability
}
