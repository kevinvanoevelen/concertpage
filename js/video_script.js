

// VIDEO SCRIPTS

var joe_01 = {

	list_name: "joe_01",
	container_id: 'video_wrap_01',   // id of html element which will hold the divs with iframes
	large_width: 640,
	small_width: 200,
	height_ind: 0.5625,   // % of the width you want the height to be

	ytv_id: [

		// initially large (title video)
		"4kgAkTXPMw8",

		// initially small (the rest)
		"tYxtS7lZdvY",
		"SEGAIM8580E",
		"53fNwWjYLW4",

	],

};

var joe_02 = {

	list_name: "joe_02",
	container_id: 'video_wrap_02',   // id of html element which will hold the divs with iframes
	large_width: 640,
	small_width: 200,
	height_ind: 0.5625,   // % of the width you want the height to be

	ytv_id: [

		// initially large (title video)
		"9Txul08YqTw",

		// initially small (the rest)
		"_cU97Gf4sAQ",
		"-LUDwj_ha5U",
		"EdZXpMq_3Y8",

	],

};

var to_do_arr = [joe_01,joe_02];
var page = 1

var create_itr = 0;
function you_tube_iframes(options) {

	var video_ids = options.ytv_id;
	var container_id = options.container_id;
	var list_name = options.list_name;
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

				var frame = document.createElement('div');
				var app_frame = main_wrapper.appendChild(frame);

				var frame_id = list_name + "_frame_" + (frame_itr+1);
				frame.setAttribute('id', frame_id);
				frame.classList.add('indi_vid_wrap');
				var class_id = "class_id_" + list_name;
				frame.classList.add(class_id);
				// console.log(class_id);

				frame.style.opacity = "0.01";
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

				var source = "https://www.youtube.com/embed/" + video_id + "?enablejsapi=1&showinfo=1&autohide=1&rel=0&autoplay=0";

				var iframe_id = list_name + "_iframe_" + (frame_itr+1);

				iframe.setAttribute('id', iframe_id);
				iframe.setAttribute('src', source);
				iframe.setAttribute('type', 'media/youtube');
				iframe.setAttribute('allowfullscreen', "true");
	         	iframe.setAttribute('allowscriptaccess', "always");
	         	iframe.classList.add('vids');

				app_vid.onload = function() { position_frames(frame_itr,class_id); frame_itr++; make_frames(); };

			} else {

				create_itr++;

				click_video();

				console.log("job done: making iframes");

			};

		}; make_frames();

		var position_frames = function(j,class_id) {

			var class_id = class_id;

			var pos_frame_id = document.getElementsByClassName(class_id)[j].id;
			// var pos_frame_id = pos_frames[j].id;
			var pos_frame = document.getElementById(pos_frame_id);

			var height_reg = (inner_height-height_hiatus+20)*create_itr;

			var large_top = 90+height_reg;
			var large_left = 60;
			var small_top = 70+height_reg;
			var small_right = 0;
			var small_height = 110;
			var small_margin_bottom = 30;
			var small_clientHeight = small_height + small_margin_bottom;

			var lg_top = large_top + "px";
			var lg_left = large_left + "px";
			var sm_top = (small_top + sm_itr_height) + "px";
			var sm_right = small_right + "px";

			var opac = 0.01;
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

		var test = document.getElementsByClassName('large_vid')[0].childNodes[0];
		var testing = document.getElementsByClassName('large_vid')[0].getElementsByTagName('iframe')[0];
		console.log("hello test", testing.id);
		test.onmouseover = function() {
			console.log("hello onmouse", this.id);
		};

	}; create_video();


	var click_video = function() {

		var clk = {}

		clk.frms = document.getElementsByClassName('small_vid');

		// console.log("hello click frames: " + clk.frms);

		for(var i = 0; i < clk.frms.length; i++) {

			clk.this_id = clk.frms[i].id;
			clk.this_item = document.getElementById(clk.this_id);

			// console.log("hello id: " + clk.this_id + " hello " + clk.this_item);

			clk.this_item.onclick = function() {

				console.log("hello click");

				var on = {};

				on.page = page-1;

				on.large_frame = document.getElementsByClassName('act_vid')[on.page];
				on.small_frame = this.firstChild;

				on.small_source = on.small_frame.src;
				on.large_source = on.large_frame.src;

				on.large_frame.src = on.small_source.replace("autoplay=0", "autoplay=1");
				on.small_frame.src = on.large_source.replace("autoplay=1", "autoplay=0");

				// console.log("small vid init: " + on.small_source + " - large vid init: " + on.large_source);
				// console.log("large vid finit:" + on.large_frame.src + " - small vid finit:" + on.small_frame.src);

			};

		};

	};

}; 

