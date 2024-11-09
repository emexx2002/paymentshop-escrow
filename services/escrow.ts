import { createApiClient } from "./api";



export const EscrowServices= {
    createEscrow: (payload: any) => createApiClient(false).post("/escrow", payload)
}