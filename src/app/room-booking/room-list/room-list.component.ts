import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Bookings, Room, RoomListPayload, RoomListResponse } from 'src/interfaces/room.interface';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/common.service';
import { io } from "socket.io-client";
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit, OnChanges {

    @Input() searchValue: string = '';
    @Input() isProjector: boolean = false;
    @Input() isLargeScreen: boolean = false;
    @Input() isSound: boolean = false;
    @Input() capacity!: number;

    roomList: Room[] = [];
    selectedRoom!: Room;
    socket = io(environment.apiUrl, { transports: ['websocket'] });

    constructor(private api: ApiService, private commonService: CommonService) { }

    ngOnInit(): void {
        this.getRooms();

        this.socket.on('callListAPI', (data) => {
            if (data) {
                this.getRooms();
            }
        });
    }

    ngOnChanges() {
        this.getRooms()
    }

    getRooms() {
        let payload: RoomListPayload = {};
        this.searchValue ? payload.searchText = this.searchValue : payload.searchText = '';
        if (this.isLargeScreen) payload.isLargeScreen = true;
        if (this.isProjector) payload.isProjector = true;
        if (this.isSound) payload.isSound = true;
        if (this.capacity) payload.capacity = this.capacity;
        this.api.getRooms(payload).subscribe((data: RoomListResponse) => {
            if (data) {
                this.roomList = data.data;
                this.availabilityStatus();
                if (this.roomList.length > 0) {
                    if (!this.selectedRoom) {
                        this.selectedRoom = this.roomList[0];
                        this.commonService.roomDetails.next(this.selectedRoom);
                    } else {
                        this.commonService.roomDetails.next(this.roomList.filter((room: Room) => room._id === this.selectedRoom._id)[0]);
                    }
                }
            }
        })
    }

    selectRoom(room: Room) {
        this.selectedRoom = room;
        this.commonService.roomDetails.next(this.selectedRoom);
    }

    availabilityStatus() {
        let currentTime = moment();
        if (Number(moment().format('mm')) > 30) {
            currentTime.add(1, 'hours').set({ minutes: 0 })
        } else {
            currentTime.set({ minutes: 30 })
        }

        this.roomList.forEach((room: Room) => {
            if (room) {
                room.availability = 'Currently Available';
                room.bookings.forEach((booking: Bookings) => {
                    if (booking) {
                        if ((booking.from === currentTime.format('hh:mm A')) && (moment().format('DD-MM-YYYY') === moment(booking.date).format('DD-MM-YYYY'))) {
                            room.availability = 'Currently Unavailable';
                        }
                    }
                });
            }
        });
    }

}
