const templates = [
  {
    concept: 'basic',
    backgroundColor: '#efcbc5',
    blocks: [
      {
        type: 'title',
        data: {
          contents: {
            texts: 'JOIN US',
          },
          styles: { color: 'white' },
        },
        id: 'basic-title-1',
      },
      {
        type: 'img',
        data: {
          contents: {
            src: 'https://api2.projector.com/v2/image/3060d7cf-529f-4168-8cd6-f34d553ee963?width=1024',
          },
          styles: {},
        },
        id: 'basic-img-1',
      },
      {
        type: 'social',
        data: {
          contents: {
            facebookLink: '',
            twitterLink: '',
            youtubeLink: '',
          },
        },
        id: 'basic-social-1',
      },
      {
        type: 'map',
        data: {
          contents: {
            location: {},
            address: '',
          },
        },
        id: 'basic-map-1',
      },
    ],
  },
  {
    concept: 'poster',
    backgroundColor: '#169af7',
    blocks: [
      {
        type: 'longShadowText',
        data: {
          contents: {
            texts: 'giveaway  alert',
          },
          styles: {
            color: 'white',
          },
        },
        id: 'cool-title-1',
      },
      {
        type: 'img',
        data: {
          contents: {
            src: 'https://api2.projector.com/v2/image/db477c2a-e23b-4e83-bad9-ddda759fec95?width=1024',
          },
          styles: {},
        },
        id: 'wedding-img-1',
      },
      {
        type: 'title',
        data: {
          contents: {
            texts: 'contact me via',
          },
          styles: { color: 'white' },
        },
        id: 'basic-title-1',
      },
      {
        type: 'social',
        data: {
          contents: {
            facebookLink: '',
            twitterLink: '',
            youtubeLink: '',
          },
        },
        id: 'wedding-social-1',
      },
    ],
  },
];

export default templates;
