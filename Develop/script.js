$(function () {
  // Get the current date and display it in the header
  var currentDay = dayjs().format('MMMM D, YYYY');
  $("#currentDay").text("Today is " + currentDay);

  // Create an array of time slots (business hours)
  var timeSlots = [
    "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"
  ];

  // Create time blocks dynamically and add them to the container
  var container = $("#time-block-container");
  var currentHour = dayjs().hour();

  for (var i = 0; i < timeSlots.length; i++) {
    var timeBlock = $("<div>").addClass("row time-block");
    var hourColumn = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(timeSlots[i]);
    var descriptionColumn = $("<textarea>").addClass("col-8 col-md-10 description");
    var saveBtn = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save")
      .html('<i class="fas fa-save" aria-hidden="true"></i>');

    // Set the ID of each time block for future reference
    timeBlock.attr("id", "hour-" + i);

    // Check if the time block is in the past, present, or future
    if (i < currentHour) {
      timeBlock.addClass("past");
    } else if (i === currentHour) {
      timeBlock.addClass("present");
    } else {
      timeBlock.addClass("future");
    }

    // Append columns to the time block
    timeBlock.append(hourColumn, descriptionColumn, saveBtn);

    // Append the time block to the container
    container.append(timeBlock);
  }

  // Load saved events from local storage and populate the textareas
  for (var i = 0; i < timeSlots.length; i++) {
    var savedEvent = localStorage.getItem("hour-" + i);
    if (savedEvent !== null) {
      $("#hour-" + i + " .description").val(savedEvent);
    }
  }

  // Save the user's input to local storage when the save button is clicked
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).closest(".time-block").attr("id");
    var eventText = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, eventText);
  });
});
