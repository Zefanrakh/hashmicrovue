import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const databaseItems = ref([
    {
      id: 1,
      name: 'Finance & Accounting',
      price: 1000000,
      description:
        'Finance & Accounting module helps businesses streamline financial operations, automate accounting tasks, and generate accurate financial reports. It includes features for budgeting, invoicing, tax compliance, and cash flow management, ensuring businesses maintain a healthy financial status.',
      images: ['assets/fa1.jpg', 'assets/fa2.png', 'assets/fa3.jpg'],
    },
    {
      id: 2,
      name: 'Inventory & Warehouse Management',
      price: 1000000,
      description:
        'Inventory & Warehouse Management module allows businesses to efficiently track stock levels, manage warehouse operations, and automate inventory replenishment. With real-time tracking and reporting, businesses can reduce stock shortages and optimize storage space for improved supply chain efficiency.',
      images: [],
    },
    {
      id: 3,
      name: 'HR & Payroll',
      price: 1000000,
      description:
        'HR & Payroll module simplifies human resource management by automating payroll processing, employee attendance tracking, and performance evaluation. It ensures compliance with labor regulations and enhances workforce productivity by managing benefits, leaves, and employee records seamlessly.',
      images: [],
    },
    {
      id: 4,
      name: 'Finance & Accounting',
      price: 1000000,
      description:
        'Finance & Accounting module helps businesses streamline financial operations, automate accounting tasks, and generate accurate financial reports. It includes features for budgeting, invoicing, tax compliance, and cash flow management, ensuring businesses maintain a healthy financial status.',
      images: ['assets/fa1.jpg', 'assets/fa2.png', 'assets/fa3.jpg'],
    },
    {
      id: 5,
      name: 'Inventory & Warehouse Management',
      price: 1000000,
      description:
        'Inventory & Warehouse Management module allows businesses to efficiently track stock levels, manage warehouse operations, and automate inventory replenishment. With real-time tracking and reporting, businesses can reduce stock shortages and optimize storage space for improved supply chain efficiency.',
      images: [],
    },
    {
      id: 6,
      name: 'HR & Payroll',
      price: 1000000,
      description:
        'HR & Payroll module simplifies human resource management by automating payroll processing, employee attendance tracking, and performance evaluation. It ensures compliance with labor regulations and enhances workforce productivity by managing benefits, leaves, and employee records seamlessly.',
      images: [],
    },
    {
      id: 7,
      name: 'Finance & Accounting',
      price: 1000000,
      description:
        'Finance & Accounting module helps businesses streamline financial operations, automate accounting tasks, and generate accurate financial reports. It includes features for budgeting, invoicing, tax compliance, and cash flow management, ensuring businesses maintain a healthy financial status.',
      images: ['assets/fa1.jpg', 'assets/fa2.png', 'assets/fa3.jpg'],
    },
    {
      id: 8,
      name: 'Inventory & Warehouse Management',
      price: 1000000,
      description:
        'Inventory & Warehouse Management module allows businesses to efficiently track stock levels, manage warehouse operations, and automate inventory replenishment. With real-time tracking and reporting, businesses can reduce stock shortages and optimize storage space for improved supply chain efficiency.',
      images: [],
    },
    {
      id: 9,
      name: 'HR & Payroll',
      price: 1000000,
      description:
        'HR & Payroll module simplifies human resource management by automating payroll processing, employee attendance tracking, and performance evaluation. It ensures compliance with labor regulations and enhances workforce productivity by managing benefits, leaves, and employee records seamlessly.',
      images: [],
    },
    {
      id: 10,
      name: 'Finance & Accounting',
      price: 1000000,
      description:
        'Finance & Accounting module helps businesses streamline financial operations, automate accounting tasks, and generate accurate financial reports. It includes features for budgeting, invoicing, tax compliance, and cash flow management, ensuring businesses maintain a healthy financial status.',
      images: ['assets/fa1.jpg', 'assets/fa2.png', 'assets/fa3.jpg'],
    },
    {
      id: 11,
      name: 'Inventory & Warehouse Management',
      price: 1000000,
      description:
        'Inventory & Warehouse Management module allows businesses to efficiently track stock levels, manage warehouse operations, and automate inventory replenishment. With real-time tracking and reporting, businesses can reduce stock shortages and optimize storage space for improved supply chain efficiency.',
      images: [],
    },
    {
      id: 12,
      name: 'HR & Payroll',
      price: 1000000,
      description:
        'HR & Payroll module simplifies human resource management by automating payroll processing, employee attendance tracking, and performance evaluation. It ensures compliance with labor regulations and enhances workforce productivity by managing benefits, leaves, and employee records seamlessly.',
      images: [],
    },
    {
      id: 13,
      name: 'Finance & Accounting',
      price: 1000000,
      description:
        'Finance & Accounting module helps businesses streamline financial operations, automate accounting tasks, and generate accurate financial reports. It includes features for budgeting, invoicing, tax compliance, and cash flow management, ensuring businesses maintain a healthy financial status.',
      images: ['assets/fa1.jpg', 'assets/fa2.png', 'assets/fa3.jpg'],
    },
    {
      id: 14,
      name: 'Inventory & Warehouse Management',
      price: 1000000,
      description:
        'Inventory & Warehouse Management module allows businesses to efficiently track stock levels, manage warehouse operations, and automate inventory replenishment. With real-time tracking and reporting, businesses can reduce stock shortages and optimize storage space for improved supply chain efficiency.',
      images: [],
    },
    {
      id: 15,
      name: 'HR & Payroll',
      price: 1000000,
      description:
        'HR & Payroll module simplifies human resource management by automating payroll processing, employee attendance tracking, and performance evaluation. It ensures compliance with labor regulations and enhances workforce productivity by managing benefits, leaves, and employee records seamlessly.',
      images: [],
    },
  ])
  const items = ref([])
  const isLoading = ref(false)
  const limit = ref(4)
  const page = ref(1)
  const newlyAddedItem = ref(0)

  const fetchItems = async (refresh) => {
    if (!refresh && isLoading.value) return
    isLoading.value = true
    await new Promise((resolve) => {
      setTimeout(async () => {
        let start = (page.value - 1) * limit.value
        if (refresh) {
          const newItems = databaseItems.value
            .sort((a, b) => b.id - a.id)
            .filter((item) => !item.deleted_at)
            .slice(0, start + limit.value)
          items.value = [...newItems]
          newlyAddedItem.value = 0
        } else {
          const newItems = databaseItems.value
            .sort((a, b) => b.id - a.id)
            .filter((item) => !item.deleted_at)
            .slice(start, start + limit.value)
          items.value = [...items.value, ...newItems]
        }
        isLoading.value = false
        resolve()
      }, 1000)
    })
  }

  const addItem = async (newItem) => {
    isLoading.value = true
    await new Promise((resolve) => {
      setTimeout(async () => {
        databaseItems.value.push({
          id: Math.max(...databaseItems.value.map((item) => item.id)) + 1,
          ...newItem,
          images: newItem.images ? [...newItem.images] : [],
        })
        newlyAddedItem.value = 1
        await fetchItems(true)
        isLoading.value = false
        resolve()
      }, 1000)
    })
  }

  const updateItem = async (id, item) => {
    isLoading.value = true
    await new Promise((resolve) => {
      setTimeout(async () => {
        const databaseItemIndex = databaseItems.value.findIndex((item) => item.id === id)
        if (databaseItemIndex > -1) {
          databaseItems.value[databaseItemIndex] = {
            ...item,
            images: item.images ? [...item.images] : [],
          }
        }
        await fetchItems(true)
        isLoading.value = false
        resolve()
      }, 1000)
    })
  }

  const deleteItem = async (id) => {
    isLoading.value = true
    await new Promise((resolve) => {
      setTimeout(async () => {
        const databaseItemIndex = databaseItems.value.findIndex((item) => item.id === id)
        databaseItems.value[databaseItemIndex].deleted_at = new Date()
        await fetchItems(true)
        isLoading.value = false
        resolve()
      }, 1000)
    })
  }

  const loadMore = async () => {
    if (!isLoading.value && page.value * limit.value < databaseItems.value.length) {
      page.value++
      await fetchItems()
    }
  }

  return { items, isLoading, limit, page, fetchItems, addItem, updateItem, deleteItem, loadMore }
})
