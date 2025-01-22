// brew services start rabbitmq
// brew services stop rabbitmq

const amqp = require('amqplib');

async function sendMessage() {
  // 连接到 RabbitMQ 服务
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  // 确保队列存在
  const queue = 'hello';
  await channel.assertQueue(queue, { durable: false });

  // 发送消息到队列
  const message = 'Hello RabbitMQ!';
  channel.sendToQueue(queue, Buffer.from(message));

  console.log(` [x] Sent '${message}'`);

  // 关闭连接
  setTimeout(() => {
    channel.close();
    connection.close();
  }, 500);
}

// 调用发送消息的函数
sendMessage().catch(console.error);
