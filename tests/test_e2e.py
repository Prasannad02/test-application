import pytest
from playwright.sync_api import Page, expect

@pytest.fixture(scope="function", autouse=True)
def before_each(page: Page):
    page.goto("/")
    # Wait for hydration/network to be idle to improve stability
    page.wait_for_timeout(500)

def test_should_show_validation_error_when_fields_are_empty(page: Page):
    page.get_by_test_id('sign-in-btn').click()
    expect(page.get_by_test_id('validation-error')).to_contain_text('Both fields required')

def test_should_show_validation_error_for_invalid_email(page: Page):
    page.get_by_test_id('login-email').fill('invalid-email')
    page.get_by_test_id('login-password').fill('password123')
    # Ensure values are set
    expect(page.get_by_test_id('login-email')).to_have_value('invalid-email')
    expect(page.get_by_test_id('login-password')).to_have_value('password123')

    page.get_by_test_id('sign-in-btn').click()
    expect(page.get_by_test_id('validation-error')).to_contain_text('Invalid email format')

def test_should_login_successfully_with_valid_credentials(page: Page):
    page.get_by_test_id('login-email').fill('test@example.com')
    page.get_by_test_id('login-password').fill('password123')
    # Ensure values are set
    expect(page.get_by_test_id('login-email')).to_have_value('test@example.com')
    expect(page.get_by_test_id('login-password')).to_have_value('password123')

    page.get_by_test_id('sign-in-btn').click()

    expect(page.get_by_test_id('toast-message')).to_contain_text('Login successful')
    expect(page.get_by_test_id('profile-role')).to_be_visible()
    expect(page.get_by_test_id('logout-btn')).to_be_visible()

def test_should_handle_password_reset_flow(page: Page):
    page.get_by_test_id('reset-password-btn').click()
    expect(page.get_by_test_id('reset-confirm-email')).to_be_visible()

    page.get_by_test_id('reset-confirm-email').fill('test@example.com')
    page.get_by_test_id('reset-confirm-btn').click()

    expect(page.get_by_test_id('toast-message')).to_contain_text('Credentials reset sent to email')
    expect(page.get_by_test_id('reset-confirm-email')).not_to_be_visible()

class TestAuthenticatedUserActions:
    @pytest.fixture(autouse=True)
    def setup(self, page: Page):
        # Perform login before each test in this block
        page.get_by_test_id('login-email').fill('test@example.com')
        page.get_by_test_id('login-password').fill('password123')
        expect(page.get_by_test_id('login-email')).to_have_value('test@example.com')
        expect(page.get_by_test_id('login-password')).to_have_value('password123')
        page.get_by_test_id('sign-in-btn').click()
        expect(page.get_by_test_id('profile-role')).to_be_visible()

    def test_should_update_profile_role_and_status(self, page: Page):
        page.get_by_test_id('profile-role').select_option('Manager')
        page.get_by_test_id('profile-status').select_option('Inactive')
        page.get_by_test_id('save-profile-btn').click()

        expect(page.get_by_test_id('toast-message')).to_contain_text('Changes saved successfully')

        # Verify values persist (in client state)
        expect(page.get_by_test_id('profile-role')).to_have_value('Manager')
        expect(page.get_by_test_id('profile-status')).to_have_value('Inactive')

    def test_should_update_access_settings(self, page: Page):
        page.get_by_test_id('save-access-btn').click()
        expect(page.get_by_test_id('toast-message')).to_contain_text('Access settings updated')

    def test_should_logout_successfully(self, page: Page):
        page.get_by_test_id('logout-btn').click()
        expect(page.get_by_test_id('toast-message')).to_contain_text('Logged out successfully')
        expect(page.get_by_test_id('sign-in-btn')).to_be_visible()
