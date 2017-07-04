import { PPosition } from './PPosition';


export class Route{
    constructor (
        public name :string,
        public username : string,
        public city : string,
        public waypoints : Array<PPosition>
    ) {}
}