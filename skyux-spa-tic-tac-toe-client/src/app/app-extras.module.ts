import { NgModule } from '@angular/core';
import {GamesService} from "./games.service";

// Specify entry components, module-level providers, etc. here.
@NgModule({
  providers: [ GamesService ],
  entryComponents: []
})
export class AppExtrasModule { }
