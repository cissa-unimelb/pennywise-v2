import { BankForm } from "../components/BankForm"
import ResponsiveAppBar from "../components/ResponsiveAppBar"

export default function PageOne(){
    return(
      <div>
        <ResponsiveAppBar></ResponsiveAppBar>
        <BankForm></BankForm>
        <h1>Page one new</h1>
      </div>
    )
}