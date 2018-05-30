import { FrontsidePage } from './app.po';

describe('frontside App', async function() {
  let page: FrontsidePage;

  beforeEach(() => {
    page = new FrontsidePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
