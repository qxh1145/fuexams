export const ROLES = {
    ADMIN: 'admin',
    PREMIUM: 'premium',
    BASIC: 'basic',
} as const
export const PAYMENT_STATUS = {
    PAID: 'Paid',
    PENDING: 'Pending',
    CANCELLED: 'Cancelled',
    FAILED: 'Failed'
}

export type UserRole = (typeof ROLES)[keyof typeof ROLES]
export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS]