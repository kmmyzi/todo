$(function(){
	var add=$(".add");
	console.log(add)
	var ad=$(".ad");
	var text=$(".text");
	var input=$(".text input");
	var ul=$(".ul");
	//存储记录的数组
	var arr=[];
	//触摸事件的起始位置
	var stratP;
	var todo={
			name:input.val(),
			state:0
		};
	if(localStorage.x){
		arr=JSON.parse(localStorage.x);
		render();
	}
	add.on("touchend",function(){
		text.css("display","block")
	})
	ad.on("touchend",function(){
		v=$.trim(input.val());
		if(!v){
			return;
		}
		todo={
			name:input.val(),
			state:0
		};
		arr.push(todo);
		localStorage.x=JSON.stringify(arr);

		render();
		input.val("");
	})
	
	ul.on("touchstart","li",function(e){
		stratP=e.originalEvent.changedTouches[0].clientX;
	})
	ul.on("touchend","li",function(e){
	  var index=$(this).index();
	  var p=e.originalEvent.changedTouches[0].clientX;
	  if(p-stratP>50){
	  		$(this).preventDefault();
	  	    arr[index].state=1;
		    $(this).addClass("done");
	  }
	  if(p-stratP<-50){	 
	  		$(this).preventDefault();
	  	    arr[index].state=0;
		    $(this).removeClass("done");
	  }
	  localStorage.x=JSON.stringify(arr);
	})
	function render(){
		ul.empty();
		for(var i=0;i<arr.length;i++){
			var c=arr[i].state?"done":"";
			$("<li class='"+c+"'><a href=''>"+arr[i].name+"</a><span class='delete'>X</span></li>").appendTo(ul);
		}
	}
	
	//footer触摸
	var divs=$(".nav div");
	divs.on("touchstart",function(){
		divs.removeClass("xuan");
		$(this).addClass("xuan");
		ul.find("li").show();
		if($(this).attr("data-role")==="com"){
			ul.find("li:not(.done)").hide();
		}else if($(this).attr("data-role")==="re"){
			ul.find("li.done").hide();
		}
	})
	//删除事件
	ul.on("touchend",".delete",function(){
         var li=$(this).closest(("li"));
         var indexs=li.index();
         arr.splice(indexs,1);
         localStorage.x=JSON.stringify(arr);
         li.addClass("ani-delete");
         li.delay(800).queue(function(){
         	$(this).remove().dequeue();
         })
	})
	//清除已完成
	var clearall=$(".sc")
	clearall.on("touchend",function(){
		var done=ul.find(".done");
		done.each(function(index){
			$(this).delay(index*100).queue(function(){
				$(this).addClass("ani-delete").dequeue();
			}).delay(800).queue(function(){
				$(this).remove().dequeue();
			})
		})
		var newarr=[];
		for(var i=0;i<arr.length;i++){
			if(arr[i].state==0){
				newarr.push(arr[i]);
			}
		}
		arr=newarr;
		localStorage.x=JSON.stringify(arr);
	})
})