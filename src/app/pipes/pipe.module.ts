import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroListaPipe } from './filtro-lista.pipe';



@NgModule({
  declarations: [FiltroListaPipe],
  imports: [
    CommonModule
  ],
  exports: [FiltroListaPipe]
})
export class PipeModule { }
