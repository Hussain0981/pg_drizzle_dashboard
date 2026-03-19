import bcrypt from 'bcrypt';

export const generateOtp = (): number => {
    return Math.floor(1000 + Math.random() * 9000);
};

export const hashData = async (data: string | number): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(data.toString(), saltRounds);
};

export const compareData = async (plainData: string | number, hashedData: string): Promise<boolean> => {
    return await bcrypt.compare(plainData.toString(), hashedData);
};