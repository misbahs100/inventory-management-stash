"use server"

import { unstable_noStore as noStore } from "next/cache"
import {
  psGetUserByEmail,
  psGetUserByEmailVerificationToken,
  psGetUserById,
  psGetUserByResetPasswordToken,
} from "@/db/prepared/auth.statements"
import { type User } from "@/db/schema"

export async function getUserById(id: string): Promise<User | null> {
  noStore()
  try {
    const [user] = await psGetUserById.execute({ id })
    return user || null
  } catch (error) {
    console.error(error)
    throw new Error("Error getting user by id")
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  noStore()
  try {
    const [user] = await psGetUserByEmail.execute({ email })
    console.log(typeof user)
    return user || null
  //   const user = {
  //     id: '123e4567-e89b-12d3-a456-426614174000',
  //     name: 'John',
  //     surname: 'Doe',
  //     username: 'johndoe',
  //     email: 'misbahuddins100@gmail.com',
  //     emailVerified: new Date('2023-10-10T10:00:00Z'), // or null if not verified
  //     emailVerificationToken: 'abcdefghijk1234567890',
  //     passwordHash: '$2a$10$EIXmWyMfX5oK1JXJP62NGuJ5cd3JfiYhx.W1Kmx1p3m/OewGQqW3G', // bcrypt hash
  //     resetPasswordToken: 'zyxwvutsrqponmlkjihg',
  //     resetPasswordTokenExpiry: new Date('2023-10-20T10:00:00Z'), // or null if not set
  //     image: 'https://example.com/profile.jpg',
  //     role: 'user' as "user" | "admin" | null, // or 'admin', or null
  //     createdAt: new Date('2023-01-01T10:00:00Z'),
  // };
  
  } catch (error) {
    console.error(error)
    throw new Error("Error getting user by email")
  }
}

export async function getUserByResetPasswordToken(
  resetPasswordToken: string
): Promise<User | null> {
  noStore()
  try {
    const [user] = await psGetUserByResetPasswordToken.execute({
      resetPasswordToken,
    })
    return user || null
  } catch (error) {
    console.error(error)
    throw new Error("Error getting user by reset password token")
  }
}

export async function getUserByEmailVerificationToken(
  emailVerificationToken: string
): Promise<User | null> {
  noStore()
  try {
    const [user] = await psGetUserByEmailVerificationToken.execute({
      emailVerificationToken,
    })
    return user || null
  } catch (error) {
    console.error(error)
    throw new Error("Error getting user by email verification token")
  }
}
