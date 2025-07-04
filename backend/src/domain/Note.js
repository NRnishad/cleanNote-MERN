export class Note {
  constructor(id, title, content, createdAt, updatedAt,user) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
  }
}