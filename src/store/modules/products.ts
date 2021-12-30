import router from '@/router'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { BreadcrumbItem, Category, Product, ProductBuy } from '../products'
// import { UserData, UserSubmit } from '../session'
import { api } from './api'
// import router from '@/router'

@Module({
  namespaced: true,
  name: 'ProductsModule',
  stateFactory: true
})
export default class ProductsModule extends VuexModule {
  itemsAutoComplete: Array<Category> = []
  parentCategory: Array<Category> = []
  subCategory: Array<Category> = []
  products: Array<Product> = []
  selectedCategory: BreadcrumbItem = { nombre: '', id: 0 }
  selectedSubCategory: BreadcrumbItem = { nombre: '', id: 0 }
  productBuy: Array<ProductBuy> = []
  loadingBoxes = true
  validarCaja = false
  btnLoadingRegisterBox = false
  valorInicialCaja = 0
  /**
   * Categorias Padres
   * Categorias
   * Productos
   */

  get getValorInicialCaja (): number {
    return this.valorInicialCaja
  }

  get getBtnLoadingRegisterBox (): boolean {
    return this.btnLoadingRegisterBox
  }

  get getValidarCaja (): boolean {
    return this.validarCaja
  }

  get getLoadingBoxes (): boolean {
    return this.loadingBoxes
  }

  get getProductBuy (): Array<ProductBuy> {
    return this.productBuy
  }

  get getSelectedCategory (): BreadcrumbItem {
    return this.selectedCategory
  }

  get getSelectedSubCategory (): BreadcrumbItem {
    return this.selectedSubCategory
  }

  get getItemsAutoComplete (): Array<Category> {
    return this.itemsAutoComplete
  }

  get getProducts (): Array<Product> {
    return this.products
  }

  get getParentCategory (): Array<Category> {
    return this.parentCategory
  }

  get getSubCategory (): Array<Category> {
    return this.subCategory
  }

  @Mutation
  changeValorInicialCaja (payload: number): void {
    this.valorInicialCaja = payload
  }

  @Mutation
  changeBtnLoadingRegisterBox (payload: boolean): void {
    this.btnLoadingRegisterBox = payload
  }

  @Mutation
  changeValidarCaja (payload: boolean): void {
    this.validarCaja = payload
  }

  @Mutation
  changeLoadingBoxes (payload: boolean): void {
    this.loadingBoxes = payload
  }

  @Mutation
  addProductBuy (payload: ProductBuy):void {
    this.productBuy.push(payload)
  }

  @Mutation
  delProductBuy (payload: ProductBuy): void {
    const editedIndex = this.productBuy.indexOf(payload)
    this.productBuy.splice(editedIndex, 1)
  }

  @Mutation
  resetProductBuy (): void {
    this.productBuy = []
  }

  @Mutation
  setProductBuy (payload: ProductBuy[]): void {
    this.productBuy = payload
  }

  @Mutation
  setSelectedCategory (payload: BreadcrumbItem): void {
    this.selectedCategory = payload
  }

  @Mutation
  setSelectedSubCategory (payload: BreadcrumbItem): void {
    this.selectedSubCategory = payload
  }

  @Mutation
  setItemsAutoComplete (payload: Array<Category>): void {
    this.itemsAutoComplete = payload
  }

  @Mutation
  setProducts (payload: Array<Product>): void {
    this.products = payload
  }

  @Mutation
  setSubCategory (payload: Array<Category>): void {
    this.subCategory = payload
  }

  @Mutation
  setParentCategory (payload: Array<Category>): void {
    this.parentCategory = payload
  }

  @Action
  getAllCategories (): void {
    this.context.commit('changeLoadingBoxes', true)
    api.get('categorias')
      .then(response => {
        // console.log(response)
        this.context.commit('setParentCategory', response.data)
        this.context.commit('setItemsAutoComplete', response.data)
        this.context.commit('setSelectedCategory', '')
        this.context.commit('setSelectedSubCategory', '')
      })
      .catch(() => {
        // if (error.response.status === 401) router.push('/login')
      })
      .finally(() => {
        // console.log('finally')
        this.context.commit('changeLoadingBoxes', false)
      })
  }

