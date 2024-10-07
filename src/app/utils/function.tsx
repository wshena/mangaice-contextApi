export const sliceParagraph = (text:string, targetWords:number) => {
  const words = text?.split(' ');
  const slicedWords = words?.slice(0, Math.min(targetWords, words?.length));
  const slicedText = slicedWords?.join(' ');

  if (words?.length > targetWords) {
    return `${slicedText}...`;
  }
  return slicedText;
}

export const getMondayOfPreviousWeek = () => {
	const now = new Date();
	const dayOfWeek = now.getDay();
	const distanceToMonday = (dayOfWeek + 6) % 7;
	now.setDate(now.getDate() - distanceToMonday - 7); // Subtracting 7 days to get the previous Monday

	const pad = (num: number) => (num < 10 ? "0" + num : num);

	return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
		now.getDate()
	)}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
};


export const getFlagImageUrl = (languageTag:any) => {
	let url = '';
	switch (languageTag) {
			case 'en':
			case 'en-GB':
			case 'uk':
					url = '/flags/gb.svg';
					break;
			case 'en-US':
					url = '/flags/us.svg';
					break;
			case 'fr':
					url = '/flags/fr.svg';
					break;
			case 'de':
					url = '/flags/de.svg';
					break;
			case 'pl':
					url = '/flags/pl.svg';
					break;
			case 'nl':
					url = '/flags/nl.svg';
					break;
			case 'fi':
					url = '/flags/fi.svg';
					break;
			case 'sv':
					url = '/flags/se.svg';
					break;
			case 'it':
					url = '/flags/it.svg';
					break;
			case 'es':
			case 'es-ES':
			case 'es-la':
					url = '/flags/es.svg';
					break;
			case 'pt':
			case 'pt-PT':
					url = '/flags/pt.svg';
					break;
			case 'ru':
					url = '/flags/ru.svg';
					break;
			case 'pt-BR':
					url = '/flags/br.svg';
					break;
			case 'es-MX':
					url = '/flags/mx.svg';
					break;
			case 'zh-CN':
					url = '/flags/cn.svg';
					break;
			case 'zh-TW':
					url = '/flags/tw.svg';
					break;
			case 'ja':
					url = '/flags/jp.svg';
					break;
			case 'ko':
					url = '/flags/kr.svg';
					break;
			case 'vi':
				url = '/flags/vn.svg';
				break;
			case 'id':
				url = '/flags/id.svg';
			break;
			case 'pt-br':
				url = '/flags/br.svg';
				break;
			case 'tr':
				url = '/flags/tr.svg';
				break;
			case 'hi':
				url = '/flags/in.svg';
				break;
			default:
					url = '/flags/xx.svg'; // Unknown flag
					break;
	}

	return url;
};

export const getTitle = (titles: { [key: string]: string } | undefined) => {
  if (!titles || typeof titles !== 'object') {
    // Jika `titles` tidak ada atau bukan objek, kembalikan judul default
    return 'Unknown Title';
  }

  const preferredLanguages = [
		'en', 'en-GB', 'uk', 'en-US', 'fr', 'de', 'pl', 'nl', 'fi', 'sv', 
		'it', 'es', 'es-ES', 'es-la', 'pt', 'pt-PT', 'ru', 'pt-BR', 'es-MX', 
		'zh-CN', 'zh-TW', 'ja', 'ko', 'vi', 'id', 'pt-br', 'tr', 'hi'
	];
	
  for (const lang of preferredLanguages) {
    if (titles[lang]) {
      return titles[lang];
    }
  }

  // Jika tidak ada bahasa yang sesuai, gunakan judul dari bahasa pertama yang tersedia
  return Object.values(titles)[0] || 'Unknown Title';
};


// Fungsi untuk menghitung jumlah item yang bisa ditampilkan di carousel berdasarkan ukuran layar
export const getItemsToShow = (sidebarClick: boolean, mobile:number, tablet:number, notbook:number ,desktop:number, large:number, desktopSidbar:number) => {
  if (typeof window !== 'undefined') {
    if (window.innerWidth >= 2560) {
      return large;
    }
    if (window.innerWidth > 1024) {
      return sidebarClick ? desktopSidbar : desktop; // Jika sidebar di-click, tampilkan 7 item
    }
    if (window.innerWidth === 1024) {
      return notbook;
    }
    if (window.innerWidth >= 768) {
      return tablet; // Tablet
    }
  }
  return mobile; // Mobile Portrait
};

// fungsi untuk men-generate random color
export const generateRandomColor = () => {
  // Generate a random number between 0 and 16777215 (decimal for #FFFFFF)
  const randomNumber = Math.floor(Math.random() * 16777215);
  
  // Convert the number to a hexadecimal string and pad it to ensure it's always 6 characters
  const randomColor = `#${randomNumber.toString(16).padStart(6, '0').toUpperCase()}`;
  
  return randomColor;
}

export const getOrderFilter = (order:string) => {
	switch (order) {
		case 'best match':
			return 'order[relevance]=desc';
			break;
		case 'latest upload':
			return 'order[latestUploadedChapter]=desc';
			break;
		case 'oldest upload':
			return 'order[latestUploadedChapter]=asc';
			break;
		case 'title ascending':
			return 'order[title]=asc';
			break;
		case 'title descending':
			return 'order[title]=desc';
			break;
		case 'higest rating':
			return 'order[rating]=desc';
			break;
		case 'lowest rating':
			return 'order[rating]=asc';
			break;
		case 'most follows':
			return 'order[followedCount]=desc';
			break;
		case 'fewest follows':
			return 'order[followedCount]=asc';
			break;
		case 'recently added':
			return 'order[createdAt]=desc';
			break;
		case 'oldest added':
			return 'order[createdAt]=asc';
			break;
		default:
			return 
			break;
	}
}

export const getContentRatingFilter = (contentRating:any) => {
  return contentRating?.map((rating:string) => `&contentRating[]=${rating}`).join('');
};

export const getPublicationStatus = (status:any) => {
  return status?.map((status:string) => `&status[]=${status}`).join('');
};

export const getDemographic = (demographic:any) => {
  return demographic?.map((demographic:string) => `&publicationDemographic[]=${demographic}`).join('');
};

export const getIncludedTags = (tags:any) => {
  return tags?.map((tag:any) => `&includedTags[]=${tag.id}`).join('');
};

export const getExcludedTags = (tags:any) => {
  return tags?.map((tag:any) => `&excludedTags[]=${tag.id}`).join('');
};

export function objectToQueryString(params: any) {
  const queryString = Object.keys(params)
    .filter(key => key !== 'page') // Abaikan parameter 'page'
    .map(key => {
      // Jika value adalah array, tambahkan []
      if (Array.isArray(params[key])) {
        return params[key]
          .map(val => `${key}=${val}`)
          .join('&');
      }
      // Jika key adalah 'q', ubah menjadi 'title'
      const newKey = key === 'q' ? 'title' : key;
      return `${newKey}=${params[key]}`;
    })
    .join('&');

  return `${queryString}`;
}
