/* MAIN JAVASCRIPT PAGE */

/* TITLE */

var state = document.readyState;
console.log("this is the state on 1: " + state);

//	capturing the window width and height for further use

var inner_width = window.innerWidth;
var inner_height = window.innerHeight;

var section_wraps = document.getElementsByClassName('section_wrap');
var height_hiatus = 160; // everything that adds to the height, except the section_wrap/header nav
var header_nav = document.getElementById('nav_bar');
var height_var = (inner_height-height_hiatus).toString() + "px";

// automatically calculates and sets the height of section_wraps
for(var i = 0; i < section_wraps.length; i++) {section_wraps[i].style.height = height_var;};
header_nav.style.height = height_var;


// NAVIGATION SCRIPTS

function toggle_nav_tags() {

	// var parent_these = document.getElementById('nav_bar');   // parent of the elements you seek
	var these = header_nav.getElementsByClassName('nav_lnk');   // elements sought
	var toggle_class = 'nav_a_act';   // class that needs toggling

	// var length = these.length;   // length of the array of elements to iterate through

	for(var i in these) {   // iterate through all the nav links so they have the same onclick function

		var item = these[i];   // the specific iteration

		item.onclick = function() {   // onclick function to make active/inactive toggle functionality

			if (!this.classList.contains(toggle_class)) {   // to remove the class from the active link, if you click on an inactive link
				
				for(var i in these) {   // iterate through all items to look for the active one

					if (these[i].classList.contains(toggle_class)) {   // if the active one is found

						var ids_items = this.id;
						var self_items = document.getElementById(ids_items);

						these[i].classList.toggle(toggle_class,false);   // turns off the active link

						break;

					} else {

						continue;

					};

				};
								
				this.classList.toggle(toggle_class,true);   // turns on the inactive link

			} else if (this.classList.contains(toggle_class)) {   // if you click on an active link nothing should happen

				return;

			};
			
		};

	};

}; toggle_nav_tags();



// FOOTER SCRIPTS

function write_footer() {

	var foot_area = document.getElementById('main_footer_content'); // p element in .column bottom footer tag

	var auth_name = "kevin van oevelen";
	var prod_name = "Some Video Productions";
	var space = "<span class=\"space\">---</span>";

	var x = new Date(document.lastModified).toLocaleDateString();
	var y = new Date(document.lastModified).toLocaleTimeString();

	var foot_text = prod_name + space + "Last modified at " + y + " on " + x; // auth_name + space + 

	foot_area.innerHTML = foot_text;

}; write_footer(); 












