var FRIEND_CHECK = {

	oldArray : JSON.parse(localStorage['id']),
	newArray : [],
	missingFriends : [],

	/* Load the array from facebook */
	loadNew : function() {
		/*  Set the Array to Empty */
		FRIEND_CHECK.newArray = [];

		fbStorage = 'newList.json'; /* This should be replace w/ the FB feed */

		$.getJSON(fbStorage, function(data){
			$.each(data.data, function(key, val) {
				var id = val.id; 
				FRIEND_CHECK.newArray.push(id); 
			});
		});

		window.setTimeout(FRIEND_CHECK.compare, 200);
		
	},

	/* Compare the oldArray to the newArray and push missing people to the missingFriends array */
	compare : function() {
 	
 		oldArray = FRIEND_CHECK.oldArray;

		$.each(oldArray, function() {
			item = this.toString();
			if($.inArray(item, FRIEND_CHECK.newArray) < 0) {
				console.log('ID ' + item + ' is missing!');
				FRIEND_CHECK.missingFriends.push(item);
			} else 
				null 
		});

		/* Overwrite current friends list within Local Storage */
		localStorage["id"] =  JSON.stringify(FRIEND_CHECK.newArray);

		/* Save the localStorage to oldArray */
		FRIEND_CHECK.oldArray = JSON.parse(localStorage['id']);
		console.log('Exectuted');
		window.setTimeout(FRIEND_CHECK.display, 200);

		/* Overwrite active missing friends list within Local Storage */
		/* localStorage["missingFriends"] = JSON.stringify(missingFriends); */

		
	},

	/* Display each unique person in the missingFriends array */
	display : function() {
		/* Remove current list of missing friends from DOM */
		$('.friend').remove();

		/* Display each item in the missingFriends array onto the DOM */
		$.each(FRIEND_CHECK.missingFriends, function(){
			user = 'https://graph.facebook.com/' + this;
			friend = '<div class="friend"></div>';
			picture = '<img src =' + user + '/picture' + '>';  
			name = '<span class= "name"> Thomas Rand </span>'; /*Replace w/ Call to FB */
			actions = '<div class="actions"><img class="personIcon" src="img/person.png" /><span>View Profile</span></div><img class="clearIcon" src="img/clear.png" />';

			$('#friendListing').append(friend);
			$('.friend:last').append(name);
			$('.friend:last').append(picture);
			$('.friend:last').append(actions);


		});
	
	}

} 
