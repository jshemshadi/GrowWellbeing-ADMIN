import { bindActionCreators as reduxBindActionCreators } from "redux";
import typeToReducer from "type-to-reducer";
import axios from "axios";

export const mapActionTypes = (prefix, actionsArray) => {
  if (!Array.isArray(actionsArray)) {
    actionsArray = [actionsArray];
  }

  const actions = {};

  actionsArray.forEach((action) => {
    actions[action] = `${prefix}_${action}`;
  });

  return actions;
};

export const actionHandler = (initialState, reducerMap) => {
  const createRejectionReducer = (subReducer) => {
    return (state, action) => {
      if (axios.isCancel(action.payload)) {
        return state;
      }

      try {
        return subReducer(state, action);
      } catch (e) {
        setTimeout(() => {
          throw e;
        });
      }
    };
  };

  const createFulfillingReducer = (subReducer) => {
    return (state, action) => {
      try {
        return subReducer(state, action);
      } catch (e) {
        setTimeout(() => {
          throw e;
        });
      }
    };
  };

  for (const key in reducerMap) {
    const reducer = reducerMap[key];

    if (typeof reducer === "object") {
      for (const subKey in reducer) {
        const subReducer = reducer[subKey];

        if (subKey === "FULFILLED") {
          reducer[subKey] = createFulfillingReducer(subReducer);
        } else if (subKey === "REJECTED") {
          reducer[subKey] = createRejectionReducer(subReducer);
        }
      }
    }
  }

  return typeToReducer(reducerMap, initialState);
};

export const bindActionCreators = (actionContainerMapArray, dispatch) => {
  const allActions = {};
  if (!_.isArray(actionContainerMapArray)) {
    actionContainerMapArray = [actionContainerMapArray];
  }

  for (const actionContainerMap of actionContainerMapArray) {
    for (const actionContainerName in actionContainerMap) {
      const actionContainer = actionContainerMap[actionContainerName];

      if (typeof allActions[actionContainerName] === "undefined") {
        allActions[actionContainerName] = reduxBindActionCreators(
          actionContainer,
          dispatch
        );
      } else {
        throw new Error(`Overlapping actions found: '${actionContainerName}'`);
      }
    }
  }

  return allActions;
};

export const post = async (url, data = {}, isFormData = false) => {
  let config = {};
  let response;
  if (isFormData) {
    if (localStorage.getItem("token")) {
      config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-Type": "multipart/form-data",
        },
      };
    }

    let formData = new FormData();
    const keys = Object.keys(data);
    for (const propKey of keys) {
      const prop = data[propKey];
      if (prop !== undefined) {
        formData.append(propKey, prop);
      }
    }
    response = await axios.post(url, formData, config);
  } else {
    if (localStorage.getItem("token")) {
      config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
    }
    response = await axios.post(url, data, config);
  }
  return response;
};

export const get = async (url) => {
  let config = {};
  if (localStorage.getItem("token")) {
    config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  }
  const response = await axios.get(url, config);

  return response;
};

export const getApiAddress = () => {
  return "http://localhost:8000";
};

export const getNextWeekDate = () => {
  const now = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  const today = now.getDay();
  const dayToStartNextWeek = today === 0 ? 7 : 7 - today;
  const nextWeekStartDate = new Date(
    now.getTime() + dayToStartNextWeek * 24 * 60 * 60 * 1000
  );
  const nextWeekEndDate = new Date(
    nextWeekStartDate.getTime() + 7 * 24 * 60 * 60 * 1000
  );
  return { from: nextWeekStartDate, to: nextWeekEndDate };
};

export const formatDate = (date, withTime = false) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let result = `${date.getDate()} ${
    monthNames[date.getMonth()]
  }, ${date.getFullYear()}`;

  if (withTime) {
    result += ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  return result;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
