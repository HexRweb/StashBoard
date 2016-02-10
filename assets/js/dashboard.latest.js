var stashboard =
{
	MAX_FRAMES: 10,
	DEV: true, //Prevents things like onBeforeUnload from being called
	init: function()
	{
		$("#alert").leanModal();
		$(window).on("Stashboard-Err",stashboard.onErr);
		window.onbeforeunload = stashboard.onBeforeUnload;
		if((typeof stashboard.sections) !== "object")
		{
			$("#alert").html("<div class=\"modal-content\"><h4>Uh-Oh! (Error)</h4><p>StashBoard Sections aren't properly setup. We'd love to help, but documentation for this error is not yet available. Pressing okay will <em>only</em> close this box</p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-action modal-close waves-effect waves-red btn-flat\">Okay</a></div>").openModal();
			stashboard.dispatchEvent("Stashboard-Err",{err:"Stashboard.sections not object"});
			return false;
		}
		$("#loading").fadeOut(2500);
		stashboard.dispatchEvent("Stashboard-Init");
	},
	dimensions :
	{
		window :
		{
			width: $(window).width(),
			height: $(window).height()
		}
	},
	onErr: function(e)
	{
		throw new Error(e.originalEvent.err);
	},
	onBeforeUnload : function()
	{
		if(!DEV)
			return "Stashboard takes some time to load";
	},
	onResize: function()
	{
		stashboard.dimensions.window.width = $(window).width();	
		stashboard.dimensions.window.height = $(window).height();	
	},
	dispatchEvent: function(type,args)
	{
		var event = document.createEvent('HTMLEvents',1,2);
		event.initEvent(type,true,true);
		$.extend(event,args);
		window.dispatchEvent(event);
	}
};