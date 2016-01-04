
// Custom js for upload-campaign button UX: 

$(document).ready(function() {
	$('.inputfile').on("click", function() {

		var inputs = document.querySelectorAll( '.inputfile' ),

		Array.prototype.forEach.call( inputs, function( input ){
			var label	 = input.nextElementSibling,
				labelVal = label.innerHTML;
				fileNames = [];

			input.addEventListener( 'change', function( e ){
				if( this.files && this.files.length > 0 ) {

					Array.prototype.forEach.call(this.files, function( file ){
						var fileName = file.name;
						fileNames.push(fileName);
					});

					console.log(fileNames);

					// TO DO 1: Display file names on the page

					// TO DO 2: Replace label with submit button
				}
				else { console.log("ERROR!");
				}
			});
		});
	});
});



	