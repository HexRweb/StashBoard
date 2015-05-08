var stashboard = 
{
	dimensions:
	{
		availWidth  : $(window).width() - 240,
		availHeight : $(window).height() - 52 - 64
	},
	requirements :
	{
		extensions: ["chrome-extension://dnboopdmbbpaicaphfkcphonijbfhopg/assets/logowhite.svg"]
	},
	init:function()
	{
		var listener = document.addEventListener("stashboardRequirementsUpdate",function(e)
		{
			if(e.detail)
				window.stashboard.update.HAC("loading...","Done loading HAC");
			else
				window.Materialize.toast("Some of the requirements are missing");
			listener = null;
		});
		stashboard.update.requirements();
	},
	user:
	{
		accessCenterURL :  "https://accesscenter.roundrockisd.org/HomeAccess/Classes/Classwork#q_login_now"
	},
	update:
	{
		requirements: function()
		{
			for(var i = 0; i  < stashboard.requirements.extensions.length; i++)
			{
				var isLast = i == stashboard.requirements.extensions.length-1;
				$.ajax(stashboard.requirements.extensions[i]).error(function(d)
				{
					console.log(d);
					document.dispatchEvent(new CustomEvent("stashboardRequirementsUpdate"),{"detail":false});
				}).success(function()
				{
					if(isLast)
						document.dispatchEvent(new CustomEvent("stashboardRequirementsUpdate",{"detail":true}));
				});
			}
		},
		HAC: function(startMessage, endMessage)
		{
			if(typeof startMessage === "undefined") startMessage = "Attempting to load HAC";
			if(typeof endMessage   === "undefined") endMessage   = "Done!";
			Materialize.toast(startMessage, 1200);
			$.ajax({url:"chrome-extension://dnboopdmbbpaicaphfkcphonijbfhopg/assets/logowhite.svg"}).success(function()
			{
				$.ajax(stashboard.user.accessCenterURL).success(function()
				{
					$("#hac").html("<iframe src='"+stashboard.user.accessCenterURL+"' width='"+stashboard.dimensions.availWidth + "' height='" + stashboard.dimensions.availHeight + "' ></iframe>");
					$("#hac").addClass("framed blue-grey lighten-5");
					$(".toast").remove();
					Materialize.toast("HAC is loading...",2500);
				}).error(function()
				{
					$("#hac").html("<div class='error'>The Home Access Center URL is not working. <a href='#/settings'>Check your settings</a> or <a href='#/hac' onclick='stashboard.update.HAC()'>try again</a></div>");
					$(".toast").remove();
					Materialize.toast("Error!",2000);
				});
			}).error(function()
			{
				$.ajax(stashboard.user.accessCenterURL).success(function()
				{
					$("#hac").html("<iframe src='"+stashboard.user.accessCenterURL+"' width='"+stashboard.dimensions.availWidth + "' height='" + stashboard.dimensions.availHeight + "' ></iframe>");
					$("#hac").addClass("framed blue-grey lighten-5");
					$(".toast").remove();
					Materialize.toast("StashBoard works best with <a href='https://chrome.google.com/webstore/detail/quickhac/dnboopdmbbpaicaphfkcphonijbfhopg' target='_blank'>qHAC</a>! You should add it. (<a href='https://chrome.google.com/webstore/detail/quickhac/dnboopdmbbpaicaphfkcphonijbfhopg' target='_blank'>Click here</a>)",0);
				}).error(function()
				{
					$("#hac").html("<div class='error'>The Home Access Center URL is not working. <a href='#/settings'>Check your settings</a> or <a href='#/hac' onclick='stashboard.update.HAC()'>try again</a></div>");
					$(".toast").remove();
					Materialize.toast("Error!",2000);
				});
			});
		}
	}
};