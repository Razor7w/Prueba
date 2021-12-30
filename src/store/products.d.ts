export interface Category {
  id: number
  nombre: string
  // eslint-disable-next-line camelcase
  created_at: string
  // eslint-disable-next-line camelcase
  updated_at: string
  // eslint-disable-next-line camelcase
  categoria_id?: number
}

export interface SubItem {
  id: number
  nombre: string
  cortes: string
  // eslint-disable-next-line camelcase
  created_at: string
  pivot: {
    // eslint-disable-next-line camelcase
    corte_id: number
    // eslint-disable-next-line camelcase
    producto_id: number
  }
  // eslint-disable-next-line camelcase
  updated_at: string
}

export interface Product {
  id: number
  nombre: string
  precio: number
  // eslint-disable-next-line camelcase
  cant_ingredientes: number
  // eslint-disable-next-line camelcase
  cant_piezas: number
  // eslint-disable-next-line camelcase
  cant_proteinas: number
  // eslint-disable-next-line camelcase
  created_at: string
  // eslint-disable-next-line camelcase
  updated_at: string
  pivot: {
    // eslint-disable-next-line camelcase
    categoria_id: number
    // eslint-disable-next-line camelcase
    producto_id: number
  }
  cortes?: Array<SubItem>
  ingredientes: Array<SubItem>
  proteinas: Array<SubItem>
  bases: Array<SubItem>
}

export interface BreadcrumbItem {
  nombre: string
  id: number
}

export interface ProductBuy {
  cant: number
  name: string
  total: number
}

export interface SelectedSubItem {
  selectedProtein: Array<string>
  productName: string
}
