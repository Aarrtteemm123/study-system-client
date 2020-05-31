export class Subject {
  id = 0;
  name = '';
  mark = 0;

  constructor(name, mark) {
    this.id = new Date().getTime();
    this.name = name;
    this.mark = mark;
  }
}
