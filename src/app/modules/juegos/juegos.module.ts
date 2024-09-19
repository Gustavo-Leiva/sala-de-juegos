import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { MayorMenorComponent } from './componentes/mayor-menor/mayor-menor.component';


@NgModule({
  declarations: [
    AhorcadoComponent,
    MayorMenorComponent,
    ChatComponent,
    PreguntadosComponent
  ],

  imports: [
    CommonModule,
    JuegosRoutingModule,
      
  ]
  
})
export class JuegosModule { }
