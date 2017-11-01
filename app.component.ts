import { Component } from '@angular/core';
import {CKEditorModule,CKEditorComponent} from 'ng2-ckeditor';
import {ClassicEditor} from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ckeditorContent = '';
  // ClassicEditor.create( document.querySelector( '#editor' ) )
  // .then( editor => {
  //   console.log( editor );
  // } )
  // .catch( error => {
  //   console.error( error );
  // } );
  // ClassicEditor.create( document.querySelector( '#editor' ) ).then( editor => {window.editor = editor;} ).catch( err => {console.error( err.stack );} );

 constructor() {
   this.ckeditorContent = '<p>Enter A Text</p>';
 }
}
