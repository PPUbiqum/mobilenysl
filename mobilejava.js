var myapp = new Vue({
    el: "#myapp",
    data: {
        pages: "index",

        team: {}

    },
    methods: {
        

        login:function () {

            // https://firebase.google.com/docs/auth/web/google-signin

            // Provider
            var provider = new firebase.auth.GoogleAuthProvider();
            // How to Log In
            firebase.auth().signInWithPopup(provider);
        
        

        },

        writeNewPost: function () {

            // https://firebase.google.com/docs/database/web/read-and-write

            var textToSend = document.getElementById("textInput").value;
            // Values
            var message = {
                message: textToSend,
                name: firebase.auth().currentUser.displayName,
            }
            console.log(message);


            firebase.database().ref('mobilenysl1').push(message)
            // A post entry.

            // Get a key for a new Post.

            //Write data

            console.log("write");
getPosts();

        }



    }
})













function getPosts() {

    firebase.database().ref('mobilenysl1').on('value', function (data) {
        var posts = document.getElementById("posts");
        posts.innerHTML = "";

        var messages = data.val();

        for (var key in messages) {
            var text = document.createElement("div");
            text.setAttribute("class","chatmessages")
            var element = messages[key];

            text.append(element.name+" : ", element.message);
            posts.append(text);
        }

    })

    console.log("getting posts");
    
    
    var messages =data.val();
    
    for (var key in messages) {
        
        var element = messages[key];
        
        var messagesender = document.createElement("div");
        messagesender.setAttribute("class","messagesender")
        
        
        messagesender.innerHTML = element.name;
    }

}






var teams = data.teams;
var teamarray;

function showTeams() {

    teamarray = []
    for (var i = 0; i < teams.length; i++) {

        if (!teamarray.includes(teams[i])) {
            teamarray.push(teams[i]);
        }


    }

    teamarray.sort();

    console.log(teamarray)




    for (var i = 0; i < teamarray.length; i++) {




        var team = teamarray[i].title;
        var dropdownfilter = document.getElementById("dropdownfilter");
        var option = document.createElement("option");
        option.append(team);
        dropdownfilter.append(option);
        dropdownfilter.setAttribute("value", teamarray[i].title);






    }

}
showTeams()


function filterteams() {

    var dropdownfilter = document.getElementById("dropdownfilter").value;

    myapp.team = teamarray.find(team => team.title == dropdownfilter);


}

document.getElementById("dropdownfilter").addEventListener("change", filterteams);
