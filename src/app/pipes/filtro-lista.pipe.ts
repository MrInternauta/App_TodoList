import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroLista',
  pure: false // para detectar en otro componente
})
export class FiltroListaPipe implements PipeTransform {
  transform(listas: Lista[], tipo: string = 'por hacer'): Lista[] {
    console.log(listas);

    let lista = [];
    switch (tipo) {
      case 'por hacer':
        lista = listas.filter((itemLista)=>itemLista.completada == false && itemLista.item.filter((itemActividad)=> itemActividad.completado == true).length == 0)
        break;
      case 'haciendo':
        lista = listas.filter((itemLista)=>itemLista.completada == false && itemLista.item.filter((itemActividad)=> itemActividad.completado == true).length > 0)
        break;
      case 'terminado':
        lista = listas.filter((itemLista)=>itemLista.completada == true )
        break;
      default:
        lista = listas.filter((itemLista)=>itemLista.completada == false && itemLista.item.filter((itemActividad)=> itemActividad.completado == true).length == 0)
        break;
    }
    return lista;
  }

}
