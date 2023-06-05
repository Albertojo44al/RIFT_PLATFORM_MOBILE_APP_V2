import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScoreboardComponent } from './scoreboard.component';
import { ScoreboardPageRoutingModule } from './scoreboard-routing.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ScoreboardPageRoutingModule
  ],
  declarations: [ScoreboardComponent]
})
export class TabsPageModule {}
