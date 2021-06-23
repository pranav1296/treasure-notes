import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import { SaveDataService } from 'src/app/services/save-data.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];
  subscription: Subscription;
  constructor(private router: Router, private route: ActivatedRoute,
    private saveDataService: SaveDataService) { }

  ngOnInit(): void {
    console.log("Init note list component");
    this.notes = this.saveDataService.getNotes();
    this.subscription = this.saveDataService.notesChanged.subscribe(
      (notes: Note[]) => {
        this.notes = notes;
      })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  addNewNote() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
  onLogout() {
    this.router.navigate(['/authentication']);
  }

}
