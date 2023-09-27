import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
   inputFrom!: FormGroup;

   weatherData:any;
   weather:any;   // (description, and icon)
   temperature :any; //temperature
   location:any;
  constructor(public _FormBuilder: FormBuilder,private apiService :ApiServiceService) { }

  ngOnInit(): void {
   this.inputFrom = this._FormBuilder.group({
    city :['',Validators.required]
   })
  }
  
  submitForm(){
    let city = this.inputFrom.controls['city'].value;
    var apiKey= '1c999e5d0a13386f6d212e4b9c61944f';
    let url = 'http://api.openweathermap.org/geo/1.0/direct?q='+ city +'&limit='+5+'&appid='+apiKey
     this.apiService.getData(url).subscribe((data: any) => {
       this.location = data;
       this.getWeather();
    })
  }

  getWeather(){
    var apiKey= '1c999e5d0a13386f6d212e4b9c61944f';
    let url = 'https://api.openweathermap.org/data/2.5/weather?lat='+this.location[0].lat+'&lon='+this.location[0].lon +'&appid='+apiKey
     this.apiService.getData(url).subscribe((data: any) => {
       this.weatherData = data;
       this.weather = data.weather[0];
       let temp =this.weatherData.main.temp
       this.temperature  = Math.round(temp - 273.15);
       let icon = 'https://openweathermap.org/img/wn/'+ this.weather.icon +'@2x.png';
       this.weather.img =icon;
    })
  }
}
