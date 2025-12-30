export const ROLES = {
    ADMIN: 'admin',
    PREMIUM: 'premium',
    BASIC: 'basic',
} as const

export type UserRole = (typeof ROLES)[keyof typeof ROLES]