import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuthContext } from '@/app/context/AuthContext';
import { useLibrary } from '@/app/context/LibraryContext';
import LibraryPage from '@/app/titles/follows/page'; 
import TestProviders from '../provider/TestProvider';

// Mock the necessary context and dependencies
jest.mock('@/app/context/AuthContext');
jest.mock('@/app/context/LibraryContext');
jest.mock('next/link', () => ({ children }: { children: React.ReactNode }) => children);

describe('LibraryPage', () => {
  const mockUserLibrary = [
    { id: '1', title: 'Manga 1', attributes: { title: 'Manga 1' } },
    { id: '2', title: 'Manga 2', attributes: { title: 'Manga 2' } },
  ];

  const mockAuthContext = {
    user: { username: 'jonh doe', password: '123', token: 'dumytoken', library: mockUserLibrary} ,
    isAuthenticated: true,
  };

  const mockLibraryContext = {
    clearLibrary: jest.fn(),
  };

  beforeEach(() => {
    // Mock Auth and Library Context return values
    (useAuthContext as jest.Mock).mockReturnValue({ ...mockAuthContext, user: { username: 'jonh doe', password: '123', token: 'dumytoken', library: [] } });
    (useLibrary as jest.Mock).mockReturnValue(mockLibraryContext);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the library page when user is authenticated', () => {
    render(
      <TestProviders>
        <LibraryPage />
      </TestProviders>
    );

    expect(screen.getByText((content, element) => {
      return content.startsWith('your manga collection') && element?.tagName.toLowerCase() === 'h1';
    })).toBeInTheDocument();    
    expect(screen.getByText((content, element) => {
      return content.startsWith('Clear all') && element?.tagName.toLowerCase() === 'button';
    })).toBeInTheDocument();    

    // Check if library items are displayed
    mockUserLibrary.forEach((manga) => {
      expect(screen.getByText(manga.title)).toBeInTheDocument();
    });
  });

  it('displays a message when the library is empty', () => {
    // Mock an empty library
    (useAuthContext as jest.Mock).mockReturnValue({ ...mockAuthContext, user: { library: [] } });
    render(
      <TestProviders>
        <LibraryPage />
      </TestProviders>
    );

    expect(screen.getByText((content, element) => {
      return content.startsWith('Your library is empty') && element?.tagName.toLowerCase() === 'h1';
    })).toBeInTheDocument();
  });

  it('calls clearLibrary when the "Clear all" button is clicked', () => {
    render(
      <TestProviders>
        <LibraryPage />
      </TestProviders>
    );

    const clearButton = screen.getByText((content, element) => {
      return content.startsWith('Clear all') && element?.tagName.toLowerCase() === 'span';
    });
    fireEvent.click(clearButton);

    expect(mockLibraryContext.clearLibrary).toHaveBeenCalled();
  });

  it('prompts for confirmation before clearing the library', () => {
    // Mock window.confirm
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);

    render(
      <TestProviders>
        <LibraryPage />
      </TestProviders>
    );

    const clearButton = screen.getByText((content, element) => {
      return content.startsWith('Clear all') && element?.tagName.toLowerCase() === 'span';
    });
    fireEvent.click(clearButton);

    expect(confirmSpy).toHaveBeenCalledWith('Remove manga from library?');
    confirmSpy.mockRestore();
  });

  it('renders a message prompting the user to login if not authenticated', () => {
    (useAuthContext as jest.Mock).mockReturnValue({ isAuthenticated: false, user: null });

    render(
      <TestProviders>
        <LibraryPage />
      </TestProviders>
    );

    expect(screen.getByText(/You need to sign in to use this page/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('does not clear library if confirmation is cancelled', () => {
    // Mock window.confirm to return false
    jest.spyOn(window, 'confirm').mockReturnValue(false);

    render(
      <TestProviders>
        <LibraryPage />
      </TestProviders>
    );

    const clearButton = screen.getByText((content, element) => {
      return content.startsWith('Clear all') && element?.tagName.toLowerCase() === 'span';
    });
    fireEvent.click(clearButton);

    expect(mockLibraryContext.clearLibrary).not.toHaveBeenCalled();
  });
});
