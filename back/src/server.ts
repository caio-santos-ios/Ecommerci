import app from "./app"
import dataBaseSourse  from "./data-source"

dataBaseSourse.initialize()
  .then(() => {
    console.log("Database running.")
    
    app.listen(process.env.PORT, () => {
      console.log(`App is running.`)
    })
  })
  .catch((err) => console.error(err))
