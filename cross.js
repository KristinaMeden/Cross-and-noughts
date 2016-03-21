$( function (){
	var mapWidth=10;
	mapHeight=10;
	winLength=5;
	for(var x=1; x<=mapWidth; x++) {
		for (var y=1;y<=mapHeight; y++) {
			$('<div></div>').addClass('field').data('x',x).data('y',y)
				.attr('id','field'+x.toString()+'-'+y.toString())
					.css({left:(x-1)*50, top:(y-1)*50}).appendTo('#map');
		}
	}
	var checkSight=false;
	var n=0;
	var m=0;
	$('.field').on('click', function(){
		if($(this).hasClass('field-cross') || $(this).hasClass('field-nought')) return;
		checkSight=!checkSight;
		$(this).addClass(checkSight?'field-cross':'field-nought');

		function check(x,y){
		  	return $('#field'+x.toString()+'-'+y.toString()).hasClass(checkSight? 'field-cross':'field-nought');
		}
		var startX=parseInt($(this).data('x'));
		var startY=parseInt($(this).data('y'));
		var directions = [{x:1, y:0},{x:0, y:1},{x:1, y:1},{x:-1, y:1}];

		for(i=0; i<directions.length; i++){

			var sum=0;

			$.each([-1,1], function(index,offset){

				var x=startX;
				var y=startY;
				
				do {
					x+=directions[i].x*offset;
					y+=directions[i].y*offset;
					sum++;
				} while(check(x,y));
			});

			if(sum-1>=winLength){
				alert("Выиграли " +(checkSight? 'x':'o'));
				$('.field').off('click');
				//$('#map').addClass('end');
			}
		}

	});
});