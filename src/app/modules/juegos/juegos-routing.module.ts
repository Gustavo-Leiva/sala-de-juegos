import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './componentes/mayor-menor/mayor-menor.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';

const routes: Routes = [

{ path: 'ahorcado',component:AhorcadoComponent},
{ path: 'mayor-menor',component:MayorMenorComponent},
{ path: 'preguntados',component:PreguntadosComponent},
{ path: 'chat',component:ChatComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
