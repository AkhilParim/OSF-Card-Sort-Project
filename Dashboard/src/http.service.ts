import { HttpClient } from '@angular/common/http';
import { Injectable, QueryList } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class HttpService {

    constructor(private http: HttpClient) { }

    getParticipationData() {
        return this.http.get(environment.apiEndPoint + 'participations/');
    }

    getCardsData() {
        return this.http.get(environment.apiEndPoint);
    }
}