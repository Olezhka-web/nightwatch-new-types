import { EnhancedPageObject, PageObjectModel } from "../../../src/page-object";

declare module '../../../../nightwatch' {
  interface NightwatchCustomPageObjects {
    googlePage: () =>
      EnhancedPageObject<
        typeof googlePage.url,
        ICustomCommands,
        IProps,
        typeof googlePage.elements,
        typeof googlePage.sections
      >
  }
}

interface ICustomCommands extends Record<string, () => unknown> {
  sayHello: () => void;
}

interface IProps extends Record<string, unknown> {
  text: string;
}

const customCommands: ICustomCommands = {
  sayHello: function () {
    console.info('\nPage Object Test\n');
  }
}

// TODO SectionProperties
const menuSection = {
  menu: {
    selector: '#gb',
    elements: {
      mail: {
        selector: 'a[href="https://mail.google.com/mail/&ogbl"]',
      },
      images: {
        selector: 'a[href="https://www.google.com.ua/imghp?hl=en&ogbl"]',
      },
    },
    sections: {
      m: {
        selector: 'fds',
        commands: [
          {
            clickYoutube(this: any) {
              console.log('Click 1')
            },
            clickYoutubeMyOwm(this: any) {
              console.log('Click 2')
            },
          },
          {
            clickYoutubeMy(this: any) {
              console.log('Click 3')
            },
          },
        ],
        elements: {
          b: {
            selector: 'fsddsadas'
          }
        },
        sections: {
          myForm: {
            selector: 'myForm'
          }
        }
      }
    }
  }
};

const googlePage = {
  url: () => 'https://www.google.com/',
  commands: [customCommands],
  props: {
    text: 'Google Props'
  },
  elements: [
    {
      searchBar: {
        selector: 'input[type=text]',
      },
      submitButton: {
        selector: 'input[name=btnK]',
      },
    },
  ],
  // @ts-ignore TODO THIS
  sections: menuSection
} satisfies PageObjectModel;

export default googlePage;