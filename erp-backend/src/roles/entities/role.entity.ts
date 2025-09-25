import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 100 })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @CreateDateColumn({ name: 'data_criacao' })
  data_criacao: Date;

  @UpdateDateColumn({ name: 'data_atualizacao' })
  data_atualizacao: Date;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}