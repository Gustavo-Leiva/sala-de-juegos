import { Component, OnInit } from '@angular/core';
import { ResultadoService } from '../../../../services/resultado.service'; // Asegúrate de tener la ruta correcta
import { Resultado } from '../models/resultados';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resultado',
  standalone: false,
  // imports: [],
  templateUrl: './resultado.component.html',
  styleUrl: './resultado.component.css'
})
export class ResultadoComponent implements OnInit  {
  resultados: Resultado[] = []; // Array para almacenar los resultados

  constructor(private resultadoService: ResultadoService) {}

  ngOnInit(): void {
    // Obtener resultados al iniciar el componente
    this.resultadoService.obtenerResultados().subscribe(resultados => {
      this.resultados = resultados; // Almacenar los resultados obtenidos
    });
  }
}
