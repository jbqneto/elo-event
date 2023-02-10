import { NgModule } from '@angular/core';

import { MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'


const modules = [
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatRippleModule,
    MatListModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
