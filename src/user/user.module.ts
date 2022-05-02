import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { GQLAuthGuard } from './gql.authguard';
import { UserResolver } from './user.resolver';

import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // for JWT
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: 3600,
      },
    }),

    // for passport authentication and authorization
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    // for TypeORM dependency
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [],
  providers: [UserService, JwtStrategy],

  // to use these providers in the TaskModule
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
