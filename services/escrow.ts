import { paramsObjectToQueryString } from "../utils/functions";
import { createApiClient } from "./api";



export const EscrowServices= {
    createEscrow: (payload: any) => createApiClient().post("/escrow", payload),
    getEscrow: (payload:any) => createApiClient().get(`/escrow${paramsObjectToQueryString(payload)}`)
}