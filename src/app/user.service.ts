import { Injectable, EventEmitter } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UserService{
    activatedEmit = new EventEmitter<boolean>();
}
