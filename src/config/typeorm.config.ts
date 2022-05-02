import {TypeOrmModuleOptions} from '@nestjs/typeorm'


export const TypeORMConfiguration: TypeOrmModuleOptions={
    
    username: 'postgres' ,
    password: 'root',
    port: 5432,
    host: 'localhost',
    type: 'postgres',
    database:'User',
    entities : [__dirname + '/../**/*.entity.{ts,js}'] ,
    synchronize: true,


};