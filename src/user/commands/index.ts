import { CreateUserHandler } from "./create-user/create-user.handler";
import { DeleteUserHandler } from "./delete-user/delete-user.handler";
import { UpdateUserHandler } from "./udpate-user/update-user.handler";

export const CommandHandlers = [CreateUserHandler, DeleteUserHandler, UpdateUserHandler];