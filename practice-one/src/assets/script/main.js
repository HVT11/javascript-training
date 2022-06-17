import Model from "./models/user-models"
import View from "./views/user-view"
import Controllers from "./controllers/user-controller"
import Template  from "./template"

const template = new Template()
const model = new Model()
const view = new View(template)

const app = new Controllers(model, view)