  @Action
  getProductsAndCategories (category: Category): void {
    const arrayProducts: Product[] = []
    this.context.commit('changeLoadingBoxes', true)
    api.get(`categoria/${category.id}/productos`)
      .then(async response => {
        this.context.commit('setParentCategory', [])
        this.context.commit('setSelectedCategory', { nombre: category.nombre, id: category.id })
        this.context.commit('setSelectedSubCategory', { nombre: '', id: 0 })
        this.context.commit('setSubCategory', response.data.subcategorias)
        // this.context.commit('setProducts', response.data.productos)
        if (response.data.productos) {
          for (const product in response.data.productos) {
            // console.log(response.data[product])
            await api.get(`producto/${response.data.productos[product].id}`)
              .then(response => {
                arrayProducts.push(response.data)
                // console.log(response.data)
              })
              .catch(error => {
                console.log(error)
              })
              .finally(() => {
                // console.log('finally')
              })
          }
        }
      })
      .catch(() => {
        // if (error.response.status === 401) router.push('/login')
      })
      .finally(() => {
        this.context.commit('setProducts', arrayProducts)
        this.context.commit('changeLoadingBoxes', false)
      })
  }

  @Action
  getProductsInSubCategory (category: Category): void {
    const arrayProducts: Product[] = []
    this.context.commit('changeLoadingBoxes', true)
    api.get(`subcategoria/${category.id}/productos`)
      .then(async response => {
        this.context.commit('setParentCategory', [])
        this.context.commit('setSelectedSubCategory', { nombre: category.nombre, id: category.id })
        this.context.commit('setSubCategory', [])
        for (const product in response.data) {
          // console.log(response.data[product])
          await api.get(`producto/${response.data[product].id}`)
            .then(response => {
              arrayProducts.push(response.data)
              // console.log(response.data)
            })
            .catch(error => {
              console.log(error)
            })
            .finally(() => {
              // console.log('finally')
            })
        }
      })
      .catch(() => {
        // if (error.response.status === 401) router.push('/login')
      })
      .finally(() => {
        this.context.commit('setProducts', arrayProducts)
        this.context.commit('changeLoadingBoxes', false)
      })
  }

  @Action
  getEstadoCuadrarCaja (): void {
    api.get('validar-cuadrar-caja')
      .then(response => {
        // Guardo el valor estado si la caja está validada para continuar
        this.context.commit('changeValidarCaja', response.data)
        // Si el valor retorna falso y no está en inicio, lo redirecciona a él.
        if (!(response.data) && !(router.currentRoute.fullPath === '/Inicio') && this.context.rootState.SessionModule.userData.role === 1) router.push('/Inicio')
      })
      .catch(() => {
        // if (error.response.status === 401) router.push('/login')
      })
      .finally(() => {
        //
      })
  }

  @Action
  setCuadrarCaja (valorCaja: number): void {
    this.context.commit('changeBtnLoadingRegisterBox', true)
    api.post('guardar-cuadrar-caja', {
      dinero_caja_inicial: valorCaja
    })
      .then(() => {
        this.context.commit('changeValidarCaja', true)
        router.push('/Caja')
      })
      .catch(() => {
        // if (error.response.status === 401) router.push('/login')
      })
      .finally(() => {
        this.context.commit('changeBtnLoadingRegisterBox', false)
      })
  }

  @Action
  setValorFinalCuadrarCaja (valorFinalCaja: number): void {
    // this.context.commit('changeBtnLoadingRegisterBox', true)
    api.post('guardar-cuadrar-caja', {
      dinero_caja_final: valorFinalCaja
    })
      .then(() => {
        this.context.commit('changeValidarCaja', false)
        if (this.context.rootState.SessionModule.userData.role === 1) {
          this.context.dispatch('SessionModule/logout', '', { root: true })
        } else {
          router.push('/Inicio')
        }
      })
      .catch(() => {
        // if (error.response.status === 401) router.push('/login')
      })
      .finally(() => {
        // this.context.commit('changeBtnLoadingRegisterBox', true)
      })
  }

  @Action
  getActualValorInicialCaja (): void {
    api.get('dinero-caja-inicial')
      .then(response => {
        // console.log(response.data)
        this.context.commit('changeValorInicialCaja', response.data)
        // this.context.commit('changeValidarCaja', response.data)
      })
      .catch(() => {
        // if (error.response.status === 401) router.push('/login')
      })
      .finally(() => {
        //
      })
  }
}
