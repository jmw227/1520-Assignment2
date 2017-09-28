 function placementTester(player)
	{
		//regular expression that ensures the user only uses a single A, B and S at the beginning of each ship and that the locations are either within the same row or the same column
		var reg_ex =/(?:([ABS]):?\(?([A-J])(10|[1-9])-(?:\2(?:10|[1-9])|[A-J]\3)\)?;? ?)(?:((?!\1)[ABS]):?\(?([A-J])(10|[1-9])-(?:\5(?:10|[1-9])|[A-J]\6)\)?;? ?)(?:((?!\1)(?!\4)[ABS]):?\(?([A-J])(10|[1-9])-(?:\8(?:10|[1-9])|[A-J]\9)\)?;? ?)/;
		var placeCheck = false;
		var firstLoop = true;
		var temp;
		var temp2;
		var shipLength;
		var placeString = player.placementString;
		var ships;
		var placements;
		//loop to ensure entered values are in the language denoted by the regular expression as well as to check to see if ships are properly sized
		while(!placeCheck)
		{
			// If the users original string is fine, then we do not want to ask them for ships again. 
			if(!firstLoop)
			{
				placeString = prompt(player.name+', enter your Ship Placements in a supported format\n(Ensure there is only 1 A, B, and S, as well as all placements either have their column or row match): ','A:A1-A5;B:B1-B4;S:C1-C3');
			}
			placeCheck = reg_ex.test(placeString);
			//don't do the extra work if the string is not in the language of the regular expression
			if(placeCheck)
			{
				//reduce the string down to a single  format, to allow for easy parsing
				placeString = placeString.replace(/[ ()]/g,'');
				placeString.trim();

				//split the string into the different ships
				temp = placeString.split(';');
				//ensure that the lengths of the ships are correct
				for(i=0;i<temp.length;i++)
				{
					temp2 = temp[i].split(':');
					//change the length for checking whether the ship has the correct number of spaces
					switch(temp2[0])
					{
						case 'A':
						shipLength = 4;
						break;
						case'B':
						shipLength = 3;
						break;
						case 'S':
						shipLength = 2;
						break;
					}
					//check to see if the ship has the correct number of spaces, if not the form is 'invalid'
					if(((temp2[1].charCodeAt(3)-temp2[1].charCodeAt(0)) != shipLength)&& ((temp2[1].charCodeAt(4)-temp2[1].charCodeAt(1))!= shipLength))
						{
							placeCheck=false;
						}
				}
			}
			//ensure that if we loop again our second prompt will appear
			firstLoop=false;
			
		ships = temp;
		//sort to ensure the order of the string is Aircraft  carrier, battleship then Submarine.
		ships.sort();

		
			for(j=0;j<ships.length;j++)
			{
				ships[j]=generateFullString(ships[j], 5-j);
			}
			a = ships[0].split(' ');
			b = ships[1].split(' ');
			s = ships[2].split(' ');
			
			for(i=0;i<a.length;i=i+2)
			{
				for(j=0;j<b.length;j=j+2)
				{
					if((a[i]+a[i+1])==(b[j]+b[j+1]))
					{
						placeCheck = false;
					}
				}
				for(k=0;k<s.length;k=k+2)
				{
					if((a[i]+a[i+1])==(s[k]+s[k+1]))
					{
						placeCheck = false;
					}
				}
			}
			for(j=0;j<b.length;j=j+2)
			{
				for(k=0;k<s.length;k=k+2)
				{
					if((b[j]+b[j+1])==(s[k]+s[k+1]))
					{
						placeCheck = false;
					}
				}
			}
		}
		
		//get a more usable string for the ships
		var outString = a+b+s;
		return outString;
		
	}
	
