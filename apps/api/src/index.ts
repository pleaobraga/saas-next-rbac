import { defineAbilitiesFor } from '@repo/auth'

const ability = defineAbilitiesFor({ role: 'MEMBER', id: 'test' })

const userCanInvite = ability.can('invite', 'User')

console.log('User can invite:', userCanInvite)
