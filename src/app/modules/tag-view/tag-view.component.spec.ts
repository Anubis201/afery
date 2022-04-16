import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { TagViewComponent } from './tag-view.component';

describe('TagViewComponent', () => {
  let component: TagViewComponent;
  let fixture: ComponentFixture<TagViewComponent>;
  const fakeRoute = {
    provide: ActivatedRoute,
    useValue: {
        snapshot: {
            params: {
                get(): Observable<any> {
                    return new Observable();
                }
            }
        }
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagViewComponent ],
      providers: [
        fakeRoute,
        MatSnackBar,
        Overlay,
      ],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
