import Model from "./models/user-models"
import View from "./views/user-view"
import Controllers from "./controllers/user-controller"

const app = new Controllers(new Model(), new View())