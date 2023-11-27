import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from '../reservation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {


  reservationForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private reservationService: ReservationService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]

    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.reservationService.getReservation(id).subscribe(reservation => {
        if (reservation)
          this.reservationForm.patchValue(reservation);
      })
    }
  }


  onSubmit(data: Reservation) {
    if (this.reservationForm.valid) {
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        this.reservationService.updateReservation(id, data).subscribe(()=>{console.log("Updated");
        });
      }
      else {
        this.reservationService.addReservation(data).subscribe(()=>{console.log("Added")});
      }

      this.router.navigate(['/list']);
    }
  }
}
