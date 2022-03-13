import {
  createMessageFn,
  messageType,
  MessageTypeKey,
} from '~/components/common/message/message'

export const inbMessage: Record<MessageTypeKey, (message: string) => void> = {
  info: createMessageFn(messageType.info),
  primary: createMessageFn(messageType.primary),
  success: createMessageFn(messageType.success),
}
