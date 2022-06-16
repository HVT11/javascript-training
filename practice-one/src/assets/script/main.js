import Model from "./models/user-models"
import View from "./views/user-view"
import Controllers from "./controllers/user-controller"

const model = new Model()
const view = new View()

const app = new Controllers(model, view)

app.model.addUser('Ironman')