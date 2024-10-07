import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import LibraryProvider from '../context/LibraryContext';
import { UtilityProvider } from '../context/UtilityContext';
import {MangaDetail} from '@/app/components/mangaDetail/MangaDetail'
import { fireEvent, render, screen } from '@testing-library/react';
import TestProviders from '../provider/TestProvider';

jest.mock('../context/AuthContext', () => ({
  useAuthContext: jest.fn(() => ({
    isAuthenticated: true,
  })),
}));
jest.mock('../context/LibraryContext', () => ({
  useLibrary: jest.fn(() => ({
    addToLibrary: jest.fn(),
    removeFromLibrary: jest.fn(),
    library: [],
  })),
}));
jest.mock('../context/ThemeContext', () => ({
  useThemeContext: jest.fn(() => ({ theme: 'light' })),
}));
jest.mock('../context/UtilityContext', () => ({
  useUtilityContext: jest.fn(() => ({
    saveMangaData: jest.fn(),
  })),
}));
jest.mock('../context/UtilityContext', () => ({
  useUtilityContext: jest.fn(),
}));

const mockRating = {
  statistics: {
    "497f6eca-6276-4993-bfeb-53cbbbba6f08": {
      rating: {
        average: 4.8
      },
      follows: 1000
    }
  }
};

const mockManga = {
  id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  type: "manga",
  attributes: {
    title: {
      en: "Berserk",
    },
    altTitles: [
      {
        jp: "ベルセルク",
      }
    ],
    description: {
      property1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar diam nec odio tincidunt malesuada.",
      property2: "English"
    },
    isLocked: true,
    tags: [{ id: '391b0423-d847-456f-aff0-8b0cfc03066b', attributes: { name: { en: 'Action' } } }],
    status: 'ongoing',
    year: 2020,
  },
  relationships: [{ type: 'author', id: '123', attributes: { name: 'Author Name' } }],
};

// Pastikan mockManga sudah terdefinisi
test('renders MangaDetail component', () => {
  const { getByText } = render(
    <ThemeProvider>
      <UtilityProvider>
        <MangaDetail manga={mockManga} rating={mockRating} />
      </UtilityProvider>
    </ThemeProvider>
  );
  expect(getByText(/some text/i)).toBeInTheDocument();
});

describe('MangaDetail component', () => {
  it('renders manga details correctly', () => {
    render(
      <TestProviders>
        <MangaDetail manga={mockManga} rating={mockRating} />
      </TestProviders>
    );

    const title = screen.getByText(/Berserk/i);
    const altTitle = screen.getByText(/ベルセルク/i);
    const description = screen.getByText(/Lorem ipsum/i);

    expect(title).toBeInTheDocument();
    expect(altTitle).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('does not render alt title if not available', () => {
    const mangaWithoutAltTitle = { ...mockManga, attributes: { ...mockManga.attributes, altTitles: [] } };
    
    render(
      <TestProviders>
        <MangaDetail manga={mangaWithoutAltTitle} rating={mockRating} />
      </TestProviders>
    );
  
    const altTitle = screen.queryByText(/ベルセルク/i);
    expect(altTitle).not.toBeInTheDocument();
  });
  

  it('displays author information correctly', () => {
    render(
      <TestProviders>
        <MangaDetail manga={mockManga} rating={mockRating} />
      </TestProviders>
    );
    expect(screen.getByText(/Author Name/i)).toBeInTheDocument();
  });
  
  it('displays correct rating and follows count', () => {
    render(
      <TestProviders>
        <MangaDetail manga={mockManga} rating={mockRating} />
      </TestProviders>
    );
    expect(screen.getByText(/4\.8/)).toBeInTheDocument();
    expect(screen.getByText(/1000/)).toBeInTheDocument();
  });

  it('renders cover art image correctly', () => {
    render(
      <TestProviders>
        <MangaDetail manga={mockManga} rating={mockRating} />
      </TestProviders>
    );
    const image = screen.getByAltText(/Berserk/i);
    expect(image).toHaveAttribute('src', expect.stringContaining('expected-image-path'));
  });
  
  it('shows loading spinner when manga is not available', () => {
    render(
      <TestProviders>
        <MangaDetail manga={null} rating={null} />
      </TestProviders>
    );
  
    const spinner = screen.getByRole('status'); // Status digunakan oleh loading spinner
    expect(spinner).toBeInTheDocument();
  });
  

  it('shows add to library button for authenticated user', () => {
    render(
      <TestProviders>
        <MangaDetail manga={mockManga} rating={mockRating} />
      </TestProviders>
    );

    // const button = screen.getByText(/add to library/i);
    const button = screen.getByRole('button', { name: /add to library/i });
    expect(button).toBeInTheDocument();
  });

  it('does not show add to library button when user is not authenticated', () => {
    jest.mock('../context/AuthContext', () => ({
      useAuthContext: jest.fn(() => ({
        isAuthenticated: false,
      })),
    }));
  
    render(
      <TestProviders>
        <MangaDetail manga={mockManga} rating={mockRating} />
      </TestProviders>
    );
  
    const button = screen.queryByRole('button', { name: /add to library/i });
    expect(button).not.toBeInTheDocument();
  });
  

  it('calls addToLibrary on button click (authenticated)', () => {
    jest.mock('../context/AuthContext', () => ({
      useAuthContext: jest.fn(() => ({
        isAuthenticated: true,
      })),
    }));

    const addToLibrary = jest.fn();
    jest.mock('../context/LibraryContext', () => ({
      useLibrary: () => ({
        addToLibrary,
        library: [],
      }),
    }));
    render(
      <TestProviders>
        <MangaDetail manga={mockManga} rating={mockRating} />
      </TestProviders>
    );

    // const button = screen.getByText(/add to library/i);
    const button = screen.getByRole('button', { name: /add to library/i });
    fireEvent.click(button);

    expect(addToLibrary).toHaveBeenCalledWith(mockManga);
  });

  it('calls removeFromLibrary on button click', () => {
    const removeFromLibrary = jest.fn();
    jest.mock('../context/LibraryContext', () => ({
      useLibrary: () => ({
        removeFromLibrary,
        library: [mockManga],
      }),
    }));
    render(
      <TestProviders>
        <MangaDetail manga={mockManga} rating={mockRating} />
      </TestProviders>
    );
    fireEvent.click(screen.getByText(/remove from library/i));
    expect(removeFromLibrary).toHaveBeenCalledWith(mockManga.id);
  });
  
  it('matches snapshot', () => {
    const { container } = render(
      <TestProviders>
        <MangaDetail manga={mockManga} rating={mockRating} />
      </TestProviders>
    );
    expect(container).toMatchSnapshot();
  });
  
})
