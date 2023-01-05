import { ComponentMeta, ComponentStory } from "@storybook/react";
import RegisterForm, { Props } from "./RegisterForm";
import { mockBaseTemplateProps } from "./RegisterForm.mocks";

export default {
  title: "register/register-form/RegisterForm",
  component: RegisterForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof RegisterForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RegisterForm> = () => <RegisterForm />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockBaseTemplateProps.base,
} as Props;
