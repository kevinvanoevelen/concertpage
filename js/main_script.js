/* MAIN JAVASCRIPT PAGE */

/* TITLE */



// VIDEO SCRIPTS

var create_video = function() {

	var video_ids = [

		// initially large (title video)
		"4kgAkTXPMw8",

		// initially small (the rest)
		"tYxtS7lZdvY",
		"SEGAIM8580E",
		"53fNwWjYLW4",

	];

	var video_wrap = document.getElementById('video_wrap');
	var iframes = [];
	var frame_itr = 1
	var takeback;
	var sm_itr_height = 0;

	var large_top = 110;
	var large_left = 60;
	var small_top = 90;
	var small_right = 0;
	var small_height = 110;
	var small_margin_bottom = 30;
	var small_clientHeight = small_height + small_margin_bottom;

	var make_frames = function() {

		if(frame_itr <= video_ids.length) {

			var tag = video_ids[(frame_itr-1)]

			var frame = document.createElement('iframe');
			var frame_id = "frame_" + (frame_itr);
			var source = "https://www.youtube.com/embed/" + tag + "?enablejsapi=1&controls=2&showinfo=1&rel=0";

			frame.setAttribute('id', frame_id);
			frame.setAttribute('src', source);
			
			if(frame_itr === 1) { 
				frame.classList.add('large_vid');
			} else {
				frame.classList.add('small_vid');
			};

			frame.setAttribute('allowfullscreen', "true");
         	frame.setAttribute('allowscriptaccess', "always");

			frame.style.opacity = "0";
			frame.style.display = "none";

			var app_vid = video_wrap.appendChild(frame);

			frame_itr++

			takeback = frame_itr-2;

			app_vid.onload = function() { position_frames(takeback); make_frames(); };

		} else {

			return;

		};

	}; make_frames();

	var position_frames = function(j) {

		var frames = document.getElementsByTagName('iframe');
		var frame_id = frames[j].getAttribute('id');
		var frame = document.getElementById(frame_id);

		var lg_top = large_top + "px";
		var lg_left = large_left + "px";
		var sm_top = (small_top + sm_itr_height) + "px";
		var sm_right = small_right + "px";

		var opac = 0;
		var agg = 0.015;
		var max_opac = 1;

		function show_frames() {

			if(opac > 1) { opac = 1; };

			if(opac >= max_opac) {
				clearInterval(interval);
			} else {
				frame.style.opacity = opac;
				opac = (opac+agg);
				agg = (agg+0.0005);
			};

		};

		if(frame.classList.contains('large_vid')) {

			frame.style.top = lg_top;
			frame.style.left = lg_left;
			frame.style.display = "inline-block";

			var interval = setInterval(show_frames,5);

		} else if(frame.classList.contains('small_vid')) {

			frame.style.top = sm_top;
			frame.style.right = sm_right;
			frame.style.display = "inline-block";
			
			var interval = setInterval(show_frames,5);
			
			sm_itr_height = (sm_itr_height+small_clientHeight);

		} else {

			return;

		};

	}; 

}; create_video();



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












