import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';



@Injectable({
    providedIn: 'root'
})
export class AppSocket {
    private socket: WebSocket | null = null;
    public onMessage: Observable<any> = new Observable();

    constructor() {
    
        
    }

}