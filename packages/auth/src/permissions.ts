import { AbilityBuilder } from '@casl/ability'

import { User } from './models/user.js'
import { AppAbility } from './index.js'

type Roles = 'ADMIN' | 'MEMBER'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void

export const PERMISSIONS: Record<Roles, PermissionsByRole> = {
  ADMIN(_, builder) {
    const { can } = builder
    can('manage', 'all')
  },
  MEMBER(_, builder) {
    const { can } = builder
    can('invite', 'User')
  }
}
