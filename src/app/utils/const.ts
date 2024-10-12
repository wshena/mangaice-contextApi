
export const getCoverArt = (mangaId: string, filename: string) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/covers/${mangaId}/${filename}`;
  
  return url; // Ganti URL dengan proxy
};


export const getChapterPageImage = (chapterHash: string, fileName: string, dataSaver: boolean) => {
  if (dataSaver)
    return `https://uploads.mangadex.org/data-saver/${chapterHash}/${fileName}`;

  return `https://uploads.mangadex.org/data/${chapterHash}/${fileName}`;
};

export const NavbarHeight = 81

export const includesCoverArtAuthorArtist = 'includes[]=author&includes[]=artist&includes[]=cover_art'
export const includesScanlationGroupMangaUser = 'includes[]=scanlation_group&includes[]=manga&includes[]=user'

export const SidebarNavigation = [
  {
    link: 'Home',
    sublinks: []
  },
  {
    link: 'Profile',
    sublinks: [
      {
        label: 'Library',
        link: '/titles/follows'
      },
      {
        label: 'Reading History',
        link: '/my/history'
      },
      {
        label: 'My Profile',
        link: '/my/profile'
      },
    ]
  },
  {
    link: 'Titles',
    sublinks: [
      {
        label: 'Advance Search',
        link: '/titles'
      },
      {
        label: 'Recently Added',
        link: '/titles/recent'
      },
      {
        label: 'Latest Updates',
        link: '/titles/latest'
      },
      {
        label: 'Random',
        link: '/titles/random'
      }
    ]
  },
]

export const Themes = ['light', 'dark', 'slate', 'dracula'];

export const Sortby = [
  'none', 'best match', 'latest upload', 'oldest upload', 'title ascending', 'title descending', 'higest rating', 'lowest rating' ,'most follows', 'fewest follows', 'recently added', 'oldest added'
]

export const Contentrating = [
  'Safe', 'Sugestive', 'Erotica'
]

export const Publication = [
  'Ongoing', 'Completed', 'Hiatus', 'Cancle'
]

export const Demographic = [
  'Shounen', 'Shoujo', 'Seinen', 'Josei'
]

export const ChapterDisplay = [
  'Long Strip', 'Wide Strip', 'Single Page'
]

export const SettingOptions = [
  'all', 'display', 'blocks', 'profile', 'other'
]
