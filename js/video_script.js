

// VIDEO SCRIPTS


var video_ids = [

	// initially large (title video)
	"4kgAkTXPMw8",

	// initially small (the rest)
	"tYxtS7lZdvY",
	"SEGAIM8580E",
	"53fNwWjYLW4",

];



var create_video = function() {

	var video_wrap = document.getElementById('video_wrap');
	var iframes = [];
	var frame_itr = 0;
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

		// console.log("everything needs grouping " + state);

		if(frame_itr <= (video_ids.length-1)) {

			var video_id = video_ids[(frame_itr)];
			var controls = 2;

			var frame = document.createElement('div'); //this should be div tag ok
			var app_frame = video_wrap.appendChild(frame);  // this should be app_frame ok

			var frame_id = "frame_" + (frame_itr+1);  // ok
			frame.setAttribute('id', frame_id);
			frame.classList.add('indi_vid_wrap');

			frame.style.opacity = "0";  // this and the next are correct
			frame.style.display = "none";

			
			var iframe = document.createElement('iframe');
			var app_vid = app_frame.appendChild(iframe);  // maybe frame.

			if(frame_itr === 0) { 
				frame.classList.add('large_vid');  // ok
				iframe.classList.add('act_vid');
			} else {
				frame.classList.add('small_vid');  // ok
				iframe.classList.add('inact_vid');
				controls = 2;
			};

			var source = "https://www.youtube.com/embed/" + video_id + "?enablejsapi=1&controls=" + controls + "&showinfo=1&autohide=1&rel=0&autoplay=0";

			// var takeback = frame_itr-1;

			var iframe_id = "iframe_" + (frame_itr+1);

			iframe.setAttribute('id', iframe_id);  // these next belong to iframe ok
			iframe.setAttribute('src', source);
			iframe.setAttribute('type', 'media/youtube');
			iframe.setAttribute('allowfullscreen', "true");
         	iframe.setAttribute('allowscriptaccess', "always");
         	iframe.classList.add('vids');
         	// iframe needs identifiers for size and such ok


			// console.log("frame " + frame.classList);
			// console.log("iframe " + iframe.classList);

			app_vid.onload = function() { position_frames(frame_itr); frame_itr++; make_frames(); };

		} else {

			click_video();

			return;

		};

	}; make_frames();

	var position_frames = function(j) {

		// console.log("this is the state on 3: " + state);

		var pos_frames = document.getElementsByClassName('indi_vid_wrap');  // get by classname identifier for the divs ok
		// console.log("this is the state on 3: " + pos_frames);
		var pos_frame_id = pos_frames[j].id;  // ok
		var pos_frame = document.getElementById(pos_frame_id);  // ok but isolate or change the variable name to avoid confusion ok

		var lg_top = large_top + "px";
		var lg_left = large_left + "px";
		var sm_top = (small_top + sm_itr_height) + "px";
		var sm_right = small_right + "px";

		var opac = 0;
		var max_opac = 0.99;
		var agg = 0.01;
		var acc = 0.001; // accelerator
		var int_itr = 0;

		function show_frames() {

			if(opac >= max_opac) {
				if(opac > max_opac) { opac = max_opac.toFixed(2); };
				pos_frame.style.opacity = opac;
				// console.log("opac finally is " + opac);
				clearInterval(interval);
			} else {
				pos_frame.style.opacity = opac;
				opac = (opac+agg);
				agg = (agg+acc);

				int_itr++;

				// console.log("style.opacity: " + opac.toFixed(2) + " - " + agg.toFixed(3) + " - frame: " + int_itr);
			};

		};

		if(pos_frame.classList.contains('large_vid')) {

			pos_frame.style.top = lg_top;
			pos_frame.style.left = lg_left;
			pos_frame.style.display = "block";  // change to block ok

			var interval = setInterval(show_frames,5);

		} else if(pos_frame.classList.contains('small_vid')) {

			pos_frame.style.top = sm_top;
			pos_frame.style.right = sm_right;
			pos_frame.style.display = "block";  // change to block ok
			
			var interval = setInterval(show_frames,5);
			
			sm_itr_height = (sm_itr_height+small_clientHeight);

		} else {

			return;

		};

	};



}; create_video();



var click_video = function() {

	var clk = {}

	clk.frms = document.getElementsByClassName('small_vid');  // change by class identifier ok

	console.log("hello click frames: " + clk.frms);

	for(var i = 0; i < clk.frms.length; i++) {

		clk.this_id = clk.frms[i].id;
		// clk.par_frame = document.getElementById(clk.this_id).parentElement.id;  // not necessary ok
		clk.this_item = document.getElementById(clk.this_id);  // not necessary, make self ok

		console.log("hello id: " + clk.this_id + " hello " + clk.this_item);

		clk.this_item.onclick = function() {  // should be the div being clicked ok

			console.log("hello click");

			var on = {};

			// var source = "https://www.youtube.com/embed/" + video_id + "?enablejsapi=1&controls=" + controls + "&showinfo=1&autohide=1&rel=0&autoplay=0";

			on.large_frame = document.getElementsByClassName('act_vid')[0];

			on.child = this.firstChild;

			on.embed = "https://www.youtube.com/embed/";

			on.small_source = on.child.src;
			on.sm_src_arr = on.small_source.split('?');

			on.sm_src_arr_url_arr = on.sm_src_arr[0].split('/');
			on.sm_src_id = on.sm_src_arr_url_arr[on.sm_src_arr_url_arr.length-1];

			on.sm_src_arr_prop_arr = on.sm_src_arr[1].split('&');
			for(look in on.sm_src_arr_prop_arr) {
				if(on.sm_src_arr_prop_arr[look] == "autoplay=0") {
					on.sm_src_arr_prop_arr[look] = "autoplay=1";
				} else {
					continue;
				};
			};
			on.sm_src_arr_prop_arr_joined = on.sm_src_arr_prop_arr.join('&');

			on.large_source = on.large_frame.src;
			on.lg_src_arr = on.large_source.split('?');

			on.lg_src_arr_url_arr = on.lg_src_arr[0].split('/');
			on.lg_src_id = on.lg_src_arr_url_arr[on.lg_src_arr_url_arr.length-1];

			on.lg_src_arr_prop_arr = on.lg_src_arr[1].split('&');
			for(look in on.lg_src_arr_prop_arr) {
				if(on.lg_src_arr_prop_arr[look] == "autoplay=1") {
					on.lg_src_arr_prop_arr[look] = "autoplay=0";
				} else {
					continue;
				};
			};
			on.lg_src_arr_prop_arr_joined = on.lg_src_arr_prop_arr.join('&');

			on.sm_src_auto = on.embed + on.sm_src_id + "?" + on.sm_src_arr_prop_arr_joined;
			on.lg_src_auto = on.embed + on.lg_src_id + "?" + on.lg_src_arr_prop_arr_joined;

			on.large_frame.src = on.sm_src_auto; // + "&autoplay=1";
			on.child.src = on.lg_src_auto; // + "&autoplay=0";

			on.large_frame.id = "iframe_1";

			console.log("small vid init: " + on.small_source + " - large vid init: " + on.large_source);
			console.log("large vid finit:" + on.sm_src_auto + " - small vid finit:" + on.lg_src_auto);

		};

	};

};











































