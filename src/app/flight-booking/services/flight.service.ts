import { Injectable, Inject} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {BASE_URL} from '../../app.tokens';
import {Observable} from 'rxjs';
import {Flight} from '../../entities/flight';
import {OAuthService} from 'angular2-oauth2/oauth-service';

@Injectable()
export class FlightService {

     constructor(
         private oauthService: OAuthService,
         private http: Http,
         @Inject(BASE_URL) private baseUrl: string
     ) {
     }

     findById(id: string): Observable<Flight> {

         // let url = this.baseUrl + '/api/flight';
         let url = '/data/flight.json';

         let headers = new Headers();
         headers.set('Accept', 'text/json');
         headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken());

         let search = new URLSearchParams();
         search.set('id', id);

        return this
            .http
            .get(url, {headers, search})
//            .delay(500)
            .map(resp => resp.json());

     }

     find(from: string, to: string) {

         // let url = this.baseUrl + '/api/flight';
         const url = 'src/data/flights.json';

         const headers = new Headers();
         headers.set('Accept', 'text/json');
         headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken());

         // this.oauthService.hasValidAccessToken();
         // this.oauthService.hasValidIdToken();

         let search = new URLSearchParams();
         search.set('from', from);
         search.set('to', to);

         return Observable.of([
           {
             "id": 12,
             "date": "2016-04-12T12:00",
             "from": "Graz",
             "to": "Hamburg"
           },
           {
             "id": 13,
             "date": "2016-04-14T12:00",
             "from": "Graz",
             "to": "Hamburg"
           },
           {
             "id": 14,
             "date": "2016-04-13T12:00",
             "from": "Graz",
             "to": "Hamburg"
           }


         ])

     }

}
