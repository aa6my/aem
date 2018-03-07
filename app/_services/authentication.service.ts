import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {

        let body = new URLSearchParams();
        body.set('email', username);
        body.set('password', password);
        
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        

        return this.http.post('http://52.76.7.57:3000/api/auth/login', body.toString(), options)
            .map(user => {

                console.log(user['success']);
                // login successful if there's a jwt token in the response
                if (user['success'] == true && user['token']) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    return user;
                } else {
                    alert('Username or password is incorrect');
                }

                
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}