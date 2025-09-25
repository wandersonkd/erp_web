import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * This method is called after the token has been verified.
   * The payload is the decoded JWT.
   * @param payload - The decoded JWT payload.
   * @returns The user entity if found and active.
   */
  async validate(payload: { sub: string; email: string }): Promise<Omit<User, 'senha_hash'>> {
    const user = await this.usersService.findOneByEmail(payload.email);

    if (!user || !user.ativo) {
      throw new UnauthorizedException('Acesso negado.');
    }

    // The user object returned here will be injected into the request object
    const { senha_hash, ...result } = user;
    return result;
  }
}