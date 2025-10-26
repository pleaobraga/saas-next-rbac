import { AbilityBuilder } from '@casl/ability'

import { User } from './models/user.js'
import { AppAbility } from './index.js'
import { Role } from './roles.js'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void

export const PERMISSIONS: Record<Role, PermissionsByRole> = {
  ADMIN(user, { can, cannot }) {
    can('manage', 'all')
    cannot(['transfer_ownership', 'update'], 'Organization')
    can(['transfer_ownership', 'update'], 'Organization', {
      ownerId: { $eq: user.id }
    })
  },
  MEMBER(user, { can }) {
    can('get', 'User')
    can(['create', 'get'], 'Project')
    can(['update', 'delete'], 'Project', { ownerId: { $eq: user.id } })
    can('create', 'Organization')
  },
  BILLING(_, { can }) {
    can('manage', 'Billing')
  }
}
