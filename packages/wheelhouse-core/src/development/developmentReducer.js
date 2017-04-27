
const initialState = {
  packages: [
    {
      name: "Maestro",
      status: "RUNNING",
      active: true,
    },
    {
      name: "Mendoza",
      status: "STOPPED",
      active: false,
    },
    {
      name: "Clydesdale",
      status: "ERRORED",
      active: true,
    },
  ]
};

export default function(state = initialState, action) {
  if (action.type === "CHANGE_BUTTON_STATUS") {
    const newPackages = state.packages.map((pkg) => {
      if (pkg.name === action.name) {
        return {
          ...pkg,
          active: !pkg.active,
        };
      }
      return pkg;
    });
    return {
      ...state,
      packages: newPackages,
    };
  }

  return state;
}
