import { useState } from "react"
import { useStore } from "../app/store"
import Cookies from "js-cookie"
import axios from "axios"
import toast from "react-hot-toast"

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const { selectedConversation, setMessages } = useStore()
    const jwt = Cookies.get("jwt")

    const getMessages = async () => {
        try {
            setLoading(true)
            console.log(selectedConversation.id)
            const res = await axios.get(`http://localhost:3000/message/get/${selectedConversation.id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            setMessages(res.data.messages)
            console.log(res.data.messages)
        } catch (error) {
            console.log(error.message)
            setMessages([])
        }finally{
            setLoading(false)
        }

    }
    return {loading, getMessages}
}

export default useGetMessages