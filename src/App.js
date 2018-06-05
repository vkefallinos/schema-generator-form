import React, { Component } from 'react';
import Form from "react-jsonschema-form";

import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import schema from "./schema";
import './App.css';

function TabContainer(props) {
  return <div style={{ padding: 8 * 3 }}>{props.children}</div>;
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      schema,
      modelsFormData: [],
      actionsFormData: [],
      pagesFormData: [],
      value: 0
    }
  }
  componentWillMount(){
    const state = localStorage.getItem("formState")
    console.log(state)
    if(state)this.setState({...JSON.parse(state)})
  }
  componentWillUnmount(){
    console.log("unmount")
  }
  handleTabChange = (event, value) => {
    console.log(this.state)
    this.setState({ value });
  }
  generateOperations = (models) => {
    
  }
  handlePagesChange = (pagesData) => {
    
    this.setState({
      pagesFormData: pagesData.formData
    }, () => localStorage.setItem("formState", JSON.stringify(this.state)))
  }
  handleActionsChange = (actionsData) => {
    this.setState({
      actionsFormData: actionsData.formData
    }, () => localStorage.setItem("formState", JSON.stringify(this.state)))
  }
  handleModelsChange = (modelsData) => {
    let schema = this.state.schema;
    if (modelsData.formData){
      const models = modelsData.formData.reduce((arr, model)=> {
        arr.push(model.name)
        return arr
      },[])
      schema.definitions.models.enum = models
    }
    this.setState({
      schema,
      modelsFormData: modelsData.formData
    }, () => localStorage.setItem("formState", JSON.stringify(this.state)))
  }

  render() {
    const { value } = this.state;
    return (
      <div className="App">
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleTabChange}>
            <Tab label="Models" />
            <Tab label="Actions" />
            <Tab label="Pages" />
          </Tabs>

        </AppBar>
        {value === 0 && 
          <TabContainer>
            <Form
              schema={{
                ...this.state.schema,
                "type": "array",
                "items": {
                  "$ref": "#/definitions/Model"
                }
              }}
              formData={this.state.modelsFormData}
              onChange={this.handleModelsChange}
            />
          </TabContainer>}
        {value === 1 && <TabContainer>            
        <Form
          schema={{
            ...this.state.schema,
            "type": "array",
            "items": {
              "$ref": "#/definitions/Function"
            }
          }}
          formData={this.state.actionsFormData}
          onChange={this.handleActionsChange}
        /></TabContainer>}
        {value === 2 && <TabContainer>
          <Form
            schema={{
              ...this.state.schema,
              "type": "array",
              "items": {
                "$ref": "#/definitions/Page"
              }
            }}
            formData={this.state.pagesFormData}
            onChange={this.handlePagesChange}
          /></TabContainer>}
        <div className="app-form">

        </div>
      </div>
    );
  }
}

export default App;
