const amqp = require('amqplib');

async function receiveMessage() {
  // 连接到 RabbitMQ 服务
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  // 确保队列存在
  const queue = 'hello';
  await channel.assertQueue(queue, { durable: false });

  // 设置消息处理回调函数
  channel.consume(queue, (msg) => {
    console.log(` [x] Received ${msg.content.toString()}`);
  }, { noAck: true });

  console.log(' [*] Waiting for messages. To exit press CTRL+C');
}

// 调用接收消息的函数
receiveMessage().catch(console.error);
