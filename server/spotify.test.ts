import { describe, it, expect, vi } from 'vitest';
import { getSpotifyAuthUrl } from './spotify';

describe('Spotify Integration', () => {
  it('should generate a valid Spotify auth URL', () => {
    const redirectUri = 'http://localhost:3000/spotify-callback';
    const authUrl = getSpotifyAuthUrl(redirectUri);
    
    expect(authUrl).toContain('https://accounts.spotify.com/authorize');
    expect(authUrl).toContain('client_id=');
    expect(authUrl).toContain('response_type=code');
    expect(authUrl).toContain('redirect_uri=');
    expect(authUrl).toContain('scope=');
  });

  it('should include required scopes in auth URL', () => {
    const redirectUri = 'http://localhost:3000/spotify-callback';
    const authUrl = getSpotifyAuthUrl(redirectUri);
    
    expect(authUrl).toContain('playlist-read-private');
    expect(authUrl).toContain('playlist-read-collaborative');
  });
});
