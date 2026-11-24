export const config = {
  runtime: "edge",
};
export default async function handler(req) {
  if (req.method !== "POST") {
    return Response.json({ returnCode: "0", reply: "请使用POST请求访问" });
  }
  try {
    const { query } = await req.json();
    if (!query) {
      return Response.json({ returnCode: "0", reply: "豆包助手就绪，你可以提问啦" });
    }
    const res = await fetch("https://bailian.cn-beijing.aliyuncs.com/api/v1/services/aigc/text-generation/generation", {
      method: "POST",
      headers: {
        "Authorization": "Bearer sk-ws-H.XMPMXXY.cfjS.MEMCIGUNH0MEN44FK9nf9bD69hmUj7usrVI691D03H4QkTySAh9DuLO9ttifc403xsKsd8CDxUDHjbJKe4tL9qEFHDrC",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "qwen-turbo",
        input: {
          messages: [
            {role:"system", content:"你是豆包助手，回答简短口语化，适合小学生，不要长篇大论"},
            {role:"user", content: query}
          ]
        },
        parameters: { result_format: "message" }
      })
    });
    const data = await res.json();
    const reply = data.output.choices[0].message.content;
    return Response.json({
      returnCode: "0",
      reply
    });
  } catch (e) {
    console.error(e);
    return Response.json({ returnCode: "0", reply: "出错啦，换个问题试试" });
  }
}