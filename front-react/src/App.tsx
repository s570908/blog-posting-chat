import classNames from 'classnames';
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { io } from 'socket.io-client';
import { ChatContainer, Message, MessageForm } from './styles/app.styles';

interface Chat {
  username: string;
  message: string;
}

function App() {
  const [message, setMessage] = useState<string>('');
  const [chats, setChats] = useState<Chat[]>([]);

  const socket = useMemo(() => {
    return io('http://localhost:4000/chat');
  }, []);

  const messageHandler = useCallback((chat: Chat) => {
    setChats((prevChats) => [...prevChats, chat]);
  }, []);

  useEffect(() => {
    const chatContainer = document.querySelector(
      '.chat_container'
    ) as HTMLDivElement;

    const { scrollHeight, clientHeight } = chatContainer;
    if (scrollHeight > clientHeight) {
      console.log('여기는 무조건 걸리고 있을테고');
      console.log({ scrollHeight });
      console.log({ clientHeight });
      chatContainer.scrollTop = scrollHeight - clientHeight + 27;
    }
  }, [chats.length]);

  useEffect(() => {
    socket.on('message', messageHandler);

    return () => {
      socket.off('message', messageHandler);
    };
  }, [messageHandler, socket]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }, []);

  const onSendMessage = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!message) return alert('메시지를 입력해 주세요.');

      socket.emit('message', message, (chat: Chat) => {
        messageHandler(chat);
        setMessage('');
      });
    },
    [message, messageHandler, socket]
  );

  return (
    <>
      <h1>Web Socket Chat</h1>
      <ChatContainer className="chat_container">
        {chats.map((chat, index) => (
          <Message
            key={index}
            className={classNames({
              my_message: socket.id === chat.username,
              alarm: !chat.username,
            })}
          >
            {chat.username ? `${chat.username}: ${chat.message}` : chat.message}
          </Message>
        ))}
      </ChatContainer>
      <MessageForm onSubmit={onSendMessage}>
        <input type="text" onChange={onChange} value={message} />
        <button>보내기</button>
      </MessageForm>
    </>
  );
}

export default App;
