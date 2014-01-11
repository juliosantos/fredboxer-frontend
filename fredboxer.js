if (Meteor.isClient) {
  Session.set( "response", "" );
  Template.creator.response = function () {
    return Session.get( "response" );
  };

  $( function () {
    var $button = $( "[type=submit]" );
    $button.click( function (event) {
      event.preventDefault();
      $button.button( "loading" );
      Meteor.call( "createApp", $( "input" ).val(), function (error, result) {
        Session.set( "response", result.content );
        $( "form" ).slideUp();
      });
    });

    $( "#qr" ).click( function (event) {
      if (Session.get( "response" )) {
        window.open( "https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=http://" + Session.get( "response" ) + "&choe=UTF-8&chld=H" );
      } else {
        alert( "You need to create a playlist first!" );
      }
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    createApp : function (appName) {
      this.unblock();
      return Meteor.http.call( "GET", SPAWNER_HOST + "/spawn?auth_token=" + AUTH_TOKEN + "&name=" + appName );
      //return {content : appName};
    }
  });
}

