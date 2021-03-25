// Initialize all input of date type.
const calendars = bulmaCalendar.attach('[type="datetime"]', options);

// Loop on each calendar initialized
calendars.forEach(calendar => {
	// Add listener to select event
	calendar.on('select', date => {
		console.log(date);
	});
});


// To access to bulmaCalendar instance of an element
const element = document.querySelector('#my-element');
if (element) {
	// bulmaCalendar instance is available as element.bulmaCalendar
	element.bulmaCalendar.on('select', datetimepicker => {
		console.log(datetimepicker.data.value());
	});
}