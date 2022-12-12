// ensure that the code isn't run until the browser has finished rendering all the elements in the html.
$(function () {
  var scheduledEvents = [];
  var storedEvents = JSON.parse(localStorage.getItem("scheduledEvents"));
  if (storedEvents !== null) {
    scheduledEvents = storedEvents;
  };

  const nth = function(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    };
  };
  var Do = nth(Number(dayjs().format('d')));
  // $('#currentDay').text((dayjs().format('dddd[,] MMMM D')) + Do);
  $('#currentDay').text('Friday, December 9th');
  // var currentHour = Number(dayjs().format('H'));
  var currentHour = 10;
  $('.time-block').each(function() {
    var idHour = Number($(this).attr('id').replace('hour-', '')); 
    if (idHour < currentHour) {
      $(this).addClass('past');
    } else if (idHour === currentHour) {
      $(this).addClass('present');
    } else if (idHour > currentHour) {
      $(this).addClass('future');
    };
    var eventItem = scheduledEvents || [];
    $(this).children('textarea').val(eventItem[idHour-9]);
  });

  $('.saveBtn').on('click', function () {
    var idIndex = Number($(this).parent().attr('id').replace('hour-', ''))-9; 
    scheduledEvents[idIndex]=($(this).closest('.time-block').children('textarea').val());
    localStorage.setItem("scheduledEvents", JSON.stringify(scheduledEvents));
  });
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
