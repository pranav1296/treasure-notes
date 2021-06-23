import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { SaveDataService } from 'src/app/services/save-data.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  note: Note;
  id: number;
  constructor(private saveDataService: SaveDataService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.note = this.saveDataService.getNoteById(this.id);
      }
    )
  }
  editNote() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  deleteNote() {
    this.saveDataService.deleteNote(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
