import ProjectInput from './App/Models/ProjectInput';
import ProjectList from './App/Models/ProjectList';
import ProjectState from './App/Models/ProjectState';
import './others';

const projectStateContainer = ProjectState.getInstance();

ProjectInput.initForm(projectStateContainer);

new ProjectList('active', projectStateContainer);
new ProjectList('finished', projectStateContainer);