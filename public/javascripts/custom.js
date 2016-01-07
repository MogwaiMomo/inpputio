
// Custom js for upload-campaign button UX: 

$(document).ready(function() {
	$('.inputfile').on("click", function() {

		var inputs = document.querySelectorAll( '.inputfile' );

		Array.prototype.forEach.call( inputs, function( input ){
			var label	 = input.nextElementSibling,
				labelVal = label.innerHTML;
				fileName = '';

			input.addEventListener( 'change', function( e ){
				if( this.files && this.files.length > 0 ) {

					Array.prototype.forEach.call(this.files, function( file ){
						fileName = file.name;
					});

					// Display file names on the page as text

					// label.querySelector( '.file-label-text' ).innerHTML = fileName;
					// $('#file-label').removeClass('btn btn-danger');

					// Auto-submit form once file is selected:
					
					$("form").submit();

					// Make submit button visible
					// $('#file-submit').removeClass('upload-submit');
				}
				else { console.log("File not selected. Can you try again?");
				
				}
			});
		});
	});
});



	