   $( document ).ready(function() { 
    var results;
    var topics = ["freedom", "trump", "america", "liberty"];
        $("#add-topic").on("click", function(event) {
          event.preventDefault();
          // This line grabs the input from the textbox
          var topic = $("#topic-input").val().trim();
          if (topic == "") {
            return;
          }
          // Adding topic from the textbox to our array
          topics.push(topic);
          if (topic == "") {
            return;
          }
           else {
            renderButtons();
          }
          })

       
    //renders buttons
  function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $("<button>");
          a.addClass("topic");
          a.attr("data-name", topics[i]);
          a.text(topics[i]);
          $("#buttons-view").append(a);
        } 
    }

  
      
         
      
  function displayTopics() {
      
      $( "#gifs-appear-here" ).empty();
        // Grabbing and storing the data-topic property value from the button
        var dataName = $(this).attr("data-name");
        // Constructing a queryURL using the topic name
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
          dataName + "&api_key=dc6zaTOxFJmzC&limit=10";
        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
          })
          // After data comes back from the request
          .done(function(response) {
            console.log(queryURL);
            console.log(response);
            // storing the data from the AJAX request in the results variable
            results = response.data;
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
              // Creating and storing a div tag
              var topicDiv = $("<div>");
              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + results[i].rating);
              // Creating and storing an image tag
              var topicGif = $("<img>");
              topicDiv.addClass("topicDiv");
              // Setting the src attribute of the image to a property pulled off the result item
              topicGif.attr("src", results[i].images.fixed_height_still.url);
              topicGif.attr("data-state", "still");
               topicGif.attr("data-index", i);
              topicGif.addClass("gif");
              // Appending the paragraph and image tag to the topicDiv
              
              
              // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div
           
              topicDiv.append(p);
              topicDiv.append(topicGif);
              $("#gifs-appear-here").prepend(topicDiv);



            }
          });
  };

              
   

     $(document).on("click", ".topic", displayTopics);
     renderButtons();


       $(document).on("click", ".gif", function() {
          console.log("clicked gif", this)
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
           var state = $(this).attr("data-state");
           var i = $(this).attr("data-index");

      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
           if (state === "still") {
              $(this).attr("src", results[i].images.fixed_height.url);
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", results[i].images.fixed_height_still.url);
              $(this).attr("data-state", "still");
           }
         });

   
})