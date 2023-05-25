import Wall from "./entities/wall";
import Crate from "./entities/Crate/crate";
import Ramp from "./entities/ramp";

export type HoverTarget = Wall | Ramp | Crate;
export type Cardinal = "top" | "bottom" | "left" | "right";
export type Direction = "up" | "down" | "left" | "right";

//    "Linear"
// ("Quad.In");
// ("Quad.Out");
// ("Quad.InOut");
// ("Cubic.In");
// ("Cubic.Out");
// ("Cubic.InOut");
// ("Quart.In");
// ("Quart.Out");
// ("Quart.InOut");
// ("Quint.In");
// ("Quint.Out");
// ("Quint.InOut");
// ("Sine.In");
// ("Sine.Out");
// ("Sine.InOut");
// ("Expo.In");
// ("Expo.Out");
// ("Expo.InOut");
// ("Circ.In");
// ("Circ.Out");
// ("Circ.InOut");
// ("Elastic.In");
// ("Elastic.Out");
// ("Elastic.InOut");
// ("Back.In");
// ("Back.Out");
// ("Back.InOut");
// ("Bounce.In");
// ("Bounce.Out");
// ("Bounce.InOut");
