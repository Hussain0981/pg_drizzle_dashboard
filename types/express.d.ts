// src/types/express.d.ts
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: {
      id:    number;
      name:  string;
      email: string;
      role:  string;
    } | null;
    isSuperAdmin: boolean;
  }
}

declare module 'express' {
  interface Request {
    session: import('express-session').Session & 
             Partial<import('express-session').SessionData>;
  }
}