you_tube_iframes(joe_02);


var vid_up = document.getElementById('up_01');
var vid_down = document.getElementById('down_01');

var page_made = 0;

var arrow_arr = [vid_up, vid_down];

var previous_page = 0;

var check_arrows = function() {

	var vid_up = document.getElementById('up_01');
	var vid_down = document.getElementById('down_01');

	var last = to_do_arr.length;
	var first = 1;
	var min = 182;
	var max = 254;
	var bright = 0.99;
	var faded = 0.6;

	var red_green = {
		red_UP: max,
		green_UP: min,
		opac_UP: faded,
		red_DOWN: min,
		green_DOWN: max,
		opac_DOWN: bright,
	};

	var green_red = {
		red_UP: min,
		green_UP: max,
		opac_UP: bright,
		red_DOWN: max,
		green_DOWN: min,
		opac_DOWN: faded,
	};

	var green_green = {
		red_UP: min,
		green_UP: max,
		opac_UP: bright,
		red_DOWN: min,
		green_DOWN: max,
		opac_DOWN: bright,
	}

	console.log("check_arrows", to_do_arr.length, page);

	if(previous_page === 0 && page === first) {

		console.log("start position:", "from green UP green DOWn to red UP green DOWN", " - prev:", previous_page, " - curr:", page);

		set_marker_col(red_green);

	} else if((previous_page === last) && (page === first)) {

		console.log("going from last to first:", "green UP red DOWN to red UP green DOWN", " - prev:", previous_page, " - curr:", page);

		set_marker_col(red_green);

	} else if((previous_page === first) && (page === last)) {

		console.log("going from first to last:", "red UP green DOWN to green UP red DOWN", " - prev:", previous_page, " - curr:", page);

		set_marker_col(green_red);

	} else if((previous_page === last) && (page > first)) {

		console.log("going from last to middle:", "green UP red DOWN to green UP green DOWN", " - prev:", previous_page, " - curr:", page);

		set_marker_col(green_green);

	} else if((previous_page === first) && (page < last)) {
		
		console.log("going from first to middle:", "red UP green DOWN to green UP green DOWN", " - prev:", previous_page, " - curr:", page);

		set_marker_col(green_green);

	} else if((previous_page > first) && (previous_page < last)) {
		
		console.log("going from middle to middle:", "green UP green DOWN to green UP green DOWN", " - prev:", previous_page, " - curr:", page);

		set_marker_col(green_green);

	};

	function set_marker_col(style_array) {

		var arr = style_array;

		var gradient_up = "radial-gradient(rgba(" + arr.red_UP + "," + arr.green_UP + ",182,0.99) 20%, rgba(57,57,49,0.85))";
		var gradient_down = "radial-gradient(rgba(" + arr.red_DOWN + "," + arr.green_DOWN + ",182,0.99) 20%, rgba(57,57,49,0.85))";
		var shadow_up = "0px 0px 4px 0px rgba(" + arr.red_UP + "," + arr.green_UP + ",182,0.99)";
		var shadow_down = "0px 0px 4px 0px rgba(" + arr.red_DOWN + "," + arr.green_DOWN + ",182,0.99)";
		var opacity_up = arr.opac_UP;
		var opacity_down = arr.opac_DOWN;

		vid_up.style.opacity = opacity_up;
		vid_up.style.background = gradient_up;
		vid_up.style.boxShadow = shadow_up;

		vid_down.style.opacity = opacity_down;
		vid_down.style.background = gradient_down;
		vid_down.style.boxShadow = shadow_down;

	};

}; check_arrows();

var prev_source_01 = "";
var prev_source_02 = "";

