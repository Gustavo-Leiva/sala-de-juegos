import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './componentes/mayor-menor/mayor-menor.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { CazadorComponent } from './componentes/cazador/cazador.component';
import { ResultadoComponent } from './componentes/resultado/resultado.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [

{ path: 'ahorcado',component:AhorcadoComponent},
{ path: 'mayor-menor',component:MayorMenorComponent},
{ path: 'preguntados',component:PreguntadosComponent},
{ path: 'chat',component:ChatComponent},
{ path: 'cazador',component:CazadorComponent},
{ path: 'resultado', component: ResultadoComponent }, // Agrega esta línea
{ path: 'encuesta',component:EncuestaComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ReactiveFormsModule]
})
export class JuegosRoutingModule { }
