import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, pipe, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(
    private http: HttpClient
  ) {
  }

  getData(taskUrl: any) {
    return this.http.get<any>(taskUrl).pipe(
        catchError((error) => {
          alert(error.message);
          throw error;
        })
      );
  }
}
