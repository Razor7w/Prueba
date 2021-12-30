export interface Ave {
  // eslint-disable-next-line camelcase
  img: string
  nombre: string
  prima: boolean
}

export interface AveApi {
  images: {
    main: string
  }
  name: {
    english: string
    latin: string
    spanish: string
  }
  sort: number
  uid: string
}
