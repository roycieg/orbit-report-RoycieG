import { Satellite } from './satellite';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Orbit-Report-RoycieG';
    sourceList: Satellite[];
    displayList: Satellite[];


    search(searchTerm: string): void {
      let matchingSatellites: Satellite[] = [];
      searchTerm = searchTerm.toLowerCase();
      for(let i=0; i < this.sourceList.length; i++) {
         let name = this.sourceList[i].name.toLowerCase();
         if (name.indexOf(searchTerm) >= 0) {
            matchingSatellites.push(this.sourceList[i]);
         }
      }
      // assign this.displayList to be the array of matching satellites
      // this will cause Angular to re-make the table, but now only containing matches
      this.displayList = matchingSatellites;
   }

    constructor() {
      this.sourceList = [];
      let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
   
      window.fetch(satellitesUrl).then(function(response) {
         response.json().then(function(data) {
  
          let fetchedSatellites = data.satellites;
          let i=0;
          while(i<fetchedSatellites.length){
            this.sourceList.push(new Satellite(
              fetchedSatellites[i].name,
              fetchedSatellites[i].type, 
              fetchedSatellites[i].launchDate, 
              fetchedSatellites[i].orbitType, 
              fetchedSatellites[i].operational
            ));
            i+=1
          }
          // make a copy of the sourceList to be shown to the user
          this.displayList = this.sourceList.slice(0);
  
         }.bind(this));
      }.bind(this));
   
   }
  
}



  




