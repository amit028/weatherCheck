import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  location:any;
  weatherData:any[]=[];
  constructor(private apiService :ApiServiceService) {
    this.getPosition().then(pos => {
      this.location = pos;
      this.getWeather();
    });
  }

  ngOnInit(): void {
  }
  
 

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resp => {
          resolve({
            lng: resp.coords.longitude.toFixed(7),
            lat: resp.coords.latitude.toFixed(7)
          });
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getWeather(){
    var apiKey= '1c999e5d0a13386f6d212e4b9c61944f';
    let url = 'https://api.openweathermap.org/data/2.5/forecast?lat='+this.location.lat+'&lon='+this.location.lng +'&appid='+apiKey
     this.apiService.getData(url).subscribe((data: any) => {
       let Data = data;
    
       Data.list.forEach((element:any) => {
        let object={
          temperature : Math.round(element.main.temp - 273.15),
          date : moment(element.dt_txt).format('YYYY-MM-DD HH:mm:ss'),
          description: element.weather[0].description,
          icon:  'https://openweathermap.org/img/wn/'+ element.weather[0].icon +'@2x.png'
      }

       this.weatherData.push(object);
       });
    })
    console.log(this.weatherData);
  }
}
