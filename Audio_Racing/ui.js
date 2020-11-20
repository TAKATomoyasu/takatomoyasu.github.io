//spaceというクエリを送るのでspaceがあれば、クエリはそのまま、
//そうでない時（クエリがない時、または文字列が違う時）はクエリをなくす
let query = window.location.search;
//◯◯==××という配列に分解
let queries = query.slice(1).split("&");
let referer = false;
//配列を順番に回して、◯◯の方に"space"という文字列があったら、refererをtrueにして抜ける
for (let i = 0; i < queries.length; i++) {
	if (queries[i].split("=")[0] == "space") {
		referer = true;
		break;
	}
}
//refererがfalseだったら、該当のクエリはないので、クエリの文字列を空にする
if (!referer) query = "";
//↑でqueryの文字列の処理が終わったので、リンクのURLの末尾にqueryという変数を追加してください
window.onload = function () {
	var target = document.getElementById("button_back");
	var url = `https://www.iiiexhibition.com/`;
	if (query) url = 'https://extra2020-dev.iiiexhibition.com/' + query;
	target.href = url;
}

$(document).ready(function () {
	var w = $(window).width();
	var x = 480;
	if (w <= x && $('.square').length) {
		$('iframe').css('display', 'none');
		$('.square').css('display', 'block');
	}

	$('.button_good').on('click', function (e) {
		$('.button_good').children('img').attr('src', './img/icon_loveheart_iine.png');
	});

	$('#button-1').click(function () {
		if ($('.caption_jp').css('display') == 'block') {
			$('.title_jp').css('display', 'none');
			$('.caption_jp').css('display', 'none');
			$('.author__name_jp').css('display', 'none');
			$('.comment_jp').css('display', 'none');
			$('.return_jp').css('display', 'none');
			$('.title_en').fadeIn();
			$('.caption_en').fadeIn();
			$('.author__name_en').fadeIn();
			$('.comment_en').fadeIn();
			$('.return_en').fadeIn();
			if ($('.caption_text').css('height') == '120px') {
				$('#moreread__label').attr('data-display', $('#moreread__label').data('text')[1]);
			} else {
				$('#moreread__label').attr('data-display', $('#moreread__label').data('text')[3]);
			}
		} else {
			$('.title_en').css('display', 'none');
			$('.caption_en').css('display', 'none');
			$('.author__name_en').css('display', 'none');
			$('.comment_en').css('display', 'none');
			$('.return_en').css('display', 'none');
			$('.title_jp').fadeIn();
			$('.caption_jp').fadeIn();
			$('.author__name_jp').fadeIn();
			$('.comment_jp').fadeIn();
			$('.return_jp').fadeIn();
			if ($('.caption_text').css('height') == '120px') {
				$('#moreread__label').attr('data-display', $('#moreread__label').data('text')[0]);
			} else {
				$('#moreread__label').attr('data-display', $('#moreread__label').data('text')[2]);
			}
		}
	});

	// $('#moreread__switch').click(function () {
	// 	if ($('.caption_jp').css('display') == 'block') {
	// 		if ($('.caption_text').css('height') == '120px') {
	// 			$('#moreread__label').attr('data-display', $('#moreread__label').data('text')[0]);
	// 		} else {
	// 			$('#moreread__label').attr('data-display', $('#moreread__label').data('text')[2]);
	// 		}
	// 	} else {
	// 		if ($('.caption_text').css('height') == '120px') {
	// 			$('#moreread__label').attr('data-display', $('#moreread__label').data('text')[1]);
	// 		} else {
	// 			$('#moreread__label').attr('data-display', $('#moreread__label').data('text')[3]);
	// 		}
	// 	}
	// });

})