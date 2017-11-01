import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Or using CommonJS verion:
// const ClassicEditor = require( '@ckeditor/ckeditor5-build-classic' );

ClassicEditor.create( document.querySelector( '#editor' ) ).then( editor => window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );