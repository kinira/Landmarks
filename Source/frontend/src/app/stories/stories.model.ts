export class Story {
    constructor(public id: number = 0, public username = "", public town = "",
        public created = new Date().getDate(), public text = "", public lastEdit?: number) { }

}
