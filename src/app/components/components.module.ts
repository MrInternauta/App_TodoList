import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListasComponent } from './listas/listas.component';
import { PipeModule } from '../pipes/pipe.module';


@NgModule({
  declarations: [
    ListasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PipeModule
  ],
  exports: [
    ListasComponent
  ]
})
export class ComponentsModule { }
