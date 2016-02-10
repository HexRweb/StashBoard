var stashboard =
{
	CONSTANTS: 
	{
		MAX_COURSES: 10
	},
	onUnload : function()
	{
		alert(document.activeElement.document.referrer);
		return "Are you sure you want to leave?";
	},
	init : function(opts)
	{
		window.onbeforeunload = stashboard.onUnload;
		stashboard.courses.array = $.map(stashboard.courses,function(e){return e;});
		$(stashboard.courses.array).each(function(i)
		{
			var $this = $(this)[0], block = i+1;
			console.log($this);
			if($this.active)
			{
				$("<section></section>",
				  {
						id: "block-" + block + "_" + $this.name.replace(/ /g,"_")
				}).html($("<iframe></iframe>",
					{
						src: $this.link,
						height: $(window).height - 64 - 52,
						width: $(window).width - 40
					})).appendTo($("#block-"+block));
				$("<li><a href=\"#/block-"+block+"_"+$this.name.replace(/ /g, "_")+"\">"+$this.name+"</a></li>").appendTo($("#block-"+block+"-menu"));
			}
			
			$($this.other_links).each(function(i){
				$t = $this.other_links[i];
				$("<section></section>",
					{id:"block"+block+"_"+$t.name.replace(/ /g,"_")
					}).html($("<iframe></iframe>"),
					{
						src: $t.link,
						height: $(window).height - 64 -52,
						width: $(window).width - 40
				}).appendTo($("#block-"+block));
				$("<li><a href=\"#/block-"+block+"_"+$t.name.replace(/ /g,"_")+"\">"+$t.name+"</a></li>").appendTo($("#block-"+block+"-menu"));
				
			});
		});
		opts.callback();
	},
	user :
	{
		
	},
	preferences :
	{
		
	},
	courses :
	{
		1:
		{
			active:true,
			"teacher" : "Davalos",
			"name" : "Physical Education",
			"default":"",
			other_links:
			[
				{
					"name":"Block 1 test 1",
					"link":"https://www.facebook.com"
				},
				{
					"name":"Block 1 test 2",
					"link":"https://www.google.com/plus"
				},
				{
					"name":"Block 1 test 3",
					"link":"https://www.linkedin.com"
				}
			]
		},
		2:
		{
			active:true,
			"teacher" : "Wieland",
			"name" : "Chemistry",
			other_links:
			[
				{
					"name":"Block 2 test 1",
					"link":"https://wwww.google.com"
				},
				{
					"name":"Block 2 test 2",
					"link":"https://www.yahoo.com"
				},
				{
					"name":"Block 2 test 3",
					"link":"https://www.bing.com"
				}
			]
		},
		3:
		{
			active:true,
			"teacher" : "Smith",
			"name" : "English",
			other_links:
			[
				{
					"name":"Block 3 test 1",
					"link":"https://www.hexr.org"
				},
				{
					"name":"Block 3 test 2",
					"link":"https://www.rbfcu.com"
				},
				{
					"name":"Block 3 test 3",
					"link":"https://www.test.com"
				}
			]
		},
		4:
		{
			active:true,
			"teacher" : "Mickel",
			"name" : "CompSci",
			other_links:
			[
				{
					"name":"Block 4 test 1",
					"link":"https://www.lol.com"
				},
				{
					"name":"Block 4 test 2",
					"link":"https://www.ifunny.com"
				},
				{
					"name":"Block 4 test 3",
					"link":"https://www.yahoo.co.nz"
				}
			]
		},
		5:
		{
			active:true,
			"teacher" : "Llanos",
			"name" : "Spanish",
			other_links:
			[
				{
					"name":"Block 5 test 1",
					"link":"https://www.stumbleupon.com"
				},
				{
					"name":"Block 5 test 2",
					"link":"https://www.pinterest.com"
				},
				{
					"name":"Block 5 test 3",
					"link":"https://www.test.com"
				}
			]
		},
		6:
		{
			active:true,
			"teacher" : "Bray",
			"name" : "Euro",
			other_links:
			[
				{
					"name":"Block 6 test 1",
					"link":"https://www.live.com"
				},
				{
					"name":"Block 6 test 2",
					"link":"https://www.yandex.com"
				},
				{
					"name":"Block 6 test 3",
					"link":"https://www.mail.com"
				}
			]
		},
		7:
		{
			active:true,
			"teacher" : "Seidl",
			"name" : "Biology",
			other_links:
			[
				{
					"name":"Block 7 test 1",
					"link":"https://www.codeanywhere.com"
				},
				{
					"name":"Block 7 test 2",
					"link":"https://www.test.com"
				},
				{
					"name":"Block 7 test 3",
					"link":"http://www.hexr.org"
				}
			]
		},
		8:
		{
			active:true,
			"teacher" : "Sullivan",
			"name" : "Calc AB",
			other_links:
			[
				{
					"name":"Block 8 test 1",
					"link":"https://www.linode.com"
				},
				{
					"name":"Block 8 test 2",
					"link":"https://www.gandi.net"
				},
				{
					"name":"Block 8 test 3",
					"link":"https://www.browserstack.com"
				}
			]
		},
	}
};