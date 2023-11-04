import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Reservation } from 'src/app/models/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit{


  reservations:Reservation[] = [];
  
  ngOnInit(): void {
   this.reservations=this.reservationService.getReservations();
  }

  constructor(private reservationService: ReservationService)
  {

  }

  deleteReservation(id:string) 
  {
    this.reservationService.deleteReservation(id);
  }

}
