import { Component, OnInit, Input } from '@angular/core';
import { Story } from './stories.model';
import { NgForm } from '@angular/forms/forms';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

allstories: Array<Story>;
isEdit: boolean;

username: string;
town: string;
text: string;


 @Input() story: Story = new Story(undefined, undefined, undefined, undefined);
  constructor() { }

  ngOnInit() {
    this.allstories = [new Story('test', 'Sofia', Date.now(),'Lorem Ipsum е елементарен примерен текст, използван в печатарската и типографската индустрия.'+
                                                  'Lorem Ipsum е индустриален стандарт от около 1500 година, когато неизвестен печатар взема няколко печатарски '+
                                                  'букви и ги разбърква, за да напечата с тях книга с примерни шрифтове. Този начин не само е оцелял повече от 5 века, '+
                                                  'но е навлязъл и в публикуването на електронни издания като е запазен почти без промяна. Популяризиран е през 60те години '+
                                                  'на 20ти век със издаването на Letraset листи, съдържащи Lorem Ipsum пасажи, популярен е и в наши дни във софтуер за печатни '+
                                                  'издания като Aldus PageMaker, който включва различни версии на Lorem Ipsum.'),
                        new Story('test2', 'Ruse', Date.now(), 'Lorem Ipsum е елементарен примерен текст, използван в печатарската и типографската индустрия.'+
                                                  'Lorem Ipsum е индустриален стандарт от около 1500 година, когато неизвестен печатар взема няколко печатарски '+
                                                  'букви и ги разбърква, за да напечата с тях книга с примерни шрифтове. Този начин не само е оцелял повече от 5 века, '+
                                                  'но е навлязъл и в публикуването на електронни издания като е запазен почти без промяна. Популяризиран е през 60те години '+
                                                  'на 20ти век със издаването на Letraset листи, съдържащи Lorem Ipsum пасажи, популярен е и в наши дни във софтуер за печатни '+
                                                  'издания като Aldus PageMaker, който включва различни версии на Lorem Ipsum.'),
                        new Story('test2', 'Varna',  Date.now(),'Lorem Ipsum е елементарен примерен текст, използван в печатарската и типографската индустрия.'+
                                                  'Lorem Ipsum е индустриален стандарт от около 1500 година, когато неизвестен печатар взема няколко печатарски '+
                                                  'букви и ги разбърква, за да напечата с тях книга с примерни шрифтове. Този начин не само е оцелял повече от 5 века, '+
                                                  'но е навлязъл и в публикуването на електронни издания като е запазен почти без промяна. Популяризиран е през 60те години '+
                                                  'на 20ти век със издаването на Letraset листи, съдържащи Lorem Ipsum пасажи, популярен е и в наши дни във софтуер за печатни '+
                                                  'издания като Aldus PageMaker, който включва различни версии на Lorem Ipsum.') ];
  }

onSubmit(f: NgForm) {
  let formaData = JSON.stringify(f.value);
  let parsed = JSON.parse(formaData);
  console.log(parsed);
  this.allstories.push(new Story(parsed.username, parsed.town, Date.now(), parsed.text));

  console.log(JSON.stringify(f.value));
  // ;
  }
}
