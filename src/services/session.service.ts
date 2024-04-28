import { Injectable } from '@angular/core';
import { SessionResponse } from 'src/interfaces/session.interface';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    constructor(private api: ApiService) {
    }

    // generate random token 
    getToken() {
        let a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        let b = [];
        for (let i = 0; i < 32; i++) {
            let j: any = (Math.random() * (a.length - 1)).toFixed(0);
            b[i] = a[j];
        }

        return b.join("");
    }

    setSession() {
        let session = this.getSession();

        if (!session) {
            session = this.getToken();

            this.api.setSession({ session }).subscribe((res: SessionResponse) => {
                if (res && res.data._id) {
                    localStorage.setItem('session', session || '');
                    localStorage.setItem('sessionId', res.data._id)
                }
            })

        } else {
            this.api.getSessionDetails().subscribe((res: SessionResponse) => {
                if (res && res.data._id) {
                    localStorage.setItem('sessionId', res.data._id)
                }
            })
        }
    }

    getSession() {
        return localStorage.getItem('session');
    }

    getSessionId() {
        return localStorage.getItem('sessionId');
    }
}
