export class Story
{
    constructor(
        public username: string,
        public town: string,
        public created: number,
        public text: string,
        public lastEdit?: number
    ) {}

}