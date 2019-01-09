// script.js

(function() {

	'use strict';


		// toggle-nav

		function toggleNav(evt) {
			var r = '', container = document.getElementById('target-container');
			if (document.body.className.indexOf('has-height') == -1) {
				console.log('backuped');
				console.log(r);
				r = document.body.className;
			}
			if(evt.target.id === 'toggle-nav') {
				evt.preventDefault();
			    if (this.className === "topnav") {
			        this.className += " responsive";
			        document.body.className += ' has-height'
			    } else {
			        this.className = "topnav";
			        document.body.className = r;
			    }	
			}
		   
		}
		var nav = document.getElementById('tinyone-nav');
		nav.addEventListener('click', toggleNav);
	
})();


/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
