import * as bcrypt from "bcrypt";
import { hash } from "crypto";

export const generateHash = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
}
