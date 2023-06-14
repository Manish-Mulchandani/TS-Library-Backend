import bcrypt from "bcrypt";

export const hashPassword = async(password:string):Promise<string> => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const comparePassword = async (password:string, hashedPassword:string):Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword)
}