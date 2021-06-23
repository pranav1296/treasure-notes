import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from '../models/note.model';
import { EncryptDecryptDataService } from './encrypt-decrypt-data.service';
@Injectable({
  providedIn: 'root'
})
export class SaveDataService {
  password: string;
  data: any;
  email: string;
  private notes: Note[] = [];
  notesChanged = new Subject<Note[]>();
  constructor(private encryptDecryptService: EncryptDecryptDataService) { }
  
  async login(email: string, password: string) {
    let userPassword = localStorage.getItem(email);
    if (userPassword) {
      if (password === userPassword) {
        const encryptedNotes = localStorage.getItem(email + password);
        if (encryptedNotes) {
          const { ciphertext, salt, iv } = JSON.parse(encryptedNotes);
          this.notes = await this.encryptDecryptService.decryptData(password, new Uint8Array(JSON.parse(ciphertext)).buffer,
            new Uint8Array(JSON.parse(salt)).buffer, new Uint8Array(JSON.parse(iv)).buffer);
        }
        this.password = password;
        this.email = email;
        return { status: true, message: '' };
      }
    }
    return { status: false, message: 'Incorrect Email or Password' };
  }
  signUp(email: string, password: string) {
    const getUser = localStorage.getItem(email);
    if (!getUser) {
      this.password = password;
      this.email = email;
      localStorage.setItem(email, password);
      localStorage.setItem(email + password, "");
      return {status: true, message: ''};
    }
    return {status: false, message: 'User already exists'};
  }
  getNotes() {
    return this.notes.slice();
  }
  getNoteById(id: number) {
    return this.notes[id];
  }
  setNotes(notes: Note[]) {
    if (notes) {
      this.notes = notes;
    } else {
      this.notes = [];
    }
    this.notesChanged.next(this.notes.slice());
  }
  addNote(note: Note) {
    this.notes.push(note);
    this.notesChanged.next(this.notes.slice());
    this.saveNotes();
  }
  updateNote(index: number, newNote: Note) {
    this.notes[index] = newNote;
    this.notesChanged.next(this.notes.slice());
    this.saveNotes();
  }
  deleteNote(index: number) {
    this.notes.splice(index, 1);
    this.notesChanged.next(this.notes.slice());
    this.saveNotes();
  }
  async saveNotes() {
    //this.data.notes = this.notes;
    const { ciphertext, salt, iv } = await this.encryptDecryptService.encryptData(this.password, JSON.stringify(this.notes));
    const encryptedObj = {
      ciphertext: JSON.stringify(Array.from(new Uint8Array(ciphertext))),
      salt: JSON.stringify(Array.from(new Uint8Array(salt))),
      iv: JSON.stringify(Array.from(new Uint8Array(iv)))
    }
    localStorage.setItem(this.email + this.password, JSON.stringify(encryptedObj));
    console.log("Done");
  }
}
