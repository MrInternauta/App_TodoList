import { Actividad } from './actividad.model'
export class Lista {
  id: number;
  titulo: string;
  creadaEn: Date;
  terminadaEn: Date;
  completada: boolean;
  item: Actividad[];
  constructor(titulo: string){
    this.titulo = titulo;
    this.creadaEn = new Date();
    this.completada = false;
    this.item = [];
    this.id = new Date().getTime();
  }
}
