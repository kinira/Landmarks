export class StoryDb
{
    constructor(
        public id : number,
        public username: string,
        public town: string,
        public created: number,
        public text: string,
        public lastEdit?: number
    ) {}

}