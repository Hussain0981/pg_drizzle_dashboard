// src/middleware/auth/hasRole.ts
import { Request, Response, NextFunction } from 'express';
import { Role, ROLE_HIERARCHY } from '../types/roles';

// Exact role check
export function hasRole(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.session?.user?.role as Role;

    if (!userRole) {
      res.status(401).json({ error: 'Authenticated nahi ho' });
      return;
    }

    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).render('errors/403', {
        pageTitle: 'Access Denied',
        message: `Sirf ${allowedRoles.join(', ')} access kar sakta hai`,
      });
    }
  };
}

// Minimum role check (hierarchy based)
export function hasMinRole(minRole: Role) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.session?.user?.role as Role;

    if (!userRole) {
      res.status(401).json({ error: 'Authenticated nahi ho' });
      return;
    }

    const userLevel = ROLE_HIERARCHY[userRole] ?? 0;
    const minLevel  = ROLE_HIERARCHY[minRole] ?? 0;

    if (userLevel >= minLevel) {
      next();
    } else {
      res.status(403).render('errors/403', {
        pageTitle: 'Access Denied',
        message: `Kam se kam ${minRole} hona chahiye`,
      });
    }
  };
}