import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'senha_hash'>> {
    const { email, senha, nome, cargo } = createUserDto;

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
      cargo,
      // RGN004: 'ativo' defaults to true in the entity definition
    });

    // Save the new user
    const savedUser = await this.userRepository.save(newUser);

    // TypeORM's save method returns the entity, but we'll manually omit the hash
    // The @Exclude decorator on the entity also handles this for class-transformer
    const { senha_hash: _, ...result } = savedUser;
    return result;
  }
}