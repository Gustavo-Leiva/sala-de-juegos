import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../../services/chat.service';
import { AuthService } from '../../../../services/auth.service';
import { Mensaje } from '../models/mensajes';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{

  public mensajeNuevo : string = "";
  public fecha : Date = new Date();
  public mensaje : Mensaje = {
    emisor : "",
    fecha : "",
    texto : ""
  }
  public mensajesBD : Mensaje[] = [];
  isChatHidden: boolean = true;

 

  @ViewChild('chatBody')
  private chatBody: ElementRef | undefined;

  constructor(public auth : AuthService, public chat : ChatService){}
  
  
  // ngOnInit() {
  //   this.chat.obtenerChat().subscribe((respuesta) => {
  //     // Ordenar los mensajes por la fecha antes de asignarlos a mensajesBD
  //     this.mensajesBD = respuesta.sort((a, b) => {
  //       return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
  //     });
  //     this.desplazarAlFinal(); // Desplazar después de recibir los mensajes
  //   });
  // }

  ngOnInit() {
    this.chat.obtenerChat().subscribe((respuesta) => {
      // Convertir las fechas a un formato adecuado o usar una fecha por defecto en caso de error
      this.mensajesBD = respuesta.map((mensaje) => {
        let fechaConvertida: string;
        try {
          // Intentar convertir la fecha
          const fecha = new Date(mensaje.fecha);
          if (isNaN(fecha.getTime())) {
            // Si la fecha es inválida, asignar una por defecto o manejar el error
            fechaConvertida = "Fecha inválida";
          } else {
            fechaConvertida = this.formatDate(fecha); // Formatear la fecha correctamente
          }
        } catch (error) {
          // Si ocurre algún error, asignar una fecha por defecto
          fechaConvertida = "Fecha inválida";
        }
        
        return {
          ...mensaje,
          fecha: fechaConvertida, // Reemplazar la fecha con la fecha convertida o el mensaje de error
          emisor: mensaje.emisor || 'Usuario desconocido' // Mostrar emisor o valor por defecto si no existe
        };
      }).sort((a, b) => {
        // Ordenar por fecha si es posible
        return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
      });
  
      this.desplazarAlFinal(); // Desplazar después de recibir los mensajes
    });
  }
  



  EnviarMensaje() {
    if (this.mensajeNuevo !== "") {
      this.mensaje.emisor = this.auth.getUserEmail() ?? 'Usuario desconocido'; // Asigna un valor por defecto si es null
      this.mensaje.fecha = this.formatDate(this.fecha);
      this.mensaje.texto = this.mensajeNuevo;
      this.chat.agregarChat(this.mensaje);
      
       // Vaciar el cuadro de texto después de enviar el mensaje
      this.mensajeNuevo = "";
  
      
    }
  }
  


   formatDate(date: Date): string {
    // Obtener las partes de la fecha
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses en JavaScript son 0-indexados, por lo que sumamos 1.
    const year = date.getFullYear();

    // Formatear las partes de la fecha para que siempre tengan dos dígitos
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');

    // Construir la cadena final con el formato deseado
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${formattedDay}/${formattedMonth}/${year}`;
  }

  toggleChat() {
    if(this.isChatHidden == false){
      this.isChatHidden = true;
    }
    else
    {
      this.isChatHidden = false;
    }
  }

  ngAfterViewChecked() {
    if (this.chatBody) {
      this.desplazarAlFinal();
    }
  }

  private desplazarAlFinal() {
    if (this.chatBody) {
      const contenedor = this.chatBody.nativeElement;
      contenedor.scrollTop = contenedor.scrollHeight;
    }
  }

}


