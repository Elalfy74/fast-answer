import User from '@testing-library/user-event';

import { render, screen } from '../../../utils/test-utils';
import { LoginForm } from '..';

test('Login button must be disabled as default', () => {
  render(<LoginForm />);

  const button = screen.getByRole('button', {
    name: 'Log In',
  });

  expect(button).toBeDisabled();
});

test('Login Button Must Be Enabled When Email And Passowrd Filled Correctly', async () => {
  render(<LoginForm />);
  const emailInput = screen.getByRole('textbox', { name: /email address/i });
  const passowrdInput = screen.getByTestId('password');

  User.setup();

  await User.type(emailInput, 'mahmoud@gmail.com');
  await User.type(passowrdInput, '123456');

  const button = screen.getByRole('button', {
    name: 'Log In',
  });

  expect(button).toBeEnabled();
});
