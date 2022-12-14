const express = require("express")
require("./models/db");
const { ApolloServer } = require("apollo-server-express");
const Employee = require("./models/employees");
const typeDefs = `
type employee{
  _id:String,
  firstName: String,
  lastName: String,
  age: Int,
  startDate: String,
  title: String,
  department: String,
  employeeType:String,
  currentStatus:Boolean,
}
type Query{
    employeeList:[employee]
}
type Mutation{
    addEmployee(
        firstName:String!,
        lastName:String!,
        age:Int,
        startDate:String!,
        title:String!,
        department:String!,
        employeeType:String!,
        currentStatus:Boolean):employee
}
`;
const employeeList =async ()=>{
  return await Employee.find({})
}
const addEmployee = async(_,employeeDetails)=>{
      await Employee.create(employeeDetails)
      return employeeDetails
}

const resolvers = {
  Query: {
    employeeList,
  },
  Mutation:{
    addEmployee
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.start().then(() => {
  server.applyMiddleware({ app, path: "/graphql", cors: true });
});
const app = express();
app.use(express.static("./public"))

app.get("/",(req,res)=>{
    res.render("index.html")
})
app.listen(3000,()=>{
    console.log("server started")
})