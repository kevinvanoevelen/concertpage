/* MAIN JAVASCRIPT PAGE */

/* TITLE */

var state = document.readyState;
console.log("this is the state on 1: " + state);


// NAVIGATION SCRIPTS

function toggle_nav_tags() {

	var parent_these = document.getElementById('nav_bar');   // parent of the elements you seek
	var these = parent_these.getElementsByClassName('nav_lnk');   // elements sought
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
	var prod_name = "some video productions";
	var space = "<span class=\"space\">---</span>";

	var foot_text = auth_name + space + prod_name;

	foot_area.innerHTML = foot_text;

}; write_footer();












