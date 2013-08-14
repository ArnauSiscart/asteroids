var right_key = false;
var left_key = false;
var up_key = false;
var down_key = false;

$(document).ready(function() {
  $(document).keydown(function(e) {
    if (e.keyCode == 39) { 
      right_key = true;
    }  else if (e.keyCode == 38) {
      up_key = true;
    }  else if (e.keyCode == 37) {
      left_key = true;
    }  else if (e.keyCode == 40) {
      down_key = true;
    }
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 39) { 
      right_key = false;
    }  else if (e.keyCode == 38) {
      up_key = false;
    }  else if (e.keyCode == 37) {
      left_key = false;
    }  else if (e.keyCode == 40) {
      down_key = false;  
    }
  });

  $.doTimeout(5, function() {
    move_rocket();
    move_asteroids();
    check_for_collisions();
    return true;
  });
});

function move_rocket() {
  if(right_key && up_key) {
    $('#rocket').css({left:'+=4', top:'-=4'});
  } else if(right_key && down_key) {
    $('#rocket').css({left:'+=4', top:'+=4'});
  } else if (down_key && left_key) {
    $('#rocket').css({left:'-=4', top:'+=4'});
  } else if (left_key && up_key) {
    $('#rocket').css({left:'-=4', top:'-=4'});
  } else if (left_key) {
    $('#rocket').css({left:'-=4'})
  } else if (up_key) {
    $('#rocket').css({top:'-=4'})
  } else if (right_key) {
    $('#rocket').css({left:'+=4'})
  } else if (down_key) {
    $('#rocket').css({top:'+=4'})
  }
}

function check_for_collisions() {
  if(overlapping($('#moon'), $('#rocket'))) {
    you_won();
  } else if(overlapping($('#earth'), $('#rocket'))) {
    safe_zone();
  } else {
    if(overlapping($('#asteroide1'), $('#rocket'))) {
      game_over();
    }
    if(overlapping($('#asteroide2'), $('#rocket'))) {
      game_over();
    }
    if(overlapping($('#asteroide3'), $('#rocket'))) {
      game_over();
    }
    if(overlapping($('#asteroide5'), $('#rocket'))) {
      game_over();
    }
    if(overlapping($('#misil1'), $('#rocket'))) {
      game_over();
    }
    if(overlapping($('#misil2'), $('#rocket'))) {
      game_over();
    }
    if(overlapping($('#misil3'), $('#rocket'))) {
      game_over();
    }
    if(overlapping($('#explosion'), $('#rocket'))) {
      game_over();
    }
  }
}

function move_asteroids() { 
  $('#asteroide1').css({top:'+=2px'});
  $('#asteroide2').css({top:'+=4px'});
  $('#asteroide3').css({top:'+=1px'});
  $('#asteroide5').css({top:'+=3px'});
  $('#misil1').css({top:'-=4px', left:'-=4px'});
  $('#misil2').css({left:'-=3px'});
  $('#misil3').css({top:'-=10px', left:'+=10px'});

  if($('#asteroide1').position().top > $(window).height()) {
    var left = $(window).width() * Math.random()
    $('#asteroide1').css({top:'0px', left:left + 'px'});
  }

  if($('#asteroide2').position().top > $(window).height()) {
    var left = $(window).width() * Math.random()
    $('#asteroide2').css({top:'0px', left:left + 'px'});
  }

  if($('#asteroide3').position().top > $(window).height()) {
    var left = $(window).width() * Math.random()
    $('#asteroide3').css({top:'0px', left:left + 'px'});
  }

  if($('#asteroide5').position().top > $(window).height()) {
     var left = $(window).width() * Math.random()
    $('#asteroide5').css({top:'0px', left:left + 'px'});
  }

  if($('#misil1').position().top < 0) {
     var left = $(window).width() * Math.random()
    $('#misil1').css({top:$(window).height(), left:left + 'px'});
  }

  if($('#misil2').position().top > 0) {
     var left = $(window).width() * Math.random()
    $('#misil2').css({top:'0px', left:left + 'px'});
  }
  
  if($('#misil3').position().top < 0) {
     var left = $(window).width() * Math.random()
    $('#misil3').css({top:$(window).height(), left:left + 'px'});
  }
}

function overlapping(element1, element2) {
  return (
      (
        element1.position().left < element2.position().left && 
        element1.position().left + element1.width() > element2.position().left &&
        element1.position().top < element2.position().top && 
        element1.position().top + element1.height() > element2.position().top
      ) ||
      (
        element1.position().left < element2.position().left + element2.width() &&
        element1.position().left + element1.width() > element2.position().left + element2.width() &&
        element1.position().top < element2.position().top &&
        element1.position().top + element1.height() > element2.position().top
      ) ||
      (
        element1.position().left < element2.position().left + element2.height() &&
        element1.position().left + element1.width() > element2.position().left + element2.width &&
        element1.position().top < element2.position().top + element2.width &&
        element1.position().top + element1.height() > element2.position().top
      ) ||
      (
        element1.position().left < element2.position().left + element2.width() &&
        element1.position().left + element1.width() > element2.position().left &&
        element1.position().top < element2.position().top + element2.height() &&
        element1.position().top + element1.height() > element2.position().top
      )
    );
}

function game_over() {
  $('#rocket').css({top:'40%', left:'85%'});
}

function safe_zone() {
}  

function you_won() {
 $("#winner").fadeIn("fast");
}



