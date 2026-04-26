import { Logger } from '../../Logger'

export class CapturingLogger implements Logger {
  readonly messages: string[] = []

  log(message: string): void {
    this.messages.push(message)
  }
}
