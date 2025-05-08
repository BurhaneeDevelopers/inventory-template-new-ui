import { apiService } from './apiService'

export const printService = {
    GetTransactionById
}

async function GetTransactionById(id: number) {
    try {
        const response = await apiService.get(apiService.v1 + '/transaction-master/print', { id: id })
        if (response) {
            return response
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
    }
}