function generateFullString(ship, length)
{
		var st='';
		//reduces the location string down to each space occupied
		ship=ship.replace(/[ABS]:/, '');

		var k;
		//write out ALL locations that are within the target area of the specified ship
		if(ship.charAt(0)==ship.charAt(3))
		{
			k=parseInt(ship.charAt(1));
			for(i=0;i<length;i++)
			{
				
				st =st+ (ship.charAt(0)+(k+i))+' ';
			}
		}else
		{
			k= ship.charCodeAt(0);
			for(i=0;i<length;i++)
			{
				
				st = st+(String.fromCharCode(k+i)+ship.charAt(1))+' ';
			}
		}
		return st;
}
	
function playerInfo()
	{
		//player objects
		var playerOne={name:'', placementString:''};
		var playerTwo={name:'', placementString:''};
		
		playerOne.name = prompt('Enter Name of Player 1: ', 'Player 1');
		playerOne.placementString = prompt(playerOne.name+', enter your Ship Placements: ','A:A1-A5;B:B1-B4;S:C1-C3');
		//ensure that the string entered is acceptable
		playerOne.placementString = placementTester(playerOne);
		playerTwo.name = prompt('Enter Name of Player 2: ', 'Player 2');
		playerTwo.placementString = prompt(playerTwo.name+', enter your Ship Placements: ','A:A1-A5;B:B1-B4;S:C1-C3');
		playerTwo.placementString = placementTester(playerTwo);
		//store names and placementstrings for both players
		sessionStorage.setItem('playOneName', playerOne.name);
		sessionStorage.setItem('playOnePlace', playerOne.placementString);
		sessionStorage.setItem('playTwoName', playerTwo.name);
		sessionStorage.setItem('playTwoPlace', playerTwo.placementString);
		document.getElementById('playButton').style.display = 'none';
		sessionStorage.setItem('currentPlayer', '2');
		sessionStorage.setItem('playOneScore', 24);
		sessionStorage.setItem('playTwoScore', 24);
		changeTurns();
		//Begin Playing
}
function Play(clicked_id)
{
	document.getElementById('topGrid').style.display = 'none';
	document.getElementById('botGrid').style.display = 'none';
	var swap = sessionStorage.getItem('currentPlayer');
	var enemy;
	switch(swap){
	case '2':
	
		enemy = sessionStorage.getItem('playOnePlace');

		break;
	case '1':
	
		enemy = sessionStorage.getItem('playTwoPlace');

		break;
	}
	
	var currentID = clicked_id.replace(/T/, "");
	document.write(currentID);
	//FOR LOOP TO CHECK IF THE BOX CLICKED IS A HIT OR A MISS, ADD THE SESSIONSTORAGE FOR HIT/MISS TRACKING
	for(i=0;i<enemy.length;i=i+2)
	{
		
	}
	
	changeTurns();
	
}
		
function changeTurns()
{
	var swap = sessionStorage.getItem('currentPlayer');
	var currentName;
	var currentPlace;
	switch(swap){
	case '2':
		currentName = sessionStorage.getItem('playOneName');
		currentPlace = sessionStorage.getItem('playOnePlace');
		sessionStorage.setItem('currentPlayer', '1');
		break;
	case '1':
		currentName = sessionStorage.getItem('playTwoName');
		currentPlace = sessionStorage.getItem('playTwoPlace');
		sessionStorage.setItem('currentPlayer','2');
		break;
	}
	alert('It is '+currentName+'\'s Turn');
	document.getElementById('topGrid').style.display = 'block';
	document.getElementById('botGrid').style.display = 'block';
	var locID;
	var a;
	currentPlace = currentPlace.split(',');
	for(i=0;i<currentPlace.length-1;i++)
	{
		locID = 'Bot'+currentPlace[i];
		document.getElementById(locID).style.backgroundColor = 'grey';
		if(i<5)
		{
			document.getElementById(locID).innerHTML = 'A';
		}else if(i<9)
		{
			document.getElementById(locID).innerHTML = 'B';
		}else if(i<12)
				document.getElementById(locID).innerHTML = 'S';
	
	}
	
	
}
