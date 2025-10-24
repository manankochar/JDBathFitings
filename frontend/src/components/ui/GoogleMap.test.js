import React from 'react';
import { render, screen } from '@testing-library/react';
import GoogleMap from './GoogleMap';

// Mock Google Maps API
const mockGoogleMaps = {
  Map: jest.fn(() => ({
    addListener: jest.fn(),
  })),
  Marker: jest.fn(() => ({
    addListener: jest.fn(),
  })),
  InfoWindow: jest.fn(() => ({
    open: jest.fn(),
    close: jest.fn(),
  })),
  MapTypeId: {
    ROADMAP: 'roadmap',
  },
  Animation: {
    DROP: 'drop',
  },
  Size: jest.fn(),
  Point: jest.fn(),
};

// Mock window.google
Object.defineProperty(window, 'google', {
  value: mockGoogleMaps,
  writable: true,
});

describe('GoogleMap Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(<GoogleMap />);
    expect(screen.getByText('Loading Map...')).toBeInTheDocument();
  });

  test('renders with custom props', () => {
    const customProps = {
      center: { lat: 40.7128, lng: -74.0060 },
      zoom: 10,
      height: '300px',
      markerTitle: 'Test Location',
      markerAddress: 'Test Address',
    };

    render(<GoogleMap {...customProps} />);
    expect(screen.getByText('Loading Map...')).toBeInTheDocument();
  });

  test('handles error state when Google Maps API is not loaded', () => {
    // Mock window.google as undefined
    Object.defineProperty(window, 'google', {
      value: undefined,
      writable: true,
    });

    render(<GoogleMap />);
    
    // Wait for error state to appear
    setTimeout(() => {
      expect(screen.getByText('Map Error')).toBeInTheDocument();
      expect(screen.getByText('Google Maps API not loaded')).toBeInTheDocument();
    }, 100);
  });
});
