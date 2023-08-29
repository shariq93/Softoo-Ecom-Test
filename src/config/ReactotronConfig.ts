import AsyncStorage from '@react-native-community/async-storage';
import Reactotron,{asyncStorage} from 'reactotron-react-native'
import { reactotronRedux,} from "reactotron-redux";


 const reactotron = Reactotron
 reactotron
  .configure({
    name: "Sooftoo Test App"
  })
  .use(reactotronRedux())
  .connect();
  

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.


  export default reactotron