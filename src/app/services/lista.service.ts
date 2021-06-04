import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
@Injectable({
  providedIn: 'root'
})
export class ListaService {
  public listas: Lista[] = []; //Va almacenar las listas de listas
  constructor() {
    this.cargarStorage();
  }

  /**
   * @function crearLista
   * @description Función que guarda en arreglo de listas un nuevo objecto o una nueva lista apatir del nombre de la lista
   * @param { string } nombreLista el nombre de la lista
   */
  crearLista(nombreLista: string) {

    let ObjectoLista = new Lista(nombreLista);
    this.listas.push(ObjectoLista);
    this.guardarStorage();
    return ObjectoLista.id;
  }


  /**
   * @function guardarStorage
   * @description Función que guarda en el localstorage las listas
   */
  guardarStorage() {
    let stringListas: string = JSON.stringify(this.listas);
    localStorage.setItem('listas', stringListas);
  }

  /**
   * @function cargarStorage
   * @description Función realizar el cargado de la información de las listas
   */
  cargarStorage() {
    const listaStorage = localStorage.getItem('listas');
    if (listaStorage == null) {
      return this.listas = [];
    }
    let objListas = JSON.parse(listaStorage);
    this.listas = objListas;
  }

  /**
   * @function borrarLista
   * @description Función realizar la eliminación de una lista
   * @param {Lista} lista la lista a eliminar
   */
  borrarLista(lista: Lista) {
    let newLista = this.listas.filter((listaItem) => listaItem.id !== lista.id);
    this.listas = newLista;
    this.guardarStorage();
  }

  /**
   * @function editarLista
   * @description Función realizar edición de la lista pasada por parametro
   * @param {Lista} lista la lista a editar
   */
  editarLista(lista: Lista) {
    let MatchLista = this.listas.find((listaItem) => listaItem.id == lista.id);
    MatchLista.titulo = lista.titulo;
    this.guardarStorage();
  }

    /**
   * @function editarLista
   * @description Función realizar edición de la lista pasada por parametro
   * @param {Lista} lista la lista a editar
   */
    obtenerLista(idLista: string | number){
      const id = Number(idLista);
      return this.listas.find((itemLista)=>itemLista.id == id);
    }



}
