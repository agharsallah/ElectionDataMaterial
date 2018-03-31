import { BORDERSELECTIONCHECCKBOX } from "../../actions/index";

export default function(state = {govBorder: false, munBorder: false}, action) {
  switch (action.type) {
    case BORDERSELECTIONCHECCKBOX:
      return action.payload;
  }
  return state;
}
