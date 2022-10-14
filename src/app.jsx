const EmployeeCreate = ({showAdd, setShowAdd}) => {
  const [formData, setFormData] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState(null);

  const handleChange = (e) => {
    setErrorMessage(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    for (const data in formData) {
      switch (data) {
        case "firstName":
          if (formData[data] === "" || formData[data] === null)
            setErrorMessage("Please enter employee firstname");
          break;
        case "lastName":
          if (formData[data] === "" || formData[data] === null)
            setErrorMessage("Please enter employee lastname");
          break;
        case "age":
          if (parseInt(formData[data]) < 20 || parseInt(formData[data]) > 70)
            setErrorMessage("Employee age must be between 20 and 70");
          break;
        default:
          break;
      }
    }
    if (errorMessage === null) {
      const dataToSubmit = {
        ...formData,
        currentStatus: 1,
        age: parseInt(formData.age),
      };
      setShowAdd(false)
      console.log(dataToSubmit);
    }
  };
  return (
    <div
      className="employee__create-wrapper"
      style={{ display: showAdd && "flex" }}
    >
      <div className="employee__create-modal">
        <div className="modal__header">Add Employee</div>
        <form onSubmit={handleSubmit} className="modal__body">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="startDate">Date Of Joining</label>
            <input
              type="date"
              id="starteDate"
              name="starteDate"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="title">Title</label>
            <select name="title" id="title" onChange={handleChange} required>
              <option value=""></option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">VP</option>
            </select>
          </div>
          <div>
            <label htmlFor="department">Department</label>
            <select
              name="department"
              id="department"
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
          <div>
            <label htmlFor="employeeType">Employee Type</label>
            <select
              name="employeeType"
              id="employeeType"
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </select>
          </div>
          <div className="modal__action">
            <button>Add</button>
            <button
            type="button"
              onClick={() => {
                setShowAdd(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    </div>
  );
};

const EmployeeSearch = () => {
  return <div>Search all employees</div>;
};

const EmployeeTable = ({ employeeList, setShowAdd }) => {
  const displayEmployee = () => {
    return employeeList.map((employee) => {
      const date = new Date(parseInt(employee.startDate));
      return (
        <tr key={employee._id}>
          <td>{employee.firstName}</td>
          <td>{employee.lastName}</td>
          <td>{employee.age}</td>
          <td>{date.toLocaleDateString()}</td>
          <td>{employee.title}</td>
          <td>{employee.department}</td>
          <td>{employee.employeeType}</td>
          <td>{employee.currentStatus ? 1 : 0}</td>
          <td>Edit</td>
          <td>Delete</td>
        </tr>
      );
    });
  };
  return (
    <div className="employee__table-wrapper">
      <table className="employee__table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Start date</th>
            <th>Title</th>
            <th>Department</th>
            <th>Employee type</th>
            <th>Current status</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>{displayEmployee()}</tbody>
      </table>
      <button className="add_btn" onClick={() => setShowAdd(true)}>
        Add Employee
      </button>
    </div>
  );
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
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
  return (
    <div className="employee__wrapper">
      <EmployeeSearch />
      <EmployeeTable employeeList={employees} setShowAdd={setShowAdd} />
      <EmployeeCreate showAdd={showAdd} setShowAdd={setShowAdd} />
    </div>
  );
};

const App = () => {
  return (
    <div className="main__wrapper">
      <header>
        <h2>EMS</h2>
      </header>
      <EmployeeDirectory />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
