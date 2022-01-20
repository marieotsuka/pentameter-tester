let poemList = [];
let poemCount = 0;


$(document).ready(function(){ 

  const wghtmax = 700;
  const wdthmax = 150;

  //standard sliders
  $('.axis-range').on('input', function(){

    let value = parseInt($(this).val()); //get slider input value
    // console.log(value);

    const slidertype = $(this).data('type'); //get slider axis

    console.log("--"+slidertype, value );

    $('#poem').css("--"+slidertype, value);

  });

  $('#ss01').change(function(){
    if( $(this).is(':checked') ) {
      $('#poem').css('--ss01', 1);
    } else {
     $('#poem').css('--ss01', 0);
    }
  });

  $('#ss03').change(function(){
    if( $(this).is(':checked') ) {
      $('#poem a').css({
        '--ss03': 1,
        'text-decoration': 'none'
      });
    } else {
     $('#poem a').css({
      '--ss03': 0,
      'text-decoration': 'underline'
    });
    }
  });

  function getPoem( ){
    
    $('body').addClass('loading');

    $.getJSON("https://www.poemist.com/api/v1/randompoems")
      .done(function( data ) {
          console.log(data);
          poemList = data; // get poem data
          displayPoem(0);  // display first poem
          $('body').removeClass('loading');
        });
  }  
  
  function displayPoem(poemIndex){
    let poem = poemList[poemIndex];
    let text = poem["content"].replace(/\n/g, "<br />");
    let author = poem["poet"]; // object with name: nameofauthor, url: urlofauthor
    $('#poem h1').html(poem["title"]);
    $('#author').html('<a href="'+author["url"]+'" target="_blank">'+author["name"]+'</a>');
    $('#poem p').html(text);
  }

  $("#refresh").click(function(){

    if( !$('body').hasClass('loading') ){
       // only display poem if JSON from API has fully loaded

       if(poemCount < 4){        
         poemCount ++; // increment poem index until 5
         displayPoem(poemCount);
       }else{
         getPoem(); // get new batch of poems
         poemCount = 0; // reset poem index
       }       
    }
         
  });
  
  getPoem();

});
