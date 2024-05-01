import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import { Exercer } from '../models/products.models';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css',
  standalone: true,
  imports: [MatTableModule, MatIconModule,MatTooltipModule,CommonModule,MatExpansionModule], 
})
export class ExercisesComponent implements OnInit  {

  public dataSource = [];
  panelOpenState = false;

  data: any[] = [];

  constructor(private apiService: ApiService){ }

  ngOnInit(): void {
    this.listaData()
  }

  listaData(){
    this.apiService.loadsExercises()
    this.apiService.getData().subscribe(data => {
      this.data = data;
      this.dataSource = data;
    })
  }

  deleteExercise(exercisesToDelete: Exercer) {
    this.apiService.deleteExercise(exercisesToDelete);
    this.data = this.apiService.getLocalExercises();
  }


}