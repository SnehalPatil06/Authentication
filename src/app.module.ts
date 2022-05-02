import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver } from '@nestjs/apollo';

import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';


import { TypeORMConfiguration } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserRepository } from './user/user.repository';
import { JwtStrategy } from './user/jwt.strategy';
import { UserResolver } from './user/user.resolver';
import { UserInput } from './user/type/user.input';
import { GQLAuthGuard } from './user/gql.authguard';

@Module({
  imports: [  JwtModule.register({secret:'secret', signOptions:{expiresIn: 3600}}),
  PassportModule.register({defaultStrategy:'jwt'}),
  TypeOrmModule.forFeature([UserRepository]),
  UserModule,
  TypeOrmModule.forRoot(TypeORMConfiguration),
  GraphQLModule.forRoot({
    driver: ApolloDriver,
    autoSchemaFile: true,
  }),],
  controllers: [],
  providers: [UserService,JwtStrategy,UserResolver,UserInput,GQLAuthGuard],
})
export class AppModule {}
