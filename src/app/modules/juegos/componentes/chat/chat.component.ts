import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Mensaje } from '../models/mensajes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../../services/chat.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public mensajeNuevo: string = "";
  public mensaje: Mensaje = {
    emisor: "",
    fecha: "",
    texto: ""
  };
  public mensajesBD: Mensaje[] = [];
  isChatHidden: boolean = true;

  @ViewChild('chatBody') private chatBody: ElementRef | undefined;

  constructor(public auth: AuthService, public chat: ChatService) { }

  ngOnInit() {
    this.chat.obtenerChat().subscribe((respuesta) => {
      this.mensajesBD = respuesta.map((mensaje) => {
        const fecha = new Date(mensaje.fecha);
        const fechaConvertida = isNaN(fecha.getTime())
          ? "Fecha inválida"
          : this.formatDate(fecha);

        return {
          ...mensaje,
          fecha: fechaConvertida,
          emisor: mensaje.emisor || 'Usuario desconocido'
        };
      });

      this.mensajesBD.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
      this.desplazarAlFinal(); // Desplazar después de recibir los mensajes
    });
  }

  EnviarMensaje() {
    if (this.mensajeNuevo.trim() !== "") {
      this.mensaje.emisor = this.auth.getUserEmail() ?? 'Usuario desconocido';
      this.mensaje.fecha = this.formatDate(new Date());
      this.mensaje.texto = this.mensajeNuevo;

      this.chat.agregarChat(this.mensaje).then(() => {
        this.mensajesBD.push({
          ...this.mensaje,
          fecha: this.mensaje.fecha,
        });
        this.mensajeNuevo = "";
        this.desplazarAlFinal(); // Desplazar al final después de añadir el mensaje
      }).catch(err => {
        console.error("Error al enviar el mensaje: ", err);
      });
    }
  }

  formatDate(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${formattedDay}/${formattedMonth}/${year}`;
  }

  toggleChat() {
    this.isChatHidden = !this.isChatHidden;
  }

  ngAfterViewChecked() {
    this.desplazarAlFinal();
  }

  private desplazarAlFinal() {
    if (this.chatBody) {
      const contenedor = this.chatBody.nativeElement;
      contenedor.scrollTop = contenedor.scrollHeight;
    }
  }
}