for(var i = 0; i < arrow_arr.length; i++) {
	var this_item = arrow_arr[i];
	// console.log("hello for loop " + this_item);

	this_item.onclick = function() {

		var to_move = document.getElementById('video_wrapper');
		var get_id = this.id;
		var hiatus = (inner_height-140);
		var schism = hiatus*1.04;

		var large_frame_01 = document.getElementsByClassName('act_vid')[0];
		if(document.getElementsByClassName('act_vid').length === 2) {
			var large_frame_02 = document.getElementsByClassName('act_vid')[1];
		} else {
			var large_frame_02 = [];
		};

		if(get_id === "up_01") {

			if(page === 1) {
				return false;
			};

			console.log(large_frame_01.src, large_frame_02.src, prev_source_01);
			prev_source_02 = large_frame_02.src;
			setTimeout(function() { large_frame_02.src = ""; },2000);
			large_frame_01.src = prev_source_01.replace("autoplay=1", "autoplay=0");

			var target = schism;
			var top = hiatus-2;
			var neg = -1.0056;
			var neg_itr = neg;
			var res = 0;

			page = page-1;

		} else if(get_id === "down_01") {

			if(page === to_do_arr.length) {
				return false;
			};

			console.log(large_frame_01.src, large_frame_02.src, prev_source_02);
			prev_source_01 = large_frame_01.src;
			setTimeout(function() { large_frame_01.src = ""; },1000);
			large_frame_02.src = prev_source_02.replace("autoplay=1", "autoplay=0");
			//large_frame_01.src = "";//large_frame_01.src.replace("autoplay=1", "autoplay=0");

			var target = 0;
			var top = target;
			var pos = 1;
			var neg_itr = pos;
			var res = hiatus;

			page = page+1;

		};
		console.log("page", page);
		var aggr = 0;
		var dblr = 0.02;
		var itr_aid = 1.5;
		var end_itr = 0;

		if(page_made === 0) { previous_page = previous_page+1;};

		check_arrows();

		var shift_interval = setInterval(move_to,5);

		function move_to() {
			
			if(end_itr === 1) {

				if((top <= (res))) {

					to_move.style.marginTop = "-" + top + "px";

					clearInterval(shift_interval);

					if(page_made === 0) { you_tube_iframes(joe_01); page_made = 1; };

					 if(get_id === "up_01") { previous_page = previous_page-1; } else if(get_id === "down_01") { previous_page = previous_page+1; }

					console.log("end move_to: ", previous_page);

				} else {

					to_move.style.marginTop = "-" + top + "px";

					top = top-((aggr/2));
					aggr = (Math.abs(aggr-dblr));

				};

			} else if(end_itr === 0) {

				to_move.style.marginTop = "-" + top + "px";

				if(top <= (hiatus*0.6)) {

					top = top+(aggr);
					aggr = (Math.abs(aggr+dblr))*neg_itr;

					if(top <= (hiatus*0+75) && neg_itr === neg) {

						dblr = Math.abs(dblr+0.0004);
						dblr = dblr+0.0007;

					} else {

						dblr = dblr+0.0004;

					};

					if(top <= (hiatus*0) && neg_itr === neg) {

						end_itr = 1;

					};

					// console.log("hiatus*0.6: ", top.toFixed(4), aggr.toFixed(4), dblr.toFixed(4), neg);

				} else if((top >= (hiatus*0.8) && neg_itr === pos)) {

					top = top+(aggr-itr_aid);
					aggr = (Math.abs(aggr-dblr));
					dblr = (dblr-0.0009);

					itr_aid = itr_aid-0.02;

					if(dblr < 0) {dblr = 0;};

					if(itr_aid < 0) {itr_aid = 0};

					if(top >= (schism)) {

						end_itr = 1;

					};

					// console.log("hiatus*0.8: ", top.toFixed(4), (aggr-itr_aid).toFixed(4), (dblr).toFixed(4), end_itr, neg);

				} else {

					top = top+(aggr);
					aggr = (Math.abs(aggr-dblr))*neg_itr;
					dblr = dblr+0.00004;

					// console.log("else: ", top.toFixed(4), aggr.toFixed(4), dblr.toFixed(4), neg);

				};

			};
			
		};

	};

};





























