if(page === to_do_arr.length) {
		change_colour("right");  // right is red and down
	} else if(page === 1) {
		change_colour("left");  // left is red and up
	} else {
		change_colour("both");  // both are green
	};

	function change_colour(which) {
		// var green = "radial-gradient(rgba(182,252,182,0.99) 20%, rgba(57,57,49,0.85))";
		// var red = "radial-gradient(rgba(252,182,182,0.99) 20%, rgba(57,57,49,0.85))";
		var bright = "0.99";
		var faded = "0.7";
		
		var high_cl = 252;
		var low_cl = 182;

		if(which === "right") {
			var red_up = high_cl;
			var red_down = low_cl;
			var green_up = low_cl;
			var green_down = high_cl;
			var lighten_up = faded;
			var lighten_down = bright;
			var neg_01 = 1;
			var neg_02 = 1;

			var red_up_target = low_cl;
			var red_down_target = high_cl;
			var green_up_target = high_cl;
			var green_down_target = low_cl;
			var lighten_up_target = bright;
			var lighten_down_target = faded;
			
		} else if(which === "left") {
			var red_up = low_cl;
			var red_down = high_cl;
			var green_up = high_cl;
			var green_down = low_cl;
			var lighten_up = bright;
			var lighten_down = faded;
			var neg_01 = -1;
			var neg_02 = -1;

			var red_up_target = high_cl;
			var red_down_target = low_cl;
			var green_up_target = low_cl;
			var green_down_target = high_cl;
			var lighten_up_target = faded;
			var lighten_down_target = bright;

		} else if(which === "both") {
			var red_up = low_cl || high_cl;
			var red_down = low_cl || high_cl;
			var green_up = high_cl || low_cl;
			var green_down = high_cl || low_cl;
			var lighten_up = bright || faded;
			var lighten_down = bright || faded;
			var neg_01 = -1;
			var neg_02 = 1;

			var red_up_target = low_cl;
			var red_down_target = low_cl;
			var green_up_target = high_cl;
			var green_down_target = high_cl;
			var lighten_up_target = bright;
			var lighten_down_target = bright;

		};

		var colour_up = "radial-gradient(rgba(" + red_up + "," + green_up + ",182,0.99) 20%, rgba(57,57,49,0.85))";
		var colour_down = "radial-gradient(rgba(" + red_down + "," + green_down + ",182,0.99) 20%, rgba(57,57,49,0.85))";
		var shadow_up = "0px 0px 4px 0px rgba(" + red_up + "," + green_up + ",200,0.9)";
		var shadow_down = "0px 0px 4px 0px rgba(" + red_down + "," + green_down + ",200,0.9)";
		var opac_up = lighten_up;
		var opac_down = lighten_down;

		var change_colour_interval = setInterval(change,5);

		function set_marker_styles() {
			vid_down.style.opacity = lighten_down;
			vid_down.style.background = colour_down;
			vid_down.style.boxShadow = shadow_down;

			vid_up.style.opacity = lighten_up;
			vid_up.style.background = colour_up;
			vid_up.style.boxShadow = shadow_up;
		};

		function change() {

			if((red_up === red_up_target && green_up === green_up_target && lighten_up === lighten_up_target) && (red_down === red_down_target && green_down === green_down_target && lighten_down === lighten_down_target)) {

				var red_up = red_up_target;
				var red_down = red_down_target;
				var green_up = green_up_target;
				var green_down = green_down_target;
				var lighten_up = lighten_up_target;
				var lighten_down = lighten_down_target;

				set_marker_styles();

				clearInterval(change_colour_interval);

			} else {

				set_marker_styles();

				var red_up = red_up-1*neg_01;
				var red_down = red_down+1*neg_01;
				var green_up = green_up+1*neg_02;
				var green_down = green_down-1*neg_02;
				var lighten_up = lighten_up+0.01*neg_02;
				var lighten_down = lighten_down-0.01*neg_02;

			};

		};
	};