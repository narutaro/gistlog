$(document).ready(function() {

	// user profile
	$.getJSON("https://api.github.com/users/" + userName, parseProfile)
	function parseProfile(profile){
 		$('#profileImage').attr('src', profile.avatar_url);
 		$('#profileBio').html(profile.location);
		console.log("profile");
		console.log(profile);
	}

	// gist list
	$.getJSON("https://api.github.com/users/" + userName + "/gists", filterGists);

	function filterGists(gists){
		var gistsFilterd = gists.filter(function(gist){
			// remove multi file gist. get only markdown format gist(.md)
			if(Object.keys(gist.files).length == 1 && /(.*)\.md/.test(Object.keys(gist.files))){
				return true;
			}
		});
		parseList(gistsFilterd);
 	 //console.log("gist list: " + parseList(gistsFilterd));
		console.log(gistsFilterd);
	}


	function parseList(list){

		/*
		function dateFormat(updated_at){
			//var updated_date = new Date(list[0].updated_at);
			//var updated_date = new Date(updated_at);
			//alert(updated_date);
			//var updatedDate = updated_date.getMonth() + "/" + updated_date.getFullYear();
			var updatedDate = "test"
			return updatedDate;
		}
		*/

		//TODO: Stop using Mustache for simplicity
		//write without Mustache for updated_at format change
		var output = Mustache.render('<ol>{{#.}}<li class="gistList" gistId="{{id}}">{{description}} {{dateFormat(updated_at)}}</div>{{/.}}</ol>', list);
		console.log(output);
		//var updated_date = new Date(Date.parse(list[0].updated_at*1000));

		//console.log("output" + typeof output);	

		//$(".rightColumn").html(output);
		$("#pastGists").html(output);

		$(output).ready(function(){
			$(".gistList").click(function(){
     		var gistId = $(this).attr("gistId");
				getGist(gistId);
				//alert(gistId);
				//console.log("output" + typeof output);
			});
		});
	}

	// each gist
	function getGist(gistId){
		$.getJSON("https://api.github.com/gists/" + gistId, parseGist);
	}

	function parseGist(gist){
		var createdAt = gist.created_at;
		var updatedAt = gist.updated_at;
		var id = gist.id;
		var html_url = gist.html_url;
		var fileName = Object.keys(gist.files);
		var content = gist.files[fileName].content;
		//console.log(content);
		var content_html = parseMarkdown(content);
		//console.log("content_html" + typeof content_html);	
		console.log(gist);

		//profile gist goes to right top
		/*
		if(id == profileGistID){
			$(".prifile").text()
		}
		*/

		//$(".leftColumn").text("")
		$(".article").text("")
		//.append('<p class="gistId">gist id: '+ id + '</p>')
		.append(content_html);

		$(".gistUrl").text(id).attr("href", html_url);
	
		// TIPS: append above first otherwise this does not work
		$('pre code').each(function(i, block) {
   		hljs.highlightBlock(block);
		});

	}

	// markdown
	function parseMarkdown(markdown){
		var md = marked(markdown);
		console.log(md);
		return md;
	}

	// gistId is given by url query string like username.github.io/?=733b4e94aaaeed631098
	// TODO need to check if the given gistId is for this user's
	// TODO show default gistId when given gistId is not correct
	var qs = location.search.split('=')[1];
	function getGistId(qs){
		if (/^\w{20}$/.test(qs)){
			console.log("This is a gistId!");
			console.log("gistId: " + qs);
			return qs;
		}else{
			console.log("This is NOT gitId");
			return defaultGistId;
		};
	}

	var gistId = getGistId(qs);
	// TODO here if gistId is undefined, stop calling getGist();
	console.log(gistId);
	getGist(gistId);

	// misc
	$(function() {
		var leftColumnWidth = $(".leftColumn").width();
		console.log("W: " + leftColumnWidth);
	});

});

