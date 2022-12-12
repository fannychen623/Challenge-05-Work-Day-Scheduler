// ensure that the code isn't run until the browser has finished rendering all the elements in the html
$(function () {
  // define empty array for storing scheduled items
  var scheduledEvents = [];
  // render stored events from local storage
  var storedEvents = JSON.parse(localStorage.getItem("scheduledEvents"));
  if (storedEvents !== null) {
    scheduledEvents = storedEvents;
  };

  // function to determine the ordinal of the day (see referenced code in README)
  var nth = function(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    };
  };
  // run the function to output the ordinal of today's day value
  var Do = nth(Number(dayjs().format('d')));
  // populate element with the formatted date
  $('#currentDay').text((dayjs().format('dddd[,] MMMM D')) + Do);

  // define the current hour
  var currentHour = Number(dayjs().format('H'));
  // loop through all elements with class 'time-block'
  $('.time-block').each(function() {
    // determine the hour value of the time block
    var idHour = Number($(this).attr('id').replace('hour-', '')); 
    // color-code the time block by adding respective classes based on hour relation
    if (idHour < currentHour) {
      $(this).addClass('past');
    } else if (idHour === currentHour) {
      $(this).addClass('present');
    } else if (idHour > currentHour) {
      $(this).addClass('future');
    };
    // initialize empty array in case stored events is undefined
    var eventItem = scheduledEvents || [];
    // populate time block with the relative index item of the array to the current time block
    $(this).children('textarea').val(eventItem[idHour-9]);
  });

  // event listener when the save button is clicked
  $('.saveBtn').on('click', function () {
    // define the relative index of the array to the target time block
    var idIndex = Number($(this).parent().attr('id').replace('hour-', ''))-9; 
    // replace the item of the defined index in the array with the value in the relative textarea
    scheduledEvents[idIndex]=($(this).closest('.time-block').children('textarea').val());
    // store the updated array to the local storage
    localStorage.setItem("scheduledEvents", JSON.stringify(scheduledEvents));
  });
});
