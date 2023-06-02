function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}


function createEmployeeRecords(employeesData) {
  return employeesData.map((employeeData) =>
    createEmployeeRecord(employeeData)
  );
}


function createTimeInEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  });
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  });
  return employee;
}

// 5. hoursWorkedOnDate
function hoursWorkedOnDate(employee, date) {
  const timeInEvent = employee.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOutEvent = employee.timeOutEvents.find(
    (event) => event.date === date
  );
  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  return hoursWorked;
}


function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  const wagesEarned = hoursWorked * employee.payPerHour;
  return wagesEarned;
}


function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map((event) => event.date);
  const totalWages = datesWorked.reduce(
    (total, date) => total + wagesEarnedOnDate(employee, date),
    0
  );
  return totalWages;
}

function calculatePayroll(employees) {
  const totalPayroll = employees.reduce(
    (total, employee) => total + allWagesFor(employee),
    0
  );
  return totalPayroll;
}
