import styled from '@emotion/styled';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
  padding: 1rem;
  max-height: 600px;
  overflow: auto;
`;

const Message = styled.span`
  margin-bottom: 0.5rem;

  &.my_message {
    align-self: flex-end;
  }

  &.alarm {
    align-self: center;
  }
`;

const MessageForm = styled.form`
  display: flex;
  margin-top: 24px;

  input {
    flex-grow: 1;
    margin-right: 1rem;
  }
`;

export { ChatContainer, Message, MessageForm };
