const EmployeeCreate = ({
  showAdd,
  setShowAdd
}) => {
  const [formData, setFormData] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState(null);
  const handleChange = e => {
    setErrorMessage(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    for (const data in formData) {
      switch (data) {
        case "firstName":
          if (formData[data] === "" || formData[data] === null) setErrorMessage("Please enter employee firstname");
          break;
        case "lastName":
          if (formData[data] === "" || formData[data] === null) setErrorMessage("Please enter employee lastname");
          break;
        case "age":
          if (parseInt(formData[data]) < 20 || parseInt(formData[data]) > 70) setErrorMessage("Employee age must be between 20 and 70");
          break;
        default:
          break;
      }
    }
    if (errorMessage === null) {
      const dataToSubmit = {
        ...formData,
        currentStatus: 1,
        age: parseInt(formData.age)
      };
      setShowAdd(false);
      console.log(dataToSubmit);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "employee__create-wrapper",
    style: {
      display: showAdd && "flex"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "employee__create-modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal__header"
  }, "Add Employee"), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "modal__body"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "firstName"
  }, "First Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "firstName",
    name: "firstName",
    required: true,
    onChange: handleChange
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "lastName"
  }, "Last Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "lastName",
    name: "lastName",
    required: true,
    onChange: handleChange
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "age"
  }, "Age"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    id: "age",
    name: "age",
    onChange: handleChange,
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "startDate"
  }, "Date Of Joining"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    id: "starteDate",
    name: "starteDate",
    required: true,
    onChange: handleChange
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "title"
  }, "Title"), /*#__PURE__*/React.createElement("select", {
    name: "title",
    id: "title",
    onChange: handleChange,
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }), /*#__PURE__*/React.createElement("option", {
    value: "Employee"
  }, "Employee"), /*#__PURE__*/React.createElement("option", {
    value: "Manager"
  }, "Manager"), /*#__PURE__*/React.createElement("option", {
    value: "Director"
  }, "Director"), /*#__PURE__*/React.createElement("option", {
    value: "VP"
  }, "VP"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "department"
  }, "Department"), /*#__PURE__*/React.createElement("select", {
    name: "department",
    id: "department",
    onChange: handleChange,
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }), /*#__PURE__*/React.createElement("option", {
    value: "IT"
  }, "IT"), /*#__PURE__*/React.createElement("option", {
    value: "Marketing"
  }, "Marketing"), /*#__PURE__*/React.createElement("option", {
    value: "HR"
  }, "HR"), /*#__PURE__*/React.createElement("option", {
    value: "Engineering"
  }, "Engineering"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "employeeType"
  }, "Employee Type"), /*#__PURE__*/React.createElement("select", {
    name: "employeeType",
    id: "employeeType",
    onChange: handleChange,
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }), /*#__PURE__*/React.createElement("option", {
    value: "Full-Time"
  }, "Full-Time"), /*#__PURE__*/React.createElement("option", {
    value: "Part-Time"
  }, "Part-Time"), /*#__PURE__*/React.createElement("option", {
    value: "Contract"
  }, "Contract"), /*#__PURE__*/React.createElement("option", {
    value: "Seasonal"
  }, "Seasonal"))), /*#__PURE__*/React.createElement("div", {
    className: "modal__action"
  }, /*#__PURE__*/React.createElement("button", null, "Add"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setShowAdd(false);
    }
  }, "Cancel"))), errorMessage && /*#__PURE__*/React.createElement("p", {
    className: "error"
  }, errorMessage)));
};
const EmployeeSearch = () => {
  return /*#__PURE__*/React.createElement("div", null, "Search all employees");
};
const EmployeeTable = ({
  employeeList,
  setShowAdd
}) => {
  const displayEmployee = () => {
    return employeeList.map(employee => {
      const date = new Date(parseInt(employee.startDate));
      return /*#__PURE__*/React.createElement("tr", {
        key: employee._id
      }, /*#__PURE__*/React.createElement("td", null, employee.firstName), /*#__PURE__*/React.createElement("td", null, employee.lastName), /*#__PURE__*/React.createElement("td", null, employee.age), /*#__PURE__*/React.createElement("td", null, date.toLocaleDateString()), /*#__PURE__*/React.createElement("td", null, employee.title), /*#__PURE__*/React.createElement("td", null, employee.department), /*#__PURE__*/React.createElement("td", null, employee.employeeType), /*#__PURE__*/React.createElement("td", null, employee.currentStatus ? 1 : 0), /*#__PURE__*/React.createElement("td", null, "Edit"), /*#__PURE__*/React.createElement("td", null, "Delete"));
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "employee__table-wrapper"
  }, /*#__PURE__*/React.createElement("table", {
    className: "employee__table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "First Name"), /*#__PURE__*/React.createElement("th", null, "Last Name"), /*#__PURE__*/React.createElement("th", null, "Age"), /*#__PURE__*/React.createElement("th", null, "Start date"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Department"), /*#__PURE__*/React.createElement("th", null, "Employee type"), /*#__PURE__*/React.createElement("th", null, "Current status"), /*#__PURE__*/React.createElement("th", {
    colSpan: 2
  }, "Action"))), /*#__PURE__*/React.createElement("tbody", null, displayEmployee())), /*#__PURE__*/React.createElement("button", {
    className: "add_btn",
    onClick: () => setShowAdd(true)
  }, "Add Employee"));
};
const EmployeeDirectory = () => {
  const [showAdd, setShowAdd] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);
  const query = `query{
    employeeList {
    _id
    firstName
    lastName
    age
    startDate
    title
    department
    employeeType
    currentStatus
  }
  }`;
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query
          })
        });
        if (response) {
          let fetchedData = await response.json();
          let fetchedEmployeeList = fetchedData.data.employeeList;
          setEmployees(fetchedEmployeeList);
        }
      } catch (err) {
        console.log(err?.message);
      }
    };
    fetchData();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "employee__wrapper"
  }, /*#__PURE__*/React.createElement(EmployeeSearch, null), /*#__PURE__*/React.createElement(EmployeeTable, {
    employeeList: employees,
    setShowAdd: setShowAdd
  }), /*#__PURE__*/React.createElement(EmployeeCreate, {
    showAdd: showAdd,
    setShowAdd: setShowAdd
  }));
};
const App = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "main__wrapper"
  }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h2", null, "EMS")), /*#__PURE__*/React.createElement(EmployeeDirectory, null));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(React.StrictMode, null, /*#__PURE__*/React.createElement(App, null)));