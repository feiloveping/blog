$(document).ready(function () {

    setCookie("page",0);
	let cateJson = [
		{"name": "首页", 'id': 0},
		{"name": "php", 'id': 2},
		{"name": "java", 'id': 3},
		{"name": "python", 'id': 4},
		{"name": "go", 'id': 5}

	];

	function showCategory(categoryId) {

		let cateString = "";
		let categoryClass = "menu-item menu-item-type-post_type menu-item-object-page";
		let categoryClassSelected = "menu-item menu-item-type-post_type menu-item-object-page current-menu-item";

		let categoryClassUsed;
		for (let i = 0; i < cateJson.length; i++) {
			if (parseInt(cateJson[i]['id']) === parseInt(categoryId)) {
				categoryClassUsed = categoryClassSelected;
			} else {
				categoryClassUsed = categoryClass;
			}
			cateString +=
				'<li class="' + categoryClassUsed + '">' +
				'<a href="index.html?cateId=' + cateJson[i]['id'] + '">' + cateJson[i]['name'] + '</a>' +
				'</li>';
		}
		$(".w-nav-menu").html(cateString);
	}

	function showTopBanner(categoryId,topData){
		let data = topData[categoryId.toString()];
		if (data == null){
			data = topData["1"];
		}

		let html = "<div class=\"blog-post-item w-dyn-item\">\n" +
			"                            <a class=\"blog-post-image-link-block w-inline-block\" title=\""+ data['title'] +"\" href=\"detail.html?id="+ data['id'] +"&cateId="+ categoryId +"\"\n" +
			"                               style=\"background-image: url('"+ data['img'] +"');\">\n" +
			"                                <div class=\"blog-posts first-blog-post-overlay\">\n" +
			"                                    <div class=\"blog-author-wrapper w-clearfix\">\n" +
			"                                        <div class=\"blog-author-image-block\"\n" +
			"                                             style=\"background-image: url('"+ data['img'] +"');\"></div>\n" +
			"                                        <div class=\"blog-author-name\">大胡子</div>\n" +
			"                                        <div class=\"blog-date\">2019-03-30</div>\n" +
			"                                    </div>\n" +
			"                                    <div class=\"first-blog-post-title\">【置顶】"+ data['title'] +"</div>\n" +
			"                                </div>\n" +
			"                            </a>\n" +
			"                            <div class=\"blog-summary-content-wrapper\">\n" +
			"                                <div class=\"summary-block\">\n" +
			"                                    <div class=\"summary-gradient\"></div>\n" +
			"                                    <p class=\"blog-summary-paragraph\"> "+ data['content'] +" </div>\n" +
			"                                <a href=\"detail.html?id=\"" + data['id'] + "&cateId="+ categoryId +"\">阅读更多 →</a>\n" +
			"                            </div>\n" +
			"                            <a href=\"travels.html\" rel=\"category tag\">游记</a></div>";
		$("#top").html(html);
	}

	function showDetail(data){
		// 替换顶部的 背景图片
		$(".header-image-block").attr("style","background:url('"+ data['img'] +"');");
		$(".blog-post-image-block").attr("style","background:url('"+ data['img'] +"');");
        $(".blog-post-title").html(data['title']);


		$(".rich-text-block").html(data['content']);
	}

	function showList(articleListData,isfirst){
	    // 展示第一个文章
        if(isfirst){
            let firstData = articleListData[0];
            let html = "                  <a class=\"big-archive blog-post-image-link-block w-inline-block\" title=\""+ firstData['title'] +"\"\n" +
                "                       href=\"detail.html?id="+ firstData['id'] +"\"\n" +
                "                       style=\"background-image: url('"+ firstData['img'] +"');\">\n" +
                "                        <div class=\"first-blog-post-overlay\">\n" +
                "                            <div class=\"blog-author-wrapper w-clearfix\">\n" +
                "                                <div class=\"blog-author-image-block\"\n" +
                "                                     style=\"background-image: url('"+ firstData['img'] +"');\"></div>\n" +
                "                                <div class=\"blog-author-name\">大胡子</div>\n" +
                "                                <div class=\"blog-date\">2019-03-31</div>\n" +
                "                            </div>\n" +
                "                            <div class=\"first-blog-post-title\">"+ firstData['title'] +"</div>\n" +
                "                        </div>\n" +
                "                    </a>\n" +
                "                    <a href=\"life.html\" rel=\"category tag\">随笔</a>"
            $('.first-blog-post-item').html(html);
            // 展示其它文章
            articleListData = articleListData.slice(1);
        }

        let listHtml = "";
        if(articleListData.length === 0){
            alert('data not found')
        }
        for (let i=0;i<articleListData.length;i++){
            listHtml += "<div class=\"blog-post-item w-col w-col-4 w-dyn-item\">\n" +
                "                    <a class=\"blog-post-image-link-block medium w-inline-block\" title=\""+ articleListData[i]['title'] +"\" href=\"/detail.html?id="+ articleListData[i]['id'] +"\" style=\"background-image: url('"+ articleListData[i]['img'] +"');\">\n" +
                "                        <div class=\"first-blog-post-overlay medium\">\n" +
                "                            <div class=\"first-blog-post-title medium\">"+ articleListData[i]['title'] +"</div>\n" +
                "                            <div class=\"blog-author-wrapper medium w-clearfix\">\n" +
                "                                <div class=\"blog-author-image-block small\" style=\"background-image: url('"+ articleListData[i]['img'] +"');\"></div>\n" +
                "                                <div class=\"blog-author-name small\">大胡子</div>\n" +
                "                                <div class=\"blog-date small\">2019-03-31</div>\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </a>\n" +
                "                </div>";
        }
        $("#article-list").append(listHtml);
	}

    function getArticleList(page) {
	    console.log("===",page,"===");
        $.ajax({
            url: "http://127.0.0.1:8080/server/articleList.php?page="+page,
            success: function(data){
               let articleListData = JSON.parse(data);
               showList(articleListData,true);
            }});
    }

    function getDetail(id) {
        $.ajax({
            url: "http://127.0.0.1:8080/server/detail.php?id="+id,
            success: function(data){
                let detail = JSON.parse(data);
                showDetail(detail);
            }});
    }

	let categoryid = getQueryString("cateId");

    if(categoryid === null){
		categoryid = 0;
	}
	showCategory(categoryid);
	let topData = 	articleData();
	showTopBanner(categoryid,topData);
    getArticleList(0);

	$("#get-more").click(function () {
	    let page = parseInt(getCookie("page"));
	    if(page === 0 || page === "0"){
	        page = 1;
        }else{
	        page = page + 1;
        }
        setCookie("page",page)
        getArticleList(page);
    });



//	detail page
    let id = getQueryString("id");
    if(id !== null){
        getDetail(id);
    }
});



