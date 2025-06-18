// src/__tests__/Login.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Login from '../components/Login'; // Adjust the import path as necessary

// Mock axios
jest.mock('axios');

describe('Login Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders login form', () => {
        render(<Login />);
        
        // Check if form elements are rendered
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    test('handles login successfully', async () => {
        // Mock successful login response
        axios.post.mockResolvedValue({
            data: {
                token: 'mockToken',
                userId: 'mockUserId'
            }
        });

        render(<Login />);
        
        // Fill in the form
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('Login'));

        // Wait for navigation to happen (you may need to adjust this based on how you handle navigation)
        await waitFor(() => {
            expect(localStorage.getItem('token')).toBe('mockToken');
            expect(localStorage.getItem('userId')).toBe('mockUserId');
            expect(window.location.href).toContain('/dashboard'); // Check if redirected (adjust according to your routing setup)
        });
    });

    test('handles login failure', async () => {
        // Mock failed login response
        axios.post.mockRejectedValue(new Error('Login failed'));

        render(<Login />);
        
        // Fill in the form
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('Login'));

        // Wait for error message to appear
        await waitFor(() => {
            expect(screen.getByText('Login failed. Please check your credentials and try again.')).toBeInTheDocument();
        });
    });

    test('shows loading state during login', async () => {
        // Mock login response
        axios.post.mockResolvedValue({
            data: {
                token: 'mockToken',
                userId: 'mockUserId'
            }
        });

        render(<Login />);
        
        // Fill in the form
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('Login'));

        // Check if the button text changes to "Logging in..."
        expect(screen.getByText('Logging in...')).toBeInTheDocument();
    });
});
