import { SignUp } from 'aws-amplify-react-native'
import { Logger } from 'aws-amplify'

const logger = new Logger('SignUp')
export class CustomSignUp extends SignUp {
  constructor(props: any) {
    super(props)
    this.state = { ...this.state, given_name: ' ', family_name: ' ' }
  }

  needPrefix(key: any) {
    const field = this.signUpFields.find((e: any) => e.key === key)

    if (!field) {
      return null
    }

    if (key.indexOf('custom:') !== 0) {
      return field.custom
    } else if (key.indexOf('custom:') === 0 && field.custom === false) {
      logger.warn('Custom prefix prepended to key but custom field flag is set to false')
    }
    return null
  }
}
