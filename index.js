function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}

function createTimeInEvent(dateTimeString) {
  let [date, hour] = dateTimeString.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });
  return this;
}

function createTimeOutEvent(dateTimeString) {
  let [date, hour] = dateTimeString.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });
  return this;
}

function hoursWorkedOnDate(date) {
  let timeIn = this.timeInEvents.find((e) => e.date === date);
  let timeOut = this.timeOutEvents.find((e) => e.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
  let hours = hoursWorkedOnDate.call(this, date);
  return hours * this.payPerHour;
}

function findEmployeeByFirstName(collection, firstNameString) {
  return collection.find((emp) => emp.firstName === firstNameString);
}

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map((e) => e.date);
  const payable = eligibleDates.reduce(
    (memo, d) => memo + wagesEarnedOnDate.call(this, d),
    0
  );
  return payable;
};

module.exports = {
  createEmployeeRecord,
  createEmployeeRecords,
  createTimeInEvent,
  createTimeOutEvent,
  hoursWorkedOnDate,
  wagesEarnedOnDate,
  findEmployeeByFirstName,
  allWagesFor,
  calculatePayroll,
};
