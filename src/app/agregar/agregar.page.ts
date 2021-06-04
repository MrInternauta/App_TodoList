import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaService } from '../services/lista.service';
import { Lista } from '../models/lista.model';
import { Actividad } from '../models/actividad.model';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  public lista: Lista
  nombreItem: string;
  constructor(private router: ActivatedRoute,
              public listaServices: ListaService,
              private alertController: AlertController,
              private toastController: ToastController
    ) {
    let idLista =  this.router.snapshot.paramMap.get('idLista');
    this.lista = this.listaServices.obtenerLista(idLista);
    console.log(this.lista);
   }

  ngOnInit() {
  }

  agregar(){
    if (this.nombreItem.length === 0) {
      return
    }
    const actividad = new Actividad(this.nombreItem);
    this.lista.item.push(actividad);
    this.listaServices.guardarStorage();
    this.nombreItem = '';
    console.log(this.nombreItem);
  }
  editar(lista:Lista, actividad: Actividad){
    console.log("Editar" ,lista, actividad );
    this.EditarActividad(actividad);
  }
  borrar(actividad: Actividad){
    this.lista.item = this.lista.item.filter(item => item !==  actividad);
    this.listaServices.guardarStorage();
    console.log("Eliminar", actividad);
  }
  cambiacheck(){
    const pendientes = this.lista.item.filter(item => item.completado == false).length;
    if (pendientes == 0) {
      this.lista.completada = true;
      this.lista.terminadaEn = new Date();
    } else {
      this.lista.completada = false;
      this.lista.terminadaEn = null;
    }
    this.listaServices.guardarStorage();
  }

/**
* @function EditarActividad
* @description Función sera ejecutada cuando el usuario le de click al boton editar
* Muestra una alerta donde solicita el nuevo nombre de la actividad
*/
async EditarActividad(actividad: Actividad) {
  let alerta = await this.alertController.create({
    header: "Editar actividad",
    inputs: [
      {
        type: "text",
        name: "titulo",
        placeholder: "Ingresar nombre de la actividad",
        value: actividad.descripcion
      }
    ],
    buttons: [
      {
        text: "Cancelar",
        role: "cancel"
      },
      {
        text: "Editar",
        handler: (data: any) => {
          let isValid: boolean = this.validInput(data);
          if (isValid) {
            let titulo = data.titulo;
            actividad.descripcion = titulo;
            this.listaServices.guardarStorage();
            this.presentToast('Lista editada correctamente!');
          }

        }
      }
    ]
  });
  await alerta.present();
  console.log("Click en el boton");
}

/**
   * @function validInput
   * @description Función realiza la validación del input
   * cuando no fue ingresado ningun valor manda false (y un toast) y en caso contrario manda true
   * @param { any } input al valor ingresado por el usuario
   * @returns { boolean }
   */
 validInput(input: any): boolean {
  if (input && input.titulo) {
    return true
  }
  this.presentToast("Debe ingresar un valor");
  return false;
}

 /**
* @function presentToast
* @description Función muestra un mensaje el cual fue pasado por parametro
* duración 2000 milisengundo
* @param { string } mensaje mensaje que se mostrar en el toast
*/
  async presentToast(mensaje: string) {
    let toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }


}
