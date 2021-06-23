import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptDataService {
  salt: any;
  ciphertext: any;
  iv: any;
  constructor() { }

  async encryptData(password: string, data: any) {
    let keyMaterial = await this.getKeyMaterial(password);
    let salt = window.crypto.getRandomValues(new Uint8Array(16));
    let key = await this.getKey(keyMaterial, salt);
    let iv = window.crypto.getRandomValues(new Uint8Array(12));
    let encoded = this.getMessageEncoding(JSON.stringify(data));
    let ciphertext = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      key,
      encoded
    );
    return { ciphertext, salt, iv };
  }
  getMessageEncoding(data: string) {
    let enc = new TextEncoder();
    return enc.encode(data);
  }
  async decryptData(password: string, encryptedNotes: any, salt: any, iv: any) {
    let keyMaterial = await this.getKeyMaterial(password);
    let key = await this.getKey(keyMaterial, salt);
    let decrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      key,
      encryptedNotes
    );
    let dec = new TextDecoder();
    return JSON.parse(JSON.parse(dec.decode(decrypted)));

  }
  getKeyMaterial(password: string) {
    let enc = new TextEncoder();
    return window.crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );
  }
  getKey(keyMaterial: any, salt: any) {
    return window.crypto.subtle.deriveKey(
      {
        "name": "PBKDF2",
        salt: salt,
        "iterations": 100000,
        "hash": "SHA-256"
      },
      keyMaterial,
      { "name": "AES-GCM", "length": 256 },
      true,
      ["encrypt", "decrypt"]
    );
  }
}
