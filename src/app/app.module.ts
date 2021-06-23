import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { NotesComponent } from './components/notes/notes/notes.component';
import { NoteListComponent } from './components/notes/note-list/note-list.component';
import { NoteItemComponent } from './components/notes/note-list/note-item/note-item.component';
import { NoteEditComponent } from './components/notes/note-edit/note-edit.component';
import { NoteDetailComponent } from './components/notes/note-detail/note-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NotesComponent,
    NoteListComponent,
    NoteItemComponent,
    NoteEditComponent,
    NoteDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
