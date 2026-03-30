import { LoginForm } from './LoginForm';

export default {
  title: 'Components/Auth/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onLogin: { action: 'login-submitted' },
    isLoading: { control: 'boolean' },
  },
};

const Template = (args) => (
  <div className='w-[400px] p-6 border rounded-lg bg-card'>
    <LoginForm {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  isLoading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

export const WithValidation = Template.bind({});
