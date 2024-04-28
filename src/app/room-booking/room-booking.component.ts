import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-room-booking',
    templateUrl: './room-booking.component.html',
    styleUrls: ['./room-booking.component.scss']
})
export class RoomBookingComponent implements OnInit {

    search: string = '';
    isProjector: boolean = false;
    isLargeScreen: boolean = false;
    isSound: boolean = false;
    capacity!: number;

    constructor() { }

    ngOnInit(): void {
        
    }

}
