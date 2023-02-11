import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
    providedIn: 'root'
})
export class AppSocket {
    private socket: any;
    public onMessage: Observable<any> = new Observable();

    constructor() {
        this.socket = webSocket('wss://ws.postman-echo.com/raw');

        setTimeout(() => {
            this.socket.next({message: 'hello ELO'});
        }, 1000);

        console.log(this.socket);
 
        this.socket.subscribe({
            next: (msg: any) => window.alert('socket: ' + JSON.stringify(msg)), // Called whenever there is a message from the server.
            error: (err: any) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
            complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
        });
    }

}