import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validates a user based on email and password.
   * @param email - The user's email.
   * @param pass - The user's plain text password.
   * @returns The user object without the password hash, or null if validation fails.
   */
  async validateUser(email: string, pass: string): Promise<Omit<User, 'senha_hash'> | null> {
    // RGN005: Find user by email
    const user = await this.usersService.findOneByEmail(email);

    // RGN006 & RGN007: Check if user exists, password matches, and user is active
    if (user && user.ativo && (await bcrypt.compare(pass, user.senha_hash))) {
      const { senha_hash, ...result } = user;
      return result;
    }

    return null;
  }

  /**
   * Generates a JWT access token for a given user.
   * @param user - The user object.
   * @returns An object containing the access token.
   */
  async login(user: Omit<User, 'senha_hash'>) {
    // RGN008: Generate JWT with user ID (sub) and email in the payload
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}