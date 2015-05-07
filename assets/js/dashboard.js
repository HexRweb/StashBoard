var stashboard = 
{
	dimensions:
	{
		availWidth  : $(window).width() - 240,
		availHeight : $(window).height() - 52 - 64
	},
	init:function()
	{
		$.ajax({url:"chrome-extension://dnboopdmbbpaicaphfkcphonijbfhopg/assets/logowhite.svg"}).success(
			function(){$("#hac").html("<iframe src='//accesscenter.roundrockisd.org/HomeAccess/Content/Student/Assignments.aspx' width='"+stashboard.dimensions.availWidth + "' height='" + stashboard.dimensions.availHeight + "' ></iframe>");})
			.error(function(){});
	},
	returns: {
		"dimensions": function(){return this.dimensions;}
	}
};