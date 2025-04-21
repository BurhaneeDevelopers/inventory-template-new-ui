import { apiService } from './apiService'

export const fetchItemsFromDB = async () => {
  try {
    const response = await apiService.post(apiService.v1 + '/item/get-all', {})

    if (response) {
      return response
    } else {
      return
    }
  } catch (error) {
    console.log(error)
  }
}
