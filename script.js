// 全部の要素がマウスホバーで変わるとか楽しくない？
// マウスホバーで透明になっちゃうとか
$(function(){
  $('.profile-image').fadeIn('slow');
  $('.message').click(()=>{
    // $('.message').fadeOut();
    $('.message').text('まだ作り途中だもん');
  });
  
  //ヘッダーロゴの切り替え
  $('#header-logo').hover(
    function(){
      $(this).attr('src', $(this).attr('src').replace('logo', 'logo-jap'));
  },function(){
    $(this).attr('src', $(this).attr('src').replace('logo-jap', 'logo'));
  });
    //profile-imageの切り替え
  $('.profile-image').hover(
    function(){
      $(this).attr('src', $(this).attr('src').replace('icon', 'icon-shock'));
  },function(){
    $(this).attr('src', $(this).attr('src').replace('icon-shock', 'icon'));
  });
  $('#top-copy').hover(
    function(){
    $(this).text('ぽんぽこぽん！(´>ω<`)');
  },function(){
    $(this).text('パンパカパン！( ^ω^ )');
  });
  
});