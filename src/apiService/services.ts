import { TransactionDetailsConfig, TransactionMasterConfig } from '@/pages/Global/TransactionConfig'
import { apiService } from './apiService'
import { Item } from '@/pages/Sales-Enquiry/Creation'

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

export const fetchDesignFromDB = async () => {
  try {
    const response = await apiService.post(apiService.v1 + '/design-master/get-all', {})

    if (response) {
      return response
    } else {
      return
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchCustomerFromDB = async () => {
  try {
    const response = await apiService.post(apiService.v1 + '/customer-master/get-all', {})

    if (response) {
      return response
    } else {
      return
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchSuppliersFromDB = async () => {
  try {
    const response = await apiService.post(apiService.v1 + '/supplier-master/get-all', {})

    if (response) {
      return response
    } else {
      return
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchUsersFromDB = async () => {
  try {
    const response = await apiService.post(apiService.v1 + '/user-master/get-all', {})

    if (response) {
      return response
    } else {
      return
    }
  } catch (error) {
    console.log(error)
  }
}


export const handleManipulateDropdown = async (transactionType: number, isPurchase?: boolean, isSales?: boolean) => {
  try {
    const items = await fetchItemsFromDB()
    const customers = await fetchCustomerFromDB()
    const suppliers = await fetchSuppliersFromDB()
    const users = await fetchUsersFromDB()

    TransactionMasterConfig.forEach((field, i) => {
      if (field.id === 'transactionType') {
        TransactionMasterConfig[i].initialValue = transactionType;
      }

      switch (field.id) {
        case 'customerID':
          if (customers) {
            TransactionMasterConfig[i].options = customers.map((item: { customer_Name: string, id: number }) => ({
              label: item.customer_Name,
              value: item.id,
            }));
            TransactionMasterConfig[i].hidden = isPurchase
          }
          break;

        case 'supplierID':
          if (suppliers) {
            TransactionMasterConfig[i].options = suppliers.map((item: { supplier_Name: string, id: number }) => ({
              label: item.supplier_Name,
              value: item.id,
            }));
            TransactionMasterConfig[i].hidden = isSales
          }
          break;

        case 'madeBy':
        case 'approvedBy':
          if (users) {
            TransactionMasterConfig[i].options = users.map((item: { name: string, id: number }) => ({
              label: item.name,
              value: item.id,
            }));
          }
          break;

        default:
          // Do nothing
          break;
      }
    });


    TransactionDetailsConfig.forEach((field, i) => {
      if (field.id == 'itemId' && items) {
        TransactionDetailsConfig[i].options = items.map((item: { itemName: string, id: number }) => ({ label: item.itemName, value: item.id }))
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export const createTransactionInDb = async (values: { [key: string]: string | number | boolean }, items: Item[], setActiveTab: (value: string) => void) => {
  try {
    const payload = {
      ...values,
      detail: items
    }

    const response = await apiService.post(apiService.v1 + '/transaction-master/save', payload)
    if (response) {
      setActiveTab("listing")
      return response
    }
  } catch (error) {
    console.log(error)
  }
}