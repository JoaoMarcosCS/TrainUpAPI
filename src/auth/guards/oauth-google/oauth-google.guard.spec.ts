import { OauthGoogleGuard } from './oauth-google.guard';

describe('OauthGoogleGuard', () => {
  it('should be defined', () => {
    expect(new OauthGoogleGuard()).toBeDefined();
  });
});
