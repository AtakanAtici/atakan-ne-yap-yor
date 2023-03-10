import React, { Component } from 'react';
import "./Main.css";
import Profile from "./pp.jfif";
import moment from 'moment';

export default class Main extends Component {
  render() {
    
    return (
        <>   
        <div className=' row mt-5 container-fluid'>
            <div className="profile-div col-md-2 d-flex justify-content-center  ">
                <img src={Profile} alt="profile" className='profile-src' height="211px" />
            </div>
            <div className="col-md-5">
                <h1 className='text-white'>Atakan is working on:</h1>
                <div className="information-div mt-4">
                    <h3 className='text-white text-center pt-3' style={{"fontSize":"20px"}}>TASK</h3>
                    <p className='text-white text-center p-4 pt-2' style={{"fontSize":"18px"}}>
                        {this.props.lastTask.description ? this.props.lastTask.description : "No task" }
                    </p>
                </div>  
            </div>
            <div className="col-md-2 mt-6">
            <h1 className='text-white'>&nbsp;</h1>
                <div className="information-div mt-4">
                    <h3 className='text-white text-center pt-3' style={{"fontSize":"20px"}}>PROJECT</h3>
                    <p className='text-white text-center p-4 pt-2' style={{"fontSize":"18px"}}>
                        {this.props.project.name ? this.props.project.name : "No project" }
                    </p>
                </div>  
            </div>
            
            <div className="col-md-2 mt-6">
            <h1 className='text-white'>&nbsp;</h1>
                <div className="information-div mt-4">
                    <h3 className='text-white text-center pt-3' style={{"fontSize":"20px"}}>CLIENT</h3>
                    <p className='text-white text-center p-4 pt-2' style={{"fontSize":"18px"}}>
                        {this.props.client.name ? this.props.client.name : "No client"}
                    </p>
                </div>  
            </div>
            <div className="col-md-1 mt-6">
            <h1 className='text-white'>&nbsp;</h1>
                <div className="information-div mt-4">
                    <h3 className='text-white text-center pt-3' style={{"fontSize":"20px"}}>TİMER</h3>
                    <p className='text-white text-center p-4 pt-2' style={{"fontSize":"18px"}}>
                        {this.props.timer}
                    </p>
                </div>  
            </div>
        </div>

        <div className="table-responsive">
        <table className="table table-responsive table-dark mt-5 p-2">
            <thead>
                <tr>
                <th scope="col">Task</th>
                <th scope="col">Project</th>
                <th scope="col">Time</th>
                </tr>
            </thead>
            <tbody>
                {this.props.tasks.map((task) => {
                    return (
                        <tr>
                            <td>{task.description}</td>
                            <td>{task.projectId}</td>
                            <td>{moment.duration(moment(new Date(task.timeInterval.end)).diff(new Date(task.timeInterval.start))).humanize()}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>

        </>
    )
  }
}
