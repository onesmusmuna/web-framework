import "./style.css";
import { User } from "./models/user";

const user = new User({ name: "Jessy", age: 18 });

user.save();
