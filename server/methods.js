// add this function to meteor for call on clinet side
Meteor.methods({
    sendInvitation: function (to_emails, msg, map_id) {

        var to = to_emails.split(";");
        to.forEach(function(to_email){
                var invited_user = InvitedUsers.findOne({'emails.address':to_email,'map_id':map_id});
                if(!invited_user){
                    invited_user = add_invited_user(to_email,map_id);
                    console.log(invited_user);

                }


                console.log(Meteor.absoluteUrl()+"map/"+map_id+"/user_id"+invited_user._id);

                Email.send({
                    from: Meteor.user().emails[0].address,
                    to: to_email,
                    replyTo: Meteor.user().emails[0].address || undefined,
                    subject: Meteor.user().emails[0].address +" invited you to an Ekkli map",
                    text: "Hello "+to_email+",\n\n"+msg+"\n\nClick the following link to participate in this Ekkli Map:\n\n"
                        +Meteor.absoluteUrl()+"map/"+map_id+"/user_id/"+invited_user._id+"\n"
                });
            }
        )
    },
	addUserAchievement: function(achievement) {
		var user = Meteor.user();
		if (user && user.achievements) {
			user.achievements[achievement] = true;
			// TODO use $set
			Meteor.users.update({_id: Meteor.user()._id}, user);
		}
	}
	

});