import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { RoomBookingRoutingModule } from './room-booking-routing.module';
import { RoomBookingComponent } from './room-booking.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        RoomBookingComponent,
        RoomListComponent,
        RoomDetailsComponent
    ],
    imports: [
        CommonModule,
        RoomBookingRoutingModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule
    ]
})
export class RoomBookingModule { }
