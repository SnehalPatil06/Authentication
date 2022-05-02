import { UseGuards } from "@nestjs/common";
import { Query ,Field, Mutation, Resolver, Args, InputType } from "@nestjs/graphql";
import { GetUser } from "./get.user.decorator";
import { GQLAuthGuard } from "./gql.authguard";
import { SigninResponse } from "./type/signin.response";
import { UserInput } from "./type/user.input";
import { UserType } from "./type/user.type";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Resolver((of)=>UserType)
export class UserResolver{

    constructor(private userService: UserService){}

    @Mutation((returns)=>(UserType))
    signup(@Args('input') input:UserInput){
        return this.userService.signup(input)
    }

    @Mutation((returns)=>SigninResponse)
    signin(@Args('input') input:UserInput){
        return this.userService.signin(input)
    }

    @Query((returns)=>(UserType))
    @UseGuards(GQLAuthGuard)
    getprofile(@GetUser() user:UserEntity){
        return user;
    }


}