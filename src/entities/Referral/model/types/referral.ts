import { User } from "@/entities/User"

export interface Referral {
    code: string
    count: number
}

export type ReferralFriend = Pick<User, 'username' | 'lastName' | 'firstName'> 
