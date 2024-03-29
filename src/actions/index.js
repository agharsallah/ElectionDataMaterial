import axios from "axios";

export const CHECKEDIRIEBUTTON = "CHECKEDIRIEBUTTON";
export const MAPCOLOR = "MAPCOLOR";
export const MAPCOLORSTATE = "MAPCOLORSTATE";

export const POPACTIVATIONCHECKBOX = "POPACTIVATIONCHECKBOX";
export const STATEACTIVATIONCHECKBOX = "STATEACTIVATIONCHECKBOX";
export const AREAACTIVATIONCHECKBOX = "AREAACTIVATIONCHECKBOX";
export const RADIOFILTERPICKER = "RADIOFILTERPICKER";

export const SLIDERVALUE = "SLIDERVALUE";
export const AREASLIDERVALUE = "AREASLIDERVALUE";
export const STATESLIDERVALUE = "STATESLIDERVALUE";

export const DATEPICK = "DATEPICK";
export const REGUPDSELECTFFIELD="REGUPDSELECTFFIELD";

export const BORDERSELECTIONCHECCKBOX="BORDERSELECTIONCHECCKBOX";
export const TREATMENTSELECTIONCHECCKBOX="TREATMENTSELECTIONCHECCKBOX";
export const DATESELECTIONMENU="DATESELECTIONMENU";

export function getIrieButton(checkIrieButton) {
  return {
    type: CHECKEDIRIEBUTTON,
    payload: checkIrieButton
  };
}

export function getColorSets(colorset) {
  return {
    type: MAPCOLOR,
    payload: colorset
  };
}
export function getStateColorSets(colorset) {

  return {
    type: MAPCOLORSTATE,
    payload: colorset
  };
}


/*Choose which filter to activate*/
export function getPopPickFilter(popCheckbox) {
  return {
    type: POPACTIVATIONCHECKBOX,
    payload: popCheckbox
  };
}

export function getStatePickFilter(stateCheckbox) {
  return {
    type: STATEACTIVATIONCHECKBOX,
    payload: stateCheckbox
  };
}

export function getAreaPickFilter(AreaCheckbox) {
  return {
    type: AREAACTIVATIONCHECKBOX,
    payload: AreaCheckbox
  };
}

export function getPickedFilter(pickedradiofilter) {
  return {
    type: RADIOFILTERPICKER,
    payload: pickedradiofilter
  };
}

/*get Slider Value*/
export function getPopValue(popValue) {
  return {
    type: SLIDERVALUE,
    payload: popValue
  };
}

export function getAreaValue(areaValue) {
  return {
    type: AREASLIDERVALUE,
    payload: areaValue
  };
}
export function getStateValue(stateValue) {
  return {
    type: STATESLIDERVALUE,
    payload: stateValue
  };
}

/*Choose date for registration daily tracking*/
export function getDateValue(datevalue) {
  return {
    type: DATEPICK,
    payload: datevalue
  };
}
/*choose registration or update in Linechart*/
export function getRegOrUpd(chosenVal) {
  return {
    type: REGUPDSELECTFFIELD,
    payload: chosenVal
  };
}

/* define the show|hide component for the delimitation in aaron maps to  */
export function getBorderSelection(checkboxesObject) {
  return {
    type: BORDERSELECTIONCHECCKBOX,
    payload: checkboxesObject
  };
}
/* define the show|hide component for the treatment checkboxes (gratitude,intentions,social) in aaron maps to  */
export function getTreatmentSelection(checkboxesObject) {
  console.log('aaaaaaccction',checkboxesObject);
  return {
    type: TREATMENTSELECTIONCHECCKBOX,
    payload: checkboxesObject
  };
}

/* define the change of the date menu in aaron map of distribution followup  */
export function getSelectedDate(checkboxesObject) {
  console.log('Date CHanged on t',checkboxesObject);
  return {
    type: DATESELECTIONMENU,
    payload: checkboxesObject
  };
}