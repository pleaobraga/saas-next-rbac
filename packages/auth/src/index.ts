import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  ForcedSubject,
  MongoAbility
} from '@casl/ability'

import { User } from './models/user.js'
import { PERMISSIONS } from './permissions.js'

const actions = ['manage', 'invite', 'delete'] as const
const subjects = ['User', 'all'] as const
type AppAbilities = [
  (typeof actions)[number],
  (
    | (typeof subjects)[number]
    | ForcedSubject<Exclude<(typeof subjects)[number], 'all'>>
  )
]

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilitiesFor(user: User) {
  const builder = new AbilityBuilder<AppAbility>(createAppAbility)

  if (typeof PERMISSIONS[user.role] !== 'function') {
    throw new Error(`No permissions defined for role: ${user.role}`)
  }

  PERMISSIONS[user.role](user, builder)

  const ability = builder.build()

  return ability
}
