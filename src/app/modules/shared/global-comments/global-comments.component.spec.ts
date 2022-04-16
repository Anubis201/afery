import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

import { GlobalCommentsComponent } from './global-comments.component';

// describe('CommentsComponent', () => {
//   let component: GlobalCommentsComponent;
//   let fixture: ComponentFixture<GlobalCommentsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ GlobalCommentsComponent ],
//       providers: [
//         MatSnackBar,
//         Overlay,
//       ],
//       imports: [
//         AngularFireModule.initializeApp(environment.firebase),
//       ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(GlobalCommentsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
