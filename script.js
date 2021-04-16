// 全部の要素がマウスホバーで変わるとか楽しくない？
// マウスホバーで透明になっちゃうとか
$(function () {
    $(".profile-image").fadeIn("slow");
    $(".message").click(() => {
        // $('.message').fadeOut();
        $(".message").text("まだ作り途中だもん");
    });

    //ヘッダーロゴの切り替え
    $("#header-logo").hover(
        function () {
            $(this).attr(
                "src",
                $(this)
                    .attr("src")
                    .replace("logo", "logo-jap")
            );
        },
        function () {
            $(this).attr(
                "src",
                $(this)
                    .attr("src")
                    .replace("logo-jap", "logo")
            );
        }
    );
    //profile-imageの切り替え
    // $(".profile-image").hover(
    //     function () {
    //         $(this).attr(
    //             "src",
    //             $(this)
    //                 .attr("src")
    //                 .replace("icon", "icon-shock")
    //         );
    //     },
    //     function () {
    //         $(this).attr(
    //             "src",
    //             $(this)
    //                 .attr("src")
    //                 .replace("icon-shock", "icon")
    //         );
    //     }
    // );
    $("#top-copy").hover(
        function () {
            $(this).text("ぽんぽこぽん！(´>ω<`)");
        },
        function () {
            $(this).text("パンパカパン！( ^ω^ )");
        }
    );

    //マウス移動時のイベントをBODYタグに登録する
    document.body.addEventListener("mousemove", function (e) {
        //座標を取得する
        var mX = e.pageX; //X座標
        var mY = e.pageY; //Y座標

        for (var i = 0; i < mouseList.length; i++) {
            $("." + mouseList[i].name).css({
                left: mX +
                    mouseList[i].ofsX +
                    mouseList[i].ofsXMul *
                    Math.cos((mouseList[i].ofsAngle + mY + window.pageYOffset) * (Math.PI / 180)) *
                    30,
                top: mY +
                    mouseList[i].ofsY +
                    mouseList[i].ofsYMul *
                    Math.sin((mouseList[i].ofsAngle + mX + window.pageYOffset) * (Math.PI / 180)) *
                    30
            });
        }
    });

    // スクロール時にも移動しようと思ったけど、上手くできなかった(´>ω<`)
    // //マウス移動時のイベントをBODYタグに登録する
    // document.addEventListener("scroll", function(e) {
    //     //座標を取得する
    //     var mX; //X座標
    //     var mY; //Y座標
    //     document.onmousemove = function(m) {
    //         // マルチブラウザ対応のため、引数eventが指定されないブラウザは、
    //         // グローバルなeventオブジェクトを利用する。
    //         if (m) {
    //             mX = m.pageX;
    //             mY = m.pageY;
    //         } else {
    //             mX = event.pageX;
    //             mY = event.pageY;
    //         }
    //     }
    //     for (var i = 0; i < mouseList.length; i++) {
    //         $("." + mouseList[i].name).css({
    //             left: mX +
    //                 mouseList[i].ofsX +
    //                 mouseList[i].ofsXMul *
    //                 Math.cos((mouseList[i].ofsAngle + mY + window.pageYOffset) * (Math.PI / 180)) *
    //                 30,
    //             top: mY +
    //                 mouseList[i].ofsY +
    //                 mouseList[i].ofsYMul *
    //                 Math.sin((mouseList[i].ofsAngle + mX + window.pageYOffset) * (Math.PI / 180)) *
    //                 30
    //         });
    //     }
    // });


    // サブマウスの個数
    var counter = 0;
    var mouseList = [];




    // ダミーマウスやるなら、ここのコメントアウトを解除
    //
    // // クリック時に、imgタグを追加し、マウスの情報を記録するオブジェクトを生成＆配列に入れる
    // document.body.onclick = function() {
    //     counter++;
    //     //   タグをhtmlに追加
    //     $("body").append(
    //         '<img srcset="https://taka-chin.com/images/cursor.png 2.5x" class="mouse m' +
    //         counter +
    //         '"></img>'
    //     );
    //     // console.log(
    //     //   '<img srcset="https://taka-chin.com/images/cursor.png 2.5x" class="mouse m' +
    //     //     counter +
    //     //     '"></img>'
    //     // );

    //     //マウスの名前や値を格納するオブジェクトを配列で管理する
    //     mouseList.push({
    //         name: "m" + counter,
    //         ofsX: Math.random() * 60 - 30,
    //         ofsY: Math.random() * 60 - 30,
    //         amp: 30,
    //         //ofsXのsinを足すか引くかを決定。1 - 2 * 0|2という形で、-1 / +1 を作りそれを掛け算する
    //         ofsXMul: 1 - 2 * Math.floor(Math.random() * 2),
    //         ofsYMul: 1 - 2 * Math.floor(Math.random() * 2),
    //         ofsAngle: Math.random() * 360
    //     });
    //     // console.log(mouseList);
    // };
});