"use strict";

document.observe("dom:loaded", function() {
	/* Make necessary elements Dragabble / Droppables (Hint: use $$ function to get all images).
	 * All Droppables should call 'labSelect' function on 'onDrop' event. (Hint: set revert option appropriately!)
	 * 필요한 모든 element들을 Dragabble 혹은 Droppables로 만드시오 (힌트 $$ 함수를 사용하여 모든 image들을 찾으시오).
	 * 모든 Droppables는 'onDrop' 이벤트 발생시 'labSelect' function을 부르도록 작성 하시오. (힌트: revert옵션을 적절히 지정하시오!)
	 */
	
	var imgarray = $$("#labs img");
	
	Droppables.add("selectpad", {onDrop: labSelect});
	Droppables.add("labs", {onDrop: labSelect});

	for(var i = 0; i<imgarray.length; i++){
		new Draggable(imgarray[i], {revert: true});
	}

	var selectedimg = $$("#selectpad > img");
	for(var i = 0; i<selectedimg.length; i++){
		new Draggable(selectedimg[i], {revert: true});
	}

});

function labSelect(drag, drop, event) {
	/* Complete this event-handler function 
	 * 이 event-handler function을 작성하시오.
	 */
	
	var cnt = $$("#selectpad > img").length;
	if((drop.id == "selectpad") && (drag.parentNode.id == "labs")){
		if(cnt<3){
			 $("labs").removeChild(drag);
			 $("selectpad").appendChild(drag);

			 var li = document.createElement("li");
			 li.innerHTML = drag.getAttribute("alt");
			 $("selection").appendChild(li);
			 li.pulsate({
				duration: 1.0,
				delay: 0.5
			});
		}
	}
	else if((drop.id == "labs") && (drag.parentNode.id == "selectpad")){
		$("selectpad").removeChild(drag);
		$("labs").appendChild(drag);

		var removedlist = drag.getAttribute("alt");
		for(var i = 0; i<$$("#selection>li").length; i++){
			if(removedlist == $$("#selection>li")[i].innerHTML){
				$("selection").removeChild($$("#selection>li")[i]);
			}
		}
	}
}
