$(document).ready(function () {

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


	function showDetail(data){
		// 替换顶部的 背景图片
		$(".header-image-block").attr("style","background:url('"+ data['img'] +"');");
		$(".blog-post-image-block").attr("style","background:url('"+ data['img'] +"');");
        $(".blog-post-title").html(data['title']);


		$(".rich-text-block").html(data['content']);
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

//	detail page
    let id = getQueryString("id");
    if(id !== null){
        getDetail(id);
    }
});



