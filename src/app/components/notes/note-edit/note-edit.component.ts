import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { SaveDataService } from 'src/app/services/save-data.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {
  id: number;
  editMode = false;
  noteForm: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute,
    private saveDataService: SaveDataService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.retainNote();
      }
    )
  }
  retainNote() {
    let heading = '';
    let content = '';
    if (this.editMode) {
      const note = this.saveDataService.getNoteById(this.id);
      heading = note.heading;
      content = note.content;
    }
    this.noteForm = new FormGroup({
      heading: new FormControl(heading, Validators.required),
      content: new FormControl(content, Validators.required)
    })
  }
  onSubmit() {
    const note = new Note(
      this.noteForm.value.heading,
      this.noteForm.value.content,
      new Date().getTime()
    );
    if (this.editMode) {
      this.saveDataService.updateNote(this.id, note);
    } else {
      this.saveDataService.addNote(note);
    }
    this.onCancel();
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
