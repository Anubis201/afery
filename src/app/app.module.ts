import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { NavBarComponent } from './modules/main/nav-bar/nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopNavComponent } from './modules/main/nav-bar/top-nav/top-nav.component';
import { NavigationBarOnlyPcComponent } from './modules/main/nav-bar/navigation-bar-only-pc/navigation-bar-only-pc.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AsideMenuComponent } from './modules/main/aside-menu/aside-menu.component';
import { ToolbarComponent } from './modules/main/toolbar/toolbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from './modules/shared/shared.module';
import { MobileBottomComponent } from './modules/main/mobile-bottom/mobile-bottom.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TopNavComponent,
    NavigationBarOnlyPcComponent,
    AsideMenuComponent,
    ToolbarComponent,
    MobileBottomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatSnackBarModule,
    MatMenuModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    NgbModule,
    MatTabsModule,
    SharedModule,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500} },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
