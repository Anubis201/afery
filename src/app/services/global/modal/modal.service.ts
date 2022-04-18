import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/modules/shared/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private dialog: MatDialog
  ) { }

  openDialog(component: ComponentType<any>, config?: MatDialogConfig) {
    this.dialog.open(component, config);
  }

  openSignIn() {
    this.dialog.open(LoginComponent);
  }

  closeAllDialog() {
    this.dialog.closeAll();
  }
}
