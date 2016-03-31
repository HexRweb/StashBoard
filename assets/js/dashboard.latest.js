var stashboard =
{
	MAX_FRAMES: 10,
	DEV: true, //Prevents things like onBeforeUnload from being called
	section_class : "white-text",
	frames: [],
	num_frames: 0,
	init: function()
	{
		$("#alert").leanModal();
		$(window).on("Stashboard-Err",stashboard.onErr);
		window.onbeforeunload = stashboard.onBeforeUnload;
		if((typeof stashboard.sections) !== "object")
		{
			$("#alert").html(stashboard.getTemplate("erroer")).openModal();
			stashboard.dispatchEvent("Stashboard-Err",{err:"Stashboard.sections not object"});
			return false;
		}
		$("#loading").fadeOut(2500);
		stashboard.dispatchEvent("Stashboard-Init");
	},
	createBlock : function(id, classes)
	{
		return $("<section></section>",{id:id, classes: classes}).appendTo($(".reveal .slides"));
	},
	getTemplate: function(what)
	{
		return $("#" + what).prop("tagName") === "TEMPLATE" ? $("#" + what).html() : "<h3 class='center'>There was an error loading this content.</h3> <h5 class='center'>If you email support, please include this error code:</h5><pre class='center'>" + (stashboard.toHex("getTemplate " + what)) + "</pre>";
	},
	toHex: function(str)
	{
		var arr = [];
	  for (var i = 0, l = str.length; i < l; i ++) {
		var hex = Number(str.charCodeAt(i)).toString(16).toUpperCase();
		arr.push(hex);
	  }
	  return arr.join('');
	},
	fromHex: function(str)
	{
		var hex = str.toString();
		var ret = '';
		for (var i = 0; i < hex.length; i += 2)
			ret += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		return ret;
	},
	dimensions :
	{
		window :
		{
			width: $(window).width(),
			height: $(window).height()
		},
		contentPane:
		{
			width: $(".slides").width(),
			height: $(".slides").height()
		}
	},
	onErr: function(e)
	{
		throw new Error(e.originalEvent.err);
	},
	onBeforeUnload : function()
	{
		if(! stashboard.DEV)
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
stashboard.dispatchEvent("Stashboard-ready");