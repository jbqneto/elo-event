import { Injectable } from '@angular/core';

export enum SessionKeys {
    USER = 'user',
    MEMBERS = 'event-list'
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
    private _prefix: string = 'elo_evt_'
    
    public put(key: SessionKeys, value: any): void {
        localStorage.setItem(this._prefix + key, JSON.stringify(value));
    }
    
    public remove(key: SessionKeys) {
        localStorage.removeItem(this._prefix + key);
    }

    public clear() {
        this.remove(SessionKeys.USER);
        this.remove(SessionKeys.MEMBERS);
    }

    public get<T>(key: SessionKeys): T | null {
        const data = localStorage.getItem(this._prefix + key);

        if (data === null)
            return null;

        return <T> JSON.parse(data);
    }
}