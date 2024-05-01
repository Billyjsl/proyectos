import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { Exercer } from '../models/products.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 private urlApi = "https://exercisedb.p.rapidapi.com/exercises";

  constructor(private http: HttpClient) { }
  private localStorageKey = 'data';
  private exercisesLocal: Exercer[] = [];
  private exercisesUpdated = new Subject<Exercer[]>();

  public getData(): Observable<any>{
    let headers = new HttpHeaders({
			'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
			'x-rapidapi-key': '4b6ef855a6msh99ddfcffc1c2b1ep190cf8jsn0cf494415ecc'
		});
    return this.http.get<any>(this.urlApi, {headers})
  }

  loadsExercises() {
    if (!this.exercisesLocal.length) {
      this.getData().subscribe(typeExercises => {
        this.exercisesLocal = typeExercises;
        this.saveLocalExercises();
        this.exercisesUpdated.next([...this.exercisesLocal]);
      });
    }
  }

  saveLocalExercises() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.exercisesLocal));
  }

  getLocalExercises() {
    const exercisesJson = localStorage.getItem(this.localStorageKey);
    return exercisesJson ? JSON.parse(exercisesJson) : [];
  }

  deleteProduct(exercisesToDelete: Exercer) {
    const isConfirmed = window.confirm(`¿Está seguro de querer eliminar el ejercicio "${exercisesToDelete.name}"?`);
    if (isConfirmed) {
      const index = this.exercisesLocal.findIndex(typeExercises => typeExercises.id === exercisesToDelete.id);
      if (index !== -1) {
        this.exercisesLocal.splice(index, 1);
        this.saveLocalExercises();
        this.exercisesUpdated.next([...this.exercisesLocal]);
      } else {
        alert('Book not found!');
      }
    } else {
      alert('Book deletion canceled!');
    }
  }

}

