import { DPEnvs } from '@/shared/config'

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

export class Logger {
  private showLog: boolean
  private groupLevel: number = 0

  constructor(private readonly name: string) {
    this.showLog = DPEnvs.appEnv !== 'prod'
  }

  private formatMessage(level: LogLevel, message: unknown): void {
    if (!this.showLog) return

    const indent = '  '.repeat(this.groupLevel)
    console.log(`${indent}${this.name}`, `[${level.toUpperCase()}]`, message)
  }

  public info(message: unknown): void {
    this.formatMessage('info', message)
  }

  public warn(message: unknown): void {
    this.formatMessage('warn', message)
  }

  public error(message: unknown): void {
    this.formatMessage('error', message)
  }

  public debug(message: unknown): void {
    this.formatMessage('debug', message)
  }

  public group(label?: string): void {
    if (!this.showLog) return
    if (label) {
      console.group(`${this.name} ${label}`)
    } else {
      console.group()
    }
    this.groupLevel++
  }

  public groupEnd(): void {
    if (!this.showLog) return
    console.groupEnd()
    this.groupLevel = Math.max(0, this.groupLevel - 1)
  }
}
