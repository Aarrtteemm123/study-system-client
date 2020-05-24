import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StudentPageComponent} from './student-page/student-page.component';
import { TeacherPageComponent } from './teacher-page/teacher-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSortModule} from '@angular/material/sort';
import { SubjectDialogBoxComponent } from './subject-dialog-box/subject-dialog-box.component';
import {MatCardModule} from '@angular/material/card';
import { StudentDialogBoxComponent } from './student-dialog-box/student-dialog-box.component';
import { AdminDialogBoxComponent } from './admin-dialog-box/admin-dialog-box.component';
import { TeacherDialogBoxComponent } from './teacher-dialog-box/teacher-dialog-box.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';

const appRoutes: Routes = [
  {path: '',redirectTo: 'title',pathMatch: 'full'},
  {path: 'student', component: StudentPageComponent},
  {path: 'title', component: TitleComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'teacher', component: TeacherPageComponent},
  {path: 'admin', component: AdminPageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    StudentPageComponent,
    TeacherPageComponent,
    AdminPageComponent,
    RegisterPageComponent,
    SubjectDialogBoxComponent,
    StudentDialogBoxComponent,
    AdminDialogBoxComponent,
    TeacherDialogBoxComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatListModule,
    MatRadioModule,
    MatTabsModule,
    MatSortModule,
    MatCardModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatMenuModule
  ],
  entryComponents: [

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
