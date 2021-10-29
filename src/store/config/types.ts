export type AlertState = {
  visible: boolean
  alertTitle: string
  alertMessage: string
  cancelText?: string
  okPress?: CallableFunction | null
  okText?: string
}
export type LoadingState = {
  visible: boolean
  loadingMessage?: string
}
export type ConfigState = {
  loading: LoadingState
  authenticated: boolean
  drawerVisible: boolean
  alert: AlertState
}
