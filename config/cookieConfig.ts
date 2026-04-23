// src/config/cookieConfig.ts
import { CookieOptions } from 'express';

const isProd = process.env.NODE_ENV === 'production';

// Normal user cookie
export const userCookieOptions: CookieOptions = {
  httpOnly: true,         
  secure: isProd,         
  sameSite: 'strict',     
  maxAge: 1000 * 60 * 60 * 24,  
};

// Super admin ke liye strict cookie
export const superAdminCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'strict',
  maxAge: 1000 * 60 * 60 * 2, 
  path: '/',
};

// Remember me cookie
export const rememberMeCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'strict',
  maxAge: 1000 * 60 * 60 * 24 * 30,
};