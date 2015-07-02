var stashboard =
{
	init : function()
	{
		stashboard.courses.array = $.map(stashboard.courses,function(e){return e;});
		$(stashboard.courses.array).each(function(i)
		{
			var $this = $(this)[0], block = i+1;
			if($this.active)
			{
				$("<section id=\"block-"+block+"_"+$this.name+"\">"+$this.name+"</section>").appendTo($("#block-"+block));
				$("<li><a href=\"#/block-"+block+"_"+$this.name+"\">"+$this.name+"</a></li>").appendTo($("#block-"+block+"-menu"));
			}
		});
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
					"link":"https://www.bankofamerica.com"
				},
				{
					"name":"Block 3 test 2",
					"link":"https://www.rbfcu.com"
				},
				{
					"name":"Block 3 test 3",
					"link":"https://www.wellsfargo.com"
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
					"link":"https://www.ifunny.co"
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
					"link":"https://www.tumblr.com"
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
					"link":"https://www.gmail.com"
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
					"link":"https://www.github.com"
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