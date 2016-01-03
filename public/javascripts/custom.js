
// Custom js for upload-campaign button UX: 

// TO DO: 

// Add event listener on label click/touch so this only runs when a file has been selected. 

$(function() {
	console.log("THIS IS WORKING")

	var inputs = document.querySelectorAll( '.inputfile' );

	console.log(inputs);

	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});
	});
});