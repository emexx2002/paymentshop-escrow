import { createApiClient } from "./api";




export const AuthServices = {
    register: (payload: any) => createApiClient(false).post("/account", payload),
    login: (payload: any) => createApiClient(false).post("/authenticate", payload),
}
