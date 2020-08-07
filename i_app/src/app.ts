import { ProjectInput } from './App/Models/ProjectInput.js';
import { ProjectList } from './App/Models/ProjectList.js';
import { ProjectState } from './App/Models/ProjectState.js';

const projectStateContainer = ProjectState.getInstance();

ProjectInput.initForm(projectStateContainer);

new ProjectList('active', projectStateContainer);
new ProjectList('finished', projectStateContainer);