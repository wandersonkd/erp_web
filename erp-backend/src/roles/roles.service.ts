import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  /**
   * Creates a new role.
   * RGN009: The name of a Role must be unique in the system.
   * @param createRoleDto - The data to create the role.
   * @returns The created role.
   * @throws {ConflictException} If a role with the same name already exists.
   */
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const existingRole = await this.roleRepository.findOne({
      where: { nome: createRoleDto.nome },
    });

    if (existingRole) {
      throw new ConflictException('A role with this name already exists.');
    }

    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  /**
   * Finds all roles.
   * @returns An array of all roles.
   */
  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  /**
   * Finds a single role by its ID.
   * @param id - The ID of the role to find.
   * @returns The found role.
   * @throws {NotFoundException} If the role with the given ID is not found.
   */
  async findOne(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role with ID "${id}" not found.`);
    }
    return role;
  }

  /**
   * Updates a role's data.
   * @param id - The ID of the role to update.
   * @param updateRoleDto - The data to update.
   * @returns The updated role.
   */
  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id); // findOne handles not found error

    // Check for name conflict if the name is being changed
    if (updateRoleDto.nome && updateRoleDto.nome !== role.nome) {
        const existingRole = await this.roleRepository.findOne({
            where: { nome: updateRoleDto.nome },
        });

        if (existingRole) {
            throw new ConflictException('A role with this name already exists.');
        }
    }

    const updatedRole = this.roleRepository.merge(role, updateRoleDto);
    return this.roleRepository.save(updatedRole);
  }

  /**
   * Removes a role.
   * @param id - The ID of the role to remove.
   */
  async remove(id: string): Promise<void> {
    const result = await this.roleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Role with ID "${id}" not found.`);
    }
  }
}