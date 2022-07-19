import { ComponentMeta, ComponentStory } from "@storybook/react";
import LoginForm from "./LoginForm";

export default {
  title: "login/login-form/LoginForm",
  component: LoginForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof LoginForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LoginForm> = () => <LoginForm />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
