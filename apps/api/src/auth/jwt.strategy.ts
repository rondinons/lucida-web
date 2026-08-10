import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

interface JwtPayload {
  sub: string; // usuarioId
  email: string;
}

// Valida el JWT de corta duración (HS256) que apps/web emite en
// apps/web/src/lib/api-client.ts con el mismo AUTH_SECRET. No es el cookie
// de sesión de Auth.js — ver comentario en ese archivo.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_SECRET!,
      algorithms: ["HS256"],
    });
  }

  validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email };
  }
}
