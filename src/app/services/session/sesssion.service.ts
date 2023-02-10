import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
    private _prefix: string = 'elo_evt_'
    
    public put(key: string, value: any): void {
        localStorage.setItem(this._prefix + key, JSON.stringify(value));
    }
    
    public remove(key: string) {
        localStorage.removeItem(this._prefix + key);
    }

    public get<T>(key: string): T | null {
        const data = localStorage.getItem(this._prefix + key);

        if (data === null)
            return null;

        return <T> JSON.parse(data);
    }
}