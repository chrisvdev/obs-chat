import { useState } from "react";
import useMessageLogic from "./use_message_logic";
import { useEffect } from "react";
import { useCallback } from "react";

export default function useMessageCue () {
    const message = useMessageLogic()
    const [cue, setCue] = useState([])
    const [inter, setInter] = useState(0)
    const onRefresh = useCallback((cue) => cue.map((message) => (message.ttl === 0 ? { ...message, new: false } : { ...message, dieing: true })), [])
    useEffect(() => {
        message.msg && setCue((lastCue) => ([...lastCue, { ...message, ttl: 40, new: true }]))
    }, [message])
    useEffect(() => {
        setInter(setInterval(() => {
            setCue((lastCue) => (onRefresh(lastCue.map((message) => ({ ...message, ttl: message.ttl - 1 })).filter((message) => (message.ttl > 0)))))
        }, 500),)
    }, []
    )
    return cue
}