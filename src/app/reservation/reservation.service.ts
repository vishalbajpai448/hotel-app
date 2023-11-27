import { Injectable, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService implements OnInit {

  constructor(private http: HttpClient)
  {

  }

  private apiUrl = 'http://localhost:3000';
 

  ngOnInit(): void {
  }

  private reservations : Reservation[] = [];

  //Crud

  getReservations(): Observable<Reservation[]>
  {
    return this.http.get<Reservation[]>(this.apiUrl + "/reservations");
  }

  getReservation(id: string): Observable<Reservation>
  {
    return this.http.get<Reservation>(this.apiUrl + "/reservations/"+id);
  }

  addReservation(reservation: Reservation): Observable<void>
  {
    return this.http.post<void>(this.apiUrl + "/reservations" , reservation);
  }

  deleteReservation(id: string):Observable<void>
  {
    return this.http.delete<void>(this.apiUrl +"/reservations/"+id);
  }

  updateReservation(id:string,updatedReservation: Reservation): Observable<void>
  {
    return this.http.put<void>(this.apiUrl + "/reservations/"+id , updatedReservation);

  }
}
