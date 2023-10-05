import { useState, useEffect, useCallback } from 'react'
import useMessageLogic from './use_message_logic'

export default function useMessageQueue() {
  const message = useMessageLogic()
  const [queue, setQueue] = useState([])
  const [, setInter] = useState(0)
  const onRefresh = useCallback(
    (cue) =>
      cue.map((message) =>
        message.ttl === 0
          ? { ...message, new: false }
          : { ...message, dieing: true }
      ),
    []
  )
  /*  useEffect(() => { console.log(message) }, [message]) */
  useEffect(() => {
    message.msg &&
      setQueue((lastQueue) => [
        ...lastQueue,
        { ...message, ttl: 40, new: true }
      ])
  }, [message])
  useEffect(() => {
    setInter(
      setInterval(() => {
        setQueue((lastQueue) =>
          onRefresh(
            lastQueue
              .map((message) => ({ ...message, ttl: message.ttl - 1 }))
              .filter((message) => message.ttl > 0)
          )
        )
      }, 500)
    )
  }, [])
  return queue
}
