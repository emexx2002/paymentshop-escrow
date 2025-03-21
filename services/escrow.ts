import { paramsObjectToQueryString } from "../utils/functions";
import { createApiClient } from "./api";



export const EscrowServices= {
    createEscrow: (payload: any) => createApiClient().post("/escrow", payload),
    getEscrow: (payload:any) => createApiClient().get(`/escrow${paramsObjectToQueryString(payload)}`),
    getEscrowById: async (id:string) => {
        const response = await createApiClient().get(`/escrow/${id}`)
        return response.data
    },

    buyerCancelEscrow: (id:string) => createApiClient().patch(`/escrow/buyer/cancel/${id}`),
    sellerCancelOrAcceptEscrow: (id:string, payload:any) => createApiClient().patch(`/escrow/${id}`, payload),
    releaseEscrowPayment: (id:string) => createApiClient().patch(`/escrow/payment/${id}`),
    setEscrowDelivered: (id:string) => createApiClient().patch(`/escrow/status/${id}`),
    confirmPayment: (id:string) => createApiClient().patch(`/escrow/buyer/confirm/payment/${id}`),
}