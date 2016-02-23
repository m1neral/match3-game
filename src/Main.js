import GridView from './GridView';
import Model from './Model';

export default class Main {
    constructor() {
        new GridView(new Model());
    }
}