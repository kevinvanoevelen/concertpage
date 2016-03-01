

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

		console.log("everything needs grouping " + state);

		if(frame_itr <= video_ids.length) {

			var tag = video_ids[(frame_itr-1)]

			var frame = document.createElement('iframe'); //this should be div tag
			var app_vid = video_wrap.appendChild(frame);  // this should be app_frame

			var frame_id = "frame_" + (frame_itr);  // ok
			// frame.setAttribute('id', frame_id);
			// frame.setAttribute('class', "indi_vid_wrap");
			if(frame_itr === 1) { 
				frame.classList.add('large_vid');  // ok
			} else {
				frame.classList.add('small_vid');  // ok
			};

			frame.style.opacity = "0";  // this and the next are correct
			frame.style.display = "none";

			
			// var iframe = document.createElement('iframe');
			// var app_vid = app_frame.appendChild(iframe);

			var source = "https://www.youtube.com/embed/" + tag + "?enablejsapi=1&controls=2&showinfo=1&autohide=1&autoplay=0&loop=0&rel=0";

			var takeback = frame_itr-1;

			// var iframe_id = "iframe_" + frame_itr;

			frame.setAttribute('id', frame_id);  // these next belong to iframe
			frame.setAttribute('src', source);
			frame.setAttribute('type', 'media/youtube');
			frame.setAttribute('allowfullscreen', "true");
         	frame.setAttribute('allowscriptaccess', "always");
         	// iframe needs identifiers for size and such


			frame_itr++

			app_vid.onload = function() { position_frames(takeback); make_frames(); };

		} else {

			// click_video();

			return;

		};

	}; make_frames();

	var position_frames = function(j) {

		console.log("this is the state on 3: " + state);

		var frames = document.getElementsByTagName('iframe');  // get by classname identifier for the divs
		var frame_id = frames[j].getAttribute('id');  // ok
		var frame = document.getElementById(frame_id);  // ok but isolate or change the variable name to avoid confusion

		var lg_top = large_top + "px";
		var lg_left = large_left + "px";
		var sm_top = (small_top + sm_itr_height) + "px";
		var sm_right = small_right + "px";

		var opac = 0;
		var max_opac = 0.99;
		var agg = 0.01;
		var acc = 0.001; // accelerator

		function show_frames() {

			if(opac >= max_opac) {
				console.log("opac finally is " + opac);
				if(opac > max_opac) { opac = max_opac; };
				frame.style.opacity = opac;
				clearInterval(interval);
			} else {
				frame.style.opacity = opac;
				opac = (opac+agg);
				agg = (agg+acc);
			};

		};

		if(frame.classList.contains('large_vid')) {

			frame.style.top = lg_top;
			frame.style.left = lg_left;
			frame.style.display = "inline-block";  // change to block

			var interval = setInterval(show_frames,5);

		} else if(frame.classList.contains('small_vid')) {

			frame.style.top = sm_top;
			frame.style.right = sm_right;
			frame.style.display = "inline-block";  // change to block
			
			var interval = setInterval(show_frames,5);
			
			sm_itr_height = (sm_itr_height+small_clientHeight);

		} else {

			return;

		};

	};

	// var click_video = function() {

		// 	var clk = {}

		// 	clk.frms = document.getElementsByTagName('iframe');  // change by calss identifier

		// 	console.log("hello frames: " + clk.frms);

		// 	for(var i = 0; i < clk.frms.length; i++) {

		// 		clk.this_id = clk.frms[i].id;
		// 		clk.par_frame = document.getElementById(clk.this_id).parentElement.id;  // not necessary
		// 		clk.parents = document.getElementById(clk.par_frame);  // not necessary, make self

		// 		console.log("hello id: " + clk.this_id + " hello frame: " + clk.par_frame);

		// 		clk.parents.onclick = function() {  // should be the div being clicked

		// 			console.log("hello click");

		// 		};

		// 	};

	// };

}; create_video();















































