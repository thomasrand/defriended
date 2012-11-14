$(function() { 
	$('#reload').click(function() {
		FRIEND_CHECK.loadNew();
	});

	$('.clearIcon').live('click', function(){

		$(this).parent().remove();
	})

});

var FRIEND_CHECK = {

	oldArray : JSON.parse(localStorage['id']),
	newArray : [],
	missingFriends : [],

	/* Load the array from facebook */
	loadNew : function() {
		/*  Set the newArray to Empty */
		FRIEND_CHECK.newArray = [];

		fbStorage = 'newList.json'; /* This should be replace w/ the FB feed */

		$.getJSON(fbStorage, function(data){
			$.each(data.data, function(key, val) {
				var id = val.id; 
				FRIEND_CHECK.newArray.push(id); 
			});
			FRIEND_CHECK.compare();
		});
		   
	},

	/* Compare the oldArray to the newArray and push missing IDs to the display method */
	compare : function() {

		$.each(FRIEND_CHECK.oldArray, function() {
			item = this.toString();
			if($.inArray(item, FRIEND_CHECK.newArray) < 0) {
				console.log('ID ' + item + ' is missing!');
				FRIEND_CHECK.display(item);
			} else 
				null 
		});

		/* Overwrite current friends list within Local Storage */
		localStorage["id"] =  JSON.stringify(FRIEND_CHECK.newArray);

		/* Save the localStorage to oldArray */
		FRIEND_CHECK.oldArray = JSON.parse(localStorage['id']);

		/* Overwrite active missing friends list within Local Storage */
		/* localStorage["missingFriends"] = JSON.stringify(missingFriends); */
	},

	/* Display a missing friend on the DOM */
	display : function(missingFriend) {

			user = 'https://graph.facebook.com/' + missingFriend;
			friend = '<div class="friend"></div>';
			picture = '<img src =' + user + '/picture' + '>';  
			name = '<span class= "name"> Thomas Rand </span>'; /*Replace w/ Call to FB */
			actions = '<div class="actions"><img class="personIcon" src="img/person.png" /><span>View Profile</span></div><img class="clearIcon" src="img/clear.png" />';

			$('#friendListing').append(friend);
			$('.friend:last').append(name);
			$('.friend:last').append(picture);
			$('.friend:last').append(actions);
	}


} 
