import { Client } from './client'

export interface DetalleProductos {
  cant: number
  name: string
  total: number
}

export interface Comanda {
  id?: number
  // eslint-disable-next-line camelcase
  num_comanda: string
  // eslint-disable-next-line camelcase
  detalle_productos?: Array<DetalleProductos>,
  fecha?: string,
  estado?: number
  hora?: string
  obs?: string
  total?: number
  // eslint-disable-next-line camelcase
  cliente_id?: string
  // eslint-disable-next-line camelcase
  created_at?: string
  // eslint-disable-next-line camelcase
  updated_at?: string
  // eslint-disable-next-line camelcase
  metodo_pago?: string
  // eslint-disable-next-line camelcase
  hora_estimada_termino?: string
  num?: string
  check?: number
}

export interface GroupComanda {
  cliente: Client
  comanda: Comanda
}
