import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import { useEffect, useState, useTransition } from 'react';
import axios from 'axios';
import moment from 'moment';

function App() {
  const [projectName, setProjectName] = useState("ISG YOL HARİTASI DESTEK");
  const [userId, setUserId] = useState(0);
  const [workspacesId, setWorkspacesId] = useState(0);
  const [allTasks, setAllTasks] = useState([]);
  const  [lastTask, setLastTask] = useState([]);
  const [project, setProject] = useState([]);
  const [client, setClient] = useState([]);
  const [time, setTime] = useState(0);


  const headers = {
    'x-api-key':'your_clokify_api_key',
  };

  useEffect(() => {
    getUser();
  });

  const getUser = () => {
    axios.get('https://api.clockify.me/api/v1/user', {
      headers: headers
    }).then((response) => {
      setUserId(response.data.id);
      getWorkspaces(response.data.id);
    });
  }

  const getWorkspaces = (userNumber) => {
    axios.get('https://api.clockify.me/api/v1/workspaces', {
      headers: headers
    }).then((response) => {
      console.log(response.data);
      setWorkspacesId(response.data[0].id);
      getTasks(userNumber, response.data[0].id);
    });
  }

  const getTasks = (userNumber, workspaceNumber) => {
    axios.get('https://api.clockify.me/api/v1/workspaces/'+workspaceNumber+'/user/'+userNumber+'/time-entries', {
      headers: headers
    }).then((response) => {
      console.log(response.data);
      setAllTasks(response.data);
      let lastTask = response.data[0];
      setLastTask(lastTask);
      console.log("all:",allTasks);
      console.log("last",lastTask);
      getProject(workspaceNumber, lastTask.projectId);

      //calculate time difference hours, minutes, seconds
      var time1 = new Date(lastTask.timeInterval.start);
      var time2 = new Date(lastTask.timeInterval.end);
      if(lastTask.timeInterval.end == null){
        time2 = new Date();
      }
      var diff = moment(time2).diff(time1);
      var timeText = moment.duration(diff).humanize();
      //var timeText = time.hours() + ":" + time.minutes() + ":" + time.seconds();
      console.log("diff2",timeText);

      setTime(timeText);

    });
  }

  const getProject = (workspaceNumber, projectNumber) => {
    axios.get('https://api.clockify.me/api/v1/workspaces/'+workspaceNumber+'/projects/'+projectNumber, {
      headers: headers
    }).then((response) => {
      console.log("project",response.data);
      setProject(response.data);
      getClient(workspaceNumber, response.data.clientId);
    });
  };

  const getClient = (workspaceNumber, clientNumber) => {
    axios.get('/workspaces/{workspaceId}/clients'+workspaceNumber+'/clients/'+clientNumber, {
      headers: headers
    }).then((response) => {
      setClient(response.data);
    });
  };
  

  return (
    <div className="App">
      <Main projectName={projectName} lastTask={lastTask} project={project} client={client} timer={time} tasks={allTasks}/>
    </div>
  );
}

export default App;
