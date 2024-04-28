import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Room } from 'src/interfaces/room.interface';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    roomDetails = new Subject<Room>();
    isShowLoader: boolean = false;
    
    constructor() { }
}
