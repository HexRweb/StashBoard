var stashboard = 
{
	dimensions:
	{
		availWidth  : $(window).width() - 240,
		availHeight : $(window).height() - 52 - 64
	},
	init:function()
	{
		stashboard.update.HAC("loading...","Done loading HAC");
	},
	user:
	{
		accessCenterURL :  "//accesscenter.roundrockisd.org/HomeAccess/Content/Student/Assignments.aspx"
	},
	update:
	{
		HAC: function(startMessage, endMessage)
		{
			if(typeof startMessage === "undefined") startMessage = "Attempting to load HAC";
			if(typeof endMessage   === "undefined") endMessage   = "Done!";
			Materialize.toast(startMessage, 200);
			$.ajax({url:"chrome-extension://dnboopdmbbpaicaphfkcphonijbfhopg/assets/logowhite.svg"}).success(function()
			{
				$.ajax(stashboard.user.accessCenterURL).success(function()
				{
					$("#hac").html("<iframe src='"+stashboard.user.accessCenterURL+"' width='"+stashboard.dimensions.availWidth + "' height='" + stashboard.dimensions.availHeight + "' ></iframe>");
					$("#hac").addClass("framed");
				}).error(function()
				{
					$("#hac").html("<div class='error'>The Home Access Center URL is not working. <a href='#/settings'>Check your settings</a> or <a href='#/hac' onclick='stashboard.update.HAC()'>try again</a></div>");
				});
			}).error(function(){$("#hac").html("<div class='error'>The Home Access Center URL is not working. Check your settings or <a href='#/hac' onclick='stashboard.update.HAC()'>try again</a></div>");});
			$(".toast").remove();
			Materialize.toast(endMessage,2000);
			console.clear();
		}
	}
};