import axios from "axios";

interface UserProps {
  id: number;
  name: string;
  age: number;
}

type Callback = () => void;
type Events = { [key: string]: Callback[] };

export class User {
  private events: Events = {};

  constructor(private data: Partial<UserProps>) {}

  get(propName: string): string | number | undefined {
    return this.data[propName as keyof UserProps];
  }

  set(update: Partial<UserProps>): void {
    Object.assign(this.data, update);
  }

  on(eventName: keyof WindowEventMap, callback: Callback): void {
    // ? When we first initalize the user, events this.events is undefined.
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: keyof WindowEventMap) {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach((callback) => callback());
  }

  fetch() {
    axios
      .get(`http://localhost:4000/users/${this.get("id")}`)
      .then((response) => this.set(response.data))
      .catch((err) => console.log(`Something went wrong! ${err}`));
  }

  save() {
    const id = this.get("id");
    if (id) {
      // ? we will update user
      axios.put(`http://localhost:4000/users/${id}`, this.data);
    }
    // ? We will save user
    axios.post("http://localhost:4000/users", this.data);
  }
}
