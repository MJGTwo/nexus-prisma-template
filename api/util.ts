import { sign } from 'jsonwebtoken';
import { prisma } from './services/prisma.service';
import { User } from '@prisma/client';

export const APP_SECRET = process.env.APP_SECRET || 'appsecret321';
export const EXPIRES = process.env.EXPIRES || '48h';

export class AuthError extends Error {}

export interface Token {
  userID: string;
  userType: string;
}

export const switchcase = <T>(cases: { [key: string]: T }) => <S>(defaultCase: S) => (key: string) =>
  Object.prototype.hasOwnProperty.call(cases, key) ? cases[key] : defaultCase;

export const getUserID = (token: any | null | undefined) => {
  const userID = token.userID;
  if (!userID) {
    throw new Error('Not Auithorized!!!');
  }
  return userID;
};

//one upper, one lower, one number, at least 8 characters long
export const passwordRequirement = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

//blackmagic email regex
export const emailRequirement = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createToken = async ({ user }: { user: User }) => {
  //add other goodies to the token here
  return sign({ userID: user.id, userType: user.type }, APP_SECRET, { expiresIn: EXPIRES });
};
