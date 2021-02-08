import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { UserBadgeComponent } from './components/user-badge/user-badge.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { TaskDetailDialogComponent } from './modals/task-detail-dialog/task-detail-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import { UserPipe } from './Pipes/user.pipe';
import {MatListModule} from '@angular/material/list';
import { SortPipePipe } from './Pipes/sort-pipe.pipe';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TaskItemComponent,
    UserBadgeComponent,
    TaskDetailDialogComponent,
    UserPipe,
    SortPipePipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatListModule
  ],
  entryComponents: [TaskDetailDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
