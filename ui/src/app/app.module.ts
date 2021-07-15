import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CubejsClientModule } from '@cubejs-client/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ChartComponent } from './pages/home/components/chart/chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChartsModule } from 'ng2-charts';

const cubejsOptions = {
  token:
    "75dd6380f5ff5726029af64dc6d8df0bfee087064b1cadc1620a8d6009cda1d286834e9eb6262e64b8c827fdae3384540ca81e22bb55d3a013c46499149a2d01",
  options: {
    apiUrl: "http://localhost:4000/cubejs-api/v1"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CubejsClientModule.forRoot(cubejsOptions),
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
