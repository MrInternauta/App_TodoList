import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ListaService } from '../services/lista.service';
import { Lista } from '../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public listaService: ListaService,
  ) { }


  /**
* @function AgregarLista
* @description Función sera ejecutada cuando el usuario le de click al boton agregar
* Muestra una alerta donde solicita el nombre de la lista
*/
  async AgregarLista() {
    let alerta = await this.alertController.create({
      header: "Agregar lista",
      inputs: [
        {
          type: "text",
          name: "titulo",
          placeholder: "Ingresar nombre de la lista"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Crear",
          handler: (data: any) => {
            let isValid: boolean = this.validInput(data);
            if (isValid) {
              let titulo = data.titulo;
              this.listaService.crearLista(titulo);
              this.presentToast('Lista creada correctamente!');
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
