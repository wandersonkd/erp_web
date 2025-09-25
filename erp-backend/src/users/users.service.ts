import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'senha_hash'>> {
    const { email, senha, nome } = createUserDto; // cargo is removed

    // RGN001: Check if email already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Este e-mail já está em uso.');
    }

    // RGN002: Hash the password
    const saltRounds = 10;
    const senha_hash = await bcrypt.hash(senha, saltRounds);

    // Create a new user entity
    const newUser = this.userRepository.create({
      nome,
      email,
      senha_hash,
      // By default, roleId will be null
    });

    // Save the new user
    const savedUser = await this.userRepository.save(newUser);

    const { senha_hash: _, ...result } = savedUser;
    return result;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    // Eagerly load the role relationship for JWT payload enrichment
    const user = await this.userRepository.findOne({ where: { email }, relations: ['role'] });
    return user || undefined;
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }
    return user;
  }

  /**
   * Assigns a role to a user.
   * RGN010: A user can only be associated with a role that exists.
   * @param userId The ID of the user.
   * @param roleId The ID of the role.
   * @returns The updated user, excluding the password hash.
   */
  async assignRoleToUser(userId: string, roleId: string): Promise<Omit<User, 'senha_hash'>> {
    const user = await this.findOneById(userId);
    const role = await this.rolesService.findOne(roleId); // Throws if not found

    user.role = role;
    const updatedUser = await this.userRepository.save(user);

    // The @Exclude decorator on the entity handles this for class-transformer responses,
    // but we explicitly remove it here to be safe.
    const { senha_hash: _, ...result } = updatedUser;
    return result;
  }
}