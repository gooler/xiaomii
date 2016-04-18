 //getClass的兼容性调试
//弹出包装
 function c(b){
 	console.log(b);
 }
	function getClass(classname,obj){   
		// alert(2);
		var obj=obj||document;
		if(document.getElementsByClassName!=undefined){
			// alert("function1")
			return obj.getElementsByClassName(classname);
			
		}else{
			   // alert("function2")
			var arr=[];
			 // alert("function3")
			var all=obj.getElementsByTagName('*');
			
			for(var i=0;i<all.length;i++){

				if(check(all[i].className,classname)){
					// alert("function4")
					//alert("function5")
					arr.push(all[i]);
				 }//alert("function6")
			}
			return arr;
		}
	}


	function check(oldclass,newclass){
		var arr=oldclass.split('');
		for(var i=0;i<arr.length;i++){
			if(arr[i]==newclass){
				return true;
			}return false;
		}
		
	}

//getstyle的兼容性调试
	function getStyle(obj,attr){    
		// alert("function1")
		if(obj.currentStyle){
		// alert("a")
			return obj.currentStyle[attr];
		
		}else{

        	// alert("b")
			return getComputedStyle(obj,null)[attr];
		}
	}


	//设置和获取文本属性的兼容性
	function getText(obj,val){
		// alert('text1')
		if(val==undefined){
			if(obj.innerText){
				return obj.innerText;
			}else{
				return obj.textContent;
			}
		}else{
			if(obj.innerText){
				obj.innerText=val;
			}else{
				obj.textContent=val;
			}
		}
	}

//万能兼容性
 // alert(1);
function $(selcter,content){
	// alert(2)
	if( typeof selcter=="string"){
		content=content||document;
		if(selcter.charAt(0)=="#"){
			return document.getElementById(selcter.substr(1));
		}else if(selcter.charAt(0)=="."){
			// alert(1);
			return getClass(selcter.substr(1),content)
		}else if(/^[a-zA-Z][A-Za-z1-6]*$/.test(selcter)){
			return content.getElementsByTagName(selcter);
		}
	}	
	if(typeof selcter=="function"){
		on(obj,event,selcter);
	}
}
//去空格的兼容
function trim(obj,type){
	type=type||'lr';
	if(type=='a'){
		return obj.replace(/\s*/g,'');
	}else if(type=='l'){
		return obj.replace(/^\s*/g,'');
	}else if(type=='r'){
		return obj.replace(/\s*$/g,'');
	}else if(type=='lr'){
		return obj.replace(/^\s*|\s*$/g,'');
	}
}
//取出子集的各个元素	b为默认值此时取出标签元素   否则取出文本和标签元素
function getchilds(obj,type){
	var childs=obj.childNodes;
	type=type||'b';
	// console.log(childs);
	var newarr=[];
	if(type=='a'){
		for(var i=0;i<childs.length;i++){
			if(childs[i].nodeType==1||(childs[i].nodeType==3&&trim(childs[i].nodeValue)!='')){
			  	newarr.push(childs[i]);
			}
	    }
	}
	if(type=='b'){
		for(var i=0;i<childs.length;i++){
		if(childs[i].nodeType==1){
		    newarr.push(childs[i]);
		}
	}		
	}
	
    return  newarr;
}
//取出子节点的第一个元素
function getfirst(parent,type){
	return getchilds(parent,type)[0];
 }
 //取出子节点第二个元素
 function getlast(parent,type){
 	var all=getchilds(parent,type);
 	return all[all.length-1];
 }//去任意元素
 function getnum(parent,num){
 	return getchilds(parent,type)[num];
 }
 //取出下一个兄弟的节点
 function getnext(obj){
 	var  next=obj.nextSibling;
 	if(obj==null){
 		return false;
 	}
 	while(next.nodeType==8||next.nodeType==3&&trim(next.nodeValue)==''){
 		next=obj.nextSibling;
 		if(obj==null){
 		return false;
 	}
 	}

 	return next
 }
//取出上一个兄弟的节点
function getup(obj){
	var up=obj.previousSibling;
	if(obj==null){
			return false;
		}
	while(up.nodeType==8||up.nodeType==3&&drim(up.nodeValue)==''){
		up=obj.previousSibling;
		if(obj==null){
			return false;
		}
	}return up;
}
//绑定同一事件的多个处理程序
//1.添加多个处理程序 on(obj,event,fn)obj对象，event事件，fn执行函数
function on(obj,event,fn){
	if(obj.addEventListener){
		obj.addEventListener(event,fn,false);//通用
	}else{
		obj.attachEvent('on'+event,fn);//Ie6-10
	}

}
function of(obj,event,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(event,fn,false);
	}else{
		obj.detachEvent('on'+event,fn);
	}
}
//插入到某个对象之后，obj为要插入的对象，afterobj某个对象之后
function insertAfter(obj,afterobj){
	var next=getnext(afterobj);
	if(next==false){
		afterobj.parentNode.appendChild(obj);
	}else{
		afterobj.parentNode.insertBefore(obj.next);
	}
}
// alert(1)