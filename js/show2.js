var Scoll={
	num:parseInt($('.scoll div').length)
	,reset:function(){
		var that=this;
		for(var i=0;i<that.num;i++){
			$('.scoll div:eq('+i+')').css({'top':'-'+(700*i)+'px','left':'-'+(100*i)+'%'});
		};
	}
	,turn:function(num){
		var that=Scoll;
		var num=num%that.num;
		var move=parseInt($('.scoll div:eq('+num+')').css('left').split('%')[0]);
		
			for(var i=0;i<that.num;i++){
                var left=parseInt($('.scoll div:eq('+i+')').css('left').split('%')[0])-move;
                $('.scoll div:eq('+i+')').animate({left:left+'%'});
		};
		this.turnId=num;
		$('.pages div').removeClass();
		$('.pages div[pagenum="'+this.turnId+'"]').addClass('focus');
	}
	,aotuturn:function(){
        var that=Scoll;
        that.turn(that.turnId+1);

	}
	,turnto: function(num){
		var that=Scoll;
		clearInterval(that.setId);
		this.turn(num);
		that.setId=setInterval(this.aotuturn,5000);
	}
	,makepages:function(){
		var html='<div class="pages">';
		for(var i=0;i<this.num;i++){
			html+='<div pagenum="'+i+'"></div>';
		};
		html+='</div>';
		$('.scollcont').append(html);
		$('.pages').css('width',30*this.num+'px');
	    $('.pages').css('left',($('.scoll').width()-$('.pages').width())/2+200+'px');
        $('.pages div[pagenum="0"]').addClass('focus');
	}
	,bind: function(){
		var that=this;
		$('.btnleft').on('click',function(){
			that.turnto(that.turnId-1);
		})
		$('.btnright').on('click',function(){
			that.turnto(that.turnId+1);
		})
		$('.pages div').on('mouseover',function(){
			that.turnto(parseInt($(this).attr('pagenum')));
		})
		$('.pages div').on('click',function(){
			that.turnto(parseInt($(this).attr('pagenum')));
		})
	}

	,init:function(){
		this.turnId=0;
		this.reset();
		this.makepages();
		this.setId=setInterval(this.aotuturn,5000);
		this.bind();
	}
}

Scoll.init();