import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './Books/books.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'sqlite',
      database: 'library.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
  }),
    BooksModule,
    AuthModule,
    usersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
