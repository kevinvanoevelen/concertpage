

// VIDEO SCRIPTS

var opt = {

	container_id: 'video_wrap',   // id of html element which will hold the divs with iframes
	large_width: 640,
	small_width: 200,
	height_ind: 0.55,   // % of the width you want the height to be

	ytv_id: [

		// initially large (title video)
		"4kgAkTXPMw8",

		// initially small (the rest)
		"tYxtS7lZdvY",
		"SEGAIM8580E",
		"53fNwWjYLW4",

	],

};


function you_tube_iframes(options) {

	var video_ids = options.ytv_id;
	var container_id = options.container_id;
	var large_width = options.large_width + "px";
	var large_height = Math.round(options.large_width*options.height_ind) + "px";
	var small_width = options.small_width + "px";
	var small_height = Math.round(options.small_width*options.height_ind) + "px";

	var main_wrapper = document.getElementById(container_id);

	var create_video = function() {

		var frame_itr = 0;
		var sm_itr_height = 0;

		var make_frames = function() {

			if(frame_itr <= (video_ids.length-1)) {

				var video_id = video_ids[(frame_itr)];
				var controls = 2;// useless

				var frame = document.createElement('div');
				var app_frame = main_wrapper.appendChild(frame);

				var frame_id = "frame_" + (frame_itr+1);
				frame.setAttribute('id', frame_id);
				frame.classList.add('indi_vid_wrap');

				frame.style.opacity = "0";
				frame.style.display = "none";
				
				var iframe = document.createElement('iframe');
				var app_vid = app_frame.appendChild(iframe);

				if(frame_itr === 0) { 
					frame.classList.add('large_vid');
					iframe.classList.add('act_vid');
					frame.style.width = large_width;
					frame.style.height = large_height;
					iframe.style.width = large_width;
					iframe.style.height = large_height;
				} else {
					frame.classList.add('small_vid');
					iframe.classList.add('inact_vid');
					frame.style.width = small_width;
					frame.style.height = small_height;
					iframe.style.width = small_width;
					iframe.style.height = small_height;
				};

				var source = "https://www.youtube.com/embed/" + video_id + "?enablejsapi=1&controls=" + controls + "&showinfo=1&autohide=1&rel=0&autoplay=0";

				var iframe_id = "iframe_" + (frame_itr+1);

				iframe.setAttribute('id', iframe_id);
				iframe.setAttribute('src', source);
				iframe.setAttribute('type', 'media/youtube');
				iframe.setAttribute('allowfullscreen', "true");
	         	iframe.setAttribute('allowscriptaccess', "always");
	         	iframe.classList.add('vids');

				app_vid.onload = function() { position_frames(frame_itr); frame_itr++; make_frames(); };

			} else {

				click_video();

				console.log("job done: making iframes");

			};

		}; make_frames();

		var position_frames = function(j) {

			var pos_frame_id = document.getElementsByClassName('indi_vid_wrap')[j].id;
			// var pos_frame_id = pos_frames[j].id;
			var pos_frame = document.getElementById(pos_frame_id);

			var large_top = 110;
			var large_left = 60;
			var small_top = 90;
			var small_right = 0;
			var small_height = 110;
			var small_margin_bottom = 30;
			var small_clientHeight = small_height + small_margin_bottom;

			var lg_top = large_top + "px";
			var lg_left = large_left + "px";
			var sm_top = (small_top + sm_itr_height) + "px";
			var sm_right = small_right + "px";

			var opac = 0;
			var max_opac = 0.99;
			var agg = 0.01;
			var acc = 0.001;

			function show_frames() {

				if(opac >= max_opac) {
					if(opac > max_opac) { opac = max_opac.toFixed(2); };
					pos_frame.style.opacity = opac;
					clearInterval(interval);
				} else {
					pos_frame.style.opacity = opac;
					opac = (opac+agg);
					agg = (agg+acc);
				};

			};

			if(pos_frame.classList.contains('large_vid')) {

				pos_frame.style.top = lg_top;
				pos_frame.style.left = lg_left;
				pos_frame.style.display = "block";

				var interval = setInterval(show_frames,5);

			} else if(pos_frame.classList.contains('small_vid')) {

				pos_frame.style.top = sm_top;
				pos_frame.style.right = sm_right;
				pos_frame.style.display = "block";
				
				var interval = setInterval(show_frames,5);
				
				sm_itr_height = (sm_itr_height+small_clientHeight);

			};

		};



	}; create_video();


	var click_video = function() {

		var clk = {}

		clk.frms = document.getElementsByClassName('small_vid');

		console.log("hello click frames: " + clk.frms);

		for(var i = 0; i < clk.frms.length; i++) {

			clk.this_id = clk.frms[i].id;
			clk.this_item = document.getElementById(clk.this_id);

			console.log("hello id: " + clk.this_id + " hello " + clk.this_item);

			clk.this_item.onclick = function() {

				console.log("hello click");

				var on = {};

				on.large_frame = document.getElementsByClassName('act_vid')[0];
				on.small_frame = this.firstChild;

				on.small_source = on.small_frame.src;
				on.large_source = on.large_frame.src;

				on.large_frame.src = on.small_source.replace("autoplay=0", "autoplay=1");
				on.small_frame.src = on.large_source.replace("autoplay=1", "autoplay=0");

				console.log("small vid init: " + on.small_source + " - large vid init: " + on.large_source);
				console.log("large vid finit:" + on.large_frame.src + " - small vid finit:" + on.small_frame.src);

			};

		};

	}; 

}; you_tube_iframes(opt);



































