var dateObject= {
	date:new Date(),
	getDate:function(object){ 
							if (object.value.trim() !="") 
							 	this.date = new Date(object.value.substr(0,4),this.shortMonths.indexOf(object.value.substr(5,3)),1)
							else
								this.date = new Date();
							return this.date;							
							},
	monthsOfYear:["January","February","March","April","May","June","July","August","September","October","November","December"],
	shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
	daysOfWeek:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
	getYear:function(){ return this.date.getFullYear()},
	getMonth:function(){ return this.date.getMonth()},	
	getFirstDayOfMonth:function(){ return new Date(this.getYear(),this.getMonth(), 1).toString().substr(0,3)},
	getDayOfWeekMonthStarts:function(){return 1+ this.daysOfWeek.indexOf(this.getFirstDayOfMonth())},
	getNumdays:function(){ return new Date(this.getYear(),this.getMonth()+1, 0).getDate()},
	setDate:function(num){ this.date = new Date(this.date.setDate(num))},// to be deleted
	getLongMonth:function(){ return this.monthsOfYear[this.getMonth()] }
}

function datepicker(object){
	
	var parent;
	var currentMonthDay;
	var calContainer = document.createElement('div');
	var calTop = document.createElement('div');
	var calBody = document.createElement('div');
	var triangle = document.createElement('div');
	var a = function(val,id)
	{
		var a = document.createElement('a')
			a.innerHTML=val;
			a.id = id;
			a.addEventListener("click",moveMonth,true);	
			return a;
	};
	triangle.className = "triangle-up";
	calContainer.className="calendarContainer";
	calContainer.appendChild(calTop);
	calTop.className = "calTop";
	calBody.className = "calBody";
	calContainer.appendChild(triangle);	
	var head_ttable = document.createElement('table');
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	td.appendChild(new a("<<","prevClick"));
	tr.appendChild(td);
	var longDate = document.createElement('td');
	longDate.colSpan="5";
	tr.appendChild(longDate);
	var td = document.createElement('td');
	td.appendChild(new a(">>","nextClick"));
	tr.appendChild(td);
	head_ttable.appendChild(tr);
	var tr = document.createElement('tr');	
	for(var c =0;c<7;c++)
	{
		var weekdays="SMTWTFS"
		var td = document.createElement('td');
		td.innerHTML = weekdays[c];
		tr.appendChild(td);		
	}
	head_ttable.appendChild(tr);	
	calTop.appendChild(head_ttable);
	var farm_ttable = document.createElement('table');
		
///////////////////////////////////////////////////////////////////////////////////////////////	
	bind();
	function bind()
	{
		longDate.innerHTML = dateObject.getLongMonth() + ' ' + dateObject.getYear();
		var farm_ttable = document.createElement('table');
		var tr = document.createElement('tr');
		if(calBody.firstChild !=null)
			calBody.innerHTML="";
		for(var c =1;c<8;c++)
		{
			var td = document.createElement('td');	
			var a = document.createElement('a')
				a.addEventListener("click",writeDate,false);
				a.className = "dayNum";
				if(c<dateObject.getDayOfWeekMonthStarts())
					td.innerHTML="";
				else
				{				
					currentMonthDay = a.innerHTML=c-dateObject.getDayOfWeekMonthStarts()+1;	
					td.appendChild(a)				
				}				
			tr.appendChild(td);
		}
		
		farm_ttable.appendChild(tr);

		for(var c=1;c<=5;c++)
		{
			var tr = document.createElement('tr');		
			for(var b=1;b<=7;b++)
			{
				var a = document.createElement('a')
					a.className = "dayNum";
					if(++currentMonthDay <= dateObject.getNumdays())
					{
						a.innerHTML=currentMonthDay;
						a.addEventListener("click",writeDate,false);
						var td=document.createElement('td')	;
						td.appendChild(a);
						tr.appendChild(td);					
					}				
				}			
			farm_ttable.appendChild(tr);
		}
		farm_ttable.appendChild(tr);
		calBody.appendChild(farm_ttable)
		calContainer.appendChild(calBody);					
		document.body.appendChild(calContainer);
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////

	function writeDate(object)
	{
		parent.value = dateObject.getYear()+'-'+(dateObject.getLongMonth()).substr(0,3) +'-'+ ("0"+object.target.innerHTML).slice(-2);
		calContainer.style.display="none";
	}

	var obj = document.querySelectorAll("input#datepicker,input.datepicker");
	
	for(var c=0;c<obj.length;c++)
	{
		obj[c].readOnly = "true";
		obj[c].addEventListener("click",function(event){
				parent = event.target;
				dateObject.getDate(event.target);
				longDate.innerHTML = dateObject.getLongMonth() + ' ' + dateObject.getYear();				
				calContainer.style.top = 10+event.target.offsetHeight+event.target.offsetTop +'px'
				calContainer.style.left = event.target.offsetLeft	+'px'
				calContainer.style.display="block";
				bind();	
				calContainer.focus();	
		},true);
	}

	document.body.addEventListener("click",function(event)
	{
		if(!hasParentNode(event.target,calContainer)) calContainer.style.display = "none";	

	},true);

	function hasParentNode(objectNode,objectParent)
	{		
		while(objectNode.parentNode)
		{
			if(objectNode == objectParent)
				return true;
			else
				objectNode = objectNode.parentNode				
		}
		return false;
	}

	function moveMonth(event) 
	{
		switch(event.target.id)
		{			
			case "nextClick":				
				dateObject.date = new Date(dateObject.getYear(),dateObject.getMonth()+1, 1);	
				break;
			case "prevClick":
				dateObject.date = new Date(dateObject.getYear(),dateObject.getMonth()-1, 1);								
				break;
		}
		bind();
	}	
}