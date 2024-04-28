import { Component } from '@angular/core';
import { CommonService } from 'src/services/common.service';
import { SessionService } from 'src/services/session.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'roomBooking';

    constructor(private sessionService: SessionService, public commonService: CommonService) {
        this.sessionService.setSession();
    }
}
