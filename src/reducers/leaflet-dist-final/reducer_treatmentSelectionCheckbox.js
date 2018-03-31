import { TREATMENTSELECTIONCHECCKBOX } from "../../actions/index";

export default function (state = { gratitude: true, intention: true, pressure: true,other: true }, action) {
  switch (action.type) {
    case TREATMENTSELECTIONCHECCKBOX:
      return action.payload;
  }
  return state;
}
