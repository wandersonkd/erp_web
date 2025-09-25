import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // TODO: Replace with your database host
      port: 3306,
      username: 'root', // TODO: Replace with your database username
      password: 'password', // TODO: Replace with your database password
      database: 'erp_db', // TODO: Replace with your database name
      entities: [User],
      synchronize: true, // DEV only: automatically creates schema. Disable in production.
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
