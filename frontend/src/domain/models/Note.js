// A plain class or type to represent a Note in our application.
// It is not tied to how the API returns data.
export class Note {
  constructor({ id, title, content, createdAt }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = new Date(createdAt);
  }
}