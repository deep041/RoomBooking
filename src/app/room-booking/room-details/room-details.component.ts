import { Component, OnInit } from '@angular/core';
import { Bookings, BookRoomPayload, BookRoomResponse, Room } from 'src/interfaces/room.interface';
import { CommonService } from 'src/services/common.service';
import * as moment from 'moment';
import { SessionService } from 'src/services/session.service';
import { ApiService } from 'src/services/api.service';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectedTime, Time } from 'src/interfaces/time.interface';

@Component({
    selector: 'app-room-details',
    templateUrl: './room-details.component.html',
    styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {

    selectedRoom!: Room;
    selectedDate: Date = new Date();
    timeArray: Time[] = [];
    selectedTime: SelectedTime = { from: '', to: '' }
    datesToBeHighlighted: any = [];
    selectedTimeSlots: Time[] = [];

    constructor(private commonService: CommonService, private sessionService: SessionService, private api: ApiService, public snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.commonService.roomDetails.subscribe((details: Room) => {
            if (details) {
                this.selectedRoom = details;
                const groupedData = this.selectedRoom.bookings.reduce((acc: any, curr: any) => {
                    if (!acc[moment(curr.date).format('DD-MM-YYYY')]) {
                        acc[moment(curr.date).format('DD-MM-YYYY')] = [];
                    }
                    acc[moment(curr.date).format('DD-MM-YYYY')].push(curr);
                    return acc;
                }, {});

                this.datesToBeHighlighted = [];
                for (let data in groupedData) {
                    if (groupedData[data] && groupedData[data].length === 18) {
                        this.datesToBeHighlighted.push(moment(data, 'DD-MM-YYYY').format('YYYY-MM-DDTHH:mm:ss.SSSZ'));
                    }
                }

                this.dateClass();
                this.createTimeSlots();
            }
        });
    }

    createTimeSlots() {
        this.selectedTimeSlots = [];
        const start = new Date();
        start.setHours(10, 0, 0);
        this.timeArray = [];

        for (let i = 0; i < 18; i++) {
            let time: Time = {};
            time.from = start.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' });
            start.setMinutes(start.getMinutes() + 30);
            time.to = start.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' });

            let index = this.selectedRoom?.bookings.findIndex((data: Bookings) => ((time.from === data.from) && moment(this.selectedDate).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).isSame(moment(data.date).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }))));
            if (index != undefined && (index > -1)) {
                let sessionId = this.sessionService.getSessionId();
                if (this.selectedRoom.bookings[index].sessionId === sessionId) {
                    time.isOwnerSelected = true;
                }
                time.isSelected = true;
            }
            
            this.timeArray.push(time);
        }
    }

    selectTimeSlot(time: Time) {
        if (!time.isSelectionStarted) {
            time.isSelectionStarted = true;
            this.selectedTime.from = time.from;
            this.selectedTime.to = time.to;
            this.selectedTimeSlots.push(time);
        } else {
            time.isSelectionStarted = false;
            let index = this.selectedTimeSlots.findIndex((slots: Time) => slots.from === time.from);
            this.selectedTimeSlots.splice(index, 1);
        }
    }

    bookRoom() {
        let payload: BookRoomPayload[] = [];

        this.selectedTimeSlots.forEach((element: Time) => {
            if (element) {
                payload.push({
                    sessionId: this.sessionService.getSessionId(),
                    roomId: this.selectedRoom._id,
                    date: this.selectedDate,
                    from: element.from,
                    to: element.to
                })
            }
        });

        if (payload.length > 0) {
            this.api.bookRoom(payload).subscribe((res: BookRoomResponse) => {
                if (res) {
                    this.selectedTimeSlots = [];
                }
            });
        } else {
            this.snackBar.open('Please select time slot.', '', {
                duration: 3000,
                panelClass: 'custom-snackbar-error'
            });
        }
    }

    dateClass() {
        return (date: any): MatCalendarCellCssClasses => {
            const highlightDate = this.datesToBeHighlighted
                .map((strDate: any) => new Date(strDate))
                .some((d: any) =>
                    d.getDate() === date.getDate() &&
                    d.getMonth() === date.getMonth() &&
                    d.getFullYear() === date.getFullYear()
                );
            return highlightDate ? 'special-date' : '';
        };
    }

}
