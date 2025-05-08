import { TransactionDetailsConfig, TransactionMasterConfig } from '@/pages/Global/TransactionConfig'
import { apiService } from './apiService'
import { Item } from '@/pages/Sales-Enquiry/Creation'

export const fetchTransactionsFromDB = async (type: number, setData: (value: any) => void) => {
  try {
    const response = await apiService.post(apiService.v1 + '/transaction-master/get-all', { transactionType: type })

    if (response) {
      setData(response)
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchSingleTransactionForEdit = async (id: number, setTransaction: any, setActiveTab: any) => {
  try {
    const response = await apiService.get(apiService.v1 + '/transaction-master/get', { id: id })

    if (response) {
      setTransaction(response)
      setActiveTab('edit')
      return response
    } else {
      return
    }
  } catch (error) {
    console.log(error)
  }
}

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

export const fetchPendingFromDB = async (type: string | number, customerId: string | number, supplierId: string | number) => {
  try {
    if (!customerId && !supplierId) {
      return;
    }
    
    const response = await apiService.post(apiService.v1 + '/transaction-master/pending', { transactionType: type, customerID: customerId || null, supplierID: supplierId || null })

    if (response) {
      return response
    } else {
      return
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchReferenceFromDB = async (type: string | number) => {
  try {
    const response = await apiService.get(apiService.v1 + '/transaction-master/setup-info', { transactionType: type })

    if (response) {
      return response.againstTypes
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
    const references = await fetchReferenceFromDB(transactionType)
    const users = await fetchUsersFromDB()

    TransactionMasterConfig.forEach((field, i) => {
      if (field.id === 'transactionType') {
        TransactionMasterConfig[i].initialValue = transactionType;
      }

      switch (field.id) {
        case 'referenceID':
          if (references) {
            TransactionMasterConfig[i].options = references.map((item: { name: string, id: number }) => ({
              label: item.name,
              value: item.id,
            }));
          }
          break;

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

export const createTransactionInDb = async (values: { [key: string]: string | number | boolean }, items: Item[], setActiveTab: (value: string) => void, fetchData: () => void) => {
  try {
    const payload = {
      ...values,
      detail: items
    }

    const response = await apiService.post(apiService.v1 + '/transaction-master/save', payload)
    if (response) {
      fetchData()
      setActiveTab("listing")
      return response
    }
  } catch (error) {
    console.log(error)
  }
}

export const updateTransactionInDb = async (values: { [key: string]: string | number | boolean }, items: Item[], setActiveTab: (value: string) => void, setIsEditing: (value: boolean) => void, fetchData: () => void) => {
  try {
    const payload = {
      ...values,
      detail: items
    }

    const response = await apiService.post(apiService.v1 + '/transaction-master/update', payload)
    if (response) {
      fetchData()
      setActiveTab("listing")
      setIsEditing(false)
      return response
    }
  } catch (error) {
    console.log(error)
  }
}