import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConverterComponent } from './converter/converter.component';
import { ConverterService } from './converter.service';

import { NgxSemanticModule } from 'ngx-semantic';
// import { SuiModule } from 'ng2-semantic-ui';
import { ToastrModule } from 'ngx-toastr';
// import {SuiSelectModule} from "ngx-semantic/modules/select";



@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    // SuiModule,
    NgxSemanticModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    OverlayModule
  ],
  providers: [ConverterService],
  bootstrap: [AppComponent]
})
export class AppModule { }

