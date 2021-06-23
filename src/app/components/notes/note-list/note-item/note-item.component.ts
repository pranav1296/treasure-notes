import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent implements OnInit {
  @Input() note: Note;
  @Input() index: Number;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("Init note-item component");
  }
  goToNote() {
    this.router.navigate([this.index], { relativeTo: this.route })
  }

}
