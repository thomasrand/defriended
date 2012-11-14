var FRIEND_CHECK = {

	oldArray : [],
	newArray : [],
	missingFriends : [],

	/* Load the array from local storage */
	loadOld : function() {
		
		oldArray = FRIEND_CHECK.oldArray;
		arrayStorage = JSON.parse(localStorage['id']);

		$.each(arrayStorage, function() {
			oldArray.push(this);
		});

	},

	/* Load the array from facebook */
	loadNew : function() {
		
		newArray = FRIEND_CHECK.newArray;
		fbStorage = 'newList.json'; /* This should be replace w/ the FB feed */

		$.getJSON(fbStorage, function(data){
			$.each(data.data, function(key, val) {
				var id = val.id; 
				newArray.push(id); 
			});
		});
	},

	/* Compare the oldArray to the newArray */
	compare : function() {

		newArray = FRIEND_CHECK.newArray;
		oldArray = FRIEND_CHECK.oldArray;
		missingFriends = [];

		/* $('.friend').remove(); */

		$.each(oldArray, function() {
			item = this.toString();
			if($.inArray(item, newArray) < 0) {
				console.log('ID ' + item + ' is missing!');
				missingFriends.push(item);
				FRIEND_CHECK.display(item);
			} else
				return null 
		});

		/* Push to Local Storage */
		localStorage["id"] =  JSON.stringify(newArray);

		
	},

	/* Display the missing friends to the UI */
	display : function(missingFriend) {
		user = 'https://graph.facebook.com/' + missingFriend;

		friend = '<div class="friend"></div>';
		picture = '<img src =' + user + '/picture' + '>';  
		name = '<span class= "name"> Thomas Rand </span>';
		actions = '<div class="actions"><img class="personIcon" src="img/person.png" /><span>View Profile</span></div><img class="clearIcon" src="img/clear.png" />';
		
		$(function() {
			$('#friendListing').append(friend);
			$('.friend:last').append(name);
			$('.friend:last').append(picture);
			$('.friend:last').append(actions);


		});
	}

} 













/* -------  Depreciated Methods --------- */

/* This is an older JSON function
		$.getJSON("oldList.json", function(data){
			$.each(data.data, function(key, val) {

				var id = val.id; 
				oldArray.push(id); 

			});
		});
		*/


/* Fetch the Missing Friend's Name 
		$(function() {
			$.getJSON(user, function(data){
				name = data[0].name;
				console.log(name);
			});

		});
		*/