import ProjectInput from './App/Models/ProjectInput';
import ProjectList from './App/Models/ProjectList';
import ProjectState from './App/Models/ProjectState';
// import _ from 'lodash'; не, работае, т.к. TS не понимает что это
// нужно ставить, к примеру, 
import _ from 'lodash'; // теперь работает


const projectStateContainer = ProjectState.getInstance();

ProjectInput.initForm(projectStateContainer);

new ProjectList('active', projectStateContainer);
new ProjectList('finished', projectStateContainer);

console.log(_.shuffle([1, 2, 3]));