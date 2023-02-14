import { api } from '../config/api'
import { AxiosResponse } from "axios";
import { ProfileResponseType } from '../types/profileType';

const getProfileById = (id: string): Promise<AxiosResponse<ProfileResponseType>> => {
    return api.get<ProfileResponseType>(`profiles/${id}`)
}

const AuthService = {
    getProfileById,
};

export default AuthService;
