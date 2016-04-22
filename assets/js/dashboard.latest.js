var stashboard =
{
	MAX_FRAMES: 10,
	DEV: true, //Prevents things like onBeforeUnload from being called
	ROOT_DIR: "https://hexrweb.github.io/StashBoard/",
	section_class : "white-text",
	frames: [],
	num_frames: 0,
	untitledIndex: 1,
	submenu_prefix: "block_",
	submenu_suffix: "_menu",
	slide_prefix: "block_",
	slide_suffix: "_default",
	init: function()
	{
		$("#alert").leanModal();
		$(window).on("Stashboard-Err",stashboard.onErr);
		window.onbeforeunload = stashboard.onBeforeUnload;
		if((typeof stashboard.sections) !== "object")
		{
			$("#alert").html(stashboard.getTemplate("error")).openModal();
			stashboard.dispatchEvent("Stashboard-Err",{err:"Stashboard.sections not object"});
			return false;
		}
		$(stashboard.sections).each(function(e,i)
		{
			//console.log(i);
			i = stashboard.processObject(i);
			//console.log(i);
			stashboard.addBlock(i,e+1);
		});
		stashboard.addBlock({"title":"Calendar",url:"https://calendar.google.com/calendar/embed?src=" + stashboard.calendar},stashboard.sections.length + 2);
		//$("#loading").fadeOut(2500);
		stashboard.dispatchEvent("Stashboard-Init");
	},
	addBlock: function(blockInfo,block_number)
	{
		$("#customNav").append(stashboard.generateGlobalNavItem(block_number,blockInfo.title));
		$(stashboard.generateSlideNav(blockInfo.title,block_number)).insertAfter($("#customNav"));
		$(".slides").prepend(stashboard.generateSlide(blockInfo.url,block_number));
		if(typeof blockInfo.extensions === "object")
			stashboard.addSubLinks(blockInfo.extensions,block_number);
	},
	addSubLinks: function(subLinks,block_number)
	{
		$(subLinks).each(function()
		{

		});
	},
	generateGlobalNavItem: function(block_number,title)
	{
		//First, create a navigation block
		var navigationBlock = stashboard.getTemplate("globalNavItem");
		navigationBlock =
			navigationBlock.replace('{{activator}}',stashboard.submenu_prefix + block_number + stashboard.submenu_suffix)
			.replace('{{href}}',stashboard.slide_prefix + block_number + stashboard.slide_suffix)
			.replace("{{link_title}}",title);
		return navigationBlock;
	},
	generateSlideNav: function(title, block_number)
	{
		var slideBlock = stashboard.getTemplate("activationNav");
		var liTemplate = stashboard.getTemplate("activationNavItem")
			.replace("{{slide_id}}",stashboard.slide_prefix + block_number + stashboard.slide_suffix)
			.replace("{{name}}",title);
		slideBlock =
			slideBlock.replace('{{block_id}}',stashboard.submenu_prefix + block_number + stashboard.submenu_suffix)
			.replace('{{block_item}}',liTemplate);
		return slideBlock;
	},
	generateSlide: function(source,block_number)
	{
		var frame = stashboard.getTemplate("iframe").replace("{{source}}",source)
		return stashboard.getTemplate("block")
			.replace("{{block_id}}",block_number)
			.replace("{{default_id}}",stashboard.slide_prefix + block_number + stashboard.slide_suffix)
			.replace("{{frame}}",frame)
	},
	processObject: function(obj)
	{
		//For now, the only three properties / objects we're accepting are: title (displayed in nav) url(href) and extensions(sublinks)
		var ret = {};
		ret.title = (typeof obj.title === "string") ? obj.title : "Untitled " + stashboard.untitledIndex++;
		ret.url = (typeof obj.url === "string") ? obj.url : stashboard.ROOT_DIR + "badUrl.html#/title=" + ret.title;
		if(obj.extensions) ret.extensions = obj.extensions;
		return ret;
	},
	getTemplate: function(what)
	{
		return $("#" + what).prop("tagName") === "TEMPLATE" ? $("#" + what).html() : "<h3 class='center'>There was an error loading this content.</h3> <h5 class='center'>If you email support, please include this error code:</h5><pre class='center'>" + (stashboard.toHex("getTemplate " + what)) + "</pre>";
	},
	toHex: function(str)
	{
		var arr = [];
		for (var i = 0, l = str.length; i < l; i ++)
		{
			arr.push(Number(str.charCodeAt(i)).toString(16).toUpperCase());
		}
		return arr.join('');
	},
	fromHex: function(str)
	{
		str = str.toString();
		var ret = '';
		for (var i = 0; i < str.length; i += 2)
			ret += String.fromCharCode(parseInt(str.substr(i, 2), 16));
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
	},
	calendar: "ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t",
	hrefOverride: function()
	{
		$(".href_override").click(function(e){e.preventDefault()});
	}
};
stashboard.dispatchEvent("Stashboard-ready");