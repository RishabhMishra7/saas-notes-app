import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    tenantId: string;
  };
}

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
  tenantId: string;
}
