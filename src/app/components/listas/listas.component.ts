import { Component, Input, OnInit } from '@angular/core';
import { ListaService } from '../../services/lista.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @Input() tipo: string;
  constructor(public listaService: ListaService,
    public alertController: AlertController,
    public toastController: ToastController,
    private router: Router
    ) { }

  ngOnInit() {
  }
  /**
* @function EditarLista
* @description Función sera ejecutada cuando el usuario le de click al boton editar
* Muestra una alerta donde solicita el nuevo nombre de la lista
*/
  async EditarLista(lista: Lista) {
    let alerta = await this.alertController.create({
      header: "Editar lista",
      inputs: [
        {
          type: "text",
          name: "titulo",
          placeholder: "Ingresar nombre de la lista",
          value: lista.titulo
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
              lista.titulo = titulo;
              this.listaService.editarLista(lista);
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


  /**
   * @function editarLista
   * @description Función editar la lista selecionada
   * @param { Lista } listaItem lista a editar
   */
   editarLista(listaItem: Lista) {
    this.EditarLista(listaItem);
  }

  /**
   * @function borrarLista
   * @description Función eliminar la lista selecionada
   * @param { Lista } listaItem lista a eliminar
   */
  borrarLista(listaItem: Lista) {
    this.listaService.borrarLista(listaItem);
  }

  listaSeleccionada(listaItem: Lista){
    console.log(listaItem);
    const URL = '/agregar/'+listaItem.id; // /agregar/1622353956677
    this.router.navigateByUrl(URL);
  }
}
