﻿import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { AmChartsModule } from "@amcharts/amcharts3-angular";

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    // template: `<div id="chartdiv" [style.width.%]="100" [style.height.px]="500"></div>`
})

export class HomeComponent implements OnInit {
    private chart: any;
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService, private http: HttpClient, private AmCharts: AmChartsService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     }

    ngOnInit() {
        this.loadAllUsers();
        this.http.get('http://52.76.7.57:3000/api/dashboard').subscribe(data => {
            this.chart = this.AmCharts.makeChart("donut", {
                "type": "pie",
                "theme": "light",
                "dataProvider": data['chartDonut'],
                "titleField": "country",
                "valueField": "litres",
                "labelRadius": 5,
              
                "radius": "42%",
                "innerRadius": "60%",
                "labelText": "[[title]]",
                "export": {
                  "enabled": true
                }
            });
        });
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}