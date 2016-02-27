

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

		console.log("this is the state on 2: " + state);

		if(frame_itr <= video_ids.length) {

			var tag = video_ids[(frame_itr-1)]

			var frame = document.createElement('iframe');
			var app_vid = video_wrap.appendChild(frame);

			var frame_id = "frame_" + (frame_itr);
			var source = "https://www.youtube.com/embed/" + tag + "?enablejsapi=1&controls=2&showinfo=1&autohide=1&autoplay=0&loop=0&rel=0";

			var takeback = frame_itr-1;

			if(frame_itr === 1) { 
				frame.classList.add('large_vid');
			} else {
				frame.classList.add('small_vid');
			};

			frame.setAttribute('id', frame_id);
			frame.setAttribute('src', source);
			frame.setAttribute('type', 'media/youtube');
			frame.setAttribute('allowfullscreen', "true");
         	frame.setAttribute('allowscriptaccess', "always");

			frame.style.opacity = "0";
			frame.style.display = "none";

			frame_itr++

			app_vid.onload = function() { position_frames(takeback); make_frames(); };

		} else {

			return;

		};

	}; make_frames();

	var position_frames = function(j) {

		console.log("this is the state on 3: " + state);

		var frames = document.getElementsByTagName('iframe');
		var frame_id = frames[j].getAttribute('id');
		var frame = document.getElementById(frame_id);

		var lg_top = large_top + "px";
		var lg_left = large_left + "px";
		var sm_top = (small_top + sm_itr_height) + "px";
		var sm_right = small_right + "px";

		var opac = 0;
		var agg = 0.0006;
		var max_opac = 1;

		function show_frames() {

			if(opac > 1) { opac = 1; };

			if(opac >= max_opac) {
				clearInterval(interval);
			} else {
				frame.style.opacity = opac;
				opac = (opac+agg);
				agg = (agg+0.00006);
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
			
			var interval = setInterval(show_frames,20);
			
			sm_itr_height = (sm_itr_height+small_clientHeight);

		} else {

			return;

		};

	}; 

}; create_video();

console.log("this is the state on 4: " + state);
