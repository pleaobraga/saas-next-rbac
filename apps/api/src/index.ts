import { defineAbilitiesFor } from '@repo/auth'

const ability = defineAbilitiesFor({ role: 'MEMBER' })

const userCanInvite = ability.can('invite', 'User')

console.log('User can invite:', userCanInvite)
