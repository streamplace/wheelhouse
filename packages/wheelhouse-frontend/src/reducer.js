import * as handlers from "./handlers/reducer-handlers"; 
import * as actions from "./actions/actions";

const stateReducer = (state = {
  logsData:[ { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version [17.015ms] About to convert to expected version [17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Maestro",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Mendoza",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" },
  { appName: "Clydesdale",
    serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
    expectedAction: "[17.015ms] About to convert to expected version" } ],
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
  ],
  pods: {
    "apiVersion": "v1",
    "items": [
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicaSet\",\"namespace\":\"default\",\"name\":\"corporate-bullshit-1445707844\",\"uid\":\"71c4ba26-044b-11e7-88dd-06f78f5b71f7\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"14800217\"}}\n"
          },
          "creationTimestamp": "2017-03-30T18:19:08Z",
          "generateName": "corporate-bullshit-1445707844-",
          "labels": {
            "app": "corporate-bullshit",
            "deployTime": "1489010773",
            "pod-template-hash": "1445707844"
          },
          "name": "corporate-bullshit-1445707844-2gmz2",
          "namespace": "default",
          "ownerReferences": [
            {
              "apiVersion": "extensions/v1beta1",
              "controller": true,
              "kind": "ReplicaSet",
              "name": "corporate-bullshit-1445707844",
              "uid": "71c4ba26-044b-11e7-88dd-06f78f5b71f7"
            }
          ],
          "resourceVersion": "14800446",
          "selfLink": "/api/v1/namespaces/default/pods/corporate-bullshit-1445707844-2gmz2",
          "uid": "5dcc1fe6-1575-11e7-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "image": "gcr.io/stream-kitchen/corporate-bullshit:latest",
              "imagePullPolicy": "Always",
              "name": "corporate-bullshit",
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-87f62",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "imagePullSecrets": [
            {
              "name": "gcr-io"
            }
          ],
          "nodeName": "ip-10-0-0-36.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "name": "default-token-87f62",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-87f62"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:19:08Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:19:27Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:19:08Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://1a5f5e709c9b9b33bb4a4a4627d18d2d482dec1a16b21466642deb469c90815d",
              "image": "gcr.io/stream-kitchen/corporate-bullshit:latest",
              "imageID": "docker://sha256:63abf2ad8db807d5a8347db3cf5f389e40c2ee59bdcb545cbf4f815ef8cdc0e5",
              "lastState": {},
              "name": "corporate-bullshit",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-03-30T18:19:27Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.36",
          "phase": "Running",
          "podIP": "10.2.94.32",
          "startTime": "2017-03-30T18:19:08Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicaSet\",\"namespace\":\"default\",\"name\":\"prod-sp-api-server-2622043796\",\"uid\":\"64b2cec9-1673-11e7-88dd-06f78f5b71f7\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"14967306\"}}\n",
            "pod.alpha.kubernetes.io/init-container-statuses": "[{\"name\":\"sp-plugin-core\",\"state\":{\"terminated\":{\"exitCode\":0,\"reason\":\"Completed\",\"startedAt\":\"2017-04-01T00:38:04Z\",\"finishedAt\":\"2017-04-01T00:38:04Z\",\"containerID\":\"docker://f06c2d7bf861c72de9dab8878d444e074e14d49cc9dab04f75401b5d1901cc4d\"}},\"lastState\":{},\"ready\":true,\"restartCount\":0,\"image\":\"quay.io/streamplace/sp-plugin-core:v0.0.14-51-g790db65\",\"imageID\":\"docker://sha256:e106a528719aee6e441d9c189a70041365ec19e2e382ce6f60e085905ad4fd7b\",\"containerID\":\"docker://f06c2d7bf861c72de9dab8878d444e074e14d49cc9dab04f75401b5d1901cc4d\"},{\"name\":\"sp-plugin-auth\",\"state\":{\"terminated\":{\"exitCode\":0,\"reason\":\"Completed\",\"startedAt\":\"2017-04-01T00:38:35Z\",\"finishedAt\":\"2017-04-01T00:38:35Z\",\"containerID\":\"docker://11c81d1bd6d9e07f2434e29ac309902145183ad896486a74955009dcd9e4284e\"}},\"lastState\":{},\"ready\":true,\"restartCount\":0,\"image\":\"quay.io/streamplace/sp-plugin-auth:v0.0.14-51-g790db65\",\"imageID\":\"docker://sha256:7167432e098d1cf88d970899b9fe5a75044ec02d22d9477f8d0dc09d9069c683\",\"containerID\":\"docker://11c81d1bd6d9e07f2434e29ac309902145183ad896486a74955009dcd9e4284e\"}]",
            "pod.alpha.kubernetes.io/init-containers": "[{\"name\":\"sp-plugin-core\",\"image\":\"quay.io/streamplace/sp-plugin-core:v0.0.14-51-g790db65\",\"command\":[\"cp\",\"-R\",\"/app\",\"/plugins/sp-plugin-core\"],\"resources\":{},\"volumeMounts\":[{\"name\":\"plugins\",\"mountPath\":\"/plugins\"},{\"name\":\"default-token-87f62\",\"readOnly\":true,\"mountPath\":\"/var/run/secrets/kubernetes.io/serviceaccount\"}],\"terminationMessagePath\":\"/dev/termination-log\",\"imagePullPolicy\":\"Always\"},{\"name\":\"sp-plugin-auth\",\"image\":\"quay.io/streamplace/sp-plugin-auth:v0.0.14-51-g790db65\",\"command\":[\"cp\",\"-R\",\"/app\",\"/plugins/sp-plugin-auth\"],\"resources\":{},\"volumeMounts\":[{\"name\":\"plugins\",\"mountPath\":\"/plugins\"},{\"name\":\"default-token-87f62\",\"readOnly\":true,\"mountPath\":\"/var/run/secrets/kubernetes.io/serviceaccount\"}],\"terminationMessagePath\":\"/dev/termination-log\",\"imagePullPolicy\":\"Always\"}]",
            "pod.beta.kubernetes.io/init-container-statuses": "[{\"name\":\"sp-plugin-core\",\"state\":{\"terminated\":{\"exitCode\":0,\"reason\":\"Completed\",\"startedAt\":\"2017-04-01T00:38:04Z\",\"finishedAt\":\"2017-04-01T00:38:04Z\",\"containerID\":\"docker://f06c2d7bf861c72de9dab8878d444e074e14d49cc9dab04f75401b5d1901cc4d\"}},\"lastState\":{},\"ready\":true,\"restartCount\":0,\"image\":\"quay.io/streamplace/sp-plugin-core:v0.0.14-51-g790db65\",\"imageID\":\"docker://sha256:e106a528719aee6e441d9c189a70041365ec19e2e382ce6f60e085905ad4fd7b\",\"containerID\":\"docker://f06c2d7bf861c72de9dab8878d444e074e14d49cc9dab04f75401b5d1901cc4d\"},{\"name\":\"sp-plugin-auth\",\"state\":{\"terminated\":{\"exitCode\":0,\"reason\":\"Completed\",\"startedAt\":\"2017-04-01T00:38:35Z\",\"finishedAt\":\"2017-04-01T00:38:35Z\",\"containerID\":\"docker://11c81d1bd6d9e07f2434e29ac309902145183ad896486a74955009dcd9e4284e\"}},\"lastState\":{},\"ready\":true,\"restartCount\":0,\"image\":\"quay.io/streamplace/sp-plugin-auth:v0.0.14-51-g790db65\",\"imageID\":\"docker://sha256:7167432e098d1cf88d970899b9fe5a75044ec02d22d9477f8d0dc09d9069c683\",\"containerID\":\"docker://11c81d1bd6d9e07f2434e29ac309902145183ad896486a74955009dcd9e4284e\"}]",
            "pod.beta.kubernetes.io/init-containers": "[{\"name\":\"sp-plugin-core\",\"image\":\"quay.io/streamplace/sp-plugin-core:v0.0.14-51-g790db65\",\"command\":[\"cp\",\"-R\",\"/app\",\"/plugins/sp-plugin-core\"],\"resources\":{},\"volumeMounts\":[{\"name\":\"plugins\",\"mountPath\":\"/plugins\"},{\"name\":\"default-token-87f62\",\"readOnly\":true,\"mountPath\":\"/var/run/secrets/kubernetes.io/serviceaccount\"}],\"terminationMessagePath\":\"/dev/termination-log\",\"imagePullPolicy\":\"Always\"},{\"name\":\"sp-plugin-auth\",\"image\":\"quay.io/streamplace/sp-plugin-auth:v0.0.14-51-g790db65\",\"command\":[\"cp\",\"-R\",\"/app\",\"/plugins/sp-plugin-auth\"],\"resources\":{},\"volumeMounts\":[{\"name\":\"plugins\",\"mountPath\":\"/plugins\"},{\"name\":\"default-token-87f62\",\"readOnly\":true,\"mountPath\":\"/var/run/secrets/kubernetes.io/serviceaccount\"}],\"terminationMessagePath\":\"/dev/termination-log\",\"imagePullPolicy\":\"Always\"}]"
          },
          "creationTimestamp": "2017-04-01T00:37:32Z",
          "generateName": "prod-sp-api-server-2622043796-",
          "labels": {
            "app": "prod-sp-api-server",
            "deployTime": "1491003520",
            "pod-template-hash": "2622043796"
          },
          "name": "prod-sp-api-server-2622043796-7mv0i",
          "namespace": "default",
          "ownerReferences": [
            {
              "apiVersion": "extensions/v1beta1",
              "controller": true,
              "kind": "ReplicaSet",
              "name": "prod-sp-api-server-2622043796",
              "uid": "64b2cec9-1673-11e7-88dd-06f78f5b71f7"
            }
          ],
          "resourceVersion": "14967637",
          "selfLink": "/api/v1/namespaces/default/pods/prod-sp-api-server-2622043796-7mv0i",
          "uid": "64b82924-1673-11e7-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "env": [
                {
                  "name": "NODE_PATH",
                  "value": "/plugins:/app/node_modules"
                },
                {
                  "name": "SP_DOMAIN",
                  "value": "stream.place"
                },
                {
                  "name": "SP_JWT_SECRET",
                  "value": "Nlg4ME94M2tOYlNqNkxTMjYzTlIteEZkSVZpM3lUYTJZZmV2VFdnNy1lQzlCeFhjWGM4QjN0aWJRSVlYSkZDNQ=="
                },
                {
                  "name": "SP_JWT_AUDIENCE",
                  "value": "hZU06VmfYz2JLZCkjtJ7ltEy5SOsvmBA"
                },
                {
                  "name": "SP_JWT_EXPIRATION",
                  "value": "30d"
                },
                {
                  "name": "SP_AUTH_ISSUER",
                  "value": "https://stream.place/"
                },
                {
                  "name": "SP_RETHINK_DATABASE",
                  "value": "prod"
                },
                {
                  "name": "SP_RETHINK_HOST",
                  "value": "prod-sp-rethinkdb.default.svc.cluster.local"
                },
                {
                  "name": "SP_SCHEMA_URL",
                  "value": "http://prod-sp-schema.default.svc.cluster.local/schema.json"
                },
                {
                  "name": "SP_RETHINK_PORT",
                  "value": "28015"
                }
              ],
              "image": "quay.io/streamplace/sp-api-server:v0.0.14-51-g790db65",
              "imagePullPolicy": "Always",
              "livenessProbe": {
                "failureThreshold": 5,
                "httpGet": {
                  "httpHeaders": [
                    {
                      "name": "Kube-Probe",
                      "value": "liveness"
                    }
                  ],
                  "path": "/healthz",
                  "port": 80,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 30,
                "periodSeconds": 5,
                "successThreshold": 1,
                "timeoutSeconds": 5
              },
              "name": "sp-api-server",
              "readinessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "httpHeaders": [
                    {
                      "name": "Kube-Probe",
                      "value": "readiness"
                    }
                  ],
                  "path": "/healthz",
                  "port": 80,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 3,
                "periodSeconds": 3,
                "successThreshold": 1,
                "timeoutSeconds": 5
              },
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/plugins",
                  "name": "plugins"
                },
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-87f62",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "nodeName": "ip-10-0-0-125.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "emptyDir": {},
              "name": "plugins"
            },
            {
              "name": "default-token-87f62",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-87f62"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-01T00:38:36Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-01T00:38:50Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-01T00:37:32Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://9f38c07e5275d72ac79c236c3afc4023079f294586e78075bdf4a7c4d1eeeb67",
              "image": "quay.io/streamplace/sp-api-server:v0.0.14-51-g790db65",
              "imageID": "docker://sha256:99c6b09c6cda5947ad67b2ae4e15ae009bfba2d720e0c0ddb6c4abaf0d51a869",
              "lastState": {},
              "name": "sp-api-server",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-04-01T00:38:45Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.125",
          "phase": "Running",
          "podIP": "10.2.17.30",
          "startTime": "2017-04-01T00:37:32Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicaSet\",\"namespace\":\"default\",\"name\":\"prod-sp-auth-frontend-3780227853\",\"uid\":\"64b8c497-1673-11e7-88dd-06f78f5b71f7\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"14967312\"}}\n"
          },
          "creationTimestamp": "2017-04-01T00:37:32Z",
          "generateName": "prod-sp-auth-frontend-3780227853-",
          "labels": {
            "app": "prod-sp-auth-frontend",
            "pod-template-hash": "3780227853"
          },
          "name": "prod-sp-auth-frontend-3780227853-akc75",
          "namespace": "default",
          "ownerReferences": [
            {
              "apiVersion": "extensions/v1beta1",
              "controller": true,
              "kind": "ReplicaSet",
              "name": "prod-sp-auth-frontend-3780227853",
              "uid": "64b8c497-1673-11e7-88dd-06f78f5b71f7"
            }
          ],
          "resourceVersion": "14967475",
          "selfLink": "/api/v1/namespaces/default/pods/prod-sp-auth-frontend-3780227853-akc75",
          "uid": "64be51b7-1673-11e7-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "image": "quay.io/streamplace/sp-auth-frontend:v0.0.14-51-g790db65",
              "imagePullPolicy": "Always",
              "name": "sp-auth-frontend",
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-87f62",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "nodeName": "ip-10-0-0-125.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "name": "default-token-87f62",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-87f62"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-01T00:37:32Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-01T00:38:09Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-01T00:37:32Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://94f6979c30c7e964327ac7d77fec3a5c7b774d81f158fe1a04f43f58edae6e13",
              "image": "quay.io/streamplace/sp-auth-frontend:v0.0.14-51-g790db65",
              "imageID": "docker://sha256:f079cf8de817c63650354eff2da46ff5d86f12dea72156c179d57d44c946b6fb",
              "lastState": {},
              "name": "sp-auth-frontend",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-04-01T00:38:08Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.125",
          "phase": "Running",
          "podIP": "10.2.17.31",
          "startTime": "2017-04-01T00:37:32Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicaSet\",\"namespace\":\"default\",\"name\":\"prod-sp-channel-manager-1580973037\",\"uid\":\"64d965c7-1673-11e7-88dd-06f78f5b71f7\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"14967342\"}}\n"
          },
          "creationTimestamp": "2017-04-01T00:37:32Z",
          "generateName": "prod-sp-channel-manager-1580973037-",
          "labels": {
            "app": "prod-sp-channel-manager",
            "pod-template-hash": "1580973037"
          },
          "name": "prod-sp-channel-manager-1580973037-nmuj9",
          "namespace": "default",
          "ownerReferences": [
            {
              "apiVersion": "extensions/v1beta1",
              "controller": true,
              "kind": "ReplicaSet",
              "name": "prod-sp-channel-manager-1580973037",
              "uid": "64d965c7-1673-11e7-88dd-06f78f5b71f7"
            }
          ],
          "resourceVersion": "14967558",
          "selfLink": "/api/v1/namespaces/default/pods/prod-sp-channel-manager-1580973037-nmuj9",
          "uid": "64dc72ea-1673-11e7-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "env": [
                {
                  "name": "SP_DOMAIN",
                  "value": "stream.place"
                },
                {
                  "name": "SP_JWT_SECRET",
                  "value": "Nlg4ME94M2tOYlNqNkxTMjYzTlIteEZkSVZpM3lUYTJZZmV2VFdnNy1lQzlCeFhjWGM4QjN0aWJRSVlYSkZDNQ=="
                },
                {
                  "name": "SP_JWT_AUDIENCE",
                  "value": "hZU06VmfYz2JLZCkjtJ7ltEy5SOsvmBA"
                },
                {
                  "name": "SP_JWT_EXPIRATION",
                  "value": "30d"
                },
                {
                  "name": "SP_AUTH_ISSUER",
                  "value": "https://stream.place/"
                },
                {
                  "name": "SP_API_SERVER_URL",
                  "value": "https://stream.place"
                }
              ],
              "image": "quay.io/streamplace/sp-channel-manager:v0.0.14-51-g790db65",
              "imagePullPolicy": "Always",
              "livenessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "path": "/healthz",
                  "port": 80,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 30,
                "periodSeconds": 5,
                "successThreshold": 1,
                "timeoutSeconds": 5
              },
              "name": "sp-channel-manager",
              "readinessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "path": "/healthz",
                  "port": 80,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 3,
                "periodSeconds": 3,
                "successThreshold": 1,
                "timeoutSeconds": 5
              },
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-87f62",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "nodeName": "ip-10-0-0-125.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "name": "default-token-87f62",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-87f62"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-01T00:37:32Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-01T00:38:29Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-01T00:37:32Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://3e3a349a11ee09361419fe760e1f576b0257f7a25c589c20ae01b64ffe091956",
              "image": "quay.io/streamplace/sp-channel-manager:v0.0.14-51-g790db65",
              "imageID": "docker://sha256:03d91bf78115c131f800f70146578c3804bcbdd67d1e691fe09e1bb916e473aa",
              "lastState": {},
              "name": "sp-channel-manager",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-04-01T00:38:25Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.125",
          "phase": "Running",
          "podIP": "10.2.17.33",
          "startTime": "2017-04-01T00:37:32Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"DaemonSet\",\"namespace\":\"default\",\"name\":\"prod-sp-coturn\",\"uid\":\"8152157c-15d8-11e7-88dd-06f78f5b71f7\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"14861489\"}}\n"
          },
          "creationTimestamp": "2017-03-31T06:08:48Z",
          "generateName": "prod-sp-coturn-",
          "labels": {
            "app": "prod-sp-coturn"
          },
          "name": "prod-sp-coturn-7h5tl",
          "namespace": "default",
          "resourceVersion": "14861542",
          "selfLink": "/api/v1/namespaces/default/pods/prod-sp-coturn-7h5tl",
          "uid": "8153280a-15d8-11e7-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "args": [
                "/coturn.sh"
              ],
              "command": [
                "/bin/sh"
              ],
              "env": [
                {
                  "name": "POD_IP",
                  "valueFrom": {
                    "fieldRef": {
                      "apiVersion": "v1",
                      "fieldPath": "status.podIP"
                    }
                  }
                },
                {
                  "name": "MIN_PORT",
                  "value": "50000"
                },
                {
                  "name": "MAX_PORT",
                  "value": "65535"
                }
              ],
              "image": "ianblenke/coturn:latest",
              "imagePullPolicy": "Always",
              "name": "sp-coturn",
              "ports": [
                {
                  "containerPort": 3478,
                  "hostPort": 3478,
                  "protocol": "TCP"
                },
                {
                  "containerPort": 3478,
                  "hostPort": 3478,
                  "protocol": "UDP"
                }
              ],
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/coturn.sh",
                  "name": "coturn-command",
                  "subPath": "coturn.sh"
                },
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-87f62",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "hostNetwork": true,
          "nodeName": "ip-10-0-0-36.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "configMap": {
                "defaultMode": 420,
                "name": "prod-sp-coturn"
              },
              "name": "coturn-command"
            },
            {
              "name": "default-token-87f62",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-87f62"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-31T06:08:48Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-31T06:08:52Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-31T06:08:52Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://1da635d06b063a141744500ef53fb55b04828b59d5a8503c9f223bd2a5e6734f",
              "image": "ianblenke/coturn:latest",
              "imageID": "docker://sha256:3d3904cc8f6a60f86b728eadec949dd15ec4b4207008ad504bbcbef155e9a5b1",
              "lastState": {},
              "name": "sp-coturn",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-03-31T06:08:51Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.36",
          "phase": "Running",
          "podIP": "10.0.0.36",
          "startTime": "2017-03-31T06:08:48Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"DaemonSet\",\"namespace\":\"default\",\"name\":\"prod-sp-coturn\",\"uid\":\"8152157c-15d8-11e7-88dd-06f78f5b71f7\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"14861489\"}}\n"
          },
          "creationTimestamp": "2017-03-31T06:08:48Z",
          "generateName": "prod-sp-coturn-",
          "labels": {
            "app": "prod-sp-coturn"
          },
          "name": "prod-sp-coturn-p6nb1",
          "namespace": "default",
          "resourceVersion": "14862036",
          "selfLink": "/api/v1/namespaces/default/pods/prod-sp-coturn-p6nb1",
          "uid": "81534482-15d8-11e7-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "args": [
                "/coturn.sh"
              ],
              "command": [
                "/bin/sh"
              ],
              "env": [
                {
                  "name": "POD_IP",
                  "valueFrom": {
                    "fieldRef": {
                      "apiVersion": "v1",
                      "fieldPath": "status.podIP"
                    }
                  }
                },
                {
                  "name": "MIN_PORT",
                  "value": "50000"
                },
                {
                  "name": "MAX_PORT",
                  "value": "65535"
                }
              ],
              "image": "ianblenke/coturn:latest",
              "imagePullPolicy": "Always",
              "name": "sp-coturn",
              "ports": [
                {
                  "containerPort": 3478,
                  "hostPort": 3478,
                  "protocol": "TCP"
                },
                {
                  "containerPort": 3478,
                  "hostPort": 3478,
                  "protocol": "UDP"
                }
              ],
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/coturn.sh",
                  "name": "coturn-command",
                  "subPath": "coturn.sh"
                },
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-87f62",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "hostNetwork": true,
          "nodeName": "ip-10-0-0-125.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "configMap": {
                "defaultMode": 420,
                "name": "prod-sp-coturn"
              },
              "name": "coturn-command"
            },
            {
              "name": "default-token-87f62",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-87f62"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-31T06:08:48Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-31T06:09:56Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-31T06:11:15Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://a4033fcb100f891c0ff53c1518817f3c04497ca5a9f6de580aa41662a1045551",
              "image": "ianblenke/coturn:latest",
              "imageID": "docker://sha256:3d3904cc8f6a60f86b728eadec949dd15ec4b4207008ad504bbcbef155e9a5b1",
              "lastState": {},
              "name": "sp-coturn",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-03-31T06:09:56Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.125",
          "phase": "Running",
          "podIP": "10.0.0.125",
          "startTime": "2017-03-31T06:08:48Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"DaemonSet\",\"namespace\":\"default\",\"name\":\"prod-sp-coturn\",\"uid\":\"8152157c-15d8-11e7-88dd-06f78f5b71f7\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"14861489\"}}\n"
          },
          "creationTimestamp": "2017-03-31T06:08:48Z",
          "generateName": "prod-sp-coturn-",
          "labels": {
            "app": "prod-sp-coturn"
          },
          "name": "prod-sp-coturn-wquhw",
          "namespace": "default",
          "resourceVersion": "14861537",
          "selfLink": "/api/v1/namespaces/default/pods/prod-sp-coturn-wquhw",
          "uid": "81535b6c-15d8-11e7-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "args": [
                "/coturn.sh"
              ],
              "command": [
                "/bin/sh"
              ],
              "env": [
                {
                  "name": "POD_IP",
                  "valueFrom": {
                    "fieldRef": {
                      "apiVersion": "v1",
                      "fieldPath": "status.podIP"
                    }
                  }
                },
                {
                  "name": "MIN_PORT",
                  "value": "50000"
                },
                {
                  "name": "MAX_PORT",
                  "value": "65535"
                }
              ],
              "image": "ianblenke/coturn:latest",
              "imagePullPolicy": "Always",
              "name": "sp-coturn",
              "ports": [
                {
                  "containerPort": 3478,
                  "hostPort": 3478,
                  "protocol": "TCP"
                },
                {
                  "containerPort": 3478,
                  "hostPort": 3478,
                  "protocol": "UDP"
                }
              ],
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/coturn.sh",
                  "name": "coturn-command",
                  "subPath": "coturn.sh"
                },
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-87f62",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "hostNetwork": true,
          "nodeName": "ip-10-0-0-37.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "configMap": {
                "defaultMode": 420,
                "name": "prod-sp-coturn"
              },
              "name": "coturn-command"
            },
            {
              "name": "default-token-87f62",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-87f62"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-31T06:08:48Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-31T06:08:50Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-31T06:08:50Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://0bff323b9168f6376dadf127c4be1876575459e5b876cf160b26872c7f66ae4d",
              "image": "ianblenke/coturn:latest",
              "imageID": "docker://sha256:3d3904cc8f6a60f86b728eadec949dd15ec4b4207008ad504bbcbef155e9a5b1",
              "lastState": {},
              "name": "sp-coturn",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-03-31T06:08:50Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.37",
          "phase": "Running",
          "podIP": "10.0.0.37",
          "startTime": "2017-03-31T06:08:48Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicaSet\",\"namespace\":\"default\",\"name\":\"prod-sp-default-2017390752\",\"uid\":\"3a1ad54a-03c0-11e7-88dd-06f78f5b71f7\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"14800231\"}}\n"
          },
          "creationTimestamp": "2017-03-30T18:19:08Z",
          "generateName": "prod-sp-default-2017390752-",
          "labels": {
            "app": "prod-sp-default",
            "pod-template-hash": "2017390752"
          },
          "name": "prod-sp-default-2017390752-q9pgg",
          "namespace": "default",
          "ownerReferences": [
            {
              "apiVersion": "extensions/v1beta1",
              "controller": true,
              "kind": "ReplicaSet",
              "name": "prod-sp-default-2017390752",
              "uid": "3a1ad54a-03c0-11e7-88dd-06f78f5b71f7"
            }
          ],
          "resourceVersion": "14800566",
          "selfLink": "/api/v1/namespaces/default/pods/prod-sp-default-2017390752-q9pgg",
          "uid": "5df41adb-1575-11e7-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "image": "gcr.io/google_containers/defaultbackend:1.0",
              "imagePullPolicy": "Always",
              "livenessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "path": "/healthz",
                  "port": 8080,
                  "scheme": "HTTP"
                },
                "periodSeconds": 10,
                "successThreshold": 1,
                "timeoutSeconds": 1
              },
              "name": "nginx",
              "ports": [
                {
                  "containerPort": 80,
                  "protocol": "TCP"
                }
              ],
              "readinessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "path": "/healthz",
                  "port": 8080,
                  "scheme": "HTTP"
                },
                "periodSeconds": 10,
                "successThreshold": 1,
                "timeoutSeconds": 1
              },
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-87f62",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "nodeName": "ip-10-0-0-36.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "name": "default-token-87f62",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-87f62"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:19:09Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:20:49Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:19:09Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://d67e752c07050d125959e5b7c911082a089a6c5960a9e97fd37d192957fe2808",
              "image": "gcr.io/google_containers/defaultbackend:1.0",
              "imageID": "docker://sha256:137a07dfd084191742ebc0861606b64f5acff0f893e71348fb0c7d7aaee6a364",
              "lastState": {},
              "name": "nginx",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-03-30T18:20:46Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.36",
          "phase": "Running",
          "podIP": "10.2.94.34",
          "startTime": "2017-03-30T18:19:09Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicaSet\",\"namespace\":\"default\",\"name\":\"prod-sp-dev-certs-2168244303\",\"uid\":\"64e2de7a-1673-11e7-88dd-06f78f5b71f7\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"14967355\"}}\n"
          },
          "creationTimestamp": "2017-04-01T00:37:32Z",
          "generateName": "prod-sp-dev-certs-2168244303-",
          "labels": {
            "app": "prod-sp-dev-certs",
            "pod-template-hash": "2168244303"
          },
          "name": "prod-sp-dev-certs-2168244303-1u3rp",
          "namespace": "default",
          "ownerReferences": [
            {
              "apiVersion": "extensions/v1beta1",
              "controller": true,
              "kind": "ReplicaSet",
              "name": "prod-sp-dev-certs-2168244303",
              "uid": "64e2de7a-1673-11e7-88dd-06f78f5b71f7"
            }
          ],
          "resourceVersion": "14967581",
          "selfLink": "/api/v1/namespaces/default/pods/prod-sp-dev-certs-2168244303-1u3rp",
          "uid": "64e7c9f3-1673-11e7-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "image": "quay.io/streamplace/sp-dev-certs:v0.0.14-51-g790db65",
              "imagePullPolicy": "IfNotPresent",
              "livenessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "path": "/",
                  "port": 80,
                  "scheme": "HTTP"
                },
                "periodSeconds": 10,
                "successThreshold": 1,
                "timeoutSeconds": 1
              },
              "name": "sp-dev-certs",
              "ports": [
                {
                  "containerPort": 80,
                  "protocol": "TCP"
                }
              ],
              "readinessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "path": "/",
                  "port": 80,
                  "scheme": "HTTP"
                },
                "periodSeconds": 10,
                "successThreshold": 1,
                "timeoutSeconds": 1
              },
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/certs/acatmore.sp-dev.club",
                  "name": "acatmore"
                },
                {
                  "mountPath": "/certs/auth-dev.sp-dev.club",
                  "name": "auth-dev"
                },
                {
                  "mountPath": "/certs/iameli.sp-dev.club",
                  "name": "iameli"
                },
                {
                  "mountPath": "/certs/wild-card.sp-dev.club",
                  "name": "wild-card"
                },
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-87f62",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "nodeName": "ip-10-0-0-125.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "name": "iameli",
              "secret": {
                "defaultMode": 420,
                "secretName": "iameli.sp-dev.club"
              }
            },
            {
              "name": "acatmore",
              "secret": {
                "defaultMode": 420,
                "secretName": "acatmore.sp-dev.club"
              }
            },
            {
              "name": "auth-dev",
              "secret": {
                "defaultMode": 420,
                "secretName": "auth-dev.sp-dev.club"
              }
            },
            {
              "name": "wild-card",
              "secret": {
                "defaultMode": 420,
                "secretName": "wild-card.sp-dev.club"
              }
            },
            {
              "name": "default-token-87f62",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-87f62"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-01T00:37:33Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-01T00:38:33Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-01T00:37:32Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://6b36c8ddb5586f519b9d461abd3a560c3a8f8e69817f781613cdf18d4ef5c521",
              "image": "quay.io/streamplace/sp-dev-certs:v0.0.14-51-g790db65",
              "imageID": "docker://sha256:c6d97283a61544f01acd56b6e64b08d8264ab1793032e09f31be4c2bf832221c",
              "lastState": {},
              "name": "sp-dev-certs",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-04-01T00:38:30Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.125",
          "phase": "Running",
          "podIP": "10.2.17.34",
          "startTime": "2017-04-01T00:37:33Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicaSet\",\"namespace\":\"default\",\"name\":\"prod-sp-frontend-2156317710\",\"uid\":\"64908640-1673-11e7-88dd-06f78f5b71f7\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"14967292\"}}\n"
          },
          "creationTimestamp": "2017-04-01T00:37:32Z",
          "generateName": "prod-sp-frontend-2156317710-",
          "labels": {
            "app": "prod-sp-frontend",
            "pod-template-hash": "2156317710"
          },
          "name": "prod-sp-frontend-2156317710-zg1yd",
          "namespace": "default",
          "ownerReferences": [
            {
              "apiVersion": "extensions/v1beta1",
              "controller": true,
              "kind": "ReplicaSet",
              "name": "prod-sp-frontend-2156317710",
              "uid": "64908640-1673-11e7-88dd-06f78f5b71f7"
            }
          ],
          "resourceVersion": "14967498",
          "selfLink": "/api/v1/namespaces/default/pods/prod-sp-frontend-2156317710-zg1yd",
          "uid": "649319ea-1673-11e7-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "image": "quay.io/streamplace/sp-frontend:v0.0.14-51-g790db65",
              "imagePullPolicy": "Always",
              "livenessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "path": "/",
                  "port": 80,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 30,
                "periodSeconds": 5,
                "successThreshold": 1,
                "timeoutSeconds": 5
              },
              "name": "sp-frontend",
              "readinessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "path": "/",
                  "port": 80,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 15,
                "periodSeconds": 3,
                "successThreshold": 1,
                "timeoutSeconds": 5
              },
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-87f62",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "nodeName": "ip-10-0-0-125.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "name": "default-token-87f62",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-87f62"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-01T00:37:32Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-01T00:38:14Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-01T00:37:32Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://e3031646b1ee4b4015fd5ef2662f102575d1595aab52aa047a65ec6ec2690e41",
              "image": "quay.io/streamplace/sp-frontend:v0.0.14-51-g790db65",
              "imageID": "docker://sha256:1052225656cb91a960985fc16ebe25dc1c16f1af9d01b66ec0133e2eafa6bd6d",
              "lastState": {},
              "name": "sp-frontend",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-04-01T00:37:59Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.125",
          "phase": "Running",
          "podIP": "10.2.17.29",
          "startTime": "2017-04-01T00:37:32Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicaSet\",\"namespace\":\"default\",\"name\":\"prod-sp-ingress-1722032082\",\"uid\":\"80a1aa64-15d8-11e7-88dd-06f78f5b71f7\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"14861388\"}}\n"
          },
          "creationTimestamp": "2017-03-31T06:08:47Z",
          "generateName": "prod-sp-ingress-1722032082-",
          "labels": {
            "app": "prod-sp-ingress",
            "pod-template-hash": "1722032082"
          },
          "name": "prod-sp-ingress-1722032082-9243l",
          "namespace": "default",
          "ownerReferences": [
            {
              "apiVersion": "extensions/v1beta1",
              "controller": true,
              "kind": "ReplicaSet",
              "name": "prod-sp-ingress-1722032082",
              "uid": "80a1aa64-15d8-11e7-88dd-06f78f5b71f7"
            }
          ],
          "resourceVersion": "14861655",
          "selfLink": "/api/v1/namespaces/default/pods/prod-sp-ingress-1722032082-9243l",
          "uid": "80b04c30-15d8-11e7-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "args": [
                "--default-backend-service",
                "default/prod-sp-default",
                "--configmap=default/prod-sp-ingress"
              ],
              "command": [
                "/nginx-ingress-controller"
              ],
              "env": [
                {
                  "name": "POD_NAME",
                  "valueFrom": {
                    "fieldRef": {
                      "apiVersion": "v1",
                      "fieldPath": "metadata.name"
                    }
                  }
                },
                {
                  "name": "POD_NAMESPACE",
                  "valueFrom": {
                    "fieldRef": {
                      "apiVersion": "v1",
                      "fieldPath": "metadata.namespace"
                    }
                  }
                }
              ],
              "image": "gcr.io/google_containers/nginx-ingress-controller:0.9.0-beta.2",
              "imagePullPolicy": "Always",
              "livenessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "path": "/healthz",
                  "port": 10254,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 30,
                "periodSeconds": 10,
                "successThreshold": 1,
                "timeoutSeconds": 1
              },
              "name": "nginx",
              "ports": [
                {
                  "containerPort": 80,
                  "protocol": "TCP"
                },
                {
                  "containerPort": 443,
                  "protocol": "TCP"
                }
              ],
              "readinessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "path": "/healthz",
                  "port": 10254,
                  "scheme": "HTTP"
                },
                "periodSeconds": 10,
                "successThreshold": 1,
                "timeoutSeconds": 1
              },
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-87f62",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "nodeName": "ip-10-0-0-125.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "name": "default-token-87f62",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-87f62"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-31T06:08:47Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-31T06:09:37Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-31T06:08:47Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://55f874fc50f4572a7ac53b3d3a2757705943dac54fffae796b1d92fe81c5994e",
              "image": "gcr.io/google_containers/nginx-ingress-controller:0.9.0-beta.2",
              "imageID": "docker://sha256:c465518591e59855dd8d0fc89e2c7d528ede5abdc6278848c98b2ef3e6516241",
              "lastState": {},
              "name": "nginx",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-03-31T06:09:23Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.125",
          "phase": "Running",
          "podIP": "10.2.17.5",
          "startTime": "2017-03-31T06:08:47Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicaSet\",\"namespace\":\"default\",\"name\":\"prod-sp-kube-lego-128634381\",\"uid\":\"53788744-03db-11e7-88dd-06f78f5b71f7\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"14800247\"}}\n"
          },
          "creationTimestamp": "2017-03-30T18:19:09Z",
          "generateName": "prod-sp-kube-lego-128634381-",
          "labels": {
            "app": "kube-lego",
            "pod-template-hash": "128634381"
          },
          "name": "prod-sp-kube-lego-128634381-yyzrc",
          "namespace": "default",
          "ownerReferences": [
            {
              "apiVersion": "extensions/v1beta1",
              "controller": true,
              "kind": "ReplicaSet",
              "name": "prod-sp-kube-lego-128634381",
              "uid": "53788744-03db-11e7-88dd-06f78f5b71f7"
            }
          ],
          "resourceVersion": "14800705",
          "selfLink": "/api/v1/namespaces/default/pods/prod-sp-kube-lego-128634381-yyzrc",
          "uid": "5e390e65-1575-11e7-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "env": [
                {
                  "name": "LEGO_EMAIL",
                  "value": "stuff@stream.place"
                },
                {
                  "name": "LEGO_URL",
                  "value": "https://acme-v01.api.letsencrypt.org/directory"
                },
                {
                  "name": "LEGO_SERVICE_NAME_NGINX",
                  "value": "prod-sp-kube-lego-nginx"
                },
                {
                  "name": "LEGO_INGRESS_NAME_NGINX",
                  "value": "prod-sp-kube-lego-nginx"
                },
                {
                  "name": "LEGO_NAMESPACE",
                  "valueFrom": {
                    "fieldRef": {
                      "apiVersion": "v1",
                      "fieldPath": "metadata.namespace"
                    }
                  }
                },
                {
                  "name": "LEGO_POD_IP",
                  "valueFrom": {
                    "fieldRef": {
                      "apiVersion": "v1",
                      "fieldPath": "status.podIP"
                    }
                  }
                }
              ],
              "image": "jetstack/kube-lego:0.1.3",
              "imagePullPolicy": "Always",
              "name": "kube-lego",
              "ports": [
                {
                  "containerPort": 8080,
                  "protocol": "TCP"
                }
              ],
              "readinessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "path": "/healthz",
                  "port": 8080,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 5,
                "periodSeconds": 10,
                "successThreshold": 1,
                "timeoutSeconds": 1
              },
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-87f62",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "nodeName": "ip-10-0-0-36.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "name": "default-token-87f62",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-87f62"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:19:09Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:22:00Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:19:09Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://2f47954221f92d62529e4ac3a7181f63609c094fae0446528eb61402b6861073",
              "image": "jetstack/kube-lego:0.1.3",
              "imageID": "docker://sha256:300fcce773504eff061b90e08e2fb2ba0e11ba5624a6f4e8bb615ddd2a9b3e9c",
              "lastState": {},
              "name": "kube-lego",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-03-30T18:21:45Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.36",
          "phase": "Running",
          "podIP": "10.2.94.41",
          "startTime": "2017-03-30T18:19:09Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"DaemonSet\",\"namespace\":\"default\",\"name\":\"prod-sp-logs\",\"uid\":\"3a425e70-03c0-11e7-88dd-06f78f5b71f7\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"12039455\"}}\n"
          },
          "creationTimestamp": "2017-03-08T08:56:45Z",
          "generateName": "prod-sp-logs-",
          "labels": {
            "app": "prod-sp-logs"
          },
          "name": "prod-sp-logs-gi49k",
          "namespace": "default",
          "resourceVersion": "12039499",
          "selfLink": "/api/v1/namespaces/default/pods/prod-sp-logs-gi49k",
          "uid": "27e931da-03dd-11e7-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "args": [
                "syslog://logs3.papertrailapp.com:25579"
              ],
              "image": "gliderlabs/logspout:latest",
              "imagePullPolicy": "Always",
              "name": "logspout",
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/var/run/docker.sock",
                  "name": "dockersock"
                },
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-87f62",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "nodeName": "ip-10-0-0-36.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "hostPath": {
                "path": "/var/run/docker.sock"
              },
              "name": "dockersock"
            },
            {
              "name": "default-token-87f62",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-87f62"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-08T08:56:45Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-08T08:56:48Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-08T08:56:48Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://534adca9ce9c905e7f986821adf09360e768ea77548cd040389c7e085e224373",
              "image": "gliderlabs/logspout:latest",
              "imageID": "docker://sha256:6c7afda380b21c90161d54a1f6d407f17d015efc9fc0b7b8cab7c3fdb6d96513",
              "lastState": {},
              "name": "logspout",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-03-08T08:56:47Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.36",
          "phase": "Running",
          "podIP": "10.2.94.31",
          "startTime": "2017-03-08T08:56:45Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"DaemonSet\",\"namespace\":\"default\",\"name\":\"prod-sp-logs\",\"uid\":\"3a425e70-03c0-11e7-88dd-06f78f5b71f7\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"14800400\"}}\n"
          },
          "creationTimestamp": "2017-03-30T18:27:17Z",
          "generateName": "prod-sp-logs-",
          "labels": {
            "app": "prod-sp-logs"
          },
          "name": "prod-sp-logs-p5ufl",
          "namespace": "default",
          "resourceVersion": "14801220",
          "selfLink": "/api/v1/namespaces/default/pods/prod-sp-logs-p5ufl",
          "uid": "81656c26-1576-11e7-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "args": [
                "syslog://logs3.papertrailapp.com:25579"
              ],
              "image": "gliderlabs/logspout:latest",
              "imagePullPolicy": "Always",
              "name": "logspout",
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/var/run/docker.sock",
                  "name": "dockersock"
                },
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-87f62",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "nodeName": "ip-10-0-0-125.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "hostPath": {
                "path": "/var/run/docker.sock"
              },
              "name": "dockersock"
            },
            {
              "name": "default-token-87f62",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-87f62"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:27:22Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:27:27Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:27:27Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://75b54cf5dde1be4b9cf916273a3c187c869d3e8bdba92d209c303b865e6e3b64",
              "image": "gliderlabs/logspout:latest",
              "imageID": "docker://sha256:6c7afda380b21c90161d54a1f6d407f17d015efc9fc0b7b8cab7c3fdb6d96513",
              "lastState": {},
              "name": "logspout",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-03-30T18:27:27Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.125",
          "phase": "Running",
          "podIP": "10.2.17.2",
          "startTime": "2017-03-30T18:27:22Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"DaemonSet\",\"namespace\":\"default\",\"name\":\"prod-sp-logs\",\"uid\":\"3a425e70-03c0-11e7-88dd-06f78f5b71f7\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"12039455\"}}\n"
          },
          "creationTimestamp": "2017-03-08T08:56:44Z",
          "generateName": "prod-sp-logs-",
          "labels": {
            "app": "prod-sp-logs"
          },
          "name": "prod-sp-logs-wu01i",
          "namespace": "default",
          "resourceVersion": "12039493",
          "selfLink": "/api/v1/namespaces/default/pods/prod-sp-logs-wu01i",
          "uid": "27e2f94f-03dd-11e7-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "args": [
                "syslog://logs3.papertrailapp.com:25579"
              ],
              "image": "gliderlabs/logspout:latest",
              "imagePullPolicy": "Always",
              "name": "logspout",
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/var/run/docker.sock",
                  "name": "dockersock"
                },
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-87f62",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "nodeName": "ip-10-0-0-37.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "hostPath": {
                "path": "/var/run/docker.sock"
              },
              "name": "dockersock"
            },
            {
              "name": "default-token-87f62",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-87f62"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-08T08:56:45Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-08T08:56:46Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-08T08:56:46Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://71b9478f811cbf5be012a5e601c346338fc56ceb6e76831d9ee5ec0010252367",
              "image": "gliderlabs/logspout:latest",
              "imageID": "docker://sha256:6c7afda380b21c90161d54a1f6d407f17d015efc9fc0b7b8cab7c3fdb6d96513",
              "lastState": {},
              "name": "logspout",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-03-08T08:56:46Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.37",
          "phase": "Running",
          "podIP": "10.2.91.5",
          "startTime": "2017-03-08T08:56:45Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicaSet\",\"namespace\":\"default\",\"name\":\"prod-sp-rethinkdb-479038915\",\"uid\":\"c211eb22-03db-11e7-88dd-06f78f5b71f7\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"14800252\"}}\n"
          },
          "creationTimestamp": "2017-03-30T18:19:09Z",
          "generateName": "prod-sp-rethinkdb-479038915-",
          "labels": {
            "app": "prod-sp-rethinkdb",
            "pod-template-hash": "479038915"
          },
          "name": "prod-sp-rethinkdb-479038915-vdooq",
          "namespace": "default",
          "ownerReferences": [
            {
              "apiVersion": "extensions/v1beta1",
              "controller": true,
              "kind": "ReplicaSet",
              "name": "prod-sp-rethinkdb-479038915",
              "uid": "c211eb22-03db-11e7-88dd-06f78f5b71f7"
            }
          ],
          "resourceVersion": "14800759",
          "selfLink": "/api/v1/namespaces/default/pods/prod-sp-rethinkdb-479038915-vdooq",
          "uid": "5e4a559a-1575-11e7-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "image": "rethinkdb:2.3",
              "imagePullPolicy": "Always",
              "livenessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "path": "/",
                  "port": 8080,
                  "scheme": "HTTP"
                },
                "periodSeconds": 10,
                "successThreshold": 1,
                "timeoutSeconds": 1
              },
              "name": "sp-rethinkdb",
              "ports": [
                {
                  "containerPort": 28015,
                  "protocol": "TCP"
                }
              ],
              "readinessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "path": "/",
                  "port": 8080,
                  "scheme": "HTTP"
                },
                "periodSeconds": 10,
                "successThreshold": 1,
                "timeoutSeconds": 1
              },
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/data",
                  "name": "data"
                },
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-87f62",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "nodeName": "ip-10-0-0-36.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "awsElasticBlockStore": {
                "fsType": "ext4",
                "volumeID": "vol-0b1e430ead37e65d7"
              },
              "name": "data"
            },
            {
              "name": "default-token-87f62",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-87f62"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:19:09Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:22:29Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:19:09Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://a253de70aa2cd516739d5f9ab5891b7e61e1920393fb8d563b169d2dd206ca0d",
              "image": "rethinkdb:2.3",
              "imageID": "docker://sha256:23ecfb08823bc5483c6a955b077a9bc82899a0df2f33899b64992345256f22dd",
              "lastState": {},
              "name": "sp-rethinkdb",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-03-30T18:22:22Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.36",
          "phase": "Running",
          "podIP": "10.2.94.42",
          "startTime": "2017-03-30T18:19:09Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicaSet\",\"namespace\":\"default\",\"name\":\"prod-sp-schema-786362204\",\"uid\":\"64d39510-1673-11e7-88dd-06f78f5b71f7\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"14967334\"}}\n"
          },
          "creationTimestamp": "2017-04-01T00:37:32Z",
          "generateName": "prod-sp-schema-786362204-",
          "labels": {
            "app": "prod-sp-schema",
            "pod-template-hash": "786362204"
          },
          "name": "prod-sp-schema-786362204-wjfo4",
          "namespace": "default",
          "ownerReferences": [
            {
              "apiVersion": "extensions/v1beta1",
              "controller": true,
              "kind": "ReplicaSet",
              "name": "prod-sp-schema-786362204",
              "uid": "64d39510-1673-11e7-88dd-06f78f5b71f7"
            }
          ],
          "resourceVersion": "14967532",
          "selfLink": "/api/v1/namespaces/default/pods/prod-sp-schema-786362204-wjfo4",
          "uid": "64d58b79-1673-11e7-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "env": [
                {
                  "name": "SP_DOMAIN",
                  "value": "stream.place"
                }
              ],
              "image": "quay.io/streamplace/sp-schema:v0.0.14-51-g790db65",
              "imagePullPolicy": "Always",
              "livenessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "path": "/schema.json",
                  "port": 80,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 30,
                "periodSeconds": 5,
                "successThreshold": 1,
                "timeoutSeconds": 5
              },
              "name": "sp-schema",
              "readinessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "path": "/schema.json",
                  "port": 80,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 3,
                "periodSeconds": 3,
                "successThreshold": 1,
                "timeoutSeconds": 5
              },
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-87f62",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "nodeName": "ip-10-0-0-125.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "name": "default-token-87f62",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-87f62"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-01T00:37:32Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-01T00:38:23Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-01T00:37:32Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://c701563275769106f277f2a8f6b8de2754cb9ba87258b74156b420623224c119",
              "image": "quay.io/streamplace/sp-schema:v0.0.14-51-g790db65",
              "imageID": "docker://sha256:21479004a28ce27d89ff6e754b2d2bb25c34964749616b3ec5c77c496a2a1fb1",
              "lastState": {},
              "name": "sp-schema",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-04-01T00:38:18Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.125",
          "phase": "Running",
          "podIP": "10.2.17.32",
          "startTime": "2017-04-01T00:37:32Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicaSet\",\"namespace\":\"default\",\"name\":\"sk-redirect-3053417602\",\"uid\":\"27418377-2889-11e7-88dd-06f78f5b71f7\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"17802206\"}}\n"
          },
          "creationTimestamp": "2017-04-24T00:58:39Z",
          "generateName": "sk-redirect-3053417602-",
          "labels": {
            "app": "sk-redirect",
            "deployTime": "1492995518",
            "pod-template-hash": "3053417602"
          },
          "name": "sk-redirect-3053417602-q4twb",
          "namespace": "default",
          "ownerReferences": [
            {
              "apiVersion": "extensions/v1beta1",
              "controller": true,
              "kind": "ReplicaSet",
              "name": "sk-redirect-3053417602",
              "uid": "27418377-2889-11e7-88dd-06f78f5b71f7"
            }
          ],
          "resourceVersion": "17802238",
          "selfLink": "/api/v1/namespaces/default/pods/sk-redirect-3053417602-q4twb",
          "uid": "27439176-2889-11e7-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "image": "nginx:stable-alpine",
              "imagePullPolicy": "Always",
              "name": "sk-redirect",
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/etc/nginx/nginx.conf",
                  "name": "nginx-conf",
                  "subPath": "nginx.conf"
                },
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-87f62",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "imagePullSecrets": [
            {
              "name": "gcr-io"
            }
          ],
          "nodeName": "ip-10-0-0-125.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "configMap": {
                "defaultMode": 420,
                "name": "sk-redirect"
              },
              "name": "nginx-conf"
            },
            {
              "name": "default-token-87f62",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-87f62"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-24T00:58:39Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-24T00:58:41Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-24T00:58:39Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://feea20766fa6e5396bcbd7f17082fd0648d4d45513d4d57a6d5bb725b7b13f5a",
              "image": "nginx:stable-alpine",
              "imageID": "docker://sha256:61055e9116d49db73cf690aea5a08880714fa58e015497588f13efc6cc84fd43",
              "lastState": {},
              "name": "sk-redirect",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-04-24T00:58:41Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.125",
          "phase": "Running",
          "podIP": "10.2.17.39",
          "startTime": "2017-04-24T00:58:39Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicaSet\",\"namespace\":\"default\",\"name\":\"slackin-2348948315\",\"uid\":\"76f107a4-e0f1-11e6-b91f-06b03ff45753\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"7189303\"}}\n"
          },
          "creationTimestamp": "2017-01-22T22:23:56Z",
          "generateName": "slackin-2348948315-",
          "labels": {
            "app": "slackin",
            "pod-template-hash": "2348948315"
          },
          "name": "slackin-2348948315-ltp99",
          "namespace": "default",
          "ownerReferences": [
            {
              "apiVersion": "extensions/v1beta1",
              "controller": true,
              "kind": "ReplicaSet",
              "name": "slackin-2348948315",
              "uid": "76f107a4-e0f1-11e6-b91f-06b03ff45753"
            }
          ],
          "resourceVersion": "10150954",
          "selfLink": "/api/v1/namespaces/default/pods/slackin-2348948315-ltp99",
          "uid": "76f36249-e0f1-11e6-b91f-06b03ff45753"
        },
        "spec": {
          "containers": [
            {
              "env": [
                {
                  "name": "SLACK_TOKEN",
                  "value": "xoxp-7314646374-7314671207-20181285233-5705b3748a"
                },
                {
                  "name": "SLACK_ORG",
                  "value": "streamplace"
                },
                {
                  "name": "PORT",
                  "value": "80"
                },
                {
                  "name": "LOGSPOUT",
                  "value": "ignore"
                }
              ],
              "image": "chk1/slackin",
              "imagePullPolicy": "Always",
              "name": "slackin",
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-87f62",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "imagePullSecrets": [
            {
              "name": "gcr-io"
            }
          ],
          "nodeName": "ip-10-0-0-36.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "name": "default-token-87f62",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-87f62"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-01-22T22:23:56Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-01-22T22:24:00Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-01-22T22:23:56Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://624dae159003863062400e92e932da1c56500430713cfd1d59dd4a0a3f673005",
              "image": "chk1/slackin",
              "imageID": "docker://sha256:a619cda277d09661d3643fa45dbc080cb97630f9436af6ff50f06fd64a4ec3b5",
              "lastState": {},
              "name": "slackin",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-01-22T22:23:58Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.36",
          "phase": "Running",
          "podIP": "10.2.94.24",
          "startTime": "2017-01-22T22:23:56Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicaSet\",\"namespace\":\"kube-system\",\"name\":\"heapster-v1.2.0-4088228293\",\"uid\":\"604f1276-ad62-11e6-992c-06073accc4ab\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"5383012\"}}\n",
            "scheduler.alpha.kubernetes.io/critical-pod": "",
            "scheduler.alpha.kubernetes.io/tolerations": "[{\"key\":\"CriticalAddonsOnly\", \"operator\":\"Exists\"}]"
          },
          "creationTimestamp": "2017-01-05T09:20:38Z",
          "generateName": "heapster-v1.2.0-4088228293-",
          "labels": {
            "k8s-app": "heapster",
            "pod-template-hash": "4088228293",
            "version": "v1.2.0"
          },
          "name": "heapster-v1.2.0-4088228293-75yvi",
          "namespace": "kube-system",
          "ownerReferences": [
            {
              "apiVersion": "extensions/v1beta1",
              "controller": true,
              "kind": "ReplicaSet",
              "name": "heapster-v1.2.0-4088228293",
              "uid": "604f1276-ad62-11e6-992c-06073accc4ab"
            }
          ],
          "resourceVersion": "10139453",
          "selfLink": "/api/v1/namespaces/kube-system/pods/heapster-v1.2.0-4088228293-75yvi",
          "uid": "38fc0547-d328-11e6-b91f-06b03ff45753"
        },
        "spec": {
          "containers": [
            {
              "command": [
                "/heapster",
                "--source=kubernetes.summary_api:''"
              ],
              "image": "gcr.io/google_containers/heapster:v1.2.0",
              "imagePullPolicy": "IfNotPresent",
              "livenessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "path": "/healthz",
                  "port": 8082,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 180,
                "periodSeconds": 10,
                "successThreshold": 1,
                "timeoutSeconds": 5
              },
              "name": "heapster",
              "resources": {
                "limits": {
                  "cpu": "144m",
                  "memory": "264Mi"
                },
                "requests": {
                  "cpu": "144m",
                  "memory": "264Mi"
                }
              },
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-0ljv1",
                  "readOnly": true
                }
              ]
            },
            {
              "command": [
                "/pod_nanny",
                "--cpu=80m",
                "--extra-cpu=4m",
                "--memory=200Mi",
                "--extra-memory=4Mi",
                "--threshold=5",
                "--deployment=heapster-v1.2.0",
                "--container=heapster",
                "--poll-period=300000",
                "--estimator=exponential"
              ],
              "env": [
                {
                  "name": "MY_POD_NAME",
                  "valueFrom": {
                    "fieldRef": {
                      "apiVersion": "v1",
                      "fieldPath": "metadata.name"
                    }
                  }
                },
                {
                  "name": "MY_POD_NAMESPACE",
                  "valueFrom": {
                    "fieldRef": {
                      "apiVersion": "v1",
                      "fieldPath": "metadata.namespace"
                    }
                  }
                }
              ],
              "image": "gcr.io/google_containers/addon-resizer:1.6",
              "imagePullPolicy": "IfNotPresent",
              "name": "heapster-nanny",
              "resources": {
                "limits": {
                  "cpu": "50m",
                  "memory": "90Mi"
                },
                "requests": {
                  "cpu": "50m",
                  "memory": "90Mi"
                }
              },
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-0ljv1",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "nodeName": "ip-10-0-0-36.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "name": "default-token-0ljv1",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-0ljv1"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-01-05T09:20:39Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-01-05T09:22:11Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-01-05T09:20:38Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://d9609be13090353e2ef9e1831987366c990c9f9b6d296115866a7562c39e8041",
              "image": "gcr.io/google_containers/heapster:v1.2.0",
              "imageID": "docker://sha256:7cd51f2f6a9741aee93a73dfc48ee22db540a8c8d08147e0ee23ddeef10e9442",
              "lastState": {},
              "name": "heapster",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-01-05T09:21:23Z"
                }
              }
            },
            {
              "containerID": "docker://c89ff1978246f84f417ef9013e68742119edd73305f87f34f74e32ee0ad9011b",
              "image": "gcr.io/google_containers/addon-resizer:1.6",
              "imageID": "docker://sha256:83702063e552d5b557fbc09de90b665b58cdaf3a8a1b535b1767cc9492a0cc7e",
              "lastState": {},
              "name": "heapster-nanny",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-01-05T09:22:10Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.36",
          "phase": "Running",
          "podIP": "10.2.94.19",
          "startTime": "2017-01-05T09:20:39Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/config.hash": "6cf8e54134a5f1b7617deccc2f5db8af",
            "kubernetes.io/config.mirror": "6cf8e54134a5f1b7617deccc2f5db8af",
            "kubernetes.io/config.seen": "2017-02-19T12:43:20.031287582Z",
            "kubernetes.io/config.source": "file"
          },
          "creationTimestamp": "2017-02-19T12:44:18Z",
          "name": "kube-apiserver-ip-10-0-0-37.us-west-2.compute.internal",
          "namespace": "kube-system",
          "resourceVersion": "10150796",
          "selfLink": "/api/v1/namespaces/kube-system/pods/kube-apiserver-ip-10-0-0-37.us-west-2.compute.internal",
          "uid": "20c98399-f6a1-11e6-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "command": [
                "/hyperkube",
                "apiserver",
                "--bind-address=0.0.0.0",
                "--etcd-servers=https://ip-10-0-0-5.us-west-2.compute.internal:2379",
                "--etcd-cafile=/etc/kubernetes/ssl/ca.pem",
                "--etcd-certfile=/etc/kubernetes/ssl/etcd-client.pem",
                "--etcd-keyfile=/etc/kubernetes/ssl/etcd-client-key.pem",
                "--allow-privileged=true",
                "--service-cluster-ip-range=10.3.0.0/24",
                "--secure-port=443",
                "--advertise-address=10.0.0.37",
                "--admission-control=NamespaceLifecycle,LimitRanger,ServiceAccount,DefaultStorageClass,ResourceQuota",
                "--tls-cert-file=/etc/kubernetes/ssl/apiserver.pem",
                "--tls-private-key-file=/etc/kubernetes/ssl/apiserver-key.pem",
                "--client-ca-file=/etc/kubernetes/ssl/ca.pem",
                "--service-account-key-file=/etc/kubernetes/ssl/apiserver-key.pem",
                "--runtime-config=extensions/v1beta1/networkpolicies=true",
                "--cloud-provider=aws"
              ],
              "image": "quay.io/coreos/hyperkube:v1.4.6_coreos.0",
              "imagePullPolicy": "IfNotPresent",
              "livenessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "host": "127.0.0.1",
                  "path": "/healthz",
                  "port": 8080,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 15,
                "periodSeconds": 10,
                "successThreshold": 1,
                "timeoutSeconds": 15
              },
              "name": "kube-apiserver",
              "ports": [
                {
                  "containerPort": 443,
                  "hostPort": 443,
                  "name": "https",
                  "protocol": "TCP"
                },
                {
                  "containerPort": 8080,
                  "hostPort": 8080,
                  "name": "local",
                  "protocol": "TCP"
                }
              ],
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/etc/kubernetes/ssl",
                  "name": "ssl-certs-kubernetes",
                  "readOnly": true
                },
                {
                  "mountPath": "/etc/ssl/certs",
                  "name": "ssl-certs-host",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "hostNetwork": true,
          "nodeName": "ip-10-0-0-37.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "hostPath": {
                "path": "/etc/kubernetes/ssl"
              },
              "name": "ssl-certs-kubernetes"
            },
            {
              "hostPath": {
                "path": "/usr/share/ca-certificates"
              },
              "name": "ssl-certs-host"
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-02-19T12:43:25Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-02-19T12:44:16Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-02-19T12:43:25Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://f2a3de3260cb405f95eb725ccab3c4540f698e6ad2804b0bdf9b608a7ec55d31",
              "image": "quay.io/coreos/hyperkube:v1.4.6_coreos.0",
              "imageID": "docker://sha256:44823a98502d17f07cff29973a0b8ebe59726af49b5fe709e5f54dfef00a6f2a",
              "lastState": {},
              "name": "kube-apiserver",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-02-19T12:44:16Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.37",
          "phase": "Running",
          "podIP": "10.0.0.37",
          "startTime": "2017-02-19T12:43:25Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/config.hash": "72d032b69e761992735fa3af48c51233",
            "kubernetes.io/config.mirror": "72d032b69e761992735fa3af48c51233",
            "kubernetes.io/config.seen": "2017-02-19T12:43:20.031296948Z",
            "kubernetes.io/config.source": "file"
          },
          "creationTimestamp": "2017-02-19T12:44:18Z",
          "name": "kube-controller-manager-ip-10-0-0-37.us-west-2.compute.internal",
          "namespace": "kube-system",
          "resourceVersion": "15863794",
          "selfLink": "/api/v1/namespaces/kube-system/pods/kube-controller-manager-ip-10-0-0-37.us-west-2.compute.internal",
          "uid": "20c969aa-f6a1-11e6-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "command": [
                "/hyperkube",
                "controller-manager",
                "--master=http://127.0.0.1:8080",
                "--leader-elect=true",
                "--service-account-private-key-file=/etc/kubernetes/ssl/apiserver-key.pem",
                "--root-ca-file=/etc/kubernetes/ssl/ca.pem",
                "--cloud-provider=aws"
              ],
              "image": "quay.io/coreos/hyperkube:v1.4.6_coreos.0",
              "imagePullPolicy": "IfNotPresent",
              "livenessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "host": "127.0.0.1",
                  "path": "/healthz",
                  "port": 10252,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 15,
                "periodSeconds": 10,
                "successThreshold": 1,
                "timeoutSeconds": 15
              },
              "name": "kube-controller-manager",
              "resources": {
                "requests": {
                  "cpu": "200m"
                }
              },
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/etc/kubernetes/ssl",
                  "name": "ssl-certs-kubernetes",
                  "readOnly": true
                },
                {
                  "mountPath": "/etc/ssl/certs",
                  "name": "ssl-certs-host",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "hostNetwork": true,
          "nodeName": "ip-10-0-0-37.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "hostPath": {
                "path": "/etc/kubernetes/ssl"
              },
              "name": "ssl-certs-kubernetes"
            },
            {
              "hostPath": {
                "path": "/usr/share/ca-certificates"
              },
              "name": "ssl-certs-host"
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-02-19T12:43:25Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-08T07:12:11Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-02-19T12:43:25Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://e6269e82a7636c23d74aed28a6435b5864ff5fdc74364f59c02201d98cebdb02",
              "image": "quay.io/coreos/hyperkube:v1.4.6_coreos.0",
              "imageID": "docker://sha256:44823a98502d17f07cff29973a0b8ebe59726af49b5fe709e5f54dfef00a6f2a",
              "lastState": {
                "terminated": {
                  "containerID": "docker://b472ff9120228727dd30fcab491a29233a666db38050ff01d17ce14c2ae02518",
                  "exitCode": 255,
                  "finishedAt": "2017-04-08T07:12:10Z",
                  "reason": "Error",
                  "startedAt": "2017-02-19T12:44:17Z"
                }
              },
              "name": "kube-controller-manager",
              "ready": true,
              "restartCount": 1,
              "state": {
                "running": {
                  "startedAt": "2017-04-08T07:12:11Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.37",
          "phase": "Running",
          "podIP": "10.0.0.37",
          "startTime": "2017-02-19T12:43:25Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicationController\",\"namespace\":\"kube-system\",\"name\":\"kube-dns-v20\",\"uid\":\"6fc3d367-ad61-11e6-992c-06073accc4ab\",\"apiVersion\":\"v1\",\"resourceVersion\":\"5383015\"}}\n",
            "scheduler.alpha.kubernetes.io/critical-pod": "",
            "scheduler.alpha.kubernetes.io/tolerations": "[{\"key\":\"CriticalAddonsOnly\", \"operator\":\"Exists\"}]"
          },
          "creationTimestamp": "2017-01-05T09:20:38Z",
          "generateName": "kube-dns-v20-",
          "labels": {
            "k8s-app": "kube-dns",
            "version": "v20"
          },
          "name": "kube-dns-v20-g8z9h",
          "namespace": "kube-system",
          "ownerReferences": [
            {
              "apiVersion": "v1",
              "controller": true,
              "kind": "ReplicationController",
              "name": "kube-dns-v20",
              "uid": "6fc3d367-ad61-11e6-992c-06073accc4ab"
            }
          ],
          "resourceVersion": "10139381",
          "selfLink": "/api/v1/namespaces/kube-system/pods/kube-dns-v20-g8z9h",
          "uid": "38ffc1dc-d328-11e6-b91f-06b03ff45753"
        },
        "spec": {
          "containers": [
            {
              "args": [
                "--domain=cluster.local.",
                "--dns-port=10053"
              ],
              "image": "gcr.io/google_containers/kubedns-amd64:1.8",
              "imagePullPolicy": "IfNotPresent",
              "livenessProbe": {
                "failureThreshold": 5,
                "httpGet": {
                  "path": "/healthz-kubedns",
                  "port": 8080,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 60,
                "periodSeconds": 10,
                "successThreshold": 1,
                "timeoutSeconds": 5
              },
              "name": "kubedns",
              "ports": [
                {
                  "containerPort": 10053,
                  "name": "dns-local",
                  "protocol": "UDP"
                },
                {
                  "containerPort": 10053,
                  "name": "dns-tcp-local",
                  "protocol": "TCP"
                }
              ],
              "readinessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "path": "/readiness",
                  "port": 8081,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 3,
                "periodSeconds": 10,
                "successThreshold": 1,
                "timeoutSeconds": 5
              },
              "resources": {
                "limits": {
                  "memory": "170Mi"
                },
                "requests": {
                  "cpu": "100m",
                  "memory": "70Mi"
                }
              },
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-0ljv1",
                  "readOnly": true
                }
              ]
            },
            {
              "args": [
                "--cache-size=1000",
                "--no-resolv",
                "--server=127.0.0.1#10053",
                "--log-facility=-"
              ],
              "image": "gcr.io/google_containers/kube-dnsmasq-amd64:1.4",
              "imagePullPolicy": "IfNotPresent",
              "livenessProbe": {
                "failureThreshold": 5,
                "httpGet": {
                  "path": "/healthz-dnsmasq",
                  "port": 8080,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 60,
                "periodSeconds": 10,
                "successThreshold": 1,
                "timeoutSeconds": 5
              },
              "name": "dnsmasq",
              "ports": [
                {
                  "containerPort": 53,
                  "name": "dns",
                  "protocol": "UDP"
                },
                {
                  "containerPort": 53,
                  "name": "dns-tcp",
                  "protocol": "TCP"
                }
              ],
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-0ljv1",
                  "readOnly": true
                }
              ]
            },
            {
              "args": [
                "--cmd=nslookup kubernetes.default.svc.cluster.local 127.0.0.1 \u003e/dev/null",
                "--url=/healthz-dnsmasq",
                "--cmd=nslookup kubernetes.default.svc.cluster.local 127.0.0.1:10053 \u003e/dev/null",
                "--url=/healthz-kubedns",
                "--port=8080",
                "--quiet"
              ],
              "image": "gcr.io/google_containers/exechealthz-amd64:1.2",
              "imagePullPolicy": "IfNotPresent",
              "name": "healthz",
              "ports": [
                {
                  "containerPort": 8080,
                  "protocol": "TCP"
                }
              ],
              "resources": {
                "limits": {
                  "memory": "50Mi"
                },
                "requests": {
                  "cpu": "10m",
                  "memory": "50Mi"
                }
              },
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-0ljv1",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "Default",
          "nodeName": "ip-10-0-0-36.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "name": "default-token-0ljv1",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-0ljv1"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-01-05T09:20:39Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-01-05T09:22:19Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-01-05T09:20:39Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://27f954e76af1f5695c194a0830af8a4f7100ee2fa8c76e57203a54250337f868",
              "image": "gcr.io/google_containers/kube-dnsmasq-amd64:1.4",
              "imageID": "docker://sha256:3ec65756a89b70b4095e43a340a6e2d5696cac7a93a29619ff5c4b6be9af2773",
              "lastState": {},
              "name": "dnsmasq",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-01-05T09:22:13Z"
                }
              }
            },
            {
              "containerID": "docker://d273a1f44eae4d2bcd2a7cfc4ef75844afec6deb044f4905a4532d143f3d993d",
              "image": "gcr.io/google_containers/exechealthz-amd64:1.2",
              "imageID": "docker://sha256:93a43bfb39bfe9795e76ccd75d7a0e6d40e2ae8563456a2a77c1b4cfc3bbd967",
              "lastState": {},
              "name": "healthz",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-01-05T09:22:16Z"
                }
              }
            },
            {
              "containerID": "docker://69892eb3fde673189198f214c393c35b1e61c211547a4e1bf2bfcbb677255129",
              "image": "gcr.io/google_containers/kubedns-amd64:1.8",
              "imageID": "docker://sha256:597a45ef55ec52401fdcd2e1d6ee53c74b04afb264490d7fa67b6d98ad330dfe",
              "lastState": {},
              "name": "kubedns",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-01-05T09:21:28Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.36",
          "phase": "Running",
          "podIP": "10.2.94.20",
          "startTime": "2017-01-05T09:20:39Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/config.hash": "e889d7ed356335462b274bcf77eab307",
            "kubernetes.io/config.mirror": "e889d7ed356335462b274bcf77eab307",
            "kubernetes.io/config.seen": "2017-03-30T18:27:17.721371551Z",
            "kubernetes.io/config.source": "file",
            "rkt.alpha.kubernetes.io/stage1-name-override": "coreos.com/rkt/stage1-fly"
          },
          "creationTimestamp": "2017-03-30T18:27:22Z",
          "name": "kube-proxy-ip-10-0-0-125.us-west-2.compute.internal",
          "namespace": "kube-system",
          "resourceVersion": "14801259",
          "selfLink": "/api/v1/namespaces/kube-system/pods/kube-proxy-ip-10-0-0-125.us-west-2.compute.internal",
          "uid": "844264b4-1576-11e7-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "command": [
                "/hyperkube",
                "proxy",
                "--master=https://cluster-auth.stream.builders",
                "--kubeconfig=/etc/kubernetes/worker-kubeconfig.yaml"
              ],
              "image": "quay.io/coreos/hyperkube:v1.4.6_coreos.0",
              "imagePullPolicy": "IfNotPresent",
              "name": "kube-proxy",
              "resources": {},
              "securityContext": {
                "privileged": true
              },
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/etc/ssl/certs",
                  "name": "ssl-certs"
                },
                {
                  "mountPath": "/etc/kubernetes/worker-kubeconfig.yaml",
                  "name": "kubeconfig",
                  "readOnly": true
                },
                {
                  "mountPath": "/etc/kubernetes/ssl",
                  "name": "etc-kube-ssl",
                  "readOnly": true
                },
                {
                  "mountPath": "/var/run/dbus",
                  "name": "dbus"
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "hostNetwork": true,
          "nodeName": "ip-10-0-0-125.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "hostPath": {
                "path": "/usr/share/ca-certificates"
              },
              "name": "ssl-certs"
            },
            {
              "hostPath": {
                "path": "/etc/kubernetes/worker-kubeconfig.yaml"
              },
              "name": "kubeconfig"
            },
            {
              "hostPath": {
                "path": "/etc/kubernetes/ssl"
              },
              "name": "etc-kube-ssl"
            },
            {
              "hostPath": {
                "path": "/var/run/dbus"
              },
              "name": "dbus"
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:27:22Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:27:52Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:27:22Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://fa0d299f2019a76ee2ce7f1e733a8d04d54291a9057c563a048f377853682749",
              "image": "quay.io/coreos/hyperkube:v1.4.6_coreos.0",
              "imageID": "docker://sha256:44823a98502d17f07cff29973a0b8ebe59726af49b5fe709e5f54dfef00a6f2a",
              "lastState": {},
              "name": "kube-proxy",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-03-30T18:27:51Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.125",
          "phase": "Running",
          "podIP": "10.0.0.125",
          "startTime": "2017-03-30T18:27:22Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/config.hash": "e889d7ed356335462b274bcf77eab307",
            "kubernetes.io/config.mirror": "e889d7ed356335462b274bcf77eab307",
            "kubernetes.io/config.seen": "2016-11-18T07:49:59.296386412Z",
            "kubernetes.io/config.source": "file",
            "rkt.alpha.kubernetes.io/stage1-name-override": "coreos.com/rkt/stage1-fly"
          },
          "creationTimestamp": "2016-11-18T07:50:04Z",
          "name": "kube-proxy-ip-10-0-0-36.us-west-2.compute.internal",
          "namespace": "kube-system",
          "resourceVersion": "10139362",
          "selfLink": "/api/v1/namespaces/kube-system/pods/kube-proxy-ip-10-0-0-36.us-west-2.compute.internal",
          "uid": "9dde3c61-ad63-11e6-b91f-06b03ff45753"
        },
        "spec": {
          "containers": [
            {
              "command": [
                "/hyperkube",
                "proxy",
                "--master=https://cluster-auth.stream.builders",
                "--kubeconfig=/etc/kubernetes/worker-kubeconfig.yaml"
              ],
              "image": "quay.io/coreos/hyperkube:v1.4.6_coreos.0",
              "imagePullPolicy": "IfNotPresent",
              "name": "kube-proxy",
              "resources": {},
              "securityContext": {
                "privileged": true
              },
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/etc/ssl/certs",
                  "name": "ssl-certs"
                },
                {
                  "mountPath": "/etc/kubernetes/worker-kubeconfig.yaml",
                  "name": "kubeconfig",
                  "readOnly": true
                },
                {
                  "mountPath": "/etc/kubernetes/ssl",
                  "name": "etc-kube-ssl",
                  "readOnly": true
                },
                {
                  "mountPath": "/var/run/dbus",
                  "name": "dbus"
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "hostNetwork": true,
          "nodeName": "ip-10-0-0-36.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "hostPath": {
                "path": "/usr/share/ca-certificates"
              },
              "name": "ssl-certs"
            },
            {
              "hostPath": {
                "path": "/etc/kubernetes/worker-kubeconfig.yaml"
              },
              "name": "kubeconfig"
            },
            {
              "hostPath": {
                "path": "/etc/kubernetes/ssl"
              },
              "name": "etc-kube-ssl"
            },
            {
              "hostPath": {
                "path": "/var/run/dbus"
              },
              "name": "dbus"
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2016-11-18T07:50:04Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2016-11-18T07:51:18Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2016-11-18T07:50:04Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://fafdeac1066f341229dfc5106ee2b7037d1bdd674ec78a71c82d6aed78ccd931",
              "image": "quay.io/coreos/hyperkube:v1.4.6_coreos.0",
              "imageID": "docker://sha256:44823a98502d17f07cff29973a0b8ebe59726af49b5fe709e5f54dfef00a6f2a",
              "lastState": {},
              "name": "kube-proxy",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2016-11-18T07:51:18Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.36",
          "phase": "Running",
          "podIP": "10.0.0.36",
          "startTime": "2016-11-18T07:50:04Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/config.hash": "53fc765f7c4217d754dd88b4ca7d1f01",
            "kubernetes.io/config.mirror": "53fc765f7c4217d754dd88b4ca7d1f01",
            "kubernetes.io/config.seen": "2017-02-19T12:43:20.031299508Z",
            "kubernetes.io/config.source": "file",
            "rkt.alpha.kubernetes.io/stage1-name-override": "coreos.com/rkt/stage1-fly"
          },
          "creationTimestamp": "2017-02-19T12:44:19Z",
          "name": "kube-proxy-ip-10-0-0-37.us-west-2.compute.internal",
          "namespace": "kube-system",
          "resourceVersion": "10150800",
          "selfLink": "/api/v1/namespaces/kube-system/pods/kube-proxy-ip-10-0-0-37.us-west-2.compute.internal",
          "uid": "21948efc-f6a1-11e6-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "command": [
                "/hyperkube",
                "proxy",
                "--master=http://127.0.0.1:8080"
              ],
              "image": "quay.io/coreos/hyperkube:v1.4.6_coreos.0",
              "imagePullPolicy": "IfNotPresent",
              "name": "kube-proxy",
              "resources": {},
              "securityContext": {
                "privileged": true
              },
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/etc/ssl/certs",
                  "name": "ssl-certs-host",
                  "readOnly": true
                },
                {
                  "mountPath": "/var/run/dbus",
                  "name": "dbus"
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "hostNetwork": true,
          "nodeName": "ip-10-0-0-37.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "hostPath": {
                "path": "/usr/share/ca-certificates"
              },
              "name": "ssl-certs-host"
            },
            {
              "hostPath": {
                "path": "/var/run/dbus"
              },
              "name": "dbus"
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-02-19T12:44:20Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-02-19T12:44:20Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-02-19T12:43:25Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://c3dbaad88354fd316265cbc36212590f4725ad93abae59687766d4c8c53e9674",
              "image": "quay.io/coreos/hyperkube:v1.4.6_coreos.0",
              "imageID": "docker://sha256:44823a98502d17f07cff29973a0b8ebe59726af49b5fe709e5f54dfef00a6f2a",
              "lastState": {},
              "name": "kube-proxy",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-02-19T12:44:18Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.37",
          "phase": "Running",
          "podIP": "10.0.0.37",
          "startTime": "2017-02-19T12:44:20Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/config.hash": "4deabaa84aec0a4d57942ed2a23dfc1b",
            "kubernetes.io/config.mirror": "4deabaa84aec0a4d57942ed2a23dfc1b",
            "kubernetes.io/config.seen": "2017-02-19T12:43:20.031301899Z",
            "kubernetes.io/config.source": "file"
          },
          "creationTimestamp": "2017-02-19T12:45:37Z",
          "name": "kube-scheduler-ip-10-0-0-37.us-west-2.compute.internal",
          "namespace": "kube-system",
          "resourceVersion": "15863793",
          "selfLink": "/api/v1/namespaces/kube-system/pods/kube-scheduler-ip-10-0-0-37.us-west-2.compute.internal",
          "uid": "4fd72549-f6a1-11e6-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "command": [
                "/hyperkube",
                "scheduler",
                "--master=http://127.0.0.1:8080",
                "--leader-elect=true"
              ],
              "image": "quay.io/coreos/hyperkube:v1.4.6_coreos.0",
              "imagePullPolicy": "IfNotPresent",
              "livenessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "host": "127.0.0.1",
                  "path": "/healthz",
                  "port": 10251,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 15,
                "periodSeconds": 10,
                "successThreshold": 1,
                "timeoutSeconds": 15
              },
              "name": "kube-scheduler",
              "resources": {
                "requests": {
                  "cpu": "100m"
                }
              },
              "terminationMessagePath": "/dev/termination-log"
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "hostNetwork": true,
          "nodeName": "ip-10-0-0-37.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "terminationGracePeriodSeconds": 30
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-02-19T12:43:25Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-04-08T07:12:11Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-02-19T12:43:25Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://a4cd0dfb46df12294a4f08d07e3886219e297115e282b949a6ead1cbd8f45926",
              "image": "quay.io/coreos/hyperkube:v1.4.6_coreos.0",
              "imageID": "docker://sha256:44823a98502d17f07cff29973a0b8ebe59726af49b5fe709e5f54dfef00a6f2a",
              "lastState": {
                "terminated": {
                  "containerID": "docker://e589f2bda620ca619c84b7590faa4b6b73ca17c6852e314038b0b139942e0432",
                  "exitCode": 255,
                  "finishedAt": "2017-04-08T07:12:10Z",
                  "reason": "Error",
                  "startedAt": "2017-02-19T12:44:15Z"
                }
              },
              "name": "kube-scheduler",
              "ready": true,
              "restartCount": 1,
              "state": {
                "running": {
                  "startedAt": "2017-04-08T07:12:11Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.37",
          "phase": "Running",
          "podIP": "10.0.0.37",
          "startTime": "2017-02-19T12:43:25Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicationController\",\"namespace\":\"kube-system\",\"name\":\"kubernetes-dashboard-v1.4.1\",\"uid\":\"6fdaa14f-ad61-11e6-992c-06073accc4ab\",\"apiVersion\":\"v1\",\"resourceVersion\":\"5383018\"}}\n",
            "scheduler.alpha.kubernetes.io/critical-pod": "",
            "scheduler.alpha.kubernetes.io/tolerations": "[{\"key\":\"CriticalAddonsOnly\", \"operator\":\"Exists\"}]"
          },
          "creationTimestamp": "2017-01-05T09:20:39Z",
          "generateName": "kubernetes-dashboard-v1.4.1-",
          "labels": {
            "k8s-app": "kubernetes-dashboard",
            "kubernetes.io/cluster-service": "true",
            "version": "v1.4.1"
          },
          "name": "kubernetes-dashboard-v1.4.1-xac9i",
          "namespace": "kube-system",
          "ownerReferences": [
            {
              "apiVersion": "v1",
              "controller": true,
              "kind": "ReplicationController",
              "name": "kubernetes-dashboard-v1.4.1",
              "uid": "6fdaa14f-ad61-11e6-992c-06073accc4ab"
            }
          ],
          "resourceVersion": "10139355",
          "selfLink": "/api/v1/namespaces/kube-system/pods/kubernetes-dashboard-v1.4.1-xac9i",
          "uid": "3909eeda-d328-11e6-b91f-06b03ff45753"
        },
        "spec": {
          "containers": [
            {
              "image": "gcr.io/google_containers/kubernetes-dashboard-amd64:v1.4.1",
              "imagePullPolicy": "IfNotPresent",
              "livenessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "path": "/",
                  "port": 9090,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 30,
                "periodSeconds": 10,
                "successThreshold": 1,
                "timeoutSeconds": 30
              },
              "name": "kubernetes-dashboard",
              "ports": [
                {
                  "containerPort": 9090,
                  "protocol": "TCP"
                }
              ],
              "resources": {
                "limits": {
                  "cpu": "100m",
                  "memory": "50Mi"
                },
                "requests": {
                  "cpu": "100m",
                  "memory": "50Mi"
                }
              },
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-0ljv1",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "nodeName": "ip-10-0-0-36.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "name": "default-token-0ljv1",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-0ljv1"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-01-05T09:20:39Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-01-05T09:21:36Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-01-05T09:20:39Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://ed315851ea2ce3360a84a097ce391c2a764375c13704bc4b7c3b5be91933724f",
              "image": "gcr.io/google_containers/kubernetes-dashboard-amd64:v1.4.1",
              "imageID": "docker://sha256:1dda73f463b239955d4cf94a9cd525ab5306bee0eb53c17534d3282bc50ae7aa",
              "lastState": {},
              "name": "kubernetes-dashboard",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-01-05T09:21:35Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.36",
          "phase": "Running",
          "podIP": "10.2.94.21",
          "startTime": "2017-01-05T09:20:39Z"
        }
      },
      {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
          "annotations": {
            "kubernetes.io/created-by": "{\"kind\":\"SerializedReference\",\"apiVersion\":\"v1\",\"reference\":{\"kind\":\"ReplicaSet\",\"namespace\":\"kube-system\",\"name\":\"tiller-deploy-3161519405\",\"uid\":\"a4ca91cb-fe3e-11e6-88dd-06f78f5b71f7\",\"apiVersion\":\"extensions\",\"resourceVersion\":\"14800259\"}}\n"
          },
          "creationTimestamp": "2017-03-30T18:19:09Z",
          "generateName": "tiller-deploy-3161519405-",
          "labels": {
            "app": "helm",
            "name": "tiller",
            "pod-template-hash": "3161519405"
          },
          "name": "tiller-deploy-3161519405-15h5y",
          "namespace": "kube-system",
          "ownerReferences": [
            {
              "apiVersion": "extensions/v1beta1",
              "controller": true,
              "kind": "ReplicaSet",
              "name": "tiller-deploy-3161519405",
              "uid": "a4ca91cb-fe3e-11e6-88dd-06f78f5b71f7"
            }
          ],
          "resourceVersion": "14800713",
          "selfLink": "/api/v1/namespaces/kube-system/pods/tiller-deploy-3161519405-15h5y",
          "uid": "5e610ef2-1575-11e7-88dd-06f78f5b71f7"
        },
        "spec": {
          "containers": [
            {
              "image": "gcr.io/kubernetes-helm/tiller:v2.2.1",
              "imagePullPolicy": "IfNotPresent",
              "livenessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "path": "/liveness",
                  "port": 44135,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 1,
                "periodSeconds": 10,
                "successThreshold": 1,
                "timeoutSeconds": 1
              },
              "name": "tiller",
              "ports": [
                {
                  "containerPort": 44134,
                  "name": "tiller",
                  "protocol": "TCP"
                }
              ],
              "readinessProbe": {
                "failureThreshold": 3,
                "httpGet": {
                  "path": "/readiness",
                  "port": 44135,
                  "scheme": "HTTP"
                },
                "initialDelaySeconds": 1,
                "periodSeconds": 10,
                "successThreshold": 1,
                "timeoutSeconds": 1
              },
              "resources": {},
              "terminationMessagePath": "/dev/termination-log",
              "volumeMounts": [
                {
                  "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                  "name": "default-token-0ljv1",
                  "readOnly": true
                }
              ]
            }
          ],
          "dnsPolicy": "ClusterFirst",
          "nodeName": "ip-10-0-0-36.us-west-2.compute.internal",
          "restartPolicy": "Always",
          "securityContext": {},
          "serviceAccount": "default",
          "serviceAccountName": "default",
          "terminationGracePeriodSeconds": 30,
          "volumes": [
            {
              "name": "default-token-0ljv1",
              "secret": {
                "defaultMode": 420,
                "secretName": "default-token-0ljv1"
              }
            }
          ]
        },
        "status": {
          "conditions": [
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:19:09Z",
              "status": "True",
              "type": "Initialized"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:22:00Z",
              "status": "True",
              "type": "Ready"
            },
            {
              "lastProbeTime": null,
              "lastTransitionTime": "2017-03-30T18:19:09Z",
              "status": "True",
              "type": "PodScheduled"
            }
          ],
          "containerStatuses": [
            {
              "containerID": "docker://c379750408a63c36a18af613ca5c863b98a72a6660e2a0140f0262fdc05a1430",
              "image": "gcr.io/kubernetes-helm/tiller:v2.2.1",
              "imageID": "docker://sha256:97538e3a26e7390281b34afadbfa51a5ebb22e049398efaab202967f5dd30d37",
              "lastState": {},
              "name": "tiller",
              "ready": true,
              "restartCount": 0,
              "state": {
                "running": {
                  "startedAt": "2017-03-30T18:21:54Z"
                }
              }
            }
          ],
          "hostIP": "10.0.0.36",
          "phase": "Running",
          "podIP": "10.2.94.40",
          "startTime": "2017-03-30T18:19:09Z"
        }
      }
    ],
    "kind": "List",
    "metadata": {},
    "resourceVersion": "",
    "selfLink": ""
  } 
}, action) => {
  switch (action.type) {
 /*eslint-disable no-case-declarations*/

  case actions.ADD_LOG: 
    const newObject = { appName: "Mendoza",
      serverStatus: "k85_sp-dev-certs.8cffccc.kube-apiserver",
      expectedAction: "[17.015ms] About to convert to expected version" };
    return Object.assign({}, state, {logsData: [...state.logsData, newObject]});
    
  case actions.CHANGE_BUTTON_STATUS:
    let packagesCopy = [...state.packages]; 
    packagesCopy = handlers.updateActiveStatus(packagesCopy, action.name);
    return Object.assign({}, state, { packages: packagesCopy }); 
    
  default: 
    return state; 
  }
};

export default stateReducer; 
