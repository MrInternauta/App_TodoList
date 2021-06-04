export class Actividad {
  descripcion: string;
  completado: boolean;
  constructor(titulo: string) {
    this.descripcion = titulo;
    this.completado = false;
  }
}
