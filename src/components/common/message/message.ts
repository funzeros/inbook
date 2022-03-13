import { createVNode, render } from 'vue'
import InbMessage from './InbMessage.vue'
export const messageType = {
  info: 'info',
  primary: 'primary',
  success: 'success',
} as const

export type MessageType = typeof messageType
export type MessageTypeKey = keyof MessageType
export type MessageTypeValue = MessageType[keyof MessageType]

export const createMessageFn = (type: MessageTypeKey) => (message: string) => {
  const appendTo: HTMLElement = document.body
  const container =
    document.querySelector('.inb-message_wrapper') || document.createElement('div')
  container.classList.add('inb-message_wrapper')

  const vm = createVNode(InbMessage, {
    message,
    type,
  })
  vm.props &&
    (vm.props.onDestroy = () => {
      render(null, container)
    })
  render(vm, container)

  appendTo.appendChild(container)
}
