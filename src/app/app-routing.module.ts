import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentWeatherComponent } from './pages/current-weather/current-weather.component';
import { WeatherForecastComponent } from './pages/weather-forecast/weather-forecast.component';
const routes: Routes = [
  { path: '', component: CurrentWeatherComponent },
  { path: 'currentWeather', component: CurrentWeatherComponent },
  { path: 'weatherForecast', component: WeatherForecastComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
