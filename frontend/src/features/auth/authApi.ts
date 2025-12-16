import axiosClient from '@/service/axiosClient'

interface LoginPayLoad  {
    email: string;
    password: string;
}

export const loginApi = async (payload: LoginPayLoad) => {
    // payload la object {email, password}
    const res = await axiosClient.post("/auth/signin", payload);
    return res; //tra ve data tu backend
}