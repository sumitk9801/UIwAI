import axios from axios
export const openRouter = async(message)=>{
    try{

        if(!message||Arrys.isArray(message)||message.length===0){
            throw new Error("Message array is Empty");
        }
            const response = await axios.post("https://openrouter.ai/api/v1/chat/completions",
                {
                 model: "nvidia/nemotron-3-ultra-550b-a55b:free",
                 messages:messages,
                 temperature:0.7,
                 max_token:2000,
                 response_format:{type:"json_object"}
                },
                {
                    headers: {
                        "Authorization": `Bearer ${process.env.OPENROUTER_APIKEY}`,
                        "Content-Type": "application/json" 
                    }
                }
            );
        const content = response?.data?.choices?.[0]?.message?.content;
        if(!content || !content.trim()){
            throw new Error("AI returned empty response.");
        }
        return content;
            
    }catch(error){
        console.error("openROuter Error",error.response?.data||error.message);
        throw new Error("openRouter Api Error");
    }
}