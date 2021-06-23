import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./components/auth/auth.component";
import { NoteDetailComponent } from "./components/notes/note-detail/note-detail.component";
import { NoteEditComponent } from "./components/notes/note-edit/note-edit.component";
import { NotesComponent } from "./components/notes/notes/notes.component";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'authentication',
        pathMatch: 'full'
    },
    {
        path: 'authentication',
        component: AuthComponent
    },
    {
        path: 'notes',
        component: NotesComponent,
        children: [
            { path: 'new', component: NoteEditComponent },
            { path: ':id', component: NoteDetailComponent },
            { path: ':id/edit', component: NoteEditComponent }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }