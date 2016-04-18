
window.onload=function(){
	var box=$('.box');
	var docH=document.documentElement.clientHeight;
	alert(docH)
	var imgs=$('img');
	alert(imgs.length)
	console.log(imgs)
	var arr=[];
	for(var i=0;i<box.length;i++){
		arr.push(box[i].offsetTop);		
	}
	alert(arr);
	
	window.onscroll=function(){
	var doc=document.body.scrollTop?document.body:document.documentElement;
		for(var i=0;i<box.length;i++){
			if(doc.scrollTop+docH>=arr[i]){
				for(var k=0;k<imgs.length;k++){
			imgs[k].src=imgs[k].getAttribute('all');
			// alert()
		}
		}
		}		
	}
		window.onscroll();
}
