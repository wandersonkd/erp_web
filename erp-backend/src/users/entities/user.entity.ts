import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  nome: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ name: 'senha_hash', length: 255 })
  @Exclude() // Prevents sending this field in responses
  senha_hash: string;

  @Column({ length: 100, nullable: true })
  cargo: string;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn({ name: 'data_criacao' })
  data_criacao: Date;

  @UpdateDateColumn({ name: 'data_atualizacao' })
  data_atualizacao: Date;